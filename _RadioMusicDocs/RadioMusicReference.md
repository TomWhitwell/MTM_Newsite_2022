---

layout: documentation
output: false
page-name: "Radio Music Reference"
permalink: "/Radio_Music_Reference/"
order: 2
title: "Radio Music Reference Guide"
description: "Reference guide for Radio Music mk2 controls, SD card layout, settings, LEDs and firmware modes."
body_class: "documentation-page--compact"

---

{% include linkedHeading.html heading="Radio Music Reference Guide" level=1 %}

{% include linkedHeading.html heading="What Radio Music is" level=2 %}

Radio Music is a 4HP Eurorack sample playback module. It plays audio files from a microSD card, but behaves a bit like a radio: the STATION control moves between files, and in the default mode files keep advancing in the background even when they are not selected.

Radio Music mk2 is a completely revised version of the original 2014 Radio Music with new hardware and firmware. It adds Radio Remote support, higher quality playback, lower latency, larger SD card support, more playback modes, a calibrated 1V/oct pitch input, and no longer depends on the Teensy 3.2.

{% include linkedHeading.html heading="Front panel controls" level=2 %}

<figure class="documentation-image">
  <img src="/images/radio-music-docs/quickstart.svg" alt="Radio Music quick start diagram" style="width: 100%;">
  <figcaption style="text-align: center;">Radio Music front panel controls</figcaption>
</figure>

{% include linkedHeading.html heading="STATION knob and CV" level=3 %}

The STATION knob chooses the current station: normally an audio file within the selected bank. The STATION CV input can also choose stations.

Hold the STATION knob and turn it to choose a bank from 0 to 15. While a bank is being chosen, the four top LEDs show the bank number in binary.

{% include linkedHeading.html heading="START knob and CV" level=3 %}

In the default start mode, the START knob sets the point where the sample begins when it is reset. The START CV input can add voltage control over that start position.

Tap the START knob to enter pitch mode. In pitch mode, the same knob and CV input control playback speed and direction.

{% include linkedHeading.html heading="RESET button and jack" level=3 %}

The RESET button restarts the current sample. The RESET jack is normally an input that does the same thing from a rising trigger or gate.

The RESET jack can also be changed into a pulse output using `pulseMode`.

{% include linkedHeading.html heading="Radio Remote" level=2 %}

<figure class="documentation-image">
  <img src="/images/radio-music-docs/quickstart_rr.svg" alt="Radio Remote quick start diagram" style="width: 100%;">
  <figcaption style="text-align: center;">Radio Remote controls</figcaption>
</figure>

Radio Remote is a Music Thing Modular 8mu with a Radio Remote panel and firmware. It connects to Radio Music using USB-C.

When Radio Remote is plugged in, the START/PITCH knob on Radio Music is ignored. The Remote takes over the performance controls and makes several settings playable without editing `settings.txt`.

The top four sliders are performance controls:

* SPEED
* SPEED range
* START
* END

The bottom four sliders control settings:

* Speed mode
* Loop mode
* Tuner mode
* Pulse mode

Moving all sliders fully left puts Radio Remote in its default position. The left-most setting labels on the bottom four sliders mean "use the value from the settings file".

{% include linkedHeading.html heading="Speed controls" level=3 %}

The top two Radio Remote sliders control playback speed. The top slider sets speed. The second slider sets the speed range.

Speed range options:

* OFF: play at original speed.
* FINE: plus or minus one semitone.
* +/-1: -1x to +1x in tape mode, or -1 to +1 octave in notes mode.
* +/-2: -2x to +2x in tape mode, or -2 to +2 octaves in notes mode.

In 90s mode, pitch and sample advance rate are controlled separately. The top slider controls advance rate. The range slider becomes pitch.

The pause button between the two speed sliders pauses audio. In tape mode, this behaves like a tape stop/start. In notes mode, audio stops immediately. In 90s mode, the advance rate freezes while the sample continues to play.

The motion button can map the orientation and acceleration of Radio Remote to pitch control, or to pitch and advance rate in 90s mode.

{% include linkedHeading.html heading="Loop controls" level=3 %}

The START and END sliders set a loop window. If START is fully left and END is at either edge, or if START and END match exactly, the whole sample plays. For long files, it is often hard to set the sliders close enough to capture a short loop. 

If START is to the right of END, playback is reversed.

The RESET button between the START and END sliders restarts the sample from the selected loop point. If that button is held while the START slider is moved, playback scrubs audibly through the sample.

{% include linkedHeading.html heading="Mode controls" level=2 %}

{% include linkedHeading.html heading="Speed mode" level=3 %}

`speedMode` sets the way pitch and speed behave:

* `0`: tape mode. Linear speed control, including reverse playback through zero.
* `1`: notes mode. Exponential pitch control, by default quantised to semitones.
* `2`: 90s mode. Lo-fi timestretch-style playback where pitch and advance rate can separate.

90s speed mode is not available in soft or radio tuner modes.

{% include linkedHeading.html heading="Loop mode" level=3 %}

`loopMode` sets what happens at the end of a file:

* `0`: no loop. Playback stops at the end of the file and waits for a reset, station change or bank change.
* `1`: standard looping. This is the default.
* `2`: ping-pong looping, alternating forwards and backwards.

{% include linkedHeading.html heading="Tuner mode" level=3 %}

`tunerMode` sets how Radio Music moves between stations:

* `0`: sharp mode. A single station is selected, with short crossfades between stations.
* `1`: soft mode. The control fades continuously between adjacent stations, so two samples can play at once.
* `2`: radio mode. Analogue radio-style tuning, with stations appearing at particular positions and noise between them.

Sharp mode is the standard Radio Music behaviour and the mode most settings are designed around.

{% include linkedHeading.html heading="Pulse mode" level=3 %}

`pulseMode` changes the RESET jack:

* `0`: RESET is an input. This is the default.
* Positive values: RESET becomes a pulse output, producing that number of pulses during one file playback.
* Negative values: RESET becomes a divided pulse output, producing one pulse every N loops.

Pulse outputs are not available in soft or radio tuner modes.

`pulseOutDividesCustomLoop = 1` makes the pulse output follow the START/END loop window set by Radio Remote. `0` makes it divide the whole file length.

{% include linkedHeading.html heading="microSD cards" level=2 %}

Radio Music stores samples on a microSD card.

Supported card types:

* SDHC cards up to 32GB, formatted FAT32.
* SDXC cards up to 2TB, formatted exFAT.
* MBR boot record.

Unsupported card types:

* Very old SDSC cards up to 2GB.
* SDUC cards above 2TB.
* GPT partitioned cards.

Use a good quality branded card from a reputable supplier. Testing has included SanDisk Ultra, Kingston and Silicon Power cards.

{% include linkedHeading.html heading="Audio files" level=2 %}

Supported audio formats:

* WAV: `.wav`, uncompressed PCM, 8/11/16/22/44.1/48/88.2/96kHz, 8/16/24-bit, mono or stereo.
* AIFF: `.aif` or `.aiff`, uncompressed, 8/11/16/22/44.1/48/88.2/96kHz, 8/16/24-bit, mono or stereo.
* RAW: `.raw`, interpreted as 44.1kHz, 16-bit mono, as used by the original Radio Music.

If a stereo file is used, the left channel is played.

{% include linkedHeading.html heading="Banks and folders" level=2 %}

The simplest card contains audio files in the root directory. This creates one bank.

<figure class="documentation-image">
  <img src="/images/radio-music-docs/nobanks.svg" alt="Single bank SD card diagram" style="width: 100%;">
  <figcaption style="text-align: center;">Single bank SD card layout</figcaption>
</figure>

For multiple banks, create folders in the root of the card with names starting from `0` to `15`.

Valid bank folder names include:

* `0`
* `05 shortwave`
* `15 - Koto plucks`

<figure class="documentation-image">
  <img src="/images/radio-music-docs/banks.svg" alt="Multiple bank SD card diagram" style="width: 100%;">
  <figcaption style="text-align: center;">Multiple bank SD card layout</figcaption>
</figure>

Limits:

* Up to 16 banks.
* Up to 250 audio files in one bank.
* Up to 800 audio files on the card.
* Up to 64 folders.
* Total path length across all indexed files is limited to 80,000 characters.

If any numbered bank folders are present, audio files in the root directory are ignored.

Files and folders are sorted lexicographically. Prefix numbers with zeros if you want numerical order: `02` sorts before `11`.

Radio Music ignores files starting with `.` or `_`, files without supported audio extensions, and root-level folders that do not start with a number from 0 to 15.

{% include linkedHeading.html heading="Subfolders" level=2 %}

Bank folders can contain subfolders. There are two behaviours:

* Sequential subfolders: names ending in `next`.
* Random subfolders: any other folder name.

In a `next` folder, files are stepped through in order each time the folder is triggered. In any other subfolder, Radio Music chooses a random file.

Subfolders can be nested.

<figure class="documentation-image">
  <img src="/images/radio-music-docs/next_subfolder.svg" alt="Next subfolder SD card diagram" style="width: 100%;">
  <figcaption style="text-align: center;">Sequential subfolder example</figcaption>
</figure>

For one-shot sample banks using subfolders, useful settings are:

```text
loopMode = 0
stationPotImmediate = 0
stationCVImmediate = 0
```

{% include linkedHeading.html heading="Skipping resets" level=2 %}

If the last characters in a filename before the extension are `skipN`, where `N` is a number from 1 to 255, the next `N` reset signals are ignored while that file is playing.

For example, a file ending `skip1.wav` ignores the next reset after it starts.

<figure class="documentation-image">
  <img src="/images/radio-music-docs/skip.svg" alt="Skip reset filename example" style="width: 100%;">
  <figcaption style="text-align: center;">Skipping reset pulses with a filename</figcaption>
</figure>

{% include linkedHeading.html heading="settings.txt" level=2 %}

On startup, or when a new SD card is inserted, Radio Music looks for `settings.txt` in the root folder of the card. If it does not exist, the module creates one with default settings.

Each bank can also have its own `settings.txt` inside the bank folder. Bank settings inherit from the root settings file, so a bank-specific file often needs only the few settings that are different.

Settings lines use this format:

```text
settingName = value
```

Notes:

* Values are whole numbers.
* Text after `#` is ignored as a comment.
* Whitespace is ignored.
* Setting names are not case-sensitive.
* The format is backwards compatible with settings files from the original Radio Music firmware.

This:

```text
Start Pot immediate = 1  # start knob scrubs through sample
```

does the same as this:

```text
STARTPOTIMMEDIATE=1
```

{% include linkedHeading.html heading="Common settings" level=3 %}

| Setting | Values |
|---|---|
| `tunerMode` | `0` sharp, `1` soft, `2` radio |
| `loopMode` | `0` off, `1` forward loop, `2` ping-pong |
| `speedMode` | `0` tape, `1` notes, `2` 90s |
| `pulseMode` | `0` reset input, positive values multiply, negative values divide |
| `crossfadeTime` | Crossfade time in milliseconds. Default `25` |
| `fadeMode` | `0` constant power, `1` linear |
| `showMeter` | `0` bank number, `1` VU meter, `2` sample progress |
| `meterHide` | Time in ms to show bank number after bank change. Default `2000` |
| `highQuality` | `0` low quality, `1` 24-bit/96kHz cubic interpolation |
| `radioStart` | `0` reset on station change, `1` radio-style background advance |

{% include linkedHeading.html heading="Immediate response settings" level=3 %}

These decide whether controls take effect immediately, or wait until RESET.

| Setting | Default |
|---|---|
| `stationPotImmediate` | `1` |
| `stationCVImmediate` | `1` |
| `startPotImmediate` | `0` |
| `startCVImmediate` | `0` |
| `pitchPotImmediate` | `1` |
| `pitchCVImmediate` | `1` |

{% include linkedHeading.html heading="Pitch and speed settings" level=3 %}

| Setting | Meaning |
|---|---|
| `pitchKnobLinearSpeedMin` / `pitchKnobLinearSpeedMax` | Tape and 90s mode speed range from the knob, in percent of original speed. Default `-100` to `100` |
| `pitchCVLinearSpeedMin` / `pitchCVLinearSpeedMax` | Tape and 90s mode speed range from CV, in percent of original speed. Default `-100` to `100` |
| `pitchKnobMin` / `pitchKnobMax` | Notes mode knob range in semitones. Default `-12` to `12` |
| `quantisePitchPot` | Quantise pitch knob in notes mode |
| `quantisePitchCV` | Quantise pitch CV in notes mode |
| `startCVDivider` | Quantises start positions. Default `2`, giving 512 steps |

{% include linkedHeading.html heading="Radio tuner settings" level=3 %}

| Setting | Meaning |
|---|---|
| `minRadioStationStrength` | Minimum strength of distant signals in radio mode. Range `0` to `256`, default `128` |
| `ssbEffect` | Approximate single side band pitch shift effect. `0` off, `1` on |
| `whistleVol` | Heterodyne whistle level, `0` to `100`, default `50` |
| `noiseVol` | Background noise level, `0` to `100`, default `50` |

{% include linkedHeading.html heading="LED indicators" level=2 %}

Radio Music uses the row of four front-panel LEDs to show what the module is doing.

There are two more LEDs elsewhere on the panel:

- The RESET LED, next to the RESET button, flashes briefly on each reset and pulses slowly when playback is stopped.
- The PITCH LED, next to the START knob, is lit when the module is in pitch mode and flickers during CV calibration.

The animations below show the four main LEDs.

{% include linkedHeading.html heading="Normal playback" level=3 %}

| LED pattern | Meaning |
|---|---|
| ![VU meter LED animation](/images/radio-music-docs/led_vu_meter_analog.png) | **VU meter.** A bargraph of the audio output level. This is the default display during playback. When `highQuality` is disabled in `settings.txt`, the VU meter is more digital in appearance to reflect the downgraded sound quality. |
| ![Sample progress LED animation](/images/radio-music-docs/led_progress_through_sample.png) | **Sample progress bar.** When `showMeter` is set to `2`, the LEDs show how far playback is through the current sample. |
| ![Bank display LED animation](/images/radio-music-docs/led_bank_display.png) | **Bank number.** Shown in binary, with LEDs meaning 8, 4, 2, 1 from left to right, while a new bank is being selected. This can happen by holding the STATION knob and turning, or by long-pressing RESET. The display reverts to the VU meter after a short delay set by `meterHide`. |

{% include linkedHeading.html heading="Startup and SD card" level=3 %}

| LED pattern | Meaning |
|---|---|
| ![No SD card LED animation](/images/radio-music-docs/led_scan_no_sd.png) | **No SD card detected.** A single LED cycles slowly along the row while the firmware waits for a card to be inserted. Insert or reseat the card to continue. |
| ![No files LED animation](/images/radio-music-docs/led_scan_no_files.png) | **SD card mounted, but no audio files found.** The same single-LED cycle, running about twice as fast. Check that the card contains valid `.wav`, `.aif`, `.aiff` or `.raw` files, either in the root directory or in numbered bank folders. |
| ![File scanner LED animation](/images/radio-music-docs/led_file_scanner.png) | **Scanning the SD card.** Shown while the firmware counts folders and audio files. With large numbers of files on a slow card this can take several seconds. Usually it flashes by too fast to see. |
| ![File index LED animation](/images/radio-music-docs/led_bar_right.png) | **Building file index.** A right-to-left fill that shows progress while the file index is built. This is a one-off step done on first power-up with an SD card. |

{% include linkedHeading.html heading="CV calibration" level=3 %}

CV calibration mode is entered by holding the START knob while powering up. The module asks you to play a series of 1V/octave reference pitches into the START CV input.

| LED pattern | Meaning |
|---|---|
| ![Calibration entry LED animation](/images/radio-music-docs/led_calibration_mode.png) | **Entering calibration.** All four LEDs flash on and off for two seconds to confirm that the module is in calibration mode. After this the LEDs go dark, then light up one at a time as each octave is successfully captured. |
| ![Calibration success LED animation](/images/radio-music-docs/led_calibration_success.png) | **Calibration succeeded.** The same all-LED flash sequence is played after an accurate calibration has been detected. The result is written to flash and the module reboots into normal playback. |
| ![Calibration failed LED animation](/images/radio-music-docs/led_calibration_fail.png) | **Calibration failed.** The four LEDs fade smoothly from full brightness to off. The calibration error was too large, so no calibration data was saved. The previous calibration is retained. Try again, taking care that the START CV input is fed a stable 1V/octave signal. |

{% include linkedHeading.html heading="Errors" level=3 %}

| LED pattern | Meaning |
|---|---|
| ![Watchdog reboot LED animation](/images/radio-music-docs/led_watchdog_reboot.png) | **Recovered from a crash.** Shown for about two seconds on boot if the firmware crashed and has reset. If this animation ever appears, please report it. |

{% include linkedHeading.html heading="1V/oct calibration" level=2 %}

The START CV input can be calibrated for accurate 1V/oct response in notes mode.

You need a trusted voltage source that can output steady voltages in the 0-5V range.

1. Enter calibration mode by holding START while powering up, or by holding START while removing and reinserting the SD card.
1. The four LEDs flash to confirm calibration mode.
1. Patch a 1V/oct source into START CV.
1. Play the same note across several octaves.
1. Each accepted octave lights one LED.
1. Calibration needs at least two accepted notes.
1. Press RESET to finish, or continue until all five octave ranges have been captured.

If calibration is successful, the result is saved and survives power-off.

If calibration fails, try a different starting note, or calibrate across fewer octaves.

{% include linkedHeading.html heading="SD card reader mode" level=2 %}

Radio Music can act as a slow SD card reader. This is useful for editing `settings.txt`, previewing short audio files and rearranging banks. It is not a good way to copy a whole sample library.

1. Hold STATION while powering up, or hold STATION while removing and reinserting the SD card.
1. Connect Radio Music to a computer with a USB cable.
1. The SD card should appear as a drive.
1. When finished, unmount the drive, unplug USB, then press RESET to return to normal operation.

{% include linkedHeading.html heading="Firmware version and update mode" level=2 %}

To display the firmware version, hold RESET while powering up or while removing a working SD card. While holding RESET, turn STATION fully left, centre and fully right to select the first, second or third part of the version number. The version is shown in binary on the four LEDs.

To enter firmware update mode:

1. Enter firmware version display mode.
1. Keep holding RESET.
1. Press both STATION and START knobs.
1. Connect a computer to the front-panel USB socket.
1. A drive called `RPI-RP2` should appear.
1. Drag the Radio Music `.uf2` firmware file onto the drive.
