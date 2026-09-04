---

layout: documentation
output: false
page-name: "Radio Music Suggested Audio"
permalink: "/Radio_Music_Suggested_Audio/"
order: 3
title: "Radio Music Suggested Audio"
description: "Placeholder and implementation notes for the Radio Music suggested audio collection."

---

{% include linkedHeading.html heading="Radio Music Suggested Audio" level=1 %}

This page is a placeholder for the 2026 Radio Music suggested audio collection.

The current working project is:

`/Volumes/4TB External/Big Working/Radio Music Content 2026 remaster`

{% include linkedHeading.html heading="What exists now" level=2 %}

The remaster project already contains:

* `radio-music-sd-card/` - the clean SD-card payload.
* `metadata/files.json` and `metadata/files.csv` - per-file metadata.
* `metadata/banks.json` - bank names and file counts.
* `default-sound-set-web/` - a separate Jekyll preview site.
* `default-sound-set-web/_data/radio_music.yml` - full page, bank and track data.
* `default-sound-set-web/assets/radio-music/previews/` - MP3 preview paths.
* `default-sound-set-web/assets/radio-music/spectrograms/` - spectrogram image paths.
* `spectrogram-samples/` - selected visual examples and rendering notes.
* build and validation scripts in `tools/`.

The current collection has 229 WAV files in 16 banks, with a total duration of about 28 hours.

{% include linkedHeading.html heading="Recommended setup for this Jekyll site" level=2 %}

Do not commit the complete WAV audio payload into this website repository.

Instead, keep the editable audio project as the source of truth until launch, and generate a small web package from it:

1. Build the final SD-card ZIP from `radio-music-sd-card/`.
1. Upload that ZIP to the Cloudflare bucket.
1. Generate MP3 previews and spectrogram images from the final source files.
1. Copy only web assets into this site:
   * compressed MP3 previews
   * spectrogram PNG/WebP images
   * one generated data file, probably `_data/radio_music_audio.yml`
1. Point the download button on this page to the Cloudflare ZIP URL.

This means the audio can keep changing in the remaster project without turning the website repo into a heavy audio archive.

{% include linkedHeading.html heading="Suggested page furniture" level=2 %}

The finished page should probably have:

* A single prominent download button for the ZIP file.
* A rights warning near the top.
* A compact bank list.
* A preview section with one or two selected MP3 previews per bank.
* Spectrogram images for visual browsing.
* A complete expandable track list generated from data.

{% include linkedHeading.html heading="Data model" level=2 %}

The existing `default-sound-set-web/_data/radio_music.yml` is already close to the right shape. For this site, it should probably be generated into `_data/radio_music_audio.yml` with:

```yaml
download:
  label: "Download the Radio Music suggested audio ZIP"
  url: "https://example.cloudflare-r2-url/radio-music-suggested-audio.zip"
  size: "TBC"

page:
  file_count: 229
  bank_count: 16
  total_duration: "28 hr 0 min"

banks:
  - number: 0
    name: "Broadcast Radio"
    file_count: 19
    tracks:
      - sequence: "01"
        title: "Radio Mars - Casablanca"
        duration: "29:16"
        preview_mp3: "/assets/radio-music/previews/..."
        spectrogram: "/assets/radio-music/spectrograms/..."
        rights: "Unknown"
```

{% include linkedHeading.html heading="Banks in the current remaster" level=2 %}

| Bank | Name | Files |
|---|---:|---:|
| 0 | Broadcast Radio | 19 |
| 1 | Unusual Speech and Radio | 14 |
| 2 | Robotic and Scientific Speech | 15 |
| 3 | Ambient and Field Recordings | 10 |
| 4 | Melodic and Drone Sounds | 9 |
| 5 | Avant-Garde Music | 3 |
| 6 | Avant-Garde Voice and Song | 5 |
| 7 | Drum Loops | 21 |
| 8 | Hi-Fi Test Records | 8 |
| 9 | Voyager - Music from Earth | 28 |
| 10 | Voyager - Sounds and Greetings | 10 |
| 11 | Nagra Family Tape Loops | 22 |
| 12 | Gamelan Loops | 20 |
| 13 | Nianfo Chanting Machines | 19 |
| 14 | Guitar Phrases in A | 20 |
| 15 | Test Signals | 6 |

{% include linkedHeading.html heading="Rights and launch note" level=2 %}

The remaster project contains a strong warning: rights vary by file. Some material is public domain or Creative Commons, some is broadcast/commercial/unknown, and the metadata is not a legal clearance assessment.

Before launch, check the final page wording and decide whether the ZIP is:

* an official supplied sound set,
* a historical Radio Music archive,
* a user-downloadable research collection,
* or something more carefully caveated.

That decision affects both the page language and the Cloudflare bucket URL.

