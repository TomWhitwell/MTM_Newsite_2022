# Radio Music Mk2 User Manual

## 1. Overview
Radio Music Mk2 plays samples from microSD and maps them to a simple radio-like interface:
- `STATION` chooses what to play.
- `START` chooses where playback begins, or controls pitch/speed.
- `RESET` retriggers playback.

The same module can behave like a straightforward sample picker, a scanned radio dial, a pitch voice, or a looped clock source depending on `settings.txt` and 8mu control.

## 2. Front panel behavior

### 2.1 STATION section
- `STATION` knob selects the current station/file in the active bank.
- `STATION` CV adds offset to the knob position.
- Hold `STATION` push-switch to enter bank browse mode, then turn `STATION` to choose bank `0-15`.
- Release the switch to return to playback with the selected bank.

Practical note: the firmware only accepts bank folders that contain playable audio.

### 2.2 START section
- `START` knob has two roles:
  - Start mode: start position within the file.
  - Pitch mode: pitch/speed control.
- Press `START` push-switch to toggle Start mode and Pitch mode.
- `START` CV follows the same mode:
  - Start mode: start-position offset.
  - Pitch mode: pitch CV input.

### 2.3 RESET section
- `RESET` button retriggers playback.
- `RESET` jack is dual-purpose:
  - `pulseMode=0`: trigger input (acts like RESET button).
  - `pulseMode!=0`: trigger output (input is disabled).
- Long-holding the RESET button increments bank repeatedly.

### 2.4 LEDs
Main LED uses are:
- bank display while choosing banks,
- VU/progress display during playback,
- startup and error patterns.

`showMeter` controls playback display style (`bank`, `VU`, or `position/progress`).

## 3. SD card setup and file organization

### 3.1 Card type and format
- Supported cards: SDHC/SDXC microSD.
- Filesystems: `FAT32` and `exFAT`.
- Use an MBR partition table.

### 3.2 Bank structure
- Put playable files inside root folders whose names start with `0..15`.
- Examples: `0`, `01 drums`, `7_voice`, `15-koto`.
- Audio files in SD root are ignored.

### 3.3 Station order
- Files are ordered lexicographically.
- Use zero-padded numeric prefixes if you want numeric order:
  - good: `000_kick.wav`, `001_snare.wav`, `010_hat.wav`
  - avoid: `1.wav`, `10.wav`, `2.wav`

### 3.4 Subfolders
Subfolders inside a bank become station entries:
- Folder name ending with `next`: sequential child selection on reset.
- Any other folder name: random child selection on reset.
- Nested subfolders are supported.

This lets one station represent a rotating phrase set, drum chain, or randomized variation pool.

## 4. Supported audio formats

### 4.1 WAV and AIFF
Accepted:
- sample rates: 8k, 11.025k, 16k, 22.05k, 44.1k, 48k, 88.2k, 96k
- bit depth: 8/16/24-bit integer
- channels: mono or stereo (left channel is played)

Not accepted:
- compressed WAV/AIFF variants
- 32-bit PCM playback path

### 4.2 RAW
- `.raw` is read as 44.1kHz 16-bit mono PCM.
- File must be non-empty and have an even byte length.

## 5. `settings.txt` in daily use

### 5.1 Where settings live
- Global defaults: `/settings.txt` at SD root.
- Bank overrides: `/yourbank/settings.txt`.
- If root `settings.txt` is missing, firmware writes one with defaults.

### 5.2 Syntax rules
- `key=value`
- `#` starts a comment to end-of-line
- key names are case-insensitive
- spaces and tabs are ignored (including inside key names)

Example:
```txt
# equivalent lines
Start Pot Immediate = 1
startpotimmediate=1
```

### 5.3 Settings you will use most

Playback behavior:
- `loopMode`: `0` none, `1` forward, `2` ping-pong
- `tunerMode`: `0` switch, `1` fade, `2` radio
- `speedMode`: `0` tape, `1` notes, `2` 90s/time-stretch
- `fadeMode`: `0` constant-power, `1` linear
- `crossfadeTime`: fade time in ms

Control response:
- `stationPotImmediate`, `stationCVImmediate`
- `startPotImmediate`, `startCVImmediate`
- `pitchPotImmediate`, `pitchCVImmediate`
- `startCVDivider` (coarsens/fines start-position stepping)

Display and quality:
- `showMeter`: `0` bank, `1` VU, `2` progress
- `meterHide`: how long bank number stays visible after bank change
- `highQuality`: `1` high-quality path, `0` lo-fi path

Reset jack behavior:
- `pulseMode`: `0` reset input, non-zero pulse output
- `pulseOutDividesCustomLoop`: pulse timing based on 8mu loop window or full file

Subfolder reselection timing:
- `reselectSubdirOnStationChange`: update subfolder choice only on reset (`0`) or also on station change (`1`)

## 6. Working with 8mu

### 6.1 Connection
- Connect 8mu to RM2 USB.
- RM2 responds to incoming MIDI CC/note data used by 8mu defaults.

### 6.2 What 8mu controls
In normal 8mu use, sliders cover:
- pitch,
- pitch range,
- loop start,
- loop end,
- speed mode,
- loop mode,
- tuner mode,
- pulse mode.

Buttons map to:
- pause/slowdown hold,
- reset trigger,
- motion-control hold,
- pulse multiply/divide toggle.

### 6.3 Returning to local-only control
RM2 drops out of active remote state only after:
1. no incoming MIDI for a short timeout, and
2. all 8mu slider values are at zero.

If a slider is left up, RM2 can stay in remote-controlled behavior.

## 7. Calibration (START CV 1V/oct)
Use this when pitch tracking is off in Pitch mode.

### 7.1 Enter calibration mode
1. Power off the module.
2. Hold the `START` push-switch while powering on.
3. Release after startup flashing begins.

### 7.2 Calibration workflow
1. Wait for alternating middle LEDs (module is listening).
2. Patch a stable 1V/oct source into `START` CV.
3. Play the same note across several octaves (1V spacing).
4. Each recognized octave lights one indicator LED.
5. Finish by either:
   - capturing all available octaves, or
   - pressing `RESET` after at least two octaves are captured.

### 7.3 Results
- Success: top LEDs flash rapidly.
- Failure: top LEDs fade out.
- Successful calibration is stored in internal flash and survives power cycles.

Tips:
- Use a stable quantized source.
- If full-range capture fails, try three central octaves first.
- Re-run calibration if rack power distribution changes significantly.

## 8. Special startup modes

### 8.1 USB mass-storage mode (SD reader)
1. Power off.
2. Hold `STATION` push-switch while powering on.
3. Connect USB to computer.
4. Module appears as removable storage for SD content edits.
5. Press `RESET` to reboot back to playback mode.

Note: this mode is convenient for editing `settings.txt` and small file changes, but transfer speed is modest.

### 8.2 Firmware update mode (RP2040 bootloader)
1. Get the correct `.uf2` firmware file.
2. Power off.
3. Hold `RESET` + `STATION` push + `START` push.
4. Power on while holding all three controls.
5. Connect USB; the RP2040 boot drive appears.
6. Copy the `.uf2` file to the boot drive.
7. Wait for reboot (or power-cycle manually if needed).

If no boot drive appears, repeat the power-on button hold and verify cable/USB power.

## 9. Troubleshooting
- No audio:
  - confirm files are inside `0..15` bank folders, not SD root.
  - verify format is supported (start with 16-bit 44.1k WAV).
- Reset jack not retriggering:
  - check `pulseMode`; non-zero turns that jack into output.
- Unexpected station order:
  - rename files with zero-padded numeric prefixes.
- Pitch tracking inconsistent:
  - re-run calibration with stable 1V/oct source.
- 8mu feels “stuck on”:
  - move 8mu sliders to zero and stop MIDI input briefly.
- Settings edits caused unpredictable behavior:
  - remove or rename `settings.txt`, reboot, and let RM2 regenerate defaults.

## 10. Next document
For full limits, complete setting key list, MIDI mapping, and implementation-level behavior, use `docs/radio-music-module-reference.md`.
