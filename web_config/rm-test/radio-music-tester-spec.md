# Radio Music Mk2 Tester Specification

This guide defines who can run the tests effectively, and what they need at each tier.

## 1. Tester experience
A strong tester for this project should be comfortable with:
- Eurorack patching and basic signal troubleshooting.
- Preparing SD cards and organizing files/folders.
- Editing plain-text configuration files (`settings.txt`).
- Following exact step sequences and logging reproducible outcomes.

Helpful but not mandatory:
- Experience with 1V/oct calibration workflows.
- Basic MIDI controller troubleshooting.
- Capturing short video/audio evidence for intermittent issues.

## 2. Core tier requirements

### 2.1 Equipment
- Radio Music Mk2 in stable Eurorack power.
- Monitoring path (headphones or audio interface/monitors).
- Computer with SD card reader.
- One microSD card formatted `FAT32`.
- 8mu controller and USB connection.

### 2.2 Files to prepare
Create a minimal deterministic set:
- `0_core/000_sine_44k16.wav`
- `0_core/001_clicks_44k16.wav`
- `0_core/002_voice_44k16.wav`
- optional `1_core/000_alt_44k16.wav`

Fast path:
- run `python3 tools/generate_rm2_test_media.py --overwrite`
- use `test-media/rm2_generated_v1/` and start with Core banks.

### 2.3 Time expectation
- Active session: about 1-2 hours.
- Plus soak runs started from Core script:
  - 2-hour playback soak,
  - overnight playback soak.

## 3. Standard tier additions
Only add these after Core is stable.

### 3.1 Extra equipment
- One more SD card (recommended `exFAT`).
- Stable 1V/oct CV source.
- External trigger source.

### 3.2 Extra files/banks
Add:
- `1_formats`
- `2_subdirs`
- `3_identical`
- `4_nonidentical`
- `7_8mu`
- `8_pot_density_3`
- `9_pot_density_30`
- `10_pot_density_60`

### 3.3 Time expectation
- Active session: about 3-6 hours.

## 4. Full tier additions
Only add these after Standard is stable.

### 4.1 Extra equipment
- Oscilloscope (recommended for pulse timing work).
- Optional second MIDI controller for compatibility spot checks.
- Additional SD cards for card-to-card variance testing.

### 4.2 Extra files/banks
Add stress-oriented content sets, for example:
- card images close to maximum file count,
- very long folder/file-name paths,
- corrupt/unsupported files for rejection behavior checks,
- larger mixed-format banks.

### 4.3 Time expectation
- Multi-session run; usually spread across several sittings.

## 5. Reporting quality standard
For each failure or odd behavior, capture:
- test ID,
- firmware build/date,
- SD card details,
- exact settings lines,
- exact repro steps,
- expected vs observed behavior,
- reproducibility (`always`, `intermittent`, `unable to re-hit`),
- supporting media when useful.

## 6. Handling notes
- SD removal tests are intentional and can force reboot/recovery paths.
- Keep backup copies of SD test sets.
- Label cards clearly by tier (`Core`, `Standard`, `Full`) to avoid mixing datasets.
