# Radio Music Mk2 Test Script - Core

This script verifies the user-facing behavior described in `docs/radio-music-quick-start.md`.

## Active test time
- Target active time: 1-2 hours.
- Soak checks are started from this script and run in parallel or after the active session.

## Core setup

### Equipment
- Radio Music Mk2 in a stable Eurorack case.
- Monitoring path (headphones or interface/monitors).
- Computer + SD reader.
- One microSD card formatted `FAT32`.
- 8mu connected over USB.

Optional for advanced startup checks:
- Stable 1V/oct source (for calibration completion check).
- Known-good `.uf2` firmware file (for bootloader update-path check).

### SD content (minimal deterministic set)
Create this exact layout:
- `0_core/000_sine_44k16.wav`
- `0_core/001_clicks_44k16.wav`
- `0_core/002_voice_44k16.wav`
- `0_core/010_tone_44k16.aiff`
- `0_core/020_tone_44k16.raw`
- `0_core/030_unsupported_32bit.wav` (should be rejected)
- `0_core/_ignored.wav` (should be ignored)
- `root_should_be_ignored.wav` in SD root (should be ignored)
- `1_core/000_alt_44k16.wav` (optional but useful for bank checks)

### Starting settings
Use default root `settings.txt`, then edit only when a case asks for it.

## How to log outcomes
For each test, record:
- `Test ID`
- firmware build/date
- SD card brand/capacity/filesystem
- `PASS` / `FAIL` / `BLOCKED`
- short repro notes for failures

## Core tests

## Boot and playback

### `CT-01` Boot to playable state (`P0`)
1. Insert prepared SD card.
2. Power on.
3. Wait until module is playable.
Expected:
- startup completes normally,
- no reboot loop,
- audio playback can be triggered.

### `CT-02` WAV playback (`P0`)
1. Sweep `STATION` through files in `0_core`.
2. Press `RESET` on each selection.
Expected:
- every test file plays cleanly,
- no silent/stuck stations.

### `CT-02A` AIFF/RAW playback smoke (`P1`)
1. Select `010_tone_44k16.aiff` and confirm playback.
2. Select `020_tone_44k16.raw` and confirm playback.
Expected:
- both files play reliably in the same bank as WAV files.

### `CT-02B` Ignore/order behavior smoke (`P1`)
1. Confirm `_ignored.wav` is not reachable by STATION.
2. Confirm `root_should_be_ignored.wav` is not reachable by STATION.
3. Confirm station order follows lexicographic filename order.
Expected:
- ignored files are excluded,
- ordering is predictable from filename prefixes.

### `CT-02C` Unsupported format rejection smoke (`P1`)
1. Keep `030_unsupported_32bit.wav` on the SD card.
2. Boot and sweep the full `0_core` station range.
Expected:
- unsupported file is not counted as playable,
- no crash or scan failure.

### `CT-03` Station and start controls (`P0`)
1. Move `STATION` knob full range.
2. Move `START` knob in Start mode.
Expected:
- station selection spans the full bank,
- start position changes are audible and stable.

### `CT-04` Start/Pitch toggle (`P1`)
1. Press `START` push to enter Pitch mode.
2. Move `START` knob and hear pitch/speed response.
3. Press again to return to Start mode.
Expected:
- toggling is reliable,
- behavior clearly changes between modes.

### `CT-05` Reset retrigger (`P0`)
1. Press `RESET` repeatedly at normal speed.
2. Press rapidly for several seconds.
Expected:
- deterministic retrigger,
- no lockup, freeze, or permanent silence.

## Reset jack mode switching

### `CT-06` Reset jack as trigger input (`P0`)
Precondition: `pulseMode=0`.
1. Send external trigger pulses into RESET jack.
Expected:
- each pulse behaves like reset-button retrigger.

### `CT-07` Reset jack as pulse output (`P0`)
1. Set `pulseMode=4` in `settings.txt`.
2. Reboot.
3. Confirm RESET jack no longer accepts trigger input.
4. Observe pulse output while playback runs.
Expected:
- jack mode switches to output,
- pulses are emitted consistently.

## Bank and persistence

### `CT-08` Bank selection via STATION push-hold (`P1`)
1. Hold `STATION` push-switch.
2. Turn `STATION` to another non-empty bank.
3. Release switch.
Expected:
- bank change is shown and applied,
- selected bank is usable immediately.

### `CT-09` Bank recall after reboot (`P1`)
1. After `CT-08`, power-cycle module.
Expected:
- previously selected bank is recalled.

## Core settings sanity

### `CT-10` Essential settings are observable (`P1`)
Edit one key at a time, reboot after each:
- `loopMode`
- `speedMode`
- `tunerMode`
- `crossfadeTime`
- `highQuality`
Expected:
- each key change causes an audible/visible behavior change consistent with its function.

### `CT-10A` Settings regeneration check (`P1`)
1. Remove or rename root `settings.txt`.
2. Reboot RM2.
3. Confirm a new default `settings.txt` is created.
Expected:
- module recreates defaults cleanly,
- playback remains normal after regeneration.

## 8mu (release-essential in Core)

### `CT-11` 8mu slider control (`P0`)
1. Connect 8mu.
2. Move each slider and confirm response on mapped RM behavior.
Expected:
- immediate, stable response,
- no lockups or erratic state.

### `CT-12` 8mu button actions (`P0`)
1. Trigger mapped reset action from 8mu.
2. Check pause/slowdown hold behavior.
3. Check pulse multiply/divide toggle action.
Expected:
- button actions match panel-equivalent behavior where applicable.

### `CT-13` 8mu release back to local control (`P1`)
1. Leave 8mu connected.
2. Return all sliders to zero.
3. Stop sending control activity briefly.
4. Verify local panel behavior is fully normal.
Expected:
- RM exits active remote behavior when timeout + zero-slider condition is met.

## Special startup modes (smoke)

### `CT-14` USB mass-storage mode entry/exit (`P1`)
1. Power off.
2. Hold `STATION` push while powering on.
3. Confirm the SD volume appears over USB.
4. Press `RESET` to reboot to playback mode.
Expected:
- mass-storage mode is available,
- reset exits back to normal operation.

### `CT-15` Calibration mode entry (`P1`)
1. Power off.
2. Hold `START` push while powering on.
Expected:
- calibration mode entry indication appears.

### `CT-15A` Calibration completion smoke (`P1`)
Precondition: stable 1V/oct source available.
1. In calibration mode, patch 1V/oct to `START` CV.
2. Capture at least two octaves.
3. End calibration and observe result pattern.
4. Reboot and confirm normal playback.
Expected:
- calibration workflow completes without crash,
- result indication is shown,
- module returns to normal playback.

### `CT-16` Bootloader mode entry (`P1`)
1. Power off.
2. Hold `RESET` + `STATION` push + `START` push while powering on.
Expected:
- RP2040 bootloader mode is entered.

### `CT-16A` Firmware update path smoke (`P1`)
Precondition: known-good `.uf2` firmware file available.
1. Enter bootloader mode.
2. Copy `.uf2` to the RP2040 boot drive.
3. Wait for reboot.
4. Confirm module returns to playable state.
Expected:
- copy/reboot path works reliably,
- module boots and plays normally after update.

## Fault handling smoke

### `CT-17` SD removal recovery (`P0`)
1. Start playback.
2. Remove SD card during playback.
Expected:
- controlled recovery/reboot behavior,
- no permanent dead state after restoring normal setup.

## Core soak checks

### `CT-S01` 2-hour playback soak
1. Run continuous playback for 2 hours.
2. Every 10-15 minutes, make one light interaction (station change or reset).
Record:
- any reboot,
- any lockup,
- any sustained silence.

### `CT-S02` Overnight soak (8-12 hours)
1. Run long unattended playback.
2. Log start and end state.
3. Record interruptions or failure events.

## Next script
After Core is stable, continue with:
- `docs/radio-music-test-script-standard.md`
