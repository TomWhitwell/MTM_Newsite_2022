# Workshop System Page Structure

`/workshopsystem/` uses the `system_product` layout. The page is split into two parts:

- The front matter at the top of `_devices/workshop_system.md` holds the structured product-page furniture: hero image, intro, buy paths, action links, guide links, videos and image gallery.
- The Markdown body underneath the front matter holds the long-form article copy: the story, context, contents list and FAQ.

This keeps the page consistent with the rest of the site: everything for this page lives in `_devices/workshop_system.md`, with structured data above and writing below.

## Data Sections

`hero`
: The main product image at the top of the page. Use `image`, optional `webp`, `alt`, `width` and `height`.

`intro`
: One or more short paragraphs shown directly under the title.

`buy.paths`
: Buy options such as `DIY kit` and `Assembled`. Each path can have a short `text` line and a list of `dealers`.

`actions`
: The compact "Start here" strip. Use this for the most important next actions only.

`docs`
: The guide/resource grid. This is for useful but lower-pressure links.

`videos`
: YouTube carousel items. Set `link` to the YouTube video ID.

`gallery`
: Click-to-expand image carousel. Set `enabled: false` to hide it.
