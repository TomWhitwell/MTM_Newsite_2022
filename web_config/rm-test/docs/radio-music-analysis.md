# Radio Music Mk2 Firmware Analysis (for Documentation + Pre-release Test Design)

## Scope and inputs
This analysis is based on:
- `src/radio_music/*.cpp|*.h` (firmware behavior)
- `src/8mu2040-main/include/config.h`, `src/8mu2040-main/src/sysex.cpp` (8mu default mapping and RM-facing mode behavior)
- Front panel image `Radio Music 2025 Rev1-01.png`

It is intentionally implementation-first: where README/SPEC text differs from code, this analysis prioritizes code paths.

## Product model (what firmware implements)
Radio Music Mk2 is a 4HP sample player with:
- 2 analog pots, both push-switch pots (`Station`, `Start/Pitch`)
- 2 CV inputs (`Station CV`, `Start CV`)
- 1 push button (`Reset`)
- 1 trigger jack that is context-dependent:
  - input in normal mode (`Reset CV in`)
  - output when pulse mode is active (`Trigger out`)
- 1 audio output jack
- 4 main status LEDs + dedicated `Reset` LED + dedicated `Pitch` LED
- USB host MIDI control path (used by 8mu, but generic MIDI also works)

## Runtime architecture
### Two-core split
- Core 1 (audio side):
  - Generates audio at fixed 96 kHz output rate.
  - Runs per-buffer callback at 3 kHz (32 frames/buffer).
  - Handles pitch/speed math, crossfade progression, VU/progress LEDs, reset-button timing logic, and MIDI processing via TinyUSB host task.
- Core 0 (SD side):
  - Scans SD card directories.
  - Runs file loading and seek buffering.
  - Applies control changes (station/start selection, reset-trigger behavior, bank changes, subfolder reselection).

### Boot and fail model
- Watchdog active (3.5 s).
- If SD read fails during operation, firmware treats it as unrecoverable and reboots.
- A distinct LED pattern is shown when previous reboot was watchdog-caused.

## Controls and interaction model
## Station pot + Station CV
- Combined as `stationInput = clamp(knobA + cvA, 0..1023)`.
- Selects file index within current bank.
- If `stationPotImmediate`/`stationCVImmediate` are `0`, values latch and only update on reset trigger/button.

## Start/Pitch pot + Start CV
- `pitchMode = false` (start mode): control start position.
- `pitchMode = true` (pitch mode): control pitch/speed (depending on speed mode).
- Push on Start pot toggles start/pitch mode.
- Inputs may be immediate or reset-latched using:
  - `startPotImmediate`, `startCVImmediate` (start mode)
  - `pitchPotImmediate`, `pitchCVImmediate` (pitch mode)

## Reset button + Reset jack
- Short press/trigger: restart/fade logic handled in SD thread/audio engine.
- Long press on reset button:
  - after ~600 ms enters bank increment mode
  - then increments bank every ~600 ms while held
- Reset jack behavior changes when pulse mode is enabled:
  - pulseMode 0: reset jack is trigger input
  - pulseMode non-zero: jack is trigger output, reset input is unavailable

## Station pot push (bank browse mode)
- Hold Station pot switch to browse valid banks (banks containing audio).
- Turning knob selects bank; release returns to playback.
- If bank changed, `last_bank.txt` is updated.

## SD card and filesystem behavior
## Required layout
- Firmware ignores audio files in SD root.
- Playback content is expected inside top-level directories whose names begin with `0..15`.
- Numeric prefix determines bank number; suffix text is ignored for bank indexing.
  - Valid examples: `0`, `05 drums`, `15-koto`

## Ordering and filtering
- Files beginning with `_` or `.` are ignored.
- Supported extensions are case-insensitive: `.raw`, `.wav`, `.aif`, `.aiff`.
- Sorting is lexicographic `strcmp` over full stored names (case-sensitive byte order).

## Limits in code
- Max total files: 800
- Max files counted in one bank tree: 250
- Max directories tracked: 64 (16 banks + up to 48 subdirs)
- Filename/path storage pool: 80,000 bytes

## Subdirectory model
Subdirectories inside bank folders become selectable "entries" inside that bank.
- Normal subdir: on reset, selects a random child entry.
- Subdir with name ending in `next` (case-insensitive): on reset, cycles sequentially.
- Nested subdirs are supported recursively.
- Reselection trigger can be configured:
  - always on reset trigger
  - optionally also on station change via `reselectSubdirOnStationChange=1`

## Persistent files written by firmware
- `settings.txt` in root (created if missing)
- `last_bank.txt` in root (written on bank change)

## Audio file support (actual parser behavior)
## RAW
- `.raw` only
- Must be non-empty and byte length multiple of 2
- Interpreted as 16-bit mono 44.1 kHz PCM

## WAV
- Strict RIFF/WAVE parsing
- Accepts PCM-like integer layouts matching supported sample rates/bit depths/channels
- Data chunk is required and non-zero
- Supported rates: 8k, 11.025k, 16k, 22.05k, 44.1k, 48k, 88.2k, 96k
- Supported depths: 8/16/24-bit (32-bit rejected)
- Mono/stereo accepted; stereo playback uses left channel only

## AIFF
- Requires FORM/AIFF (not AIFC compressed)
- Requires COMM chunk length 18 bytes and SSND blocksize 0
- Same supported rates/depths/channel constraints as above
- Stereo uses left channel only

## Playback engine and modes
## Quality modes
- `highQuality=1`: 24-bit path, 96 kHz output, interpolated resampling.
- `highQuality=0`: intentionally degraded mode (8-bit style truncation + low-pass character).

## Tuner modes (`tunerMode`)
- `0` Switch: one active file at a time, station changes crossfade to selected station.
- `1` Fade: crossfade continuously between adjacent stations.
- `2` Radio: fade mode plus detuning/noise/whistle simulation (`minRadioStationStrength`, `noiseVol`, `whistleVol`, `ssbEffect`).

## Loop modes (`loopMode`)
- `0` none
- `1` forward loop
- `2` ping-pong

## Speed modes (`speedMode`)
- `0` tape (linear speed, can reverse if negative)
- `1` notes (quantized/exponential pitch model)
- `2` time-stretch style mode (20 ms reposition cadence)

## Crossfade shape (`fadeMode`)
- `0` constant-power style curve
- `1` linear

## 8mu integration (implemented RM-side behavior)
RM listens for MIDI channel voice messages (channel-agnostic in parser logic; status nibble matched, channel ignored by RM behavior).

### CC mapping used by RM
- CC34: Pitch slider
- CC35: Pitch range selector
- CC36: Loop start
- CC37: Loop end
- CC38: Speed mode selector override
- CC39: Loop mode selector override
- CC40: Tuner mode selector override
- CC41: Pulse mode selector override
- CC42-45: motion inputs (used only when motion mode button is held)

### Note mapping used by RM
- Note 36: pause/slowdown hold
- Note 48: reset trigger
- Note 60: motion-control hold for pitch/range modulation
- Note 72: toggle pulse multiply/divide

### 8mu timeout/deactivation
- Any MIDI message refreshes activity timer.
- Deactivation occurs only after timeout **and** all slider values are at zero.
- If disconnected with non-zero slider values, RM can remain in remote-controlled state.

### 8mu default config compatibility
`src/8mu2040-main/include/config.h` default bank emits CC34-49 and notes 36/48/60/72, which matches RM’s expected control subset.

## LED behavior (implemented)
- 4 main LEDs:
  - VU mode (`showMeter=1`)
  - progress mode (`showMeter=2`)
  - bank number display while bank-selecting
  - scan/progress/error patterns during startup and errors
- Reset LED flashes on reset/fade events and pulse output triggers.
- Pitch LED indicates start/pitch state; flashes when 8mu is active.

## Power-on special modes
- Hold Station pot switch: USB mass-storage mode (SD card reader over USB device)
- Hold Start pot switch: CV calibration mode
- Hold Reset + both pot switches: RP2040 bootloader mode

## Settings parser behavior
- Reads `key=value` style text.
- Case-insensitive key matching.
- Space/tab ignored globally (including inside key names).
- `#` starts comment to end-of-line.
- Root `settings.txt` is global baseline; each bank can override via `bankFolder/settings.txt`.

## Settings accepted by parser
- `crossfade` / `mute` (parsed)
- `crossfadeTime` / `declick`
- `tunerMode`
- `minRadioStationStrength`
- `ssbEffect`
- `whistleVol`
- `noiseVol`
- `speedMode`
- `fadeMode`
- `pulseMode`
- `pulseOutDividesCustomLoop`
- `reselectSubdirOnStationChange`
- `showMeter`
- `meterHide`
- `stationPotImmediate` / `chanPotImmediate`
- `stationCVImmediate` / `chanCVImmediate`
- `startPotImmediate`
- `startCVImmediate`
- `pitchPotImmediate`
- `pitchCVImmediate`
- `startCVDivider`
- `loopMode` / `looping`
- `sort` (parsed)
- `highQuality`
- `noteCVRange` / `noteRange` (parsed)
- `pitchKnobMin`, `pitchKnobMax`
- `pitchKnobLinearSpeedMin`, `pitchKnobLinearSpeedMax`
- `pitchCVLinearSpeedMin`, `pitchCVLinearSpeedMax`
- `quantisePitchCV` / `quantizePitchCV`
- `quantisePitchPot` / `quantizePitchPot`

## Implementation notes relevant to testing (high-value ambiguities)
These are not feature requests; they are high-risk verification targets:

1. `sort` setting is parsed but scan always sorts lexicographically in current code.
2. `crossfade`/`mute` flag is parsed but no direct branch currently uses it.
3. `noteCVRange` is parsed but not consumed in active pitch calculations.
4. `showMeter=0` comment says "show bank number"; code path does not actively refresh bank display during playback.
5. Pulse output math can divide by `(loopEnd-loopStart)` when custom loop pulse division is enabled and loop start equals loop end.
6. Bank-change display timing has two different timer unit treatments in different paths.
7. RM currently does not send the 8mu heartbeat/default-config SysEx handshake itself; behavior is purely based on incoming MIDI data.

These points are deliberately covered in the pre-release test script.
