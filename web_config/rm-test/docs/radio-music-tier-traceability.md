# Radio Music Mk2 Tier Traceability

This file maps user-facing documentation claims to test IDs by tier.

## Core: Quick Start -> Core Script

| Quick Start topic | Core test coverage |
|---|---|
| Boot to playable state | `CT-01` |
| WAV playback bring-up | `CT-02` |
| AIFF/RAW smoke playback | `CT-02A` |
| Ignored files (`_` and root audio) | `CT-02B` |
| Lexicographic station order smoke | `CT-02B` |
| Unsupported format rejection smoke | `CT-02C` |
| STATION/START control basics | `CT-03`, `CT-04` |
| RESET retrigger | `CT-05` |
| RESET jack input/output via `pulseMode` | `CT-06`, `CT-07` |
| Bank selection + recall | `CT-08`, `CT-09` |
| Essential settings (`loopMode`, `tunerMode`, `speedMode`, `crossfadeTime`, `highQuality`) | `CT-10` |
| `settings.txt` regeneration recovery | `CT-10A` |
| 8mu basic integration | `CT-11`, `CT-12`, `CT-13` |
| Mass-storage startup mode | `CT-14` |
| Calibration mode and completion smoke | `CT-15`, `CT-15A` |
| Bootloader + firmware update path smoke | `CT-16`, `CT-16A` |
| SD removal recovery behavior | `CT-17` |
| Soak behavior | `CT-S01`, `CT-S02` |

## Standard: User Manual -> Standard Script

| User Manual topic | Standard test coverage |
|---|---|
| Bank naming and discovery | `ST-01` |
| Lexicographic ordering | `ST-02` |
| Root audio ignored | `ST-03` |
| RESET long-hold bank increment | `ST-03A` |
| Subfolders random / `next` / nested | `ST-04`, `ST-05`, `ST-06` |
| `reselectSubdirOnStationChange` | `ST-07` |
| WAV/AIFF/RAW format coverage | `ST-08`..`ST-11` |
| Stereo left-channel behavior | `ST-12` |
| Loop/tuner/speed mode families | `ST-13`, `ST-14`, `ST-15` |
| Fade mode | `ST-16` |
| Immediate/latched control settings | `ST-17`, `ST-18`, `ST-19` |
| `startCVDivider` behavior | `ST-20` |
| Per-bank settings overrides | `ST-21` |
| Settings parser syntax rules | `ST-21A` |
| Display/quality settings | `ST-22`, `ST-23`, `ST-24` |
| Calibration success + persistence | `ST-25`, `ST-26` |
| USB mass-storage workflow | `ST-27` |
| Firmware update workflow | `ST-28` |
| 8mu full practical behavior | `ST-29`..`ST-33` |
| 8mu return to local control | `ST-33A` |
| Settings regeneration recovery | `ST-34` |

## Full: Module Reference -> Full Script

| Module Reference topic | Full test coverage |
|---|---|
| Startup/error patterns and boot modes | `P0-001`..`P0-012` |
| Full panel/CV/reset behavior | `P1-001`..`P1-011` |
| Root handling / ignored files / bank naming | `P1-012`, `P1-044`, `P1-045` |
| Subfolder model (`next`/random/nested/reselect) | `P1-013`..`P1-016` |
| Audio format support + rejection | `P1-017`, `P1-041`, `P1-042`, `P1-043` |
| Mode families + combinations | `P1-019`..`P1-027`, `P1-046`, `P1-047` |
| Display and quality behavior | `P1-030`..`P1-034`, `P1-052` |
| Calibration success/failure paths | `P1-039`, `P1-040` |
| Complete settings key behavior | `P1-035`..`P1-038`, `P1-048`..`P1-053`, `P2-011`..`P2-014` |
| 8mu mapping, timeout, and loop/pulse interactions | `P1-8MU-001`..`P1-8MU-008`, `P2-010` |
| Filesystem and stress limits | `P2-001`..`P2-018` |
| Long-run reliability | `P3-001`..`P3-003` |

## Notes
- Quick Start intentionally uses smoke-level checks for calibration and firmware update path; full calibration and update behavior depth is in Standard/Full.
- Full script remains the exhaustive source for edge behavior and implementation-level ambiguity checks.
