---
layout: landing-prototype
title: 8mu landing A
permalink: /landing/8mu-a/
---

<article class="sale-page sale-page--8mu">
  <nav class="sale-nav" aria-label="Landing page navigation">
    <a href="/landing/">All prototypes</a>
    <a href="#overview">Overview</a>
    <a href="#editor">Editor</a>
    <a href="#build">Build</a>
    <a class="sale-nav__buy" href="#buy">Buy now</a>
  </nav>

  <section class="sale-hero sale-hero--product">
    <div class="sale-copy">
      <p class="sale-kicker">Pocket-sized MIDI controller DIY kit</p>
      <h1>8mu is a small MIDI controller with eight faders, four buttons and motion control.</h1>
      <p class="sale-lede">It is slightly smaller than a credit card. Use it with a computer over USB-C, or with hardware over 3.5mm TRS MIDI. Configure it in a browser.</p>
      <div class="sale-actions">
        <a class="sale-button" href="#buy">Buy 8mu</a>
        <a class="sale-button sale-button--secondary" href="#overview">What it does</a>
      </div>
    </div>
    <div class="sale-product sale-product--wide">
      <img src="/images/landing-prototypes/8mu-panel.png" alt="8mu panel">
      <aside class="sale-buybox">
        <h2>8mu</h2>
        <p>DIY kit. Price and stock status go here.</p>
        <a class="sale-button" href="https://www.thonk.co.uk/shop/music-thing-8mu/">Buy from Thonk</a>
        <details open><summary>Description</summary><p>Eight faders, four buttons, accelerometer, eight banks.</p></details>
        <details><summary>Build</summary><p>Populated PCB. You solder the faders and assemble the panels.</p></details>
        <details><summary>Editor</summary><p>Configure MIDI channels, CCs and device options in a browser.</p></details>
      </aside>
    </div>
  </section>

  <section id="overview" class="sale-grid sale-grid--four">
    <div><h2>Eight faders</h2><p>Send MIDI CC values for levels, macros, sends, filters, drawbars or any mapped parameter.</p></div>
    <div><h2>Four buttons</h2><p>Send notes, controllers or use them for device functions such as bank changes.</p></div>
    <div><h2>Motion control</h2><p>The accelerometer can send gesture data: lift, tilt, rotate and turn over.</p></div>
    <div><h2>Eight banks</h2><p>Store different setups for different instruments, patches or software projects.</p></div>
  </section>

  <section class="sale-video">
    <div class="sale-placeholder">
      <strong>Short demo video</strong>
      <span>Show one fader mapped to a sound, then eight faders controlling a rack or synth. Show one useful motion-control example.</span>
    </div>
  </section>

  <section id="editor" class="sale-section sale-section--split">
    <div>
      <p class="sale-kicker">Browser editor</p>
      <h2>Change what 8mu sends without editing code.</h2>
    </div>
    <div>
      <p>The editor lets you set channels, CC numbers, banks and device options. It also shows incoming values, which makes setup easier.</p>
      <ul class="sale-list">
        <li>Set MIDI CC and channel per control</li>
        <li>Turn unused channels off</li>
        <li>Export and import bank settings</li>
        <li>Choose Type A or Type B TRS MIDI</li>
      </ul>
    </div>
  </section>

  <section id="build" class="sale-section sale-section--image">
    <img src="/images/landing-prototypes/8mu-panel.png" alt="8mu panel">
    <div>
      <p class="sale-kicker">DIY kit</p>
      <h2>A compact build with the hard electronics already done.</h2>
      <p>The PCB is populated and programmed. The build is mainly soldering the faders, fitting the panel and assembling the hardware. Show the parts clearly and link directly to the build guide.</p>
    </div>
  </section>

  <section class="sale-section sale-section--split">
    <div><h2>Measurements</h2></div>
    <ul class="sale-list">
      <li>81 x 47mm body</li>
      <li>13mm tall body; 24mm with faders and caps</li>
      <li>About 65g</li>
      <li>USB-C power and data</li>
      <li>3.5mm TRS MIDI output</li>
    </ul>
  </section>

  <section class="sale-faq">
    <h2>Questions</h2>
    <details open><summary>Do I need to code?</summary><p>No. Normal setup uses the browser editor.</p></details>
    <details><summary>Can it control hardware?</summary><p>Yes, through the 3.5mm TRS MIDI output, set to Type A or Type B in the editor.</p></details>
    <details><summary>Is it open?</summary><p>Yes. The firmware and hardware are open for people who want to go further.</p></details>
  </section>

  <section id="buy" class="sale-final">
    <h2>8mu</h2>
    <p>Eight faders in a very small MIDI controller.</p>
    <a class="sale-button" href="https://www.thonk.co.uk/shop/music-thing-8mu/">Buy from Thonk</a>
  </section>
</article>
