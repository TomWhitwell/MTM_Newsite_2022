---
layout: default
output: false
permalink: /buy/
title: Buy Music Thing Modular

assembled:

  - name: SchneidersKeller
    region: UK
    location: Denmark Street, London
    url: https://www.schneiderskeller.co.uk/products/musicthing-modular-workshop-system
    note: Assembled Workshop Systems available in-store and online.

  - name: Signal Sounds
    region: UK
    location: Glasgow
    url: https://www.signalsounds.com/music-thing-modular-workshop-system-desktop-eurorack-synthesiser/
    note: Assembled Workshop Systems available in-store and online.

  - name: Perfect Circuit
    region: US
    location: California
    url: https://www.perfectcircuit.com/music-thing-modular-workshop-system-assembled.html
    note: Assembled Workshop Systems for US customers.

  - name: SchneidersLaden
    region: EU
    location: Berlin
    url: https://schneidersladen.de/en/music-thing-modular-workshop-system-assembled
    note: Assembled Workshop Systems for EU customers.

  - name: Soundgas 
    region: UK
    location: Derbyshire
    url: https://soundgas.com/products/music-thing-modular-workshop-system-desktop-eurorack-synthesiser
    note: Assembled Workshop Systems and so much beautiful vintage gear.

  - name: Thonk
    region: Worldwide
    location: Brighton, UK
    url: mailto:support@thonk.co.uk ?subject=Assembled%20Workshop%20System%20query&body=Hi%2C%20I'm%20interested%20in%20buying%20a%20pre-assembled%20Workshop%20System%2C%20please%20tell%20me%20how%20that%20works.
    note: Assembled systems are available on request.

diy:
  - name: Thonk
    region: Worldwide
    location: Brighton, UK
    url: https://www.thonk.co.uk/workshopsystem/
    note: Complete DIY kits, shipping worldwide.

  - name: Perfect Circuit
    region: US
    location: California
    url: https://www.perfectcircuit.com/music-thing-modular-workshop-system-diy-kit.html
    note: Complete DIY kits for US customers.

  - name: Exploding Shed
    region: EU
    location: Leipzig
    url: https://www.exploding-shed.com/music-thing-modular-workshop-system/100949
    note: Complete DIY kits for EU customers.

  - name: SchneidersKeller
    region: UK
    location: Denmark Street, London
    url: https://www.schneiderskeller.co.uk/
    note: DIY kits available in person from their London store.
---

<style>
  .buy-page {
    max-width: 920px;
  }

  .buy-hero {
    max-width: 760px;
    margin: 1.2em 0 2.2em 0;
  }

  .buy-hero h1 {
    margin-bottom: 0.25em;
  }

  .buy-hero .lede {
    font-size: 1.35em;
    line-height: 1.25;
    font-weight: 700;
    margin: 0 0 0.7em 0;
  }

  .buy-hero p {
    max-width: 720px;
    margin: 0 0 0.8em 0;
  }

  .buy-choice {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    margin: 1.5em 0 2.5em 0;
  }

  .buy-choice-box {
    border: 2px solid currentColor;
    padding: 0.9em 1em;
  }

  .buy-choice-box h2 {
    margin: 0 0 0.25em 0;
  }

  .buy-choice-box p {
    margin: 0;
  }

  .buy-section {
    margin: 2.4em 0 2.8em 0;
  }

  .buy-section h2 {
    margin-bottom: 0.45em;
  }

  .dealer-list {
    border-top: 2px solid currentColor;
  }

  .dealer-row {
    display: grid;
    grid-template-columns: minmax(160px, 230px) minmax(115px, 150px) 1fr auto;
    gap: 1em;
    align-items: baseline;
    padding: 0.55em 0;
    border-bottom: 1px solid currentColor;
    color: inherit;
    text-decoration: none;
  }

  .dealer-row:visited,
  .dealer-row:link {
    color: inherit;
  }

  .dealer-row:hover .dealer-name,
  .dealer-row:hover .dealer-cta {
    text-decoration: underline;
  }

  .dealer-name {
    font-weight: 800;
    font-size: 1.15em;
  }

  .dealer-place {
    font-size: 0.78em;
    line-height: 1.2;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 800;
  }

  .dealer-note {
    line-height: 1.25;
  }

  .dealer-cta {
    font-weight: 800;
    white-space: nowrap;
  }

  .buy-footer-note {
    max-width: 760px;
    margin: 3em 0 1em 0;
    border-top: 2px solid currentColor;
    padding-top: 1.2em;
  }

  .buy-footer-note h2 {
    margin: 1em 0 0.25em 0;
  }

  .buy-footer-note p {
    margin-top: 0;
  }

  @media (max-width: 720px) {
    .buy-choice {
      grid-template-columns: 1fr;
    }

    .dealer-row {
      grid-template-columns: 1fr;
      gap: 0.15em;
      padding: 0.85em 0;
    }

    .dealer-cta {
      margin-top: 0.15em;
    }
  }
</style>

<div class="buy-page">

  <div class="buy-hero">
    <h1>Buy Music Thing Modular</h1>

    <p class="lede">
      Music Thing Modular instruments and DIY kits are now available worldwide.
    </p>


  </div>

  <div class="buy-choice">
    <div class="buy-choice-box">
      <h2>Want to play?</h2>
      <p>Choose an assembled Workshop System. No soldering, just start making sound.</p>
    </div>

    <div class="buy-choice-box">
      <h2>Want to build?</h2>
      <p>Choose the DIY kit. It is well documented, a satisfying build and significantly cheaper.</p>
    </div>
  </div>

  <section class="buy-section">
    <h2>Assembled Workshop Systems</h2>

    <div class="dealer-list">
      {% for dealer in page.assembled %}
      <a class="dealer-row" href="{{ dealer.url }}">
        <span class="dealer-name">{{ dealer.name }}</span>
        <span class="dealer-place">{{ dealer.region }} · {{ dealer.location }}</span>
        <span class="dealer-note">{{ dealer.note }}</span>
        <span class="dealer-cta">Buy →</span>
      </a>
      {% endfor %}
    </div>
  </section>

  <section class="buy-section">
    <h2>DIY Workshop System kits</h2>

    <div class="dealer-list">
      {% for dealer in page.diy %}
      <a class="dealer-row" href="{{ dealer.url }}">
        <span class="dealer-name">{{ dealer.name }}</span>
        <span class="dealer-place">{{ dealer.region }} · {{ dealer.location }}</span>
        <span class="dealer-note">{{ dealer.note }}</span>
        <span class="dealer-cta">Buy →</span>
      </a>
      {% endfor %}
    </div>
  </section>

  <div class="buy-footer-note">
    <h2>Want to try one first?</h2>

    <p>
      You can play a Workshop System in person at
      <a href="https://www.schneiderskeller.co.uk/">SchneidersKeller</a>
      on Denmark Street in London, or <a href="https://musicthing.co.uk/simulator/">try the online simulator</a> here. 
    </p>

    <h2>Dealer enquiries</h2>

    <p>
      For dealer enquiries, workshops or bulk orders, email
      <a href="mailto:support@thonk.co.uk">support@thonk.co.uk</a>.
    </p>
  </div>

</div>