---
layout: module
order: 1
title:  "Control Big Knob Eurorack Module DIY"
module-name: "Control"
designed: "June 2020" 
image: "/images/control_600.png"
wide-image: "true" 
excerpt: "is four big finger-friendly knobs for precise and playable tweaking." 
# overlay: "Coming Soon: "
thonk-url: "https://www.thonk.co.uk/shop/mtm-control/?utm_source=MTM&utm_campaign=Control" 
size: "18 HP"
depth: "24 mm"
supply: "52 mA"
mgrid: "https://www.modulargrid.net/e/music-thing-modular-control"

yt:
- 
  link: "uJXkvtaTrFw"
  title: "Great build video from Synth DIY Guy"
- 
  link: "qls51A1kAvI"
  title: "Detailed build video, by me on my messy desk"
- 
  link: "vRWVPjUEyNo"
  title: "Short but lovely clip of Marcus Fischer playing a prototype Control"
- 
  link: "qm7WCuAJPtk"
  title: "A lot of Control in this long clip from Boodaman"


pars:
- "After spending a lot of time working on smaller and smaller projects, I realised that many Eurorack synths were missing something critical: controls that are big enough to be fun."
- "I wrote a longer piece about <a href=https://medium.com/music-thing-modular-notes/make-knob-twiddling-great-again-47065a346c2>Human-Sized Musical Interfaces</a>, touching on NASA guidelines, the cult of vintage test equipment and DJs suffering from Hot Knobs."
- "Control is an absurdly simple module: Four big knobs that output voltages. Connect those voltages to modules, and you have high-precision, intuitive control. Connect those voltages to several modules, and you have interesting, repeatable confusion."
- "The first two channels (top two knobs) are also attenuators if something is plugged into the leftmost sockets."
- "The voltage on each channel can be 0–5v (middle), 0–10v (up), or -5v to +5v (down). When using a channel as an attenuator, keep it in 0–5v or you’ll get weird gain or offset (which you may want)."
- "There are two extra outputs. Change outputs just the changes as they happen. If a knob is turned quickly to the right, it will output a little burst of positive voltage. If a four-handed performer turns all four knobs quickly anti-clockwise, it will output a chunky pulse of negative voltage. Patching Change into an input creates a primitive clock."
- "Diff is a difference rectifier, inspired by <a href=http://nonlinearcircuits.blogspot.com/2012/11/neuron-difference-rectifier-pcbs.html>NonlinearCircuits</a>, but with a slightly different circuit. It compares the difference between 1&2, and between 3&4, and finally outputs the difference between those two differences. The aim was to create a bumpy, unpredictable voltage between 0 and 10v. It’s not random, but it’s not easily predictable, either."
- "Each knob has its own bi-colour LED to provide visual feedback on how much voltage is being output. There are also LED indicators for the Change and Diff outputs."
- "And that's just about it. The circuit isn't designed to be super precise. It works best when you patch into a bunch of points in a complex patch, then just sit back, listen, and make small (or big) movements with the knobs."
- "The pots themselves are a bit special: high quality TT Electronics P260T – as used in SynthTech modules and many 5U synths. They have steel shafts bolted to the front panel and they feel great."
- "It's a relatively simple build - all PCB components are pre-soldered SMD, so the assembly is mainly LEDs, pots and a slightly fiddly mechanical process. Watch me building a kit below."

---

