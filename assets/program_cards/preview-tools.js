(function () {
  const DEFAULT_DISCUSSION = 'https://discord.com/channels/1210238368898879569/1484219323039092938';
  const SOURCE_BASE = 'https://github.com/TomWhitwell/Workshop_Computer/tree/main/releases/';
  const README_BASE = 'https://github.com/TomWhitwell/Workshop_Computer/blob/main/releases/';
  const PANEL_IMAGE = '/assets/program_cards/Standalone_computer_rev1.svg';

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function stripTags(value) {
    return String(value == null ? '' : value).replace(/<[^>]*>/g, '');
  }

  function truncate(value, length) {
    const text = stripTags(value).trim();
    if (text.length <= length) return text;
    return text.slice(0, Math.max(0, length - 1)).trimEnd() + '…';
  }

  function slugify(value) {
    return String(value == null ? '' : value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function cardNumber(card) {
    const release = card.release || card.id || '';
    return String(release).split('/')[0].split('_')[0].trim();
  }

  function cardUrl(card) {
    return card.url || `/workshopsystem/program-cards/${slugify(card.title || card.id || 'card')}/`;
  }

  function infoYamlUrl(card) {
    const sourceFile = card.source_file || (card.id ? `releases/${card.id}/info.yaml` : '');
    return `https://github.com/TomWhitwell/Workshop_Computer/blob/main/${sourceFile}`;
  }

  function yamlLibrary() {
    if (!window.jsyaml) throw new Error('YAML parser unavailable. Check the js-yaml script loaded.');
    return window.jsyaml;
  }

  function dumpYaml(value) {
    return yamlLibrary().dump(value, { lineWidth: 88, noRefs: true, sortKeys: false });
  }

  function parseYaml(value) {
    return yamlLibrary().load(value);
  }

  function normaliseCard(value) {
    if (Array.isArray(value)) return value[0] || {};
    return value || {};
  }

  function assignedTags(card, tagConfig) {
    const assignments = (tagConfig && tagConfig.assignments) || {};
    return assignments[card.id] || card.tags || card.tag_labels || [];
  }

  function renderTags(card, tagConfig, hideTags) {
    const tags = assignedTags(card, tagConfig);
    const available = (tagConfig && tagConfig.available_tags) || [];
    const hidden = new Set((hideTags || []).map(slugify));
    const markup = [];

    (tags || []).forEach((tag) => {
      let tagId = slugify(tag.id || tag);
      let tagLabel = tag.label || tag;
      let tagColor = '';
      let tagTextColor = '';

      available.forEach((candidate) => {
        const candidateSlug = slugify(candidate.label);
        if (candidate.id === tag || candidate.label === tag || candidate.id === tag.id || candidateSlug === tagId) {
          tagId = slugify(candidate.id);
          tagLabel = candidate.label;
          tagColor = candidate.color || '';
          tagTextColor = candidate.text_color || '';
        }
      });

      if (hidden.has(tagId) || hidden.has(slugify(tagLabel))) return;
      const style = `${tagColor ? `--program-card-tag-bg: ${tagColor}; --program-card-tag-border: ${tagColor};` : ''}${tagTextColor ? ` --program-card-tag-ink: ${tagTextColor};` : ''}`;
      markup.push(`<span class="program-card-tag program-card-tag--${esc(tagId)}"${style ? ` style="${esc(style)}"` : ''}>${esc(tagLabel)}</span>`);
    });

    return markup.length ? `<span class="program-card-tags">${markup.join('')}</span>` : '';
  }

  function renderCardTile(card, tagConfig, options) {
    if (!card) return '';
    const firstVideo = card.videos && card.videos[0];
    const summary = card.summary || card.description || '';
    const media = options && options.showVideo && firstVideo
      ? `<span class="program-card-tile__media" aria-hidden="true"><img src="https://img.youtube.com/vi/${esc(firstVideo.id)}/hqdefault.jpg" alt="" loading="lazy"></span>`
      : '';
    return `<a class="program-card-tile${media ? ' program-card-tile--video' : ''}" href="${esc(cardUrl(card))}">
      ${media}
      <span class="program-card-tile__head"><span class="program-card-tile__title"><span class="program-card-tile__number">${esc(cardNumber(card))}</span><span class="program-card-tile__name">${esc(truncate(card.title || card.id || 'Untitled card', 48))}</span></span></span>
      ${card.draft ? '<span class="program-card-draft-flag program-card-draft-flag--tile">Draft</span>' : ''}
      ${summary ? `<span class="program-card-tile__summary">${esc(truncate(summary, 190))}</span>` : ''}
      ${renderTags(card, tagConfig, options && options.hideTags)}
    </a>`;
  }

  function renderShelf(shelf, cards, tagConfig, options) {
    const layout = shelf.layout || '';
    const showVideo = layout.includes('video');
    const classes = `program-card-shelf${options && options.featured ? ' program-card-shelf--featured' : ''}${layout ? ` program-card-shelf--${esc(slugify(layout))}` : ''}`;
    const gridClasses = `program-card-grid${options && options.featured ? ' program-card-grid--featured' : ''}${layout ? ` program-card-grid--${esc(slugify(layout))}` : ''}`;
    let shelfCards = [];

    if (shelf.cards) {
      shelfCards = shelf.cards.map((id) => cards.find((card) => card.id === id)).filter(Boolean);
    } else if (shelf.cards_from_tags) {
      const wanted = new Set(shelf.cards_from_tags.map(slugify));
      for (const card of cards) {
        const cardTagIds = assignedTags(card, tagConfig).map((tag) => slugify(tag.id || tag.label || tag));
        if (cardTagIds.some((tag) => wanted.has(tag))) shelfCards.push(card);
        if (shelfCards.length >= (shelf.limit || 999)) break;
      }
    }

    return `<section class="${classes}">
      <header class="program-card-shelf__header"><h2>${esc(shelf.title || options && options.title || 'Shelf')}</h2>${shelf.intro || options && options.intro ? `<p>${esc(shelf.intro || options.intro)}</p>` : ''}</header>
      <div class="${gridClasses}">${shelfCards.map((card) => renderCardTile(card, tagConfig, { showVideo, hideTags: shelf.hide_tags })).join('')}</div>
    </section>`;
  }

  function renderDiscovery(config, cards, tagConfig) {
    config = config || {};
    const page = config.page || {};
    const hero = config.hero || {};
    const heroShelf = hero.featured ? renderShelf({ title: hero.title || 'Included cards', intro: hero.text, cards: hero.featured }, cards, tagConfig, { featured: true }) : '';
    const shelves = (config.shelves || []).map((shelf) => renderShelf(shelf, cards, tagConfig)).join('');
    return `<div class="program-cards">
      <header class="program-cards__title"><div class="program-cards__identity"><span class="program-cards__identity-mark" aria-hidden="true"></span><h1>${esc(page.title || 'Program Cards')}</h1></div><nav class="program-cards__links" aria-label="Program card links"><a href="/workshopsystem/program-cards/archive/">All cards</a><a href="/workshopsystem/program-cards/install/">Installation</a><a href="https://github.com/TomWhitwell/Workshop_Computer">Make a card</a></nav></header>
      ${heroShelf}${shelves}
    </div>`;
  }

  function renderPanelLabel(kind, pos, item) {
    if (!item || !item.label) return '';
    return `<span class="program-card-panel__label program-card-panel__label--${kind}" style="left: ${esc(pos.left)}%; top: ${esc(pos.top)}%;">${esc(stripTags(item.label)).replace(/\n/g, '<br>')}</span>`;
  }

  function renderPanel(card, positions) {
    const panel = card.panel || {};
    const labels = [];
    (positions.controls || []).forEach((pos) => labels.push(renderPanelLabel('control', pos, (panel.controls || {})[pos.key])));
    (positions.inputs || []).forEach((pos) => labels.push(renderPanelLabel('input', pos, (panel.inputs || {})[pos.key])));
    (positions.outputs || []).forEach((pos) => labels.push(renderPanelLabel('output', pos, (panel.outputs || {})[pos.key])));
    return `<figure class="program-card-panel" aria-label="Workshop Computer panel"><img src="${PANEL_IMAGE}" alt="Workshop Computer panel">${labels.join('')}</figure>`;
  }

  function renderSocketList(title, sockets, positions) {
    if (!sockets) return '';
    const items = (positions || []).map((pos) => {
      const socket = sockets[pos.key];
      if (!socket || (!socket.description && !socket.label)) return '';
      return `<div class="program-card-socket"><strong>${esc(stripTags(socket.label || pos.name || pos.key))}</strong><p>${esc(truncate(socket.description || socket.label || '', 220))}</p></div>`;
    }).join('');
    if (!items.trim()) return '';
    return `<section class="program-card-section"><h3>${esc(title)}</h3><div class="program-card-socket-list">${items}</div></section>`;
  }

  function renderCardPage(card, positions, tagConfig) {
    card = normaliseCard(card);
    const metadata = card.metadata || {};
    const summary = card.summary || card.description || '';
    const sourceUrl = card.source_url || `${SOURCE_BASE}${card.id || ''}`;
    const readmeUrl = card.readme_url || `${README_BASE}${card.id || ''}/README.md`;
    const discussionUrl = metadata.discussion_url || card.discussion_url || DEFAULT_DISCUSSION;
    const firstVideo = card.videos && card.videos[0];
    const panel = card.panel || {};
    const controls = panel.controls || {};
    const controlKeys = ['main', 'x', 'y', 'z'];
    const controlsMarkup = controlKeys.map((key) => {
      const control = controls[key];
      if (!control || !control.description) return '';
      return `<p><strong>${esc(stripTags(control.label || key).toUpperCase())}</strong> ${esc(truncate(control.description, 220))}</p>`;
    }).join('');
    const switchEntries = card.switch_modes ? Object.entries(card.switch_modes).filter((entry) => entry[1]) : [];
    const switchMarkup = switchEntries.map(([key, value]) => `<p><strong>${esc(key.charAt(0).toUpperCase() + key.slice(1))}</strong> ${esc(truncate(value, 240))}</p>`).join('');
    const ledsMarkup = (card.leds || []).map((led) => `<p>${esc(truncate(led, 260))}</p>`).join('');
    const dataSources = card.source ? `<div class="program-card-data-sources"><details><summary>Data sources</summary><p>${card.source.map((item) => `<code title="${esc(item)}">${esc(truncate(item, 56))}</code>`).join(', ')}</p></details></div>` : '';
    const draftBar = card.draft ? `<aside class="program-card-draft-bar" aria-label="Draft documentation notice"><div class="program-card-draft-bar__message"><strong>Draft:</strong> <span>This documentation is work in progress and has not yet been approved by the card designer.</span></div><details class="program-card-draft-bar__details"><summary>I'm the designer. How should I fix this?</summary><p>Check the generated documentation against the card, then edit <a href="${esc(infoYamlUrl(card))}">the relevant <code>info.yaml</code> file</a> in the Workshop Computer repo. When everything is accurate, set <code>draft: false</code> in that YAML and submit the change.</p></details></aside>` : '';

    return `<article class="program-cards program-card-page">
      ${draftBar}
      <header class="program-card-hero"><div class="program-card-hero__main">${renderTags(card, tagConfig)}<h1><span class="program-card-page__number">${esc(cardNumber(card))}</span> ${esc(stripTags(card.title || card.id || 'Untitled card'))}</h1>${summary ? `<p>${esc(truncate(summary, 240))}</p>` : ''}<div class="program-card-hero__meta">${metadata.creator ? `<span>By ${esc(metadata.creator)}</span>` : ''}${card.memory && card.memory.size ? `<span>${esc(String(card.memory.size).toUpperCase())} card ${esc(card.memory.requirement || 'supported')}</span>` : ''}</div><div class="program-card-actions" aria-label="Card actions"><a class="program-card-action program-card-action--download" href="${esc(sourceUrl)}"><span>Download</span>${metadata.version ? `<small>Firmware ${esc(metadata.version)}</small>` : ''}</a>${metadata.editor_url ? `<a class="program-card-action program-card-action--editor" href="${esc(metadata.editor_url)}"><span>Launch web editor</span><small>${esc(metadata.editor_note || 'Configure this card in your browser')}</small></a>` : ''}</div><div class="program-card-hero__links" aria-label="Further card links"><a href="${esc(readmeUrl)}">Read more</a><a href="${esc(discussionUrl)}">Support &amp; questions</a></div></div><nav class="program-card-nav" aria-label="Program card navigation"><a href="/workshopsystem/program-cards/">Program cards</a><a href="/workshopsystem/program-cards/archive/">All cards</a></nav></header>
      ${firstVideo ? `<section class="program-card-demo"><a href="${esc(firstVideo.url)}"><span class="program-card-demo__media" aria-hidden="true"><img src="https://img.youtube.com/vi/${esc(firstVideo.id)}/hqdefault.jpg" alt="" loading="lazy"></span><span class="program-card-demo__text"><span>Watch</span><strong>${esc(firstVideo.title || 'Demo video')}</strong></span></a></section>` : ''}
      ${card.quick_start ? `<section class="program-card-quick-start"><h2>Quick start</h2><ol>${card.quick_start.map((step) => `<li>${esc(stripTags(step))}</li>`).join('')}</ol></section>` : ''}
      <div class="program-card-use"><div class="program-card-use__panel">${renderPanel(card, positions || {})}</div><div class="program-card-use__reference">${controlsMarkup ? `<section class="program-card-section"><h3>Controls</h3>${controlsMarkup}</section>` : ''}${switchMarkup ? `<section class="program-card-section"><h3>Switch</h3>${switchMarkup}</section>` : ''}${renderSocketList('Inputs', panel.inputs, positions.inputs)}${renderSocketList('Outputs', panel.outputs, positions.outputs)}${ledsMarkup ? `<section class="program-card-section"><h3>LEDs</h3>${ledsMarkup}</section>` : ''}</div></div>
      <footer class="program-card-about"><section class="program-card-section"><h3>About this card</h3><dl>${metadata.creator ? `<div><dt>Creator</dt><dd>${esc(metadata.creator)}</dd></div>` : ''}${metadata.language ? `<div><dt>Language</dt><dd>${esc(metadata.language)}</dd></div>` : ''}${metadata.version ? `<div><dt>Version</dt><dd>${esc(metadata.version)}</dd></div>` : ''}${card.memory && card.memory.size ? `<div><dt>Card memory</dt><dd>${esc(String(card.memory.size).toUpperCase())} ${esc(card.memory.requirement || 'supported')}</dd></div>` : ''}<div><dt>Read more</dt><dd><a href="${esc(readmeUrl)}">README in the Workshop Computer repo</a></dd></div><div><dt>Source</dt><dd><a href="${esc(sourceUrl)}">Release folder on GitHub</a></dd></div><div><dt>Support</dt><dd><a href="${esc(discussionUrl)}">Ask questions, contact the designer, or share feedback</a></dd></div></dl></section>${card.notes ? `<section class="program-card-section"><h3>Notes</h3>${card.notes.map((note) => `<p>${esc(truncate(note, 220))}</p>`).join('')}</section>` : ''}${dataSources}</footer>
    </article>`;
  }

  function setPreviewMode(root, target) {
    const mode = target || 'split';
    root.setAttribute('data-preview-mode', mode);
    root.querySelectorAll('[data-preview-tab]').forEach((tab) => {
      tab.classList.toggle('is-active', tab.getAttribute('data-preview-tab') === mode);
    });
    root.querySelectorAll('[data-preview-panel]').forEach((panel) => {
      const panelName = panel.getAttribute('data-preview-panel');
      panel.classList.toggle('is-active', mode === 'split' || panelName === mode);
    });
  }

  function setupTabs(root) {
    setPreviewMode(root, root.getAttribute('data-preview-mode') || 'split');
    root.querySelectorAll('[data-preview-tab]').forEach((button) => {
      button.addEventListener('click', () => {
        setPreviewMode(root, button.getAttribute('data-preview-tab'));
      });
    });
  }

  function showError(errorEl, error) {
    if (!errorEl) return;
    errorEl.hidden = !error;
    errorEl.textContent = error ? String(error.message || error) : '';
  }

  function setupCardPreview(options) {
    const root = document.querySelector(options.rootSelector);
    if (!root) return;
    setupTabs(root);
    const textarea = root.querySelector('[data-yaml-input]');
    const select = root.querySelector('[data-card-select]');
    const preview = root.querySelector('[data-preview-output]');
    const error = root.querySelector('[data-preview-error]');
    const cards = options.cards || [];
    const positions = options.positions || {};
    const tags = options.tags || {};

    function loadCard(card) {
      textarea.value = dumpYaml(card || cards[0] || {});
      render();
    }

    function render() {
      try {
        const card = normaliseCard(parseYaml(textarea.value));
        preview.innerHTML = renderCardPage(card, positions, tags);
        showError(error, null);
      } catch (err) {
        showError(error, err);
      }
    }

    cards.forEach((card, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${cardNumber(card)} ${card.title || card.id}`;
      select.appendChild(option);
    });
    select.addEventListener('change', () => loadCard(cards[Number(select.value)]));
    textarea.addEventListener('input', render);
    loadCard(cards[0]);
  }

  function setupDiscoveryPreview(options) {
    const root = document.querySelector(options.rootSelector);
    if (!root) return;
    setupTabs(root);
    const textarea = root.querySelector('[data-yaml-input]');
    const preview = root.querySelector('[data-preview-output]');
    const error = root.querySelector('[data-preview-error]');
    textarea.value = dumpYaml(options.discovery || {});

    function render() {
      try {
        preview.innerHTML = renderDiscovery(parseYaml(textarea.value), options.cards || [], options.tags || {});
        showError(error, null);
      } catch (err) {
        showError(error, err);
      }
    }

    textarea.addEventListener('input', render);
    render();
  }

  window.ProgramCardPreviewTools = { setupCardPreview, setupDiscoveryPreview };
}());
