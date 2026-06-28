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

  // --- info.yaml -> normalized card (mirror of scripts/import_program_cards.rb) ---
  var API_INPUT_KEYS = {
    AudioIn1: 'audio_l', AudioIn2: 'audio_r',
    CVIn1: 'cv_1', CVIn2: 'cv_2',
    PulseIn1: 'pulse_1', PulseIn2: 'pulse_2'
  };
  var API_OUTPUT_KEYS = {
    AudioOut1: 'audio_out_l', AudioOut2: 'audio_out_r',
    CVOut1: 'cv_out_1', CVOut2: 'cv_out_2',
    PulseOut1: 'pulse_out_1', PulseOut2: 'pulse_out_2'
  };
  var KNOB_KEYS = ['main', 'x', 'y'];
  var Z_MODES = ['up', 'middle', 'down'];

  function infoKey(key) { return String(key).toLowerCase().replace(/[-_\s]/g, ''); }
  function infoField(hash) {
    if (!hash || typeof hash !== 'object' || Array.isArray(hash)) return undefined;
    for (var i = 1; i < arguments.length; i++) {
      var name = arguments[i];
      if (Object.prototype.hasOwnProperty.call(hash, name)) return hash[name];
      var n = infoKey(name);
      for (var k in hash) if (Object.prototype.hasOwnProperty.call(hash, k) && infoKey(k) === n) return hash[k];
    }
    return undefined;
  }
  function infoTruthy(v) {
    if (v === true) return true;
    if (v === false || v == null) return false;
    return ['true', 'yes', 'y', '1'].indexOf(String(v).trim().toLowerCase()) !== -1;
  }
  function infoCardNumber(id) { return String(id).split('_')[0]; }
  function titleizeId(id) {
    return String(id).replace(/^\d+_?/, '').replace(/[_-]/g, ' ').split(/\s+/)
      .filter(Boolean).map(function (w) { return w.charAt(0).toUpperCase() + w.slice(1); }).join(' ');
  }
  function compactPanelLabel(name) {
    var text = String(name == null ? '' : name).trim().replace(/\s*\/\s*/g, ' / ');
    if (!text) return '';
    var repl = { External: 'Ext', Channel: 'Chan', Quantized: 'Quant', Modulation: 'Mod', Divide: 'Div', Multiply: 'Mult', Randomness: 'Random', Trigger: 'Trig', Output: 'Out', Input: 'In', 'Preset Select': 'Preset', Pattern: 'Patt' };
    Object.keys(repl).forEach(function (from) {
      text = text.replace(new RegExp('\\b' + from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'ig'), repl[from]);
    });
    var words = text.split(/\s+/), lines = [], line = '';
    words.forEach(function (w) {
      var c = line ? line + ' ' + w : w;
      if (c.length <= 12) line = c; else { if (line) lines.push(line); line = w; }
    });
    if (line) lines.push(line);
    var two = lines.slice(0, 2).join('\n');
    return two.length > 24 ? two.slice(0, 23).replace(/\s+$/, '') : two;
  }
  function normSocket(item) {
    var name = infoField(item, 'name', 'Name') || infoField(item, 'id');
    var out = { label: compactPanelLabel(name), description: String(infoField(item, 'description', 'Description') || '').trim(), source: 'info.yaml' };
    var type = infoField(item, 'type');
    if (type) out.type = type;
    if (!out.description) delete out.description;
    return out;
  }
  function normSocketList(items, mapping) {
    var result = {};
    (Array.isArray(items) ? items : []).forEach(function (item) {
      var slot = mapping[String(infoField(item, 'id'))];
      if (slot) result[slot] = normSocket(item);
    });
    return result;
  }
  function knobRows(info) {
    var knobs = infoField(infoField(info, 'controls'), 'knobs');
    if (Array.isArray(knobs)) return knobs;
    if (knobs && typeof knobs === 'object') return [knobs]; // plain map form
    return [];
  }
  function rowWhen(row) { var w = infoField(row, 'when'); return w && typeof w === 'object' ? w : {}; }
  function rowContextLabel(row) {
    var c = rowWhen(row), parts = [];
    if (infoField(c, 'z')) parts.push('Z ' + infoField(c, 'z'));
    if (infoField(c, 'layer')) parts.push(String(infoField(c, 'layer')));
    if (infoField(c, 'gesture')) parts.push(String(infoField(c, 'gesture')));
    return parts.length ? parts.join(', ') : 'Default';
  }
  function summarizeKnobRow(row) {
    return KNOB_KEYS.map(function (key) {
      var knob = infoField(row, key); if (!knob || typeof knob !== 'object') return null;
      var name = infoField(knob, 'name'); return name ? key.toUpperCase() + ': ' + name : null;
    }).filter(Boolean).join('; ');
  }
  function normalizeControls(info) {
    var rows = knobRows(info);
    var primary = rows.find(function (r) { var c = rowWhen(r); return String(infoField(c, 'z')) === 'middle' && !infoField(c, 'layer') && !infoField(c, 'gesture'); })
      || rows.find(function (r) { return KNOB_KEYS.some(function (k) { var v = infoField(r, k); return v && typeof v === 'object'; }); });
    var controls = {};
    if (primary) KNOB_KEYS.forEach(function (key) {
      var knob = infoField(primary, key); if (!knob || typeof knob !== 'object') return;
      var name = infoField(knob, 'name'); if (!name) return;
      controls[key] = { label: compactPanelLabel(name), description: String(infoField(knob, 'description') || '').trim(), source: 'info.yaml' };
      if (!controls[key].description) delete controls[key].description;
    });
    var zRows = rows.filter(function (r) { return infoField(rowWhen(r), 'z'); });
    var down = zRows.find(function (r) { return String(infoField(rowWhen(r), 'z')) === 'down' && infoField(r, 'main') && typeof infoField(r, 'main') === 'object'; });
    if (down) {
      var k = infoField(down, 'main');
      controls.z = { label: compactPanelLabel(infoField(k, 'name')), description: String(infoField(k, 'description') || '').trim(), source: 'info.yaml' };
      if (!controls.z.description) delete controls.z.description;
    } else if (zRows.length) {
      controls.z = { label: 'Mode', description: 'Selects alternate control modes.', source: 'info.yaml' };
    }
    return controls;
  }
  function normalizeSwitchModes(info) {
    var rows = knobRows(info), modes = { up: '', middle: '', down: '' };
    Z_MODES.forEach(function (mode) {
      modes[mode] = rows.filter(function (r) { return String(infoField(rowWhen(r), 'z')) === mode; }).map(function (r) {
        var s = summarizeKnobRow(r); return s ? rowContextLabel(r) + ': ' + s + '.' : null;
      }).filter(Boolean).join(' ');
    });
    return modes;
  }
  function normalizeLeds(info) {
    var rows = Array.isArray(infoField(infoField(info, 'controls'), 'leds')) ? infoField(infoField(info, 'controls'), 'leds') : [];
    return rows.map(function (r) {
      var items = Array.isArray(infoField(r, 'items')) ? infoField(r, 'items') : [];
      if (!items.length) return null;
      var names = items.map(function (i) { return infoField(i, 'name'); }).filter(Boolean).join('; ');
      return names ? rowContextLabel(r) + ': ' + names + '.' : null;
    }).filter(Boolean);
  }
  function youtubeId(url) {
    if (!url) return null;
    try {
      var u = new URL(url), host = u.host.toLowerCase();
      if (host.indexOf('youtu.be') !== -1) return u.pathname.split('/').filter(Boolean)[0];
      if (host.indexOf('youtube.com') !== -1) {
        if (u.pathname.indexOf('/embed/') !== -1 || u.pathname.indexOf('/shorts/') !== -1) return u.pathname.split('/').filter(Boolean).pop();
        return u.searchParams.get('v');
      }
    } catch (e) { return null; }
    return null;
  }
  function infoYamlToCard(info) {
    info = info || {};
    var id = String(info.id || infoField(info, 'Name', 'Title') || 'card');
    var number = infoCardNumber(id);
    var version = infoField(info, 'Version');
    var description = String(infoField(info, 'Description') || '').trim();
    var demo = infoField(info, 'demo-link');
    var vid = youtubeId(demo);
    var panel = infoField(info, 'panel') || {};
    var meta = { creator: infoField(info, 'Creator'), language: infoField(info, 'Language'), version: version, status: infoField(info, 'Status'), license: infoField(info, 'License'), repository: infoField(info, 'repository'), contact: infoField(info, 'contact') };
    Object.keys(meta).forEach(function (k) { if (meta[k] == null || meta[k] === '') delete meta[k]; });
    var card = {
      id: id, title: infoField(info, 'Name', 'Title') || titleizeId(id), draft: infoTruthy(infoField(info, 'draft', 'Draft')),
      release: version ? number + ' / ' + version : number, summary: description, description: description,
      panel: { controls: normalizeControls(info), inputs: normSocketList(infoField(panel, 'inputs'), API_INPUT_KEYS), outputs: normSocketList(infoField(panel, 'outputs'), API_OUTPUT_KEYS) },
      switch_modes: normalizeSwitchModes(info), leds: normalizeLeds(info), tags: [], metadata: meta
    };
    var manual = infoField(info, 'manual');
    if (manual && String(manual).trim()) card.documentation = { intro: manual };
    if (demo && vid) card.videos = [{ title: 'Demo video', url: demo, id: vid }];
    var warnings = [];
    ['inputs', 'outputs'].forEach(function (group) {
      var mapping = group === 'inputs' ? API_INPUT_KEYS : API_OUTPUT_KEYS;
      (Array.isArray(panel[group]) ? panel[group] : []).forEach(function (item) {
        var apiId = infoField(item, 'id');
        if (apiId && !mapping[String(apiId)]) warnings.push('Unknown ' + group + ' id "' + apiId + '" (not a ComputerCard jack).');
      });
    });
    if (!infoField(info, 'Name', 'Title')) warnings.push('Missing Name.');
    if (!version) warnings.push('Missing Version.');
    if (warnings.length) card.__warnings = warnings;
    if (!Object.keys(card.panel.controls).length) delete card.panel.controls;
    if (!Object.keys(card.panel.inputs).length) delete card.panel.inputs;
    if (!Object.keys(card.panel.outputs).length) delete card.panel.outputs;
    if (!card.leds.length) delete card.leds;
    return card;
  }

  // Heuristic: a card already normalized by the importer (so Normalize is a no-op)
  function isNormalizedCard(value) {
    if (!value || typeof value !== 'object') return false;
    if ('metadata' in value || 'release' in value || 'switch_modes' in value) return true;
    return 'title' in value && !infoField(value, 'Name') && !infoField(value, 'Version');
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
    errorEl.classList.remove('is-success', 'is-info');
    errorEl.textContent = error ? String(error.message || error) : '';
  }

  function showStatus(errorEl, message, kind) {
    if (!errorEl) return;
    errorEl.hidden = !message;
    errorEl.classList.remove('is-success', 'is-info');
    if (kind) errorEl.classList.add(kind === 'success' ? 'is-success' : 'is-info');
    errorEl.textContent = message || '';
  }

  function setupCardPreview(options) {
    const root = document.querySelector(options.rootSelector);
    if (!root) return;
    setupTabs(root);
    const textarea = root.querySelector('[data-yaml-input]');
    const select = root.querySelector('[data-card-select]');
    const preview = root.querySelector('[data-preview-output]');
    const error = root.querySelector('[data-preview-error]');
    const normalizeBtn = root.querySelector('[data-normalize]');
    const cards = options.cards || [];
    const positions = options.positions || {};
    const tags = options.tags || {};

    function loadCard(card) {
      textarea.value = dumpYaml(card || cards[0] || {});
      isNormalized = true;
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

    let isNormalized = false;

    if (normalizeBtn) {
      normalizeBtn.addEventListener('click', () => {
        try {
          if (isNormalized) { render(); showStatus(error, 'Already normalized — nothing to do.', 'info'); return; }
          const card = infoYamlToCard(normaliseCard(parseYaml(textarea.value)));
          const warnings = Array.isArray(card.__warnings) ? card.__warnings : [];
          delete card.__warnings;
          textarea.value = dumpYaml(card);
          isNormalized = true;
          render();
          if (warnings.length) showError(error, new Error('Normalization warnings:\n- ' + warnings.join('\n- ')));
          else showStatus(error, 'Normalized successfully.', 'success');
        } catch (err) {
          showError(error, err);
        }
      });
    }

    cards.forEach((card, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${cardNumber(card)} ${card.title || card.id}`;
      select.appendChild(option);
    });
    select.addEventListener('change', () => loadCard(cards[Number(select.value)]));
    textarea.addEventListener('input', () => { isNormalized = false; render(); });
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
