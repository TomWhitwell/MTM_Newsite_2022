# Radio Music Mk2 Test Media Generation Plan

This document defines and implements the media-pack strategy for pre-release testing.

## Objectives
- Make files self-identifying by ear (spoken metadata in each test file).
- Cover real format and parser behavior (WAV/AIFF/RAW + rejection assets).
- Support quick and deep test tiers from a single pack.
- Include station-pot density checks with low/medium/high file counts.

## Spoken-file design
Each playable test asset is generated with this structure:
1. Spoken identifier (format/rate/depth or test purpose).
2. Short technical tail:
   - reference sine tone,
   - sweep segment,
   - low-level noise or click train (bank-dependent).

Result: testers can identify what they are hearing from audio alone, without relying on filename visibility.

## Implemented generator
- Script: `tools/generate_rm2_test_media.py`
- Output pack: `test-media/rm2_generated_v1/`
- Hosted ZIP: [rm2_generated_v1.zip](assets/rm2_generated_v1.zip)
- Regenerate:
  - `python3 tools/generate_rm2_test_media.py --overwrite`
  - `python3 tools/validate_rm2_test_media.py`

## Bank map in generated pack
- `0_core`: core smoke files (WAV/AIFF/RAW), unsupported-depth sample, hidden-file sample.
- `1_formats`: WAV rate/depth matrix, AIFF representatives, stereo left/right checks, RAW valid+invalid.
- `2_subdirs`: random, `next`, and nested `next` structures.
- `3_identical`: same sample rate and exact same duration files.
- `4_nonidentical`: mixed sample rates/bit depths/durations.
- `5_longnames`: long path/name stress assets.
- `6_edgecases`: very short, very long, hidden files, unsupported extension, corrupt headers.
- `7_8mu`: loop-friendly spoken/click assets for 8mu mapping and loop-window checks.
- `8_pot_density_3`: 3-file station-density bank.
- `9_pot_density_30`: 30-file station-density bank.
- `10_pot_density_60`: 60-file station-density bank.
- `15_sparse`: sparse-bank behavior.

## Pot-density rationale
Station selection behavior can feel different as bank density increases. Testing only small banks can miss issues such as:
- hard-to-hit files near boundaries,
- unstable station transitions around decision thresholds,
- inconsistent reachability in dense banks.

The dedicated density banks isolate this variable while keeping file format constant.

## Validation checks to run after generation
- File count and bank count sanity.
- Spot-check key format files (`soxi` for WAV/AIFF).
- Verify odd-byte invalid RAW file length.
- Confirm identical-bank durations are equal.
- Confirm very long and very short edge files meet target durations.

## Notes
- `manifest.csv` is generated in the pack root for quick lookup.
- Hidden files in edge/core banks are intentional and should be ignored by scanner logic.
