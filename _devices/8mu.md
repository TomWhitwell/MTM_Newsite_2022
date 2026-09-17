---
layout: module
product-rail: true
permalink: /8mu/
redirect_from:
  - /8mu_page/
  - /8mu_page
  - /8mu.html
 
order: 0.3
title:  "8mu Midi Controller DIY"
module-name: "8mu"
designed: "2019-2023"
updated: 2026 
overlay: "BACK "
image: "/images/8mu_900_card.png"
wide-image: "true" 
opening-image: "/images/8mu_900.png"
opening-image-rotate: true
excerpt: "is a hackable midi controller that's smaller than a credit card" 
# overlay: "NEW "
thonk-url: "https://www.thonk.co.uk/shop/music-thing-8mu/" 
# size: "18 HP"
# depth: "24 mm"
# supply: "52 mA"
buy:
  dealers_url: "/buy/#8mu"
  diy:
    label: "DIY kit"
    text: "A great first build: Just 24 solder joints, a bit of trimming and lots of screws."
    thonk_links:
      -
        label: "Thonk - 8mu Full DIY Kit"
        url: "https://www.thonk.co.uk/shop/8mu-kit/"
    dealers: false
product-summary:
  auto_facts: true
  bullets:
    - "The tiny MIDI controller you can build yourself"
    - "Accelerometer for gesture control"
    - "USB-C and TRS MIDI"
    - "Configure with the simple web editor"
    - "Designed for study breaks in the library, but often used live"
actions:
  enabled: true
  label: "Start here"
  items:
    -
      label: "Build Guide"
      url: "/8mu_v2_docs/#build-guide"
    -
      label: "Quick Start"
      url: "/collateral/8mu_quickstart.pdf"
    -
      label: "Reference"
      url: "/8mu_v2_docs/"
    -
      label: "Editor"
      url: "https://16n-faderbank.github.io/editor/"

# mgrid: "https://www.modulargrid.net/e/music-thing-modular-control"
# github: "https://github.com/TomWhitwell/8mu_Public"
# schematic: "/collateral/8mu_schematic.pdf"
manual-url: "/8mu_v2_docs/"
manual-text: "Open the 8mu v2 Documentation Site"



yt:
- 
  link: "Jmn6AmzROg0"
  title: "8mu + Ableton with Mylar Melodies"
- 
  link: "_gs63_gteq8"
  title: "8mu with 1010music Bluebox"

- 
  link: "8G757HvfgXg" 
  title: "Build guide from Exploding Shed" 

pars:
- "8mu is a pocket-sized MIDI controller, slightly smaller than a credit card."
- "8mu has eight faders that can send messages via MIDI."
- "8mu has has an accelerometer inside to measure how the device is being held. This creates eight more control signals, mapped to gestures like \"lift the front\" or \"turn me over\""
- "8mu has four tiny buttons along the top edge, which can be configured to send MIDI notes (like a keyboard) or controllers"
- "8mu contains 8 banks of settings which can be switched using the left and right buttons" 
- "8mu has leds hidden behind the faders. They glow through the slightly translucent fader track to indicate MIDI being sent from that fader, and which bank is being selected."
- "8mu comes as a DIY kit. The PCB is populated and programmed, you need to solder on the faders and assemble the whole thing. Kits come with both the standard and <a href=/Radio/>Radio Remote</a> front panels." 
- "8mu gets power and sends data by USB-C. Only standard USB data lines are used, so it should work on any USB computer with an adaptor." 
- There are two versions of 8mu. 8mu sold after Summer 2026 are V2. Next to the USB connector, it says 8mu v2. There are no functional differences. You can <a href="https://tomwhitwell.github.io/Smith-Kakehashi/">update the firmware on a v1</a> so it will work as a Radio Remote. 
- "If you have the original 8mu kit, the <a href=/8mu_docs/>v1 documentation is still here</a>."
- "8mu has a 3.5mm hardware MIDI output, which can be Type A or Type B. Change between A and B in the editor, click Edit Config and the settings tab will appear."
- "8mu has a quick start guide printed on the back, or <a href=/collateral/8mu_quickstart.pdf>here's a quickstart PDF</a>"
- "8mu has a web editor where you can edit all the settings. The browser (Chrome) talks to the 8mu via old-fashioned sysex messages."
- "8mu cannot send i2c or CV. This is a hardware limitation due to the physical size - there's no room for any more 3.5mm sockets." 
- "At the moment, 8mu can't send DX7-style Sysex codes or high resolution NRPN messages. These are software limitations that could be resolved by a code contribution or an alt firmware." 
- "Use a non-slip silicone gel pad to stick an 8mu to the top of a keyboard or Nord Micro Modular or whatever." 
- "You never need to go near any code to use 8mu, it's configurable from the web editor, and easy to update with drag-and-drop files. That said, 8mu is also designed to be open and hackable. The v2 version uses the common RP2040 chip."
- "This project started in April 2019, when Marc Weidenbaum posted this message: <i>This is my occasional \"Isn't there some sorta readily available very small MIDI controller, like the size of a cellphone, with a couple buttons, a couple faders, a couple knobs?\" post.</i>, then mentioned the <a href=https://www.switch-science.com/products/2394/>k4b4 mk2</a> as an example tiny DIY kit. I made a <a href=https://disquiet.com/2020/04/05/have-midi-will-travel/>little MIDI controller</a> for him, but for myself, I really wanted something smaller and thinner. Over the next few years, a simple board with 8 faders sprouted buttons round the edges, an accelerometer, LEDs shining through the faders and a neat web editor. That, and the global chip shortage, is why it took so long."
- "The long, long process of developing 8mu inspired <a href=https://www.musicthing.co.uk/Control/>Control</a>, and looking at <a href=https://medium.com/music-thing-modular-notes/make-knob-twiddling-great-again-47065a346c2>Human-Sized Musical Interfaces</a> and The Cult of Big Knobs, which recently <a href=https://www.instagram.com/p/Dca6bUYMnoD/>got even bigger</a>."
- "8mu is 81 x 47mm. The body is 13mm tall, or 24mm with the faders and fader caps. It weighs 65g. So it's smaller than a credit card, but not thinner." 
- "8mu was inspired by and built upon the <a href=https://16n-faderbank.github.io/>16n project</a>, and is a collaboration between Tom Whitwell and Tom Armitage"
---
