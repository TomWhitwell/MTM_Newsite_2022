# Product Page Template Notes

Most product pages use the `module` layout and live in `_devices/`.

The basic structure is still the old Music Thing format:

- a big headline: `N things to know about Product Name`
- an ordered list from `pars:`
- optional videos
- optional resources

The newer product-page furniture is controlled from the page front matter. The aim is to make a page feel more like a definitive product page without losing the simple list format.

## Minimal Page

For a simple page, this is enough:

```yaml
---
layout: module
permalink: /Product-Name/
title: "Browser title"
module-name: "Product Name"
designed: 2026
image: "/images/product.png"
wide-image: "true"
thonk-url: "https://www.thonk.co.uk/..."

pars:
- "First thing to know."
- "Second thing to know."
---
```

This produces the older-style page: headline, image, facts/links, buy link, then the numbered list.

## Buy Rail

Add `buy:` to get the newer grey side rail with the blue BUY button.

```yaml
buy:
  dealers_url: "/buy/#product-name"
  diy:
    label: "DIY kit"
    text: "Short text shown when the BUY menu opens."
    thonk_url: "https://www.thonk.co.uk/..."
    dealers: true
  assembled:
    label: "Assembled"
    text: "Short text shown when the BUY menu opens."
    thonk_url: "https://www.thonk.co.uk/..."
    dealers: true
```

Use only the paths that exist:

```yaml
buy:
  assembled:
    label: "Pre-assembled"
    text: "No soldering or construction required."
    thonk_url: "https://www.thonk.co.uk/..."
```

The small text in the BUY button is automatic:

- DIY only: uses the DIY `label`
- assembled only: uses the assembled `label`
- both: `DIY kit / assembled`

Override it like this:

```yaml
buy:
  microtext: "DIY kit / assembled"
```

Dealer links normally go to `dealers_url`. A path can also have its own `dealers_url`:

```yaml
buy:
  dealers_url: "/buy/"
  diy:
    label: "DIY kit"
    dealers_url: "/buy/#specific-product"
    dealers: true
```

## Product Summary

Add `product-summary:` to move the top facts into the side rail. This suppresses the normal top fact block under the headline.

```yaml
product-summary:
  auto_facts: true
  bullets:
    - "Desktop passive matrix mixer"
    - "Six bidirectional jacks"
    - "Pure gold touch surface"
```

With `auto_facts: true`, the summary automatically adds any of these if present:

- `size`
- `depth`
- `supply`
- `designed`
- `updated`

Custom bullets appear first. Auto facts appear at the bottom of the same list.

You can add a short intro, but use this sparingly:

```yaml
product-summary:
  intro: "One plain sentence, not marketing copy."
  bullets:
    - "Useful fact"
```

If you only want hand-written bullets:

```yaml
product-summary:
  auto_facts: false
  bullets:
    - "Useful fact"
```

By default, the summary appears above the image in the right rail. To put it below the rail image:

```yaml
product-summary-position: below-image
```

This only changes pages where the image is inside the rail. On `opening-image-full-width` pages there is no rail image, so the summary stays in the rail below the BUY button.

## Action Strip

Use `actions:` for useful next steps that should not be buried inside running text. BUY belongs in the side rail; this is for things like quick start guides, editors, setup pages, documentation, or firmware pages.

The strip appears before the numbered list.

```yaml
actions:
  enabled: true
  label: "Start here"
  items:
    -
      label: "Quick Start PDF"
      url: "/collateral/quickstart.pdf"
    -
      label: "Documentation"
      url: "/Documentation/"
    -
      label: "Launch Editor"
      url: "https://example.com/editor/"
```

To keep the data but hide the strip:

```yaml
actions:
  enabled: false
```

## Rail Images

By default, the rail uses `opening-image` if present, otherwise `image`.

```yaml
image: "/images/product-card.png"
opening-image: "/images/product-front.png"
```

### Standard Tall Module

Use the default for normal Eurorack panel images:

```yaml
image: "/images/mini-drive.png"
buy:
  diy:
    label: "DIY kit"
    thonk_url: "https://www.thonk.co.uk/..."
```

### Slightly Wider Image

For a wider object that still belongs in the rail:

```yaml
opening-image-wide: true
```

### Very Wide Image In The Rail

For Goldfinger / Easel Proto style images:

```yaml
opening-image: "/images/goldfinger-900.png"
opening-image-widest: true
opening-image-compact: true
```

`opening-image-widest` makes the rail wider on desktop.

`opening-image-compact` removes the tall reserved image space, so a landscape image does not float in a huge empty box.

### Full-Width Image

For very wide, shallow objects like Easel Clock, keep the buy/fact rail on the right but place the product image full-width below the intro:

```yaml
opening-image: "/images/easel-clock_900_L.png"
opening-image-full-width: true
```

This is better than rotating a product when the horizontal shape is important.

### Rotated Image

For 8mu, the front panel artwork is naturally landscape, but the object can work visually as a vertical product shot:

```yaml
opening-image: "/images/8mu_900.png"
opening-image-rotate: true
```

Use this only when rotation still makes the object understandable.

## Videos

Videos are added with `yt:` and appear as a compact horizontal carousel lower down the page. If there are more videos than fit, small chevrons appear for scrolling.

```yaml
yt:
- link: "youtube_id"
  title: "Short video title"
- link: "another_youtube_id"
  title: "Another short title"
```

If a page has the new buy rail, videos are also linked from the resources area rather than crowding the top of the page.

## Image Gallery

Image galleries are added with `gallery:` and appear as a compact horizontal carousel. If there are more images than fit, small chevrons appear for scrolling. Click an image to expand it in a simple lightbox.

```yaml
gallery:
  enabled: true
  title: "Images"
  images:
    -
      image: "/images/product-front.png"
      webp: "/images/product-front.webp"
      alt: "Product front panel"
      caption: "Front panel"
    -
      image: "/images/product-in-case.png"
      webp: "/images/product-in-case.webp"
      alt: "Product in a Eurorack case"
      caption: "In a case"
```

`image` is the normal PNG/JPEG path. `webp` is optional and is used by browsers that support it.

To keep the gallery data in place but hide it:

```yaml
gallery:
  enabled: false
```

## Resources

These fields are automatically picked up in the top fact block or the lower resources section:

```yaml
manual-url: "/collateral/manual.pdf"
manual-text: "Download Manual"
mgrid: "https://www.modulargrid.net/..."
github: "https://github.com/..."
schematic: "/collateral/schematic.pdf"
hide-design: "true"
```

Use `hide-design: "true"` for pages where design files and schematic request links do not make sense.

## Current Examples

8mu: rotated image with DIY buy rail.

```yaml
opening-image: "/images/8mu_900.png"
opening-image-rotate: true
buy:
  dealers_url: "/buy/#8mu"
  diy:
    label: "DIY kit"
    text: "Solder the faders, assemble the case, then set it up in the web editor."
    thonk_url: "https://www.thonk.co.uk/shop/music-thing-8mu/"
    dealers: true
product-summary:
  auto_facts: true
  bullets:
    - "81 x 47 x 13mm body"
    - "26mm high with fader caps and feet"
    - "65g"
```

Goldfinger: wide rail, compact image, assembled-only buy path.

```yaml
opening-image: "/images/goldfinger-900.png"
opening-image-widest: true
opening-image-compact: true
buy:
  assembled:
    label: "Pre-assembled"
    text: "No soldering or construction required."
    thonk_url: "https://www.thonk.co.uk/shop/goldfinger/"
```

Easel Clock: buy/facts rail plus full-width image.

```yaml
opening-image: "/images/easel-clock_900_L.png"
opening-image-full-width: true
buy:
  assembled:
    label: "Ready-assembled"
    text: "No build required."
    thonk_url: "https://www.thonk.co.uk/product-category/mtm-music-easel/"
```

## Testing

Run:

```sh
bundle exec jekyll build
```

For local testing on another device on the same Wi-Fi:

```sh
bundle exec jekyll serve --host 0.0.0.0 --port 4321 --livereload --livereload-ignore "sw.js"
```
