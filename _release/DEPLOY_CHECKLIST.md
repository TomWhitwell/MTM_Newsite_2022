# Music Thing Modular Deploy Checklist

Use this after deploying the current Radio Music / 8mu work to `musicthing.co.uk`.

## Before Deploy

- [ ] Confirm the branch/diff only contains changes intended for this release.
- [ ] Confirm Workshop System experimental work is either removed from the release branch or safely hidden from the live site.
- [ ] Confirm old landing-page experiments are removed or not linked from anywhere public.
- [ ] Run a production build locally.
- [ ] Scan the build output for obvious missing pages, YAML errors, or asset errors.
- [ ] Confirm no large local MP3 preview files are being committed unless deliberately intended.

## Main Product URLs

- [ ] `https://www.musicthing.co.uk/Radio-Music/` loads the new Radio Music product page.
- [ ] `https://www.musicthing.co.uk/8mu/` loads the main 8mu product page.
- [ ] `https://www.musicthing.co.uk/8mu_docs/` loads the v1 8mu documentation page.
- [ ] `https://www.musicthing.co.uk/8mu_v2_docs/` loads the v2 8mu documentation page.
- [ ] `https://www.musicthing.co.uk/Radio-Music-v1/` still loads the retired mk1 Radio Music page, if intentionally kept.

## Redirects And Vanity URLs

- [ ] `https://www.musicthing.co.uk/Radio/` redirects to `/Radio-Music/`.
- [ ] `https://www.musicthing.co.uk/Radio` redirects sensibly.
- [ ] `https://www.musicthing.co.uk/RadioMusic/` redirects to `/Radio-Music/`.
- [ ] `https://www.musicthing.co.uk/RadioMusic` redirects sensibly.
- [ ] `https://www.musicthing.co.uk/8mu` resolves to the product page.
- [ ] `https://www.musicthing.co.uk/8mu/` resolves to the product page.
- [ ] `https://www.musicthing.co.uk/8mu.html` redirects to `/8mu/`.
- [ ] `https://www.musicthing.co.uk/8mu_page/` redirects to `/8mu/`.
- [ ] `https://www.musicthing.co.uk/8mu_page` redirects sensibly.

## Existing Manual Redirects

- [ ] `https://www.musicthing.co.uk/discord/` redirects to Discord.
- [ ] `https://www.musicthing.co.uk/newsletter/` redirects to the Workshop System Substack.
- [ ] `https://www.musicthing.co.uk/simulator/` redirects to the Patch Notes simulator.
- [ ] `https://www.musicthing.co.uk/buildvideo/` redirects to the expected YouTube build video.

## Radio Music Product Page

- [ ] Product image loads correctly.
- [ ] Side rail layout behaves properly on desktop.
- [ ] Side rail layout behaves properly on phone.
- [ ] Buy button expands correctly.
- [ ] DIY kit link goes to the intended shop page.
- [ ] Assembled link goes to the intended shop page, if enabled.
- [ ] Dealer link goes to the intended page.
- [ ] Quick Start action block links to the correct page.
- [ ] Suggested Audio action block links to the correct page.
- [ ] Image gallery loads and expands images cleanly.
- [ ] YouTube carousel loads, scrolls, and its arrows work.

## Radio Music Docs

- [ ] `https://www.musicthing.co.uk/Radio_Music_Build_Guide/` loads.
- [ ] `https://www.musicthing.co.uk/Radio_Music_Quick_Start/` loads.
- [ ] `https://www.musicthing.co.uk/Radio_Music_Reference/` loads.
- [ ] `https://www.musicthing.co.uk/Radio_Music_Suggested_Audio/` loads.
- [ ] `https://www.musicthing.co.uk/Radio_As_Instrument/` loads.
- [ ] Each Radio Music docs page has a clear link back to `/Radio-Music/`.
- [ ] The LED animations in the reference guide load.
- [ ] Long quoted sections on Radio As Instrument are readable and not visually shouty.

## Radio Music Audio

- [ ] Suggested Audio zip download works.
- [ ] MP3 preview buttons play audio.
- [ ] MP3 previews are loading from the Cloudflare bucket, not accidentally from local repo files.
- [ ] Spectrograms or visualisations load.
- [ ] The page still works if one preview fails to load.
- [ ] Browser console has no important errors from audio, images, or JavaScript.

## 8mu Product Page

- [ ] Product image loads correctly.
- [ ] Side rail layout behaves properly on desktop.
- [ ] Side rail layout behaves properly on phone.
- [ ] Buy button expands correctly.
- [ ] Documentation link goes to `/8mu_v2_docs/`.
- [ ] v1 documentation link goes to `/8mu_docs/`.
- [ ] Any firmware/update links point somewhere real.
- [ ] The page feels like the main product page, not old support material.

## Other Product Pages

- [ ] `https://www.musicthing.co.uk/Workshop-Computer/` still looks acceptable.
- [ ] `https://www.musicthing.co.uk/Startup/` still looks acceptable.
- [ ] `https://www.musicthing.co.uk/Mini-Drive/` still looks acceptable.
- [ ] `https://www.musicthing.co.uk/London-Drive/` still looks acceptable.
- [ ] `https://www.musicthing.co.uk/Goldfinger/` still looks acceptable.
- [ ] `https://www.musicthing.co.uk/Easel-Clock/` still looks acceptable.
- [ ] `https://www.musicthing.co.uk/Easel-Proto/` still looks acceptable.
- [ ] Pages not opted into the new side rail have not accidentally inherited it.

## Homepage And Navigation

- [ ] Homepage loads.
- [ ] Homepage product images load.
- [ ] Homepage Radio Music link points to `/Radio-Music/`.
- [ ] Homepage 8mu link points to `/8mu/`.
- [ ] Header navigation works.
- [ ] Buy page link works.
- [ ] About page link works.
- [ ] Talking & Writing link works.

## Mobile Checks

- [ ] Homepage on phone.
- [ ] Radio Music on phone.
- [ ] 8mu on phone.
- [ ] Suggested Audio on phone.
- [ ] Radio Music Reference on phone.
- [ ] Buy expansion on phone.
- [ ] YouTube and image carousels are usable with touch and arrows.

## SEO And Social Checks

- [ ] Radio Music canonical URL is `https://musicthing.co.uk/Radio-Music/`.
- [ ] 8mu canonical URL is `https://musicthing.co.uk/8mu/`.
- [ ] 8mu v2 docs canonical URL is `https://musicthing.co.uk/8mu_v2_docs/`.
- [ ] 8mu v1 docs canonical URL is `https://musicthing.co.uk/8mu_docs/`.
- [ ] Page titles and descriptions are acceptable for Radio Music.
- [ ] Page titles and descriptions are acceptable for 8mu.
- [ ] Social preview image for Radio Music is acceptable.
- [ ] Social preview image for 8mu is acceptable.

## Final Pass

- [ ] Run one broken-link check against the deployed site.
- [ ] Check browser console on the main changed pages.
- [ ] Check the deployed site from a phone on mobile data, not just local Wi-Fi.
- [ ] Keep a note of any URLs that should become Cloudflare 301 redirects later.
- [ ] Tag or note the deployed commit.
