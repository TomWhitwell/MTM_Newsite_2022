# Radio Music Mk2 Quick Start

## What Radio Music does
Radio Music Mk2 is a 4HP sample player. It loads audio from microSD banks, lets you scan files with `STATION`, set start point or pitch with `START`, retrigger with `RESET`, and can be remote-controlled from 8mu over USB.

## First setup (5-10 minutes)
1. Format a microSD card as `FAT32` or `exFAT` (MBR partition table).
2. Create one bank folder in SD root, for example `0_core`.
3. Put a few known-good files in that folder (start with `WAV PCM 16-bit 44.1kHz`).
4. Insert card, power on, monitor `OUT`.
5. Turn `STATION` to choose files and press `RESET` to retrigger.

## Controls and I/O
| Control / jack | Function |
|---|---|
| `STATION` knob | Selects file (station) in current bank |
| `STATION` push | Hold to browse/select bank `0-15` |
| `STATION` CV | Adds CV offset to station selection |
| `START` knob | Start position (Start mode) or pitch/speed (Pitch mode) |
| `START` push | Toggles Start mode and Pitch mode |
| `START` CV | Start offset (Start mode) or pitch CV (Pitch mode) |
| `RESET` button | Retriggers playback |
| `RESET` jack | Trigger input when `pulseMode=0`; pulse output when `pulseMode!=0` |
| `OUT` | Audio output |

## SD card structure
- Root-level playable content should be in bank folders whose names start with `0..15`.
- Folder suffix text is allowed: `0`, `01 drums`, `15-koto` are valid.
- Audio files in SD root are ignored by current firmware.
- Files starting with `_` or `.` are ignored.
- File order is lexicographic (alphabetical/ASCII), so use numeric prefixes (`000_`, `001_`, ...).

## Supported audio files
- Use 16-bit 44.1kHz WAV for first bring-up.
- RM2 also plays `AIFF` (`.aif`/`.aiff`) and `RAW` (`.raw`) files.
- Stereo playback uses the left channel.
- RAW is interpreted as 44.1kHz 16-bit mono.
- Compressed formats and 32-bit PCM are not supported.
- Full sample-rate and bit-depth matrix is in `docs/radio-music-user-manual.md` and `docs/radio-music-module-reference.md`.

## `settings.txt` essentials
At boot, the module reads `/settings.txt` (created automatically if missing). You can also place `settings.txt` inside a bank folder for bank-specific overrides.

Most-used keys:
- `loopMode`: `0` no loop, `1` forward, `2` ping-pong
- `tunerMode`: `0` switch, `1` fade, `2` radio
- `speedMode`: `0` tape, `1` notes, `2` 90s/time-stretch
- `pulseMode`: `0` reset input, non-zero enables pulse output
- `stationPotImmediate`, `stationCVImmediate`, `startPotImmediate`, `startCVImmediate`, `pitchPotImmediate`, `pitchCVImmediate`
- `highQuality`: `1` high-quality playback path, `0` lo-fi path

## Edit `settings.txt` (quick workflow)
1. Power off and remove SD card (or use mass-storage mode below).
2. Open `/settings.txt` in a plain-text editor.
3. Change one key at a time, save, reinsert SD, and reboot RM2.
4. For bank-specific behavior, add `settings.txt` inside that bank folder.
5. If settings become unusable, delete `settings.txt` and reboot; RM2 regenerates default settings.

## Special power-on modes
- Hold `STATION` push during power-up: USB mass-storage mode (press `RESET` to reboot back to playback).
- Hold `START` push during power-up: START CV calibration mode.
- Hold `RESET` + `STATION` push + `START` push during power-up: RP2040 bootloader (for firmware update).

## START CV calibration (quick procedure)
1. Power off.
2. Hold `START` push while powering on.
3. Patch stable 1V/oct CV to `START` jack and play same note across octaves.
4. End after at least two octaves are captured (press `RESET`) or let it auto-finish.
5. Check success flash pattern, then reboot to normal playback.

## Firmware update (quick procedure)
1. Download the correct `.uf2` firmware file.
2. Power off.
3. Hold `RESET` + `STATION` push + `START` push while powering on.
4. Connect USB and copy `.uf2` to the RP2040 boot drive.
5. Wait for reboot, or power-cycle manually.

## 8mu quick start
- Connect 8mu to Radio Music USB.
- 8mu sliders/buttons take over mapped playback parameters immediately.
- To return fully to local-only behavior, leave sliders at zero and stop sending MIDI for a short period.

## Other core behaviors to know
- Hold `STATION` push and turn `STATION` to change banks; the selected bank is recalled on next boot.
- `pulseMode` changes the RESET jack role; if retriggering stops working at the jack, check `pulseMode` first.
- If playback fails after heavy SD edits, power-cycle and re-seat the card before deeper debugging.

## Next
- Practical workflows and full calibration/update procedures: `docs/radio-music-user-manual.md`
- Complete settings and behavior reference: `docs/radio-music-module-reference.md`
