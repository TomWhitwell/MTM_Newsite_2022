# Radio Music Mk2 Discovery Test Script (Combination Bug Hunt)

This script is intentionally different from checklist/unit-style verification.
It is designed to find serious real-world bugs caused by interactions, unusual workflows, and unexpected content.

## 1. Core idea
Instead of only asking "does feature X work?", this approach asks:
- what happens when many valid features are used together,
- what happens with unfamiliar files and card states,
- what happens during performance-style use where state changes are fast and non-linear.

## 2. Session format
Run in 3 parts:
1. Guided charters (10 missions, 15-25 min each).
2. Combination sweeps (targeted mode intersections).
3. Free exploration (creative abuse with full logging).

Target total runtime: one long day (6-10 hours) or split across 2-3 shorter sessions.

## 3. Prep before starting

### 3.1 Media and SD prep
- Use the generated pack: `test-media/rm2_generated_v1/`.
- Add at least 20-40 extra files exported by tools not used in firmware bring-up, for example:
  - Logic Pro
  - Ableton Live
  - Reaper
  - Audacity
  - Zoom recorder / phone audio app
- Keep one SD card formatted on macOS and one on Linux/Windows if possible.

### 3.2 Logging setup
For every anomaly, capture:
- continuous phone video of panel + patch,
- exact bank/folder and station position,
- exact `settings.txt` used,
- whether 8mu was connected and active,
- whether issue survives reboot,
- copy of SD card contents (zip or image) used when issue occurred.

## 4. Ten discovery charters

## `D-01` Conventional sampler performance
Goal: test normal musical play with rapid station changes.
- Use `loopMode=0`, `tunerMode=0`, `speedMode=0`.
- Play it like a one-shot sample player for 15 minutes.
- Alternate between reset-button hits and reset-jack triggers.
Watch for:
- stuck voices, missed retriggers, unintended fades.

## `D-02` Drum machine behavior
Goal: high retrigger pressure + station churn.
- Use short percussive files.
- Drive RESET from an external clock and change STATION during clocking.
- Repeat with `crossfadeTime` short vs long.
Watch for:
- timing drift, transient smearing, freezes.

## `D-03` Virtual radio behavior
Goal: tuner interaction realism and station transitions.
- Use `tunerMode=2` (radio).
- Sweep STATION continuously with and without CV.
- Vary `minRadioStationStrength`, `noiseVol`, `whistleVol`, `ssbEffect`.
Watch for:
- abrupt discontinuities, unstable gain behavior, mode lockups.

## `D-04` Clock source behavior
Goal: pulse output stability while playback state changes.
- Set `pulseMode` to output mode.
- Patch RESET jack output to an external clock destination.
- Change loop mode, start point, bank, and 8mu loop region during run.
Watch for:
- missing/double pulses, pulse stalls, output mode confusion.

## `D-05` 8mu live-control behavior
Goal: remote-control edge interactions.
- Connect 8mu and use all sliders/buttons in performance style.
- Hold motion control while changing speed/tuner/loop modes.
- Return sliders to zero and verify clean return to local control.
Watch for:
- stale remote state, control jumps, unexpected mode persistence.

## `D-06` Adjacent-bank interaction stress
Goal: catch bank-to-bank edge bugs.
- Put one bank with identical-length files next to one with mixed long files.
- Switch between those banks while keeping file active for very short times.
- Repeat with crossfade times longer than active dwell.
Watch for:
- wrong seek position, wrong file state carry-over, crash/lockup.

## `D-07` Station-density stress (pot feel)
Goal: detect selection instability with dense banks.
- Compare `8_pot_density_3`, `9_pot_density_30`, `10_pot_density_60`.
- Sweep STATION slowly and pause at boundary areas.
- Add small station CV offsets.
Watch for:
- unreachable files, oscillation near boundaries, jumpy selection.

## `D-08` Settings edit workflow stress
Goal: validate real-world settings iteration.
- Enter USB mass-storage mode.
- Make small `settings.txt` edits, reboot, test immediately.
- Include case/spacing/comment variants and per-bank overrides.
Watch for:
- settings not applied, partial apply, parser oddities.

## `D-09` Format roulette
Goal: parser and playback robustness with mixed provenance files.
- Build one bank with mixed WAV/AIFF/RAW from many programs.
- Include odd headers, unusual metadata chunks, and near-edge valid files.
- Rapidly move through stations and retrigger.
Watch for:
- scan crashes, mis-detected files, silent-but-counted files.

## `D-10` Creative freeform abuse
Goal: find unknown unknowns.
- Spend 30-60 minutes using RM2 in any unusual way you can think of.
- Switch roles repeatedly: sampler -> radio -> clock -> pitched voice.
- Use 8mu, CV, panel, bank changes, and settings edits in one flow.
Watch for:
- anything surprising, inconsistent, or hard to explain.

## 5. Combination sweep matrix
Run at least 12 combinations from this matrix (more is better):

| Combo ID | loopMode | tunerMode | speedMode | Bank type | crossfadeTime | 8mu |
|---|---:|---:|---:|---|---:|---|
| C01 | 0 | 0 | 0 | identical | 5 | off |
| C02 | 0 | 1 | 1 | nonidentical | 25 | off |
| C03 | 0 | 2 | 2 | mixed | 200 | on |
| C04 | 1 | 0 | 1 | identical | 5 | on |
| C05 | 1 | 1 | 2 | nonidentical | 25 | on |
| C06 | 1 | 2 | 0 | mixed | 200 | off |
| C07 | 2 | 0 | 2 | identical | 5 | off |
| C08 | 2 | 1 | 0 | nonidentical | 25 | on |
| C09 | 2 | 2 | 1 | mixed | 200 | on |
| C10 | 1 | 2 | 2 | adjacent-bank stress | 100 | on |
| C11 | 2 | 2 | 0 | dense station bank (60) | 25 | off |
| C12 | 0 | 1 | 2 | dense station bank (60) | 150 | on |

For each combo:
1. Run for 5-10 minutes.
2. Include station sweeps, reset triggers, and at least one bank switch.
3. Record anomalies immediately with timestamp.

## 6. What counts as a serious bug here
Prioritize reporting when you see:
- hard lockups, reboots, or audio engine stalls,
- wrong file/position/state after mode or bank transitions,
- behavior that depends on hidden historical state and is hard to predict,
- controls that become unreliable only in high-density or mixed-mode usage,
- data-dependent failures (specific file export chain/card format/settings combos).

## 7. Bug report payload for discovery bugs
When filing:
- include short video from before failure to after failure,
- include exact SD content snapshot (zip or image),
- include exact settings files (root + bank),
- include firmware build identifier,
- include an ordered action list that another tester can replay.

Use template:
- `.github/ISSUE_TEMPLATE/radio-music-bug-report.md`

## 8. How this complements existing scripts
- Core/Standard/Full scripts remain the structured baseline.
- This discovery script is for high-value combination bugs and workflow surprises.
- Run this after baseline scripts, or in parallel when baseline confidence is already high.
