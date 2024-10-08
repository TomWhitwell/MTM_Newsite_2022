---
layout: module
permalink: /Mikrophonie/

order: 1
title:  "Eurorack Module DIY"
module-name: "Mikrophonie v3"
image: "/images/microphonie_2023_both_600.png" 
wide-image: "false" 
designed: "2023"
excerpt: "is an updated contact mic and preamp for your modular" 
# overlay: "NEW "
thonk-url: "https://www.thonk.co.uk/shop/mtm-mikrophonie-kit/" 
size: "4 HP"
depth: "25mm"
supply: "20mA"
mgrid: "https://www.modulargrid.net/e/music-thing-modular-mikrophonie-2017-new-panel-design"
github: "https://github.com/TomWhitwell/Mikrophonie"
schematic: "/collateral/mikrophonie_2023-Schematic.pdf"
yt:
- 
  link: "EwOx5rDguJo"
  title: "DivKid's quick introduction"
- 
  link: "GQ_bLAqGKEA"
  title: "Leafcutter John's Mikrophonie workout"
  
- 
  link: "qwv4aq1Mpa4"
  title: "Hydrophone demo"
  
- 
  link: "PsawWhYBWSg"
  title: "Scanner at the Mikrophonie"
  

pars:
- "Mikrophonie is a microphone preamp with a piezo contact mic built into the panel. It is an easy way to bring environmental noise and feedback into a modular system, inspired by the early days of electroacoustic music in Paris and Cologne, and by the contact microphone and phonograph cartridge experiments of John Cage, Gordon Mumma, Robert Ashley and Nicholas Collins."
- "It also works very well as a way to trigger Mutable Instruments Rings and Elements, and as a generally weird tactile CV source."
- "Since the first Mikrophonie in 2014, it's become one of the most popular eurorack DIY projects (spotted in <a href=https://thevinylfactory.com/news/ryuichi-sakamoto-death/>Ryuichi Sakamoto</a>'s modular)."
- "The original Mikrophonie was a very simple design: Just a contact mic and a pre-amp in a raw textured panel. In 2016, Émilie Gillet took the original open-source design and completely re-designed it, creating <a href=https://pichenettes.github.io/mutable-instruments-documentation/modules/ears/>Ears</a>, with cleaner amplification and added envelope follower and gate outputs. Branded 'Mutable Music Things' it was an improvement in every way." 
- "Since Mutable Instruments <a href=https://www.gearnews.com/mutable-instruments-no-new-modules-and-production-shutting-down/>closed in 2022</a>, Ears hasn't been available, so this 2023 edition Mikrophonie (you might call it Mikrophonie 3) takes Émilie's design, moves the LEDs to more sensible places and boosts the gain a little."
- "In other words, Mikrophonie + Ears + louder = this new Mikrophonie." 

- "Mikrophonie comes with a pre-soldered surface-mount circuit board, so is a very simple and satisfying build, perfect for a first project. The <a href=https://www.instagram.com/explore/tags/mikrophonie/>Instagram #mikrophonie tag</a> is a great source of ideas and inspiration and confidence-boosting successful builds."
- "The panel is PCB with patches of raw fibreglass and raised gold-plated traces. Rubbing it with a finger or a plectrum creates quite a wide range of sounds. The back of the panel is plated and grounded for shielding."
- "REVERSIBLE PANELS: The original Mikrophonie had sockets at the bottom, Ears had sockets at the top. This Mikrophonie gives you the choice - if you buy it from Thonk you'll get a choice of two panels." 
- "The mic will also pick up all the physical sounds in your modular - patching, cables rustling, switches, fingers on knobs - without picking up airborne sounds like the sounds your modular is making. At very high sound levels will pick up vibrations from the speaker output and start to feedback."
- "JUMPER SETTINGS: The way the Envelope Follower and Gate output respond can be modified using the jumpers on the back of the board." 
- "GATE JUMPER: The Gate has a Threshold setting, adjusting sensitivity. With no jumper in place (just put it onto one pin so you don't lose it), the gate opens when the signal reaches 4v. With the jumper on the bottom two pins (away from the power header), it's 2V. At the top, it is most sensitive, triggering with just 1V. This is the default."
- "ENVELOPE JUMPER: The envelope has settings to adjust release and attack speeds, they work in the same way as the Gate, with settings marked on the PCB. The default is fast for both."
- "Patch Ideas: 
<ul>
<li>Gently tap the piezo element to produce a strong
trigger, that will open a low pass gate or trigger a
Maths envelope.</li>
<li>Use the outputs as voltage sources, rather than
audio sources; FM an oscillator with the output. Works
well with low frequency signals like pinged springs.</li>
<li>The circuit is DC coupled so that very low frequency
modulations (i.e a bouncing spring, a flexing piece of
wood) might be like an LFO source. However Peizo
elements only produce a signal while their stress is
changing. Pressing and holding the panel will not
produce a sustained high signal.</li>
<li>You can also use the mic input as a massively highgain
bright op-amp distortion/fuzz/boost for other
modular signals.</li>
<li>Switches + patching + touching patch cables = fun. </li></ul>"
- "This is a fairly simple build, but if you have any issues, the best way to get help is to check the <a href=https://github.com/TomWhitwell/Mikrophonie/issues>GitHub Issue List</a>, and remember to check closed issues as well as open ones."


---

