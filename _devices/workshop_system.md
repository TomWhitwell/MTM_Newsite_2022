---
layout: documentation
permalink: /workshopsystem/
 
order: -1
title:  "Workshop System DIY"
module-name: "Workshop System"
designed: "October 2024" 
image: "/images/900-workshopsystem-full-straight-headphones-red.jpg"
wide-image: "true" 
excerpt: "is a complete DIY modular synth that's smaller than a hardback book" 
overlay: "SOON: "
thonk-url: "https://www.thonk.co.uk/" 
# size: "42 HP"
# depth: "24 mm"
# supply: "250 mA"
# mgrid: "https://www.modulargrid.net/e/music-thing-modular-control"
github: "https://github.com/TomWhitwell/"
# schematic: "/collateral/8mu_schematic.pdf"
# manual-url: "/8mu"
# manual-text: "Open the 8mu Documentation Site"




---

![Music Thing Workshop System in a black case with some headphones](/images/900-workshopsystem-full-straight-headphones-colour-2.jpg)



<h1>	<homepage_body>Music Thing Modular Workshop System</homepage_body></h1>
<br>
Music Thing Modular Workshop System is a complete modular synth. It is slightly smaller than a hardback book. It comes in a foam-lined hard case. 


It will be [available exclusively as a DIY kit from Thonk](https://www.thonk.co.uk/workshopsystem/), with the first small batch arriving before the end of 2024, costing around £400 (including sales taxes). 

To find out more about the Workshop System:  
* **Subscribe to the [Workshop System newsletter](https://workshopsystem.substack.com/)** — monthly-ish, for owners and the owner-curious
* **[Join the waitlist now at Thonk](https://www.thonk.co.uk/workshopsystem/)**
* **Follow [@musicthingmodular on Instagram](https://www.instagram.com/musicthingmodular/)** 

![Music Thing Workshop System being played in Cornwall](/images/900_jess_square.jpg)


{% include linkedHeading.html heading="What is the Workshop System? " level=3 %}

The Workshop System is an analogue modular synth and a powerful audio computer. 

It was designed for the [Dyski Sound Maps Residency](https://dyski.co/Port-Navas-Sessions) in April 2024 — played above by [Jess Borders](https://www.instagram.com/thinkofasoftcarpet/), picture by [Hannah de Oliveira Whitlock](https://hannahdeoliveirawhitlock.com/). 

(By the way, you can subscribe to the [Dyski mailing list here](https://dyski.co/Subscribe) if you want to know about future events including Sound Maps 2025.) 

The Workshop System was designed to be useful and open: 
* A genre-neutral toolkit, a little box of ways to make and manipulate music and sound. 
* A patchable, hackable, code-able modular synth that can be used in many different ways.
* A system that works with things you already have. Plug in your phone, a drum machine, a laptop, guitar pedals or a microphone. 
* A computer that uses tiny program cards that are completely hackable. Anyone who writes code can make, share, sell their creations — sequencers, effects, interfaces.  

![Music Thing Workshop System Computer section](/images/900-computer_colour.jpg)

{% include linkedHeading.html heading="What's inside? " level=3 %}

The Workshop System has 14 modules:    
* **2 x SineSquare Oscillators** Simple vintage-style oscillators made of 1970s tech.  
* **2 x Humpback Filters** Similarly vintage-style filters, designed by [Philip Goulding of God's Box](https://godsbox.co.uk/humpback.html).  
* **2 x Slopes** These work as attack/decay envelopes, LFOs and portamento generators.  
* **Computer**  Is a multi-function module with knobs, a switch and audio, CV and pulse ins and outs. Initially, the system comes with a USB MIDI card, a Turing Machine sequencer and a Reverb card. A community of programmers are creating more cards. 
* **Stereo In** takes a 3.5mm stereo input and boosts it to modular level. 
* **Ring Mod** is a great-sounding ring modulator, connected to the two sines. It also works as a simple VCA. 
* **Stompbox** is an interface for guitar pedals, with blend and feedback controls to make boring pedals more interesting. There's a 9v power outlet for pedals below this module. 
* **Amplifier** contains two simple circuits. One is connected to a piezo contact mic behind the panel, the other is the transistor-based input circuit from a MiniMoog. In other words, a [Mikrophonie](/mikrophonie) and a [Mini Drive](/Mini-Drive). 
* **4 Voltages** is a minimum viable keyboard: four voltage outputs, one knob, four pushbuttons. More fun to play with than to explain. 
* **Mix** a simple output mixer, with two stereo channels, two mono channels and a powerful headphone amp / line out. 
* **PSU** behind the panel is a power supply that runs on USB-C PD power or professional 15-25v barrel connectors. It works from battery powerbanks and laptop adaptors, most likely something you've already got at home. 


![Music Thing Workshop System Computer section](/images/900_leftside_angle_1_small_color.jpg)

{% include linkedHeading.html heading="Workshop System FAQ " level=3 %}

* **Does it come with the case?** Yes
* **Can I take it out of the case?** Yes
* **Does it need patch cables to work?** Yes, it makes no sound at all before being patched. 
* **How hard is it to build?** All the active components (chips, transistors, resistors etc) are already installed. The Thonk Kit contains four PCBs that need to be populated with Pots, Switches, LEDs, power headers and sockets. Then all the hardware — nuts, knobs, spacers - needs to be installed. It's fairly time consuming, maybe 1-4 hours, but not difficult for anyone who has soldered a few kits before. If you made a Mikrophonie or 8mu and enjoyed the process, you will enjoy this. If you've made a Turing Machine, you're almost over-qualified. If you've never soldered anything before, this probably isn't the best way to start. Instead, look out for a build workshop, or get in touch if you'd like to organise one. 
* **Is it Eurorack compatible?** Yes, you can remove the back panel PSU and put it in a Euro case - 42hp, around 250mA current draw. 
* **How do the program cards work?** The microcontroller in Computer is an RP2040, the same as a Raspberry Pi Pico. The program cards are the entire flash memory for the Computer, so there is no firmware on the device itself. They can be programmed in C/C++ (Pico SDK), Arduino Pico, Circuit Python or anything else that works on RP2040. Program cards can be re-programmed or updated over USB with a simple drag-and-drop process. You're welcome to sell or give away any code you create, and can make your own custom cards if you want. 
* **Is there any normalisation?** There is minimal normalisation built in - the two oscillators cross-modulate, and are patched to the Ring Mod, and the top filter High/Band Pass flows into the bottom filter input. So you need a lot of patch cables. However, all the normalisation points are clearly marked on the back of the PCBs, so it's easy to add your own (removable) normalisation connections with wire and solder. 




![Music Thing Workshop System](/images/900-full-nocase.jpg)




