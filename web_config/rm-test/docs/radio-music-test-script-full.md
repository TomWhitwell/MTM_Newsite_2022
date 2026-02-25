# Radio Music Mk2 Test Script - Full

## 1. Purpose
This is the exhaustive script. Run it after Core and Standard are stable.
It is designed to exercise the full behavior described in `docs/radio-music-module-reference.md`, including edge cases and long-run stability.

## 1.1 Starting point and additions
Assume Core and Standard setups are already in place.

Add for Full:
- larger and more varied SD content sets,
- intentionally broken/unsupported files,
- optional scope and extra MIDI controller for deeper diagnostics,
- extra SD cards for card-to-card variance checks.

## 1.2 Scope map
- Format family depth: format matrix and rejection behavior.
- Mode family depth: loop/tuner/speed/fade combinations.
- Parser depth: full settings key and alias coverage.
- Structure depth: bank/subfolder/nesting/ordering/limits.
- Reliability depth: stress, limits, and long-duration runs.

## 2. Priority model
- `P0` critical: boot, media mount, core playback, reset behavior, data integrity, crash/freeze risk.
- `P1` high: mode correctness, settings correctness, bank/subfolder logic, CV/panel interaction correctness.
- `P2` medium: stress and edge-case robustness, unusual but valid content.
- `P3` exploratory: non-blocking polish and long-run confidence tests.

## 3. Test session rules
## 3.1 Logging standard
For every failed case, record:
- Test ID
- Firmware build identifier/date
- SD card make/model/capacity/filesystem
- Exact settings snippet used
- Steps performed (exact)
- Observed result vs expected
- Whether issue is always/reproducibly intermittent
- Video/photo/audio capture where relevant

## 3.2 Result labels
- `PASS`: observed behavior matched expected behavior.
- `FAIL`: behavior differed or was ambiguous.
- `BLOCKED`: prerequisite was missing.

## 3.3 Reset policy between cases
Unless the case says otherwise:
1. Power-cycle module.
2. Confirm SD mounts normally.
3. Confirm bank and settings start state are as expected.

## 4. Equipment you'll want for a full run
- Radio Music Mk2 device under test
- Eurorack case + power
- Monitoring path (headphones or audio interface/monitor)
- At least 2 microSD cards:
  - Card A: FAT32, 16-32 GB
  - Card B: exFAT, 64 GB+
- Computer with SD writer/editor
- Helpful additions:
  - Oscilloscope for trigger output timing
  - CV source with accurate 1V/oct output (keyboard/sequencer)
  - 8mu controller (for remote-control section)
  - Generic USB MIDI controller (for compatibility spot checks)

## 5. Test media preparation
Create a dedicated test SD image with this content.

## 5.1 Bank folders
At root:
- `0_core`
- `1_formats`
- `2_subdirs`
- `3_identical`
- `4_nonidentical`
- `5_longnames`
- `6_edgecases`
- `7_8mu`
- `15_sparse`

Leave other numeric banks absent/empty for sparse-bank behavior tests.

## 5.2 Audio assets
Create files with these properties.

### Core assets (`0_core`)
- `000_sine_440_44k16_mono.wav` (10 s)
- `001_saw_220_44k16_mono.wav` (10 s)
- `002_spoken_44k16_mono.wav` (10 s)
- `003_clicks_44k16_mono.wav` (10 s)

### Format matrix (`1_formats`)
- WAV:
  - 8k/11.025k/16k/22.05k/44.1k/48k/88.2k/96k
  - each at 8-bit, 16-bit, 24-bit mono
- AIFF:
  - 44.1k/48k/96k
  - each at 8/16/24-bit mono
- Stereo checks:
  - `stereo_left_tone_right_silence_44k16.wav`
  - `stereo_left_silence_right_tone_44k16.wav`
- RAW checks:
  - valid 16-bit 44.1k raw
  - invalid odd-byte-length raw

### Subdir assets (`2_subdirs`)
Structure:
- `2_subdirs/a_next/001.wav 002.wav 003.wav`
- `2_subdirs/b_plain.wav`
- `2_subdirs/c_random/ra.wav rb.wav rc.wav`
- `2_subdirs/d_nested_next/inner_next/01.wav 02.wav`

### Identical-length assets (`3_identical`)
- 8 files, all same sample rate and exact same frame count.

### Non-identical assets (`4_nonidentical`)
- 8 files with mixed lengths/sample rates.

### Edge assets (`6_edgecases`)
- Very short file (<20 ms)
- Very long file (>10 min)
- Filenames starting with `_` and `.`
- Unsupported extension files
- Corrupt WAV header file
- Corrupt AIFF header file

## 5.3 Settings profiles
Prepare these root settings profiles and swap as instructed by test IDs:
- `settings_base_default.txt`
- `settings_immediate_all.txt`
- `settings_latched_all.txt`
- `settings_radio_mode.txt`
- `settings_low_quality.txt`
- `settings_pulse_out.txt`

Before each block, copy required variant to root as `settings.txt`.

## 5.4 External test-file resources
Use these curated resources for additional controlled test material:
- Numbers and spoken prompts (pot/station range audibility checks):
  - https://evolution.voxeo.com/library/audio/prompts/numbers/index.jsp
- Sound On Sound audio test files (technical playback checks):
  - https://www.soundonsound.com/techniques/sos-audio-test-files

## 6. P0 tests (critical)
## P0-001 Boot with valid SD and playable banks
- Preconditions: Card A inserted, `0_core` present.
- Steps:
  1. Power on RM2.
  2. Observe LEDs during startup.
  3. Wait for stable playback-ready state.
- Expected:
  - No crash/reboot loop.
  - Startup completes within normal few seconds.
  - Device reaches playable mode.

## P0-002 No SD card handling
- Preconditions: no SD inserted.
- Steps:
  1. Power on.
  2. Observe LED pattern for 20 seconds.
  3. Insert valid SD while powered.
- Expected:
  - Distinct scanning/error pattern while no card.
  - On card insertion, firmware eventually mounts and becomes playable without manual reboot.

## P0-003 Mounted SD but no playable audio
- Preconditions: SD present with no valid bank audio.
- Steps:
  1. Power on.
  2. Observe LED pattern for 20 seconds.
- Expected:
  - Distinct "no files" scan pattern.
  - No crash.

## P0-004 Core playback audio path
- Preconditions: `0_core`, default settings.
- Steps:
  1. Select several stations via STATION pot.
  2. Trigger RESET repeatedly.
  3. Monitor output for continuity.
- Expected:
  - Audible playback for valid files.
  - No hard dropouts beyond expected retrigger/crossfade behavior.

## P0-005 Reset button deterministic retrigger
- Preconditions: one clearly transient file selected.
- Steps:
  1. Press RESET at regular intervals.
  2. Press RESET rapidly (~5-10 Hz finger speed).
- Expected:
  - Each press retriggers reliably.
  - No lockup or stuck silent state.

## P0-006 Reset jack input operation (`pulseMode=0`)
- Preconditions: `pulseMode=0`; external trigger source connected.
- Steps:
  1. Send single triggers.
  2. Send clock-rate triggers (e.g., 2-8 Hz).
- Expected:
  - Trigger input mirrors reset-button function.
  - No false double-triggering at moderate rates.

## P0-007 Reset jack output operation (`pulseMode!=0`)
- Preconditions: `pulseMode=4` in settings; scope or trigger destination connected.
- Steps:
  1. Power cycle to apply settings.
  2. Confirm reset jack no longer acts as reset input.
  3. Observe output pulses while sample loops.
- Expected:
  - Jack behaves as output.
  - Output pulses generated according to pulse mode.

## P0-008 SD removal during playback
- Preconditions: normal playback running.
- Steps:
  1. Remove SD card during active playback.
  2. Observe behavior for 15 seconds.
- Expected:
  - Firmware handles fatal read failure by controlled reboot path.
  - No permanent hang with undefined state.

## P0-009 Corrupt header reject behavior
- Preconditions: select known corrupt WAV/AIFF in scanned directory.
- Steps:
  1. Power on and scan banks.
  2. Traverse stations around corrupt assets.
- Expected:
  - Corrupt files are skipped/not counted as playable.
  - No crash during scan.

## P0-010 Boot special mode: USB mass storage entry
- Preconditions: valid SD inserted.
- Steps:
  1. Hold STATION pot switch during power-on.
  2. Connect module USB to host and check mount.
  3. Press RESET button.
- Expected:
  - Module appears as USB mass storage device.
  - RESET exits mode by rebooting to playback.

## P0-011 Boot special mode: calibration entry
- Steps:
  1. Hold START pot switch during power-on.
  2. Observe calibration LED workflow.
- Expected:
  - Calibration mode entered reliably.
  - No accidental fallback to normal mode.

## P0-012 Boot special mode: bootloader entry
- Steps:
  1. Hold RESET + both pot switches at power-on.
  2. Confirm RP2040 bootloader device appears on host.
- Expected:
  - Deterministic bootloader entry.

## 7. P1 tests (high)
## P1-001 Station selection coverage
- Preconditions: `0_core` with >4 files.
- Steps:
  1. Sweep STATION full range slowly.
  2. Sweep quickly.
- Expected:
  - Station mapping spans first-to-last file.
  - No unreachable files.

## P1-002 Station CV addition and clamp
- Preconditions: STATION CV source 0-5V.
- Steps:
  1. Set knob low, sweep CV.
  2. Set knob mid, sweep CV.
  3. Set knob high, sweep CV.
- Expected:
  - CV offsets station index.
  - Combined input clamps at range ends without wrap.

## P1-003 Start position behavior in start mode
- Preconditions: pitch mode off.
- Steps:
  1. Use long file with obvious transients.
  2. Move START pot and trigger RESET.
- Expected:
  - Start point changes according to setting.

## P1-004 Start/pitch toggle reliability
- Steps:
  1. Press START pot switch repeatedly.
  2. Confirm pitch LED/state response each time.
- Expected:
  - Clean toggle with no missed/double toggles.

## P1-005 Start CV behavior in start mode
- Preconditions: pitch mode off.
- Steps:
  1. Apply stepped CV values.
  2. Trigger RESET after each step.
- Expected:
  - Start position tracks CV steps correctly.

## P1-006 `stationPotImmediate` / `stationCVImmediate`
- Preconditions: run once with `0`, once with `1`.
- Steps:
  1. With immediate off: move station controls without reset.
  2. Then trigger RESET.
  3. Repeat with immediate on.
- Expected:
  - `0`: station change applies on reset only.
  - `1`: station updates immediately.

## P1-007 `startPotImmediate` / `startCVImmediate`
- Preconditions: Start mode, run each variant.
- Steps similar to P1-006.
- Expected:
  - Latch-vs-immediate behavior matches setting.

## P1-008 `pitchPotImmediate` / `pitchCVImmediate`
- Preconditions: Pitch mode, notes speed mode.
- Steps similar to P1-006.
- Expected:
  - Latch-vs-immediate behavior matches setting.

## P1-009 `startCVDivider` coarse/fine sweep
- Preconditions: compare divider values 1, 2, 8, 32, 128.
- Steps:
  1. Move START control slowly through range.
  2. Count audible start-position quantization steps.
- Expected:
  - Larger divider = coarser stepping.
  - No unstable jitter at high divider.

## P1-010 Bank select via STATION press-hold
- Preconditions: multiple non-empty banks.
- Steps:
  1. Hold STATION switch and rotate STATION.
  2. Release switch and verify selected bank persists.
- Expected:
  - Only valid non-empty banks selectable.
  - `last_bank.txt` updated after bank change.

## P1-011 Reset long-hold bank increment
- Steps:
  1. Hold RESET >0.6 s.
  2. Continue holding to observe repeated increments.
  3. Release.
- Expected:
  - Deterministic increment cadence.
  - Persist selected bank on release.

## P1-012 Root audio ignored
- Preconditions: put valid WAV in root plus valid bank files.
- Steps:
  1. Power on.
  2. Count stations in bank vs files physically present.
- Expected:
  - Root file not included in station pool.

## P1-013 Subfolder random behavior
- Preconditions: `2_subdirs/c_random` with clearly distinct files.
- Steps:
  1. Select subfolder entry station.
  2. Trigger RESET 20 times and log outcomes.
- Expected:
  - Randomized selection observed.

## P1-014 Subfolder sequential `next` behavior
- Preconditions: `a_next` contains 1/2/3 sequence.
- Steps:
  1. Select `a_next` station.
  2. Trigger RESET repeatedly and log order.
- Expected:
  - Sequence advances 1->2->3->1...

## P1-015 Nested subfolder recursion
- Preconditions: nested `d_nested_next` content.
- Steps:
  1. Select nested entry path station.
  2. RESET repeatedly.
- Expected:
  - Nested traversal works; no crash/hang.

## P1-016 `reselectSubdirOnStationChange`
- Preconditions: run with setting `0` then `1`.
- Steps:
  1. Move between stations including subdir stations without reset.
  2. Observe whether subdir child reselection occurs.
- Expected:
  - `0`: reselection only on reset.
  - `1`: reselection on station changes too.

## P1-017 Format acceptance matrix
- Preconditions: `1_formats` prepared.
- Steps:
  1. Verify each valid format appears playable.
  2. Verify invalid raw odd-byte file rejected.
- Expected:
  - Only supported formats play.

## P1-018 Stereo left-channel behavior
- Steps:
  1. Play `left tone / right silence` file.
  2. Play `left silence / right tone` file.
- Expected:
  - First file audible.
  - Second file near-silent (left channel selected).

## P1-019 `loopMode=0` none
- Steps:
  1. Use short file.
  2. Wait beyond file end.
- Expected:
  - Playback stops at end.

## P1-020 `loopMode=1` forward
- Steps:
  1. Use short file.
  2. Observe looping continuity.
- Expected:
  - Forward wrap looping.

## P1-021 `loopMode=2` ping-pong
- Steps:
  1. Use asymmetric transient file.
  2. Listen for direction reversal at boundaries.
- Expected:
  - Ping-pong boundary behavior.

## P1-022 `speedMode=0` tape
- Steps:
  1. Enter pitch mode.
  2. Sweep speed around zero including negative range.
- Expected:
  - Continuous speed change, including reverse where configured.

## P1-023 `speedMode=1` notes + quantization
- Steps:
  1. `quantisePitchPot=1` then `0`.
  2. Sweep pitch pot slowly.
- Expected:
  - Quantized semitone stepping when enabled.
  - Continuous cents behavior when disabled.

## P1-024 `speedMode=2` 90s mode
- Steps:
  1. Enter 90s mode and move pitch control.
  2. Listen for expected time-stretch character and periodic reseek behavior.
- Expected:
  - Distinct 90s-style artifact profile; no crash.

## P1-025 `tunerMode=0` switch
- Steps:
  1. Sweep station quickly.
- Expected:
  - Crossfaded switching between discrete stations.

## P1-026 `tunerMode=1` fade
- Steps:
  1. Sweep station slowly between adjacent files.
- Expected:
  - Continuous blend between neighbors.

## P1-027 `tunerMode=2` radio
- Steps:
  1. Sweep station slowly.
  2. Test with low/high `minRadioStationStrength`.
  3. Vary `noiseVol`, `whistleVol`, `ssbEffect`.
- Expected:
  - Noise/whistle/detune profile responds to settings.

## P1-028 `fadeMode`
- Steps:
  1. Compare `fadeMode=0` vs `1` on correlated material.
- Expected:
  - Audible difference in fade law.

## P1-029 `crossfadeTime`
- Steps:
  1. Set 5 ms, 25 ms, 100 ms.
  2. Station-switch and reset.
- Expected:
  - Transition duration increases with value.

## P1-030 `highQuality`
- Steps:
  1. Compare highQuality 1 vs 0 using bright material.
- Expected:
  - Clear quality-character difference.

## P1-031 `showMeter=1` VU
- Steps:
  1. Play low and high amplitude files.
- Expected:
  - LED activity roughly tracks signal level.

## P1-032 `showMeter=2` progress
- Steps:
  1. Play known-length loop file.
- Expected:
  - LEDs act as progress indicator.

## P1-033 `showMeter=0`
- Steps:
  1. Play files for 30 s with no bank-change actions.
- Expected:
  - Record actual behavior exactly (bank-static/blank/other) for spec reconciliation.

## P1-034 `meterHide`
- Steps:
  1. Set short (200), then long (3000).
  2. Perform bank change and measure visible bank-display hold time.
- Expected:
  - Duration changes with setting (record measured value).

## P1-035 Per-bank settings override
- Preconditions: global settings one way, bank-local settings opposite.
- Steps:
  1. Enter overridden bank; verify behavior.
  2. Leave bank; verify reversion to global.
- Expected:
  - Correct inheritance + override application.

## P1-036 Case/spacing/comment parsing in settings
- Steps:
  1. Use mixed-case and spaced key style.
  2. Use inline comments.
- Expected:
  - Parsing unaffected by case/spacing/comments.

## P1-037 Alias keys
- Steps:
  1. Use aliases: `declick`, `looping`, `chanPotImmediate`, `quantizePitchCV`.
- Expected:
  - Alias keys map correctly.

## P1-038 Unknown key tolerance
- Steps:
  1. Add unknown setting key.
- Expected:
  - Firmware ignores unknown key and continues normally.

## P1-039 START CV calibration success path
- Steps:
  1. Enter calibration mode.
  2. Supply stable octave-spaced notes across at least 2 octaves.
  3. Complete calibration.
  4. Power-cycle and retest.
- Expected:
  - Calibration completes with success indication.
  - Result persists after reboot.

## P1-040 START CV calibration failure path
- Steps:
  1. Enter calibration mode.
  2. Supply unstable/noisy CV.
  3. Exit calibration.
- Expected:
  - Failure indication (no invalid half-written state crash).

## 7A. Comprehensive settings and content compliance sweep
This block exists to guarantee broad functional coverage, not only ambiguity hunting.

## P1-041 Full sample-rate compliance sweep (WAV)
- Preconditions: `1_formats` includes one known-good WAV at every supported sample rate and fixed bit depth (16-bit mono).
- Steps:
  1. Play each sample-rate asset in ascending order: 8k, 11.025k, 16k, 22.05k, 44.1k, 48k, 88.2k, 96k.
  2. Trigger RESET at least once on each file.
- Expected:
  - All supported rates load and play.
  - No rate-specific crash/hang.

## P1-042 Full bit-depth compliance sweep (WAV/AIFF)
- Preconditions: For one rate (44.1k) prepare 8/16/24-bit WAV and AIFF files.
- Steps:
  1. Play each file and trigger RESET.
  2. Compare level/noise behavior quickly across depths.
- Expected:
  - 8/16/24-bit files are playable.
  - No parsing failure for valid files.

## P1-043 Unsupported-depth rejection (32-bit)
- Preconditions: Add 32-bit integer and/or float WAV/AIFF files.
- Steps:
  1. Boot and scan.
  2. Check whether unsupported files enter station pool.
- Expected:
  - Unsupported-depth files are excluded from playable list.
  - No crash during scan.

## P1-044 Bank-directory naming compliance
- Preconditions: Create root directories:
  - `0`, `00_valid`, `7 text`, `15-OK`, `16_invalid`, `x_invalid`, `_hiddenbank`.
- Steps:
  1. Boot and inspect selectable banks.
- Expected:
  - Only `0..15`-prefixed directories are treated as banks.
  - Invalid/non-numeric roots are ignored.

## P1-045 Hidden/ignored filename compliance
- Preconditions: Add files beginning with `_` and `.` in valid bank.
- Steps:
  1. Boot and count stations.
  2. Compare with visible valid file count.
- Expected:
  - Hidden/ignored prefixed files are excluded.

## P1-046 `loopMode` + `tunerMode` cross-combination sweep
- Preconditions: Use two banks, one with identical file lengths and one mixed.
- Steps:
  1. Test all 9 combinations of loopMode (0/1/2) x tunerMode (0/1/2).
  2. For each combination: station sweep + reset trigger + wait for file boundary.
- Expected:
  - No invalid mode combination causes lockup/crash.
  - Behavior remains musically coherent for each combination.

## P1-047 `speedMode` + pitch quantization combination sweep
- Steps:
  1. For each speed mode (0/1/2), test quantization combinations:
     - pot on / cv on
     - pot on / cv off
     - pot off / cv on
     - pot off / cv off
  2. Sweep knob and CV where applicable.
- Expected:
  - Settings apply as expected per mode.
  - No stuck pitch/speed state.

## P1-048 `pitchKnobMin`/`pitchKnobMax` boundary behavior
- Steps:
  1. Set `pitchKnobMin=-48`, `pitchKnobMax=24`.
  2. Verify full span.
  3. Invert values (`pitchKnobMin=12`, `pitchKnobMax=-12`) and observe behavior.
- Expected:
  - Boundaries clamp safely.
  - Inverted range does not crash; document resulting control direction.

## P1-049 Linear-speed range keys compliance
- Steps:
  1. Test `pitchKnobLinearSpeedMin/Max` with:
     - narrow range (-25, 25),
     - wide range (-400, 400),
     - asymmetric range (-50, 200).
  2. Repeat for `pitchCVLinearSpeedMin/Max`.
- Expected:
  - Knob/CV speed span follows configured ranges.
  - No overflow/glitch at extremes.

## P1-050 Pulse-mode complete sweep
- Steps:
  1. Test root `pulseMode` values: -16, -8, -4, -2, -1, 0, 1, 2, 4, 8, 16.
  2. For each value, verify:
     - reset jack direction (input/output),
     - pulse cadence relationship to loop length.
- Expected:
  - Direction and cadence match mode sign/magnitude.
  - No mode causes instability.

## P1-051 `minRadioStationStrength` and radio FX full sweep
- Steps:
  1. Set `tunerMode=2`.
  2. Test `minRadioStationStrength` at 0, 64, 128, 192, 256.
  3. For each, vary `noiseVol` and `whistleVol` at 0, 50, 100; toggle `ssbEffect`.
- Expected:
  - Parameter changes are audible and bounded.
  - No clipping-induced faults or silence lock.

## P1-052 Display and UI settings complete sweep
- Steps:
  1. Test `showMeter` values 0/1/2 with `meterHide` at 200 and 3000.
  2. Perform bank-change events by both methods (station-hold and reset-long-hold).
- Expected:
  - Display behavior is deterministic for each setting pair.
  - Bank change feedback remains understandable and stable.

## P1-053 Parsed-but-nonprimary key sweep
- Steps:
  1. Toggle `crossfade`, `mute`, `sort`, `noteCVRange`/`noteRange` one-at-a-time while holding other settings constant.
  2. Compare behavior and log any observable effects.
- Expected:
  - Firmware remains stable for all accepted keys.
  - Any observed/no-observed effect is documented explicitly.

## 8. P1 8mu integration tests
## P1-8MU-001 Plug and control acquisition
- Preconditions: 8mu default config bank 1.
- Steps:
  1. Connect 8mu to RM USB host.
  2. Move slider 1.
- Expected:
  - RM responds immediately.

## P1-8MU-002 Slider CC mapping validation
- Steps:
  1. Move each slider 1-8 independently.
  2. Confirm mapped behavior:
     - 1 pitch, 2 range, 3 loop start, 4 loop end, 5 speed type, 6 loop mode, 7 tuner mode, 8 pulse mode.
- Expected:
  - One-to-one mapping with no cross-coupling.

## P1-8MU-003 Button note mapping validation
- Steps:
  1. Press each 8mu button individually.
  2. Observe:
     - top pause,
     - button 2 reset,
     - button 3 motion hold,
     - button 4 pulse mult/div toggle.
- Expected:
  - Correct mapped actions.

## P1-8MU-004 Motion control path
- Steps:
  1. Hold motion-control button.
  2. Tilt/move 8mu.
- Expected:
  - Pitch/range modulation reacts only during hold.

## P1-8MU-005 Timeout/deactivation behavior
- Steps:
  1. Move a slider away from zero.
  2. Stop all interaction and disconnect 8mu.
  3. Observe RM behavior for 10+ seconds.
  4. Repeat with all sliders returned to zero first.
- Expected:
  - Document exact deactivation behavior; verify return-to-local-control condition.

## P1-8MU-006 Pulse output with 8mu loop region
- Preconditions: pulse mode active from slider 8.
- Steps:
  1. Set loop start/end to distinct values.
  2. Observe pulse timing vs custom loop region.
- Expected:
  - Pulse behavior tracks selected mode and region.

## P1-8MU-007 Loop start=end stress (`custom loop` + pulse)
- Preconditions: `pulseOutDividesCustomLoop=1`, pulse mode on.
- Steps:
  1. Set loop start equal to loop end.
  2. Observe stability for 60 s.
- Expected:
  - No crash/hard fault; record exact behavior.

## P1-8MU-008 Generic MIDI controller compatibility
- Steps:
  1. Send CC34-41 and notes 36/48/60/72 from non-8mu controller.
- Expected:
  - RM responds identically to mapped MIDI events.

## 9. P2 tests (medium)
## P2-001 Bank sparsity and wrap behavior
- Preconditions: only banks 0, 7, 15 populated.
- Steps:
  1. Cycle banks using both bank-select methods.
- Expected:
  - Empty banks skipped cleanly.

## P2-002 Filename ordering edge cases
- Preconditions: mix uppercase/lowercase/numeric prefixes.
- Steps:
  1. Verify playback order.
- Expected:
  - Lexicographic order exactly as parsed.

## P2-003 Large bank scan time
- Preconditions: near-max file count bank.
- Steps:
  1. Cold boot and measure scan/load readiness time.
- Expected:
  - Slow but stable startup; no watchdog reset.

## P2-004 Very long path and unicode names
- Preconditions: long/UTF filenames in valid banks.
- Steps:
  1. Boot and traverse station list.
- Expected:
  - No scan crash; playable files remain accessible.

## P2-005 High trigger-rate robustness
- Steps:
  1. Feed reset trigger at higher rates (10-30 Hz for short periods).
- Expected:
  - Graceful behavior (may drop triggers, but no lockup/crash).

## P2-006 Rapid station motion stress
- Steps:
  1. Sweep station knob/CV aggressively while audio plays.
- Expected:
  - No hangs, no runaway artifacts requiring reboot.

## P2-007 Mixed sample-rate bank transitions
- Preconditions: bank with alternating 11k/96k files.
- Steps:
  1. Sweep station continuously.
- Expected:
  - Stable transitions.

## P2-008 exFAT vs FAT32 parity
- Steps:
  1. Repeat P0-001..P1-020 subset on Card A (FAT32) and Card B (exFAT).
- Expected:
  - Functionally equivalent behavior.

## P2-009 `pulseMode` sign behavior from settings
- Preconditions: root settings with `pulseMode=4` then `pulseMode=-4`.
- Steps:
  1. Compare output pulse cadence.
- Expected:
  - Positive = multiply, negative = divide.

## P2-010 `pulseOutDividesCustomLoop`
- Preconditions: 8mu connected, custom loop active.
- Steps:
  1. Compare behavior with setting 0 vs 1.
- Expected:
  - `1` uses custom loop span; `0` uses whole file span.

## P2-011 Settings clamp/range boundaries
- Steps:
  1. Set out-of-range values (e.g., `whistleVol=999`, `startCVDivider=9999`, `pitchKnobMax=200`).
  2. Reboot and observe behavior.
- Expected:
  - Values clamp to safe range; no crash.

## P2-012 `sort` setting observability
- Preconditions: identical bank with `sort=0` then `sort=1`.
- Steps:
  1. Compare ordering.
- Expected:
  - Record whether behavior differs.

## P2-013 `crossfade`/`mute` key observability
- Steps:
  1. Toggle `crossfade` and `mute` keys while keeping other settings constant.
- Expected:
  - Record observed impact (if any) for implementation/spec reconciliation.

## P2-014 `noteCVRange` / `noteRange` observability
- Steps:
  1. Set extreme values and compare pitch CV span behavior.
- Expected:
  - Record whether behavior changes.

## P2-015 Power-cycle persistence
- Steps:
  1. Change bank and key settings.
  2. Power-cycle.
- Expected:
  - `last_bank.txt` persistence works.
  - settings reload correctly.

## P2-016 File-count limit behavior
- Preconditions: create a card image with approximately 800 valid files total.
- Steps:
  1. Boot and time scan completion.
  2. Verify playback in high-index stations across several banks.
- Expected:
  - Firmware stays stable near designed total-file limit.
  - No out-of-range station crash.

## P2-017 Directory-count limit behavior
- Preconditions: create many nested subdirectories approaching tracked-directory limit.
- Steps:
  1. Boot and scan.
  2. Exercise stations pointing to nested directory entries.
- Expected:
  - No scan crash or corrupted navigation state.
  - If limits are exceeded, failure mode is graceful (not hard fault).

## P2-018 Long-path/name-pool stress
- Preconditions: banks with long folder and filename paths designed to stress filename storage.
- Steps:
  1. Boot and traverse full station range.
  2. Trigger resets and bank switches.
- Expected:
  - No memory-corruption symptoms (random resets, impossible station jumps, frozen controls).

## 10. P3 tests (exploratory)
## P3-001 2-hour stability soak
- Steps:
  1. Run continuous playback with moderate control movement every few minutes.
- Expected:
  - No spontaneous reboot/lockup.

## P3-002 Overnight idle soak
- Steps:
  1. Leave powered in stable playback state overnight.
- Expected:
  - Wakes in same state; no latent failure.

## P3-003 Repeated hot-plug of 8mu
- Steps:
  1. Connect/disconnect 8mu 20+ times while audio active.
- Expected:
  - No cumulative instability.

## 11. Coverage matrix
This matrix ensures each subsystem element is tied to test IDs.

| Element | Covered by |
|---|---|
| Boot normal | P0-001 |
| Boot no SD | P0-002 |
| Boot no files | P0-003 |
| USB mass-storage boot mode | P0-010 |
| Calibration boot mode | P0-011, P1-039, P1-040 |
| Bootloader boot mode | P0-012 |
| Station pot | P1-001 |
| Station CV | P1-002 |
| Start pot | P1-003 |
| Start CV | P1-005, P1-039 |
| Start/pitch pot switch | P1-004 |
| Reset button short | P0-005 |
| Reset button long/bank step | P1-011 |
| Reset jack input | P0-006 |
| Reset jack output/pulse | P0-007, P2-009, P2-010 |
| Audio out continuity | P0-004 |
| LED meter/progress/bank display | P1-031..P1-034 |
| Bank select by station-hold | P1-010 |
| Bank persistence (`last_bank.txt`) | P1-010, P2-015 |
| Root settings parsing | P1-036, P1-037, P2-011 |
| Per-bank settings override | P1-035 |
| Subdir random | P1-013 |
| Subdir sequential `next` | P1-014 |
| Nested subdir recursion | P1-015 |
| Subdir reselection setting | P1-016 |
| Total file-count limit robustness | P2-016 |
| Directory-count limit robustness | P2-017 |
| Long path/name-pool robustness | P2-018 |
| WAV format matrix | P1-017 |
| AIFF format matrix | P1-017 |
| RAW valid/invalid | P1-017 |
| Stereo left-channel behavior | P1-018 |
| loopMode none/forward/pingpong | P1-019..P1-021 |
| speedMode tape/notes/90s | P1-022..P1-024 |
| tunerMode switch/fade/radio | P1-025..P1-027 |
| fadeMode | P1-028 |
| crossfadeTime | P1-029 |
| highQuality | P1-030 |
| showMeter/meterHide | P1-031..P1-034 |
| immediate/latched settings | P1-006..P1-008 |
| startCVDivider | P1-009 |
| radio params (`minRadioStationStrength`, `noiseVol`, `whistleVol`, `ssbEffect`) | P1-027 |
| pulseMode sign and jack behavior | P0-007, P2-009 |
| pulseOutDividesCustomLoop | P2-010 |
| sort setting behavior | P2-012 |
| crossfade/mute key behavior | P2-013 |
| noteCVRange/noteRange behavior | P2-014 |
| 8mu slider map | P1-8MU-002 |
| 8mu button map | P1-8MU-003 |
| 8mu motion map | P1-8MU-004 |
| 8mu timeout/deactivation | P1-8MU-005 |
| 8mu custom-loop pulse edge | P1-8MU-006, P1-8MU-007 |
| Generic MIDI compatibility | P1-8MU-008 |
| SD removal recovery | P0-008 |
| FAT32/exFAT parity | P2-008 |
| Stress/soak | P2-003..P2-007, P3-001..P3-003 |
| `settings.txt` case/spacing/comments | P1-036 |
| `settings.txt` aliases | P1-037 |
| Unknown setting tolerance | P1-038 |
| `crossfade` / `mute` | P1-053, P2-013 |
| `tunerMode` | P1-025, P1-026, P1-027, P1-046 |
| `minRadioStationStrength` | P1-027, P1-051 |
| `ssbEffect` | P1-027, P1-051 |
| `whistleVol` | P1-027, P1-051 |
| `noiseVol` | P1-027, P1-051 |
| `speedMode` | P1-022, P1-023, P1-024, P1-047 |
| `fadeMode` | P1-028, P1-046 |
| `pulseMode` | P0-007, P1-050, P2-009 |
| `declick` / `crossfadeTime` | P1-029 |
| `showMeter` | P1-031, P1-032, P1-033, P1-052 |
| `pulseOutDividesCustomLoop` | P1-8MU-006, P1-8MU-007, P2-010 |
| `reselectSubdirOnStationChange` | P1-016 |
| `meterHide` | P1-034, P1-052 |
| `chanPotImmediate` / `stationPotImmediate` | P1-006 |
| `chanCVImmediate` / `stationCVImmediate` | P1-006 |
| `startPotImmediate` | P1-007 |
| `startCVImmediate` | P1-007 |
| `pitchPotImmediate` | P1-008 |
| `pitchCVImmediate` | P1-008 |
| `startCVDivider` | P1-009 |
| `looping` / `loopMode` | P1-019, P1-020, P1-021, P1-046 |
| `sort` | P1-053, P2-012 |
| `highQuality` | P1-030 |
| `noteCVRange` / `noteRange` | P1-053, P2-014 |
| `pitchKnobMin` | P1-048 |
| `pitchKnobMax` | P1-048 |
| `pitchKnobLinearSpeedMin` | P1-049 |
| `pitchKnobLinearSpeedMax` | P1-049 |
| `pitchCVLinearSpeedMin` | P1-049 |
| `pitchCVLinearSpeedMax` | P1-049 |
| `quantisePitchCV` / `quantizePitchCV` | P1-023, P1-047 |
| `quantisePitchPot` / `quantizePitchPot` | P1-023, P1-047 |

## 12. Issue reporting template (quick form)
Use this block in each bug report:

```txt
Title: [RM2][TestID] Short defect summary
Firmware: <build id>
Hardware: <module rev + case PSU>
SD card: <brand/model/capacity/fs>
Settings snippet:
<exact relevant lines>

Repro steps:
1)
2)
3)

Expected:
<from test script>
Observed:
<exact behavior>
Frequency: always/intermittent (% estimate)
Regression?: unknown/yes/no
Attachments: video/audio/scope/screenshots
```

## 13. Wrapping up a full run
When you finish a full run, summarise:
- what was stable,
- what was inconsistent,
- what needs a tight repro for follow-up,
- what can wait for a later pass.

If something is unclear, add a short note describing exactly what you heard/saw and under which settings and file set.
