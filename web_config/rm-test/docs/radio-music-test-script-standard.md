# Radio Music Mk2 Test Script - Standard

This script verifies the broader day-to-day behaviors described in `docs/radio-music-user-manual.md`.

## Active test time
- Typical active time: 3-6 hours.

## Prerequisite
- Core script completed with a stable setup:
  - `docs/radio-music-test-script-core.md`

## Additions beyond Core

### Extra equipment
- One additional microSD card (recommended: `exFAT`) for filesystem parity checks.
- Stable 1V/oct source for calibration verification.
- External trigger source for reset-jack input/output checks.

### Extra SD content
Add these banks to your existing Core card or a cloned card:
- `1_formats` (format coverage)
- `2_subdirs` (random and `next` folder behavior)
- `3_identical` (same-length files)
- `4_nonidentical` (mixed lengths/rates)
- `7_8mu` (8mu-focused content)

Suggested minimum content per bank:
- `1_formats`: WAV/AIFF/RAW representatives (valid + one invalid RAW).
- `2_subdirs`: one `_next` folder and one non-`next` folder.
- `3_identical`: at least 4 files with same sample rate and frame count.
- `4_nonidentical`: at least 4 files with mixed lengths/sample rates.
- `7_8mu`: files where start/end loop behavior is easy to hear.

## Logging
For each test, record:
- `Test ID`
- firmware build/date
- SD details (card + filesystem)
- `PASS` / `FAIL` / `BLOCKED`
- exact settings lines used for the test
- concise observed vs expected note for failures

## Standard tests

## File and bank behavior

### `ST-01` Bank naming and discovery (`P1`)
1. Confirm only root folders starting `0..15` are treated as banks.
2. Confirm non-numbered root folders are ignored as banks.
Expected:
- bank list follows naming rule exactly.

### `ST-02` Station order is lexicographic (`P1`)
1. Use mixed names (`001`, `02`, `10`, `A`, `a`).
2. Sweep `STATION` and log order.
Expected:
- playback order matches lexicographic ordering.

### `ST-03` Root audio ignored (`P1`)
1. Place a valid WAV in SD root plus valid bank files.
2. Reboot and sweep stations.
Expected:
- root WAV is not part of station pool.

### `ST-04` Subfolder random behavior (`P1`)
1. Select station pointing to non-`next` subfolder.
2. Trigger reset repeatedly.
Expected:
- child file varies over repeated resets.

### `ST-05` Subfolder sequential `next` behavior (`P1`)
1. Select station pointing to `*_next` subfolder.
2. Trigger reset repeatedly.
Expected:
- deterministic cyclic progression through child files.

### `ST-06` Nested subfolder behavior (`P1`)
1. Use nested subfolder content.
2. Trigger reset sequence.
Expected:
- nested entries resolve/play reliably.

### `ST-07` Subfolder reselection setting (`P1`)
1. Compare `reselectSubdirOnStationChange=0` and `1`.
2. Move stations without reset and listen for reselection differences.
Expected:
- behavior matches selected setting.

## Format coverage

### `ST-08` WAV sample-rate coverage (`P1`)
Check representative WAV files at:
- 22.05k, 44.1k, 48k, 96k.
Expected:
- all play correctly.

### `ST-09` WAV bit-depth coverage (`P1`)
Check 8/16/24-bit WAV at fixed sample rate.
Expected:
- all play correctly.

### `ST-10` AIFF coverage (`P1`)
Check AIFF at at least two sample rates and two bit depths.
Expected:
- files play correctly.

### `ST-11` RAW behavior (`P1`)
1. Play valid `.raw` file.
2. Include one odd-byte-length `.raw` file.
Expected:
- valid raw plays,
- invalid raw is rejected safely.

### `ST-12` Stereo left-channel playback (`P1`)
1. Play stereo file with tone only on left channel.
2. Play stereo file with tone only on right channel.
Expected:
- left-only file is audible,
- right-only file is near-silent.

## Mode families

### `ST-13` Loop modes (`P1`)
Test `loopMode=0,1,2` with short files.
Expected:
- none/forward/ping-pong behaviors are correct and stable.

### `ST-14` Tuner modes (`P1`)
Test `tunerMode=0,1,2`.
Expected:
- switch/fade/radio behaviors are distinct and stable.

### `ST-15` Speed modes (`P1`)
Test `speedMode=0,1,2`.
Expected:
- tape/notes/90s behaviors are distinct and usable.

### `ST-16` Fade mode (`P2`)
Compare `fadeMode=0` and `1` on correlated material.
Expected:
- crossfade character changes appropriately.

## Control-response settings

### `ST-17` Station immediate vs latched (`P1`)
Check `stationPotImmediate` and `stationCVImmediate` with values `0` and `1`.
Expected:
- `0` applies on reset; `1` applies immediately.

### `ST-18` Start immediate vs latched (`P1`)
Check `startPotImmediate` and `startCVImmediate`.
Expected:
- behavior matches setting.

### `ST-19` Pitch immediate vs latched (`P1`)
Check `pitchPotImmediate` and `pitchCVImmediate`.
Expected:
- behavior matches setting.

### `ST-20` Start CV divider (`P2`)
Compare `startCVDivider` values (`1`, `2`, `8`, `32`).
Expected:
- larger value gives coarser start-position stepping.

### `ST-21` Per-bank settings overrides (`P1`)
1. Set root default value.
2. Override same key in one bank `settings.txt`.
3. Switch banks and compare behavior.
Expected:
- bank-local override is active only in that bank.

## Display and quality

### `ST-22` `showMeter` modes (`P1`)
Check `showMeter=0`, `1`, and `2`.
Expected:
- each mode shows its documented display behavior.

### `ST-23` `meterHide` behavior (`P2`)
Use short and long `meterHide` values.
Expected:
- hold-time of bank display changes accordingly.

### `ST-24` `highQuality` toggle (`P1`)
Compare `highQuality=0` and `1`.
Expected:
- audible quality/path difference and stable playback in both.

## Calibration and special modes

### `ST-25` Calibration success path (`P1`)
1. Enter calibration mode (hold START push at power-on).
2. Feed stable 1V/oct notes across multiple octaves.
3. Finish and verify success indication.
Expected:
- calibration completes and reports success.

### `ST-26` Calibration persistence (`P1`)
1. Power-cycle after successful calibration.
2. Recheck pitch tracking.
Expected:
- calibrated behavior persists across reboot.

### `ST-27` USB mass-storage workflow (`P2`)
1. Enter mass-storage mode (hold STATION push at power-on).
2. Edit a settings file over USB.
3. Press RESET to reboot and verify setting is applied.
Expected:
- mode entry/exit works; file edit is retained.

### `ST-28` Firmware update workflow (`P1`)
1. Enter bootloader (hold RESET + both pot pushes at power-on).
2. Confirm bootloader drive appears.
3. Load test firmware (or same firmware build) and reboot.
Expected:
- deterministic bootloader entry,
- firmware copy and reboot path succeeds.

## 8mu wider behavior

### `ST-29` Full slider mapping (`P1`)
Check all mapped slider functions in practical playback.
Expected:
- each mapping is responsive and stable.

### `ST-30` Full button mapping (`P1`)
Check pause/reset/motion/pulse-toggle behavior.
Expected:
- each mapped button action behaves correctly.

### `ST-31` Motion control behavior (`P2`)
1. Hold motion button.
2. Move 8mu to generate motion CC changes.
Expected:
- motion modulation is active only while motion-hold is active.

### `ST-32` Loop window + pulse interaction (`P1`)
1. Use 8mu loop start/end sliders.
2. Check pulse output behavior with `pulseOutDividesCustomLoop` at `0` and `1`.
Expected:
- pulse timing follows selected mode.

### `ST-33` Connect/disconnect stability (`P1`)
1. Connect/disconnect 8mu several times during playback.
Expected:
- no crash or persistent control corruption.

## Next script
After Standard is stable, continue with:
- `docs/radio-music-test-script-full.md`
