# Radio Music Mk2 Module Reference

This document is the complete behavior reference for current firmware. It is intended as the definitive companion to the Quick Start and User Manual.

## 1. Hardware and control model

### 1.1 Panel controls
| Control | Behavior |
|---|---|
| `STATION` knob | File/station selection inside current bank |
| `STATION` push-switch | Hold for bank browsing (`0-15`) |
| `START` knob | Start position (Start mode) or pitch/speed (Pitch mode) |
| `START` push-switch | Toggles Start mode and Pitch mode |
| `RESET` button | Retrigger; long-hold repeatedly increments bank |

### 1.2 Jacks
| Jack | Behavior |
|---|---|
| `STATION` CV | Added to station knob position |
| `START` CV | Start offset in Start mode; pitch input in Pitch mode |
| `RESET` | Trigger input when `pulseMode=0`, pulse output when `pulseMode!=0` |
| `OUT` | Audio output |

### 1.3 LEDs
- Four main LEDs: bank display, VU/progress, startup/error patterns.
- RESET LED: reset/pulse activity indicator, and fifth indicator in calibration mode.
- PITCH LED: Start/Pitch state indicator (also flashes when 8mu is active).

## 2. Startup modes and operating states

## 2.1 Normal playback
Default boot path: mounts SD, scans audio, loads settings, recalls last bank, starts playback engine.

## 2.2 USB mass-storage mode (SD reader)
Entry: hold `STATION` push while powering on.
- RM2 exposes the SD card as USB mass storage.
- Press `RESET` to reboot back to playback mode.

## 2.3 START CV calibration mode
Entry: hold `START` push while powering on.
- Startup flash confirms calibration mode.
- Alternating middle LEDs indicate capture/listen state.
- Captured octaves light indicators from low to high (includes RESET LED as fifth indicator).
- End condition:
  - automatic after enough octave captures, or
  - press RESET after at least two octaves are captured.
- Success: fast flash pattern.
- Failure: slow fade-out pattern.
- Successful calibration is stored in flash.

## 2.4 Firmware update bootloader mode
Entry: hold `RESET` + `STATION` push + `START` push while powering on.
- RP2040 USB bootloader appears.
- Copy new `.uf2` firmware.
- Module reboots to application firmware (or power-cycle manually).

## 2.5 Startup/error LED behavior
- No SD / mount failure: slow scanning pattern.
- SD mounted but no playable files: fast scanning pattern.
- Watchdog-recovery boot: alternating alert pattern before normal startup.

## 3. SD card and filesystem behavior

## 3.1 Supported card/filesystem
- microSD SDHC/SDXC
- `FAT32` and `exFAT`

## 3.2 Bank discovery
- Banks are top-level directories whose names begin with `0..15`.
- Numeric prefix selects bank index; remaining text is ignored for bank numbering.
- Bank is considered valid only if it contains playable files after scanning.

## 3.3 Root handling
- Audio files in SD root are ignored.
- Firmware may create/update these root files:
  - `settings.txt`
  - `last_bank.txt`

## 3.4 File ordering and filtering
- Ordering is lexicographic `strcmp` order (case-sensitive byte order).
- Files starting with `_` or `.` are ignored.
- Extension matching is case-insensitive.

## 3.5 Limits
- Maximum total playable files: `800`
- Maximum files scanned per bank tree: `250`
- Maximum tracked directories: `64`
- Shared filename/path storage pool: `80000` bytes

## 3.6 Subfolder behavior
Inside bank folders:
- Folder name ending with `next` (case-insensitive): sequential child cycling on reset.
- Any other folder name: random child selection on reset.
- Nested subfolders are supported recursively.
- `reselectSubdirOnStationChange` extends reselection to station changes.

## 4. Audio format support

## 4.1 WAV (`.wav`)
- Uncompressed integer PCM path
- Sample rates: 8k, 11.025k, 16k, 22.05k, 44.1k, 48k, 88.2k, 96k
- Bit depths: 8/16/24-bit
- Channels: mono/stereo (left channel played from stereo)

## 4.2 AIFF (`.aif`, `.aiff`)
- Uncompressed AIFF path
- Same supported rates/depths/channels as WAV
- Stereo playback uses left channel

## 4.3 RAW (`.raw`)
- Interpreted as 44.1kHz 16-bit mono PCM
- Must be non-empty and even byte length

## 4.4 Not supported
- 32-bit PCM playback path
- Compressed AIFF/WAV variants
- Unsupported sample rates

## 5. Playback and mode behavior

## 5.1 Loop mode (`loopMode`)
- `0`: no loop
- `1`: forward loop
- `2`: ping-pong loop

## 5.2 Tuner mode (`tunerMode`)
- `0`: switch between stations
- `1`: continuous fade between adjacent stations
- `2`: radio-style behavior with detune/noise/whistle options

## 5.3 Speed mode (`speedMode`)
- `0` tape: linear speed control (including reverse where applicable)
- `1` notes: semitone-oriented pitch behavior
- `2` 90s: time-stretch style mode

## 5.4 Fade mode (`fadeMode`)
- `0` constant-power style curve
- `1` linear curve

## 5.5 Immediate vs reset-latched control
- Station controls: `stationPotImmediate`, `stationCVImmediate`
- Start controls in Start mode: `startPotImmediate`, `startCVImmediate`
- Pitch controls in Pitch mode: `pitchPotImmediate`, `pitchCVImmediate`

## 5.6 Reset jack mode and pulse output
- `pulseMode=0`: reset jack is input.
- `pulseMode!=0`: reset jack is output.
- Positive pulse mode values act as multipliers; negative values as divisors.
- `pulseOutDividesCustomLoop` changes whether pulse timing follows full file or 8mu loop window.

## 6. Complete `settings.txt` key reference

Parser rules:
- `key=value`
- case-insensitive key names
- whitespace-insensitive parsing
- `#` comment to end-of-line

| Key(s) | Type / range | Default | Notes |
|---|---|---|---|
| `loopMode`, `looping` | `0..2` | `1` | Loop behavior |
| `crossfadeTime`, `declick` | integer `>=0` | `25` | Crossfade time in ms |
| `tunerMode` | `0..2` | `0` | Switch/fade/radio |
| `minRadioStationStrength` | `0..256` | `128` | Radio mode station floor |
| `ssbEffect` | bool | `0` | Radio sideband effect |
| `whistleVol` | `0..100` | `50` | Radio whistle level |
| `noiseVol` | `0..100` | `50` | Radio noise level |
| `speedMode` | `0..2` | `0` | Tape/notes/90s |
| `fadeMode` | `0..1` | `0` | Constant-power/linear |
| `pulseMode` | `-16..16` | `0` | Reset input vs pulse output |
| `pulseOutDividesCustomLoop` | bool | `1` | Pulse timing basis |
| `reselectSubdirOnStationChange` | bool | `0` | Subfolder reselection timing |
| `stationPotImmediate`, `chanPotImmediate` | bool | `1` | Station pot immediate/latch |
| `stationCVImmediate`, `chanCVImmediate` | bool | `1` | Station CV immediate/latch |
| `startPotImmediate` | bool | `0` | Start pot immediate/latch |
| `startCVImmediate` | bool | `0` | Start CV immediate/latch |
| `pitchPotImmediate` | bool | `1` | Pitch pot immediate/latch |
| `pitchCVImmediate` | bool | `1` | Pitch CV immediate/latch |
| `startCVDivider` | `1..512` | `2` | Start-position quantization/coarsening |
| `pitchKnobMin` | `-48..24` | `-12` | Notes mode lower knob range |
| `pitchKnobMax` | `-48..24` | `12` | Notes mode upper knob range |
| `pitchKnobLinearSpeedMin` | `-400..400` | `-100` | Tape/90s knob min (%) |
| `pitchKnobLinearSpeedMax` | `-400..400` | `100` | Tape/90s knob max (%) |
| `pitchCVLinearSpeedMin` | `-400..400` | `-100` | Tape/90s CV min (%) |
| `pitchCVLinearSpeedMax` | `-400..400` | `100` | Tape/90s CV max (%) |
| `quantisePitchPot`, `quantizePitchPot` | bool | `1` | Semitone quantize for knob |
| `quantisePitchCV`, `quantizePitchCV` | bool | `1` | Semitone quantize for CV |
| `showMeter` | `0..2` | `1` | Bank/VU/progress display |
| `meterHide` | integer `>=1` | `2000` | Bank display hold time |
| `highQuality` | bool | `1` | HQ vs lo-fi playback path |
| `crossfade`, `mute` | bool | `0` | Parsed compatibility key |
| `sort` | bool | `1` | Parsed key; current scanner is lexicographic |
| `noteCVRange`, `noteRange` | `1..72` | `59` | Parsed range value |

## 7. 8mu integration reference

## 7.1 CC mapping used by RM2
| CC | Function |
|---|---|
| 34 | Pitch slider |
| 35 | Pitch range selector |
| 36 | Loop start |
| 37 | Loop end |
| 38 | Speed mode selector |
| 39 | Loop mode selector |
| 40 | Tuner mode selector |
| 41 | Pulse mode selector |
| 42-45 | Motion inputs (active while motion button held) |

## 7.2 Note mapping used by RM2
| Note | Function |
|---|---|
| 36 | Pause/slowdown hold |
| 48 | Reset trigger |
| 60 | Motion-control hold |
| 72 | Pulse multiply/divide toggle |

## 7.3 Active/deactivate behavior
- Any incoming MIDI refreshes RM2 remote-active timer.
- RM2 deactivates only when timeout expires and all sliders are at zero.
- If sliders remain non-zero, RM2 can stay active.

## 8. Persistence and generated files
- `settings.txt`: created in SD root if missing.
- Per-bank `settings.txt`: loaded as override on bank selection.
- `last_bank.txt`: updated when bank changes and used at next startup.
- CV calibration coefficients: saved in internal flash, not on SD.

## 9. Practical compatibility notes
- Keep filenames short and explicit; use numeric prefixes for predictable station order.
- For quickest troubleshooting, keep one small known-good bank with 16-bit 44.1kHz WAV files.
- If SD behavior becomes inconsistent after heavy write/delete cycles, reformat and recopy content.
