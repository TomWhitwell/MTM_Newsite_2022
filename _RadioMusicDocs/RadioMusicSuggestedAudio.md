---
layout: documentation
page-name: "Radio Music Suggested Audio"
permalink: "/Radio_Music_Suggested_Audio/"
order: 3
title: "Radio Music Suggested Audio"
description: "Listen to and download the suggested audio collection for Radio Music."
body_class: radio-music-audio
---

<article class="sound-library">
  <header class="sound-library__intro">
    <h1>{{ site.data.radio_music.page.title }}</h1>
    <div class="library-downloads" aria-label="Collection downloads">
      {% for download in site.data.radio_music.page.downloads %}
        {% if download.url != empty %}<a class="library-download" href="{{ download.url | escape }}">{% else %}<div class="library-download is-pending">{% endif %}
          <strong>{{ download.label }}</strong>
          <span>{{ download.detail }}</span>
        {% if download.url != empty %}</a>{% else %}</div>{% endif %}
      {% endfor %}
    </div>
    <p class="legacy-download">
      <a href="{{ site.data.radio_music.page.legacy_download.url | escape }}">{{ site.data.radio_music.page.legacy_download.label }}</a>
      <span aria-hidden="true">·</span>
      <a href="{{ site.data.radio_music.page.legacy_download.documentation_url | escape }}">{{ site.data.radio_music.page.legacy_download.documentation_label }}</a>
    </p>
  </header>

  {% include radio_music_catalogue.html %}
</article>

<script src="{{ '/assets/js/radio-music-player.js' | relative_url }}" defer></script>
