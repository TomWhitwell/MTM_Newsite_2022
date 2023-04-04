---
layout: module
permalink: /8mu_page/

order: 1
title:  "8mu Midi Controller DIY"
module-name: "8mu"
designed: "April 2019 - February 2023" 
image: "/images/8mu_900_card.png"
wide-image: "true" 
excerpt: "is a hackable midi controller that's smaller than a credit card" 
overlay: "SOON: "
thonk-url: "https://www.thonk.co.uk/shop/music-thing-modular-8mu-croydon-workshop/" 
# size: "18 HP"
# depth: "24 mm"
# supply: "52 mA"
# mgrid: "https://www.modulargrid.net/e/music-thing-modular-control"
github: "https://github.com/TomWhitwell/8mu_Public"
schematic: "/collateral/8mu_schematic.pdf"
manual-url: "/8mu"
manual-text: "Open the 8mu Documentation Site"




pars:
- "8mu is a pocket-sized MIDI controller, slightly smaller than a credit card."
- "8mu has eight faders that can send messages via MIDI."
- "8mu has has an accelerometer inside to measure how the device is being held. This creates eight more control signals, mapped to gestures like \"lift the front\" or \"turn me over\""
- "8mu has four tiny buttons along the top edge, which can be configured to send MIDI notes (like a keyboard) or controllers"
- "8mu contains 8 banks of settings which can be switched using the left and right buttons" 
- "8mu has leds hidden behind the faders. They glow through the slightly translucent fader track to indicate MIDI being sent from that fader, and which bank is being selected."
- "8mu comes as a DIY kit. The PCB is populated and programmed, you need to solder on the faders and assemble the whole thing." 
- "8mu gets power and sends data by USB-C. Only standard USB data lines are used, so it should work on any USB computer with an adaptor." 
- "8mu has a 3.5mm hardware MIDI output, which can be Type A or Type B."
- "8mu has a quick start guide printed on the back, or <a href=../collateral/8mu_quickstart.pdf>here's a quickstart PDF</a>"
- "8mu has a web editor where you can edit all the settings: <a href=https://tomwhitwell.github.io/Smith-Kakehashi>Launch the 8mu Editor</a>. It's magic (thanks, <a href=https://tomarmitage.com/>Tom</a>!). The browser (Chrome) talks to the 8mu via old-fashioned sysex messages."
- "8mu is inspired by and built upon the <a href=https://16n-faderbank.github.io/>16n project</a>. While the hardware is completely different, large chunks of the firmware and much of the web editor are from 16n. The hardware is evolved from Adafruit designs like the <a href=https://www.adafruit.com/product/3727>ItsyBitsy</a>."
- "Unlike 16n, 8mu cannot send i2c or CV. This is a hardware limitation due to the physical size - there's no room for any more 3.5mm sockets." 
- "At the moment, 8mu can't send DX7-style Sysex codes or high resolution NRPN messages. These are software limitations that could be resolved by a code contribution or an alt firmware." 
- "The accelerometer inside the 8mu is a Bosch BMI160, which is also used in <a href=https://dartslab.jpl.nasa.gov/References/pdf/2019-mars-heli.pdf>NASA's Ingenuity Mars Helicopter</a>."
- "Use a non-slip silicone gel pad to stick an 8mu to the top of a keyboard or Nord Micro Modular or whatever." 
- "You never need to go near any code to use 8mu, it's configurable from the web editor, and easy to update with drag-and-drop files." 
- "But 8mu is also designed to be open and hackable. It can be re-programmed in Arduino or Circuit Python code, and makes a good platform for experimenting with algorithmic music generation. You could probably add OSC control, and can even output (loud and gnarly) audio from the 3.5mm MIDI port."
- "This project started in April 2019, when Marc Weidenbaum posted this message: <i>This is my occasional \"Isn't there some sorta readily available very small MIDI controller, like the size of a cellphone, with a couple buttons, a couple faders, a couple knobs?\" post.</i>, then mentioned the <a href=https://www.switch-science.com/products/2394/>k4b4 mk2</a> as an example tiny DIY kit. I made a <a href=https://disquiet.com/2020/04/05/have-midi-will-travel/>little MIDI controller</a> for him, but for myself, I really wanted something smaller and thinner. Over the next few years, a simple board with 8 faders sprouted buttons round the edges, an accelerometer, LEDs shining through the faders and a neat web editor. That, and the global chip shortage, is why it took so long."
- "The long, long process of developing 8mu inspired <a href=https://www.musicthing.co.uk/Control/>Control</a>, and looking at <a href=https://medium.com/music-thing-modular-notes/make-knob-twiddling-great-again-47065a346c2>Human-Sized Musical Interfaces</a> and The Cult of Big Knobs."

---

