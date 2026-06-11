---
layout: default
title: Program Card YAML Preview
permalink: /workshopsystem/program-cards/dev/card-yaml-preview/
hide: true
noindex: true
sitemap:
  exclude: "yes"
---

<div class="program-cards program-card-preview-tool" data-preview-mode="split" id="card-yaml-preview">
  <header class="program-card-preview-tool__header">
    <div>
      <h1>Program Card YAML Preview</h1>
      <p>Paste or edit one program card YAML file. The preview updates in the browser only; nothing is saved.</p>
    </div>
    <div class="program-card-preview-tool__control">
      <label for="card-preview-select">Load existing card</label>
      <select id="card-preview-select" data-card-select></select>
    </div>
  </header>

  <div class="program-card-preview-tool__tabs" aria-label="Preview tabs">
    <button type="button" class="is-active" data-preview-tab="split">Edit + preview</button>
    <button type="button" data-preview-tab="yaml">YAML</button>
    <button type="button" data-preview-tab="preview">Preview</button>
  </div>

  <div class="program-card-preview-tool__panels" data-preview-panels>
    <section class="program-card-preview-tool__panel is-active" data-preview-panel="yaml">
      <pre class="program-card-preview-tool__error" data-preview-error hidden></pre>
      <textarea spellcheck="false" data-yaml-input aria-label="Program card YAML"></textarea>
    </section>
    <section class="program-card-preview-tool__panel is-active" data-preview-panel="preview">
      <div class="program-card-preview-tool__preview" data-preview-output></div>
    </section>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
<script src="{{ '/assets/program_cards/preview-tools.js' | relative_url }}"></script>
<script>
  window.addEventListener('DOMContentLoaded', function () {
    ProgramCardPreviewTools.setupCardPreview({
      rootSelector: '#card-yaml-preview',
      cards: {{ site.data.program_cards.cards | jsonify }},
      tags: {{ site.data.program_cards.tags | jsonify }},
      positions: {{ site.data.program_cards.panel_positions | jsonify }}
    });
  });
</script>
