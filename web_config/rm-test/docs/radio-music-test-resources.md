# Radio Music Mk2 Test Resources

## External audio test resources
## Numbers and spoken prompts
Useful for validating station travel, intelligibility, and deterministic file ordering checks.

- Numbers prompt library:
  - https://evolution.voxeo.com/library/audio/prompts/numbers/index.jsp

## Sound On Sound technical test files
Useful for broad audio quality, phase, dynamic, and response checks.

- SOS audio test files:
  - https://www.soundonsound.com/techniques/sos-audio-test-files

## How to use these resources in RM2 testing
1. Import selected files into a dedicated bank (e.g., `1_formats` or `6_edgecases`).
2. Use numeric filename prefixes for deterministic ordering (`000_`, `001_`, ...).
3. Run station sweep and reset-trigger checks from the tier script you are currently using (Core, Standard, or Full).
4. Record any format-specific, ordering-specific, or audibility anomalies.

## Recommended mini-pack
For quick triage cycles, keep a small always-available set:
- one spoken numbers file,
- one full-spectrum test tone/noise file,
- one transient-heavy percussive file,
- one long sustained tonal file.
