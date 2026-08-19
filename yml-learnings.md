# Program Card YAML Learnings

Notes from building the first Music Thing `Program Cards` discovery and card-detail pages.

The main lesson: the website can produce good pages from YAML, but only if the YAML separates four different jobs:

- discovery text: why someone might want to try the card
- use-sheet text: how to patch and operate the card
- long documentation: fuller README/manual material
- community/contact links: where users ask questions, thank designers, report problems, or discuss remixes

## Recommended Top-Level Fields

```yaml
id: 20_reverb
number: "20"
title: "Reverb+"
summary: "Reverb effect, plus pulse/CV generators and MIDI-to-CV."
description: "A slightly longer discovery description, one or two sentences."
status: "Released"
version: "1.5"
creator:
  name: "Chris Johnson"
  url: ""
source_url: "https://github.com/TomWhitwell/Workshop_Computer/tree/main/releases/20_reverb"
editor_url: "https://www.musicthing.co.uk/web_config/reverb.html"
download_url: "https://github.com/.../reverb.uf2"
readme_url: "https://github.com/.../README.md"
discussion_url: "https://discord.com/channels/1210238368898879569/1484231452697694401"
```

`summary` should be short enough for archive rows and shelf cards. `description` can be a little fuller, but should still be discovery copy rather than the whole README.

If `discussion_url` is missing, the site should use the master Workshop Computer Discord thread:

`https://discord.com/channels/1210238368898879569/1484219323039092938`

## Quick Start

Quick Start should be optional. If the field is absent, the website should not invent generic instructions.

```yaml
quick_start:
  - "Flash the card, then patch Audio Out 1 and 2 to the mixer."
  - "Start with Main, X and Y near noon."
  - "Use the Z switch to change modes; the LEDs show the selected state."
```

Aim for three short steps. This is for “I just flashed it, what now?”, not a full manual.

## Videos

Videos should be first-class metadata, not scraped from README text at render time.

```yaml
videos:
  - title: "Knots overview"
    provider: "youtube"
    id: "mE8FjwyQ3GQ"
    url: "https://youtu.be/mE8FjwyQ3GQ"
    role: "overview"
    featured: true
```

Recommended roles:

- `overview`: explains the whole card
- `demo`: musical demo
- `tutorial`: practical walkthrough
- `build`: developer/build notes

The site can use the first `featured: true` video near the top of a card page, and use video thumbnails to make discovery shelves more visual.

Avoid embedding YouTube iframes directly on discovery pages. Use thumbnails there; embed or link on card detail pages.

## Panel Mapping

Panel mapping needs musical labels and practical descriptions. Code-derived labels like `Audio 1`, `CV 2`, `main`, `x`, or `Pulse 1` are not enough unless that is genuinely what the user should see.

Recommended structure:

```yaml
panel:
  controls:
    main:
      label: "Mutation / Lock"
      description: "Centre keeps changing; either end settles into a loop or its inverted partner."
    x:
      label: "Length"
      description: "Chooses loop length: 2, 3, 4, 5, 6, 8, 12 or 16 steps."
    y:
      label: "Diviply"
      description: "Sets Channel 2 clock divide/multiply."
    z:
      label: "Presets / Tap"
      description: "Up and middle select presets; momentary down taps tempo."
```

Inputs and outputs should use the physical panel keys, but the labels should describe card behaviour:

```yaml
  inputs:
    pulse_1:
      label: "Clock 1"
      description: "External main clock; replaces tap tempo."
  outputs:
    cv_out_1:
      label: "Pitch 1"
      description: "Channel 1 quantised 1V/oct pitch."
```

If a control/socket is not mapped, omit it. Do not write `unused`.

## Switch Modes

The Z switch is often a mode system, not just three labels. Keep the simple form for basic cards:

```yaml
switch_modes:
  up: "Preset B"
  middle: "Preset A"
  down: "Tap tempo"
```

For complex cards, allow richer mode descriptions:

```yaml
modes:
  - name: "Play"
    switch: "up"
    controls:
      main: "Tempo"
      x: "Sequence length"
      y: "VCO 2 pitch offset"
    leds: "Playback step"
```

This avoids flattening a whole mode table into one unreadable label.

## LEDs

LEDs need grouped meanings, not necessarily one label per LED.

```yaml
leds:
  groups:
    - label: "Turing values"
      leds: [1, 2, 3, 4]
      description: "Top four LEDs show the current raw and quantised Turing streams."
    - label: "Pulse outputs"
      leds: [5, 6]
      description: "Bottom pair flash with Pulse Outs 1 and 2."
```

Some cards use the LEDs as one bar chart, two bar charts, a selected engine indicator, step encoding, output voltage display, or transition animation. The schema should support those group-level explanations.

## Card Memory

Memory requirements should be factual card data, not editorial tags/flairs. If a card requires or optionally supports a 16MB blank, use a structured field:

```yaml
memory:
  size: "16mb"
  requirement: "required" # or "optional"
```

If there is no special memory requirement, omit the field. The website can display this near the download action and in the card facts.

## Documentation / README Material

READMEs vary from 6-word placeholders to 3,600-word manuals. The website should not render every README the same way.

Recommended structure:

```yaml
documentation:
  intro: "Optional short intro paragraph, if different from description."
  sections:
    - title: "Concept"
      body: |
        Think of a potter's wheel. The loop is the spinning wheel...
    - title: "Controls"
      body: |
        Longer Markdown section copied or adapted from the README.
  external_docs:
    - title: "Full README"
      url: "https://github.com/..."
```

Front-end recommendation:

- Top of page: title, summary, video if present, primary actions, optional Quick Start.
- Middle: panel image and practical reference for controls, sockets, switch, LEDs.
- Lower page: richer documentation/manual sections.
- Bottom: source, version, data sources, discussion/contact links.

Long essays should be preserved, but below the practical use-sheet material. Very long docs may be split into named sections or rendered in collapsible/manual blocks.

## Contact / Discussion

There should be a place for a card-specific discussion/contact link.

```yaml
discussion_url: "https://discord.com/channels/..."
creator:
  name: "Designer Name"
  contact_url: "https://example.com"
```

This is broader than “feedback”. Users may want to ask for help, thank the designer, discuss a remix, report a problem, or make a collaboration connection.

## Generated vs Curated

Generated YAML should identify confidence and source so moderators know what to fix.

```yaml
generated:
  updated_at: "2026-06-10"
  method: "readme-and-code-scan"
  confidence: "needs_review"
  warnings:
    - "Control labels were inferred from code symbols."
```

Field-level `source` is also useful for panel mapping:

```yaml
source: "readme" # or "code", "curated", "llm"
```

Code can tell us which socket is used; it usually cannot produce the best user-facing label without README/context/human review.

## Page Hierarchy Notes

The primary action on a card page should be `Download`, with firmware version shown as secondary text inside or next to that action. `Launch web editor` should be a separate high-priority action when an editor exists, with a short explanatory note such as "Configure scales and options in your browser".

`Read more` should link to the README. `Source` and generated data sources should be lower-priority footer/fact-box material. Data sources should stay small on the page, ideally hidden behind a disclosure or popup.
