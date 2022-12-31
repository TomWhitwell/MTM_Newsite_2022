---
layout: module
permalink: /Move/

order: 4
title:  "Move Eurorack Module DIY"
module-name: "Move"
designed: "2022"
image: "/images/move-black_600.png" 
excerpt: "is a clicky, meditative motion-sensitive module" 
overlay: "NEW "
thonk-url: "https://www.thonk.co.uk/shop/mtm-move/" 
size: "4 HP"
depth: "25 mm"
supply: "40 mA"
schematic: "collateral/Move_Rev1_Schematic.pdf"
mgrid: "https://www.modulargrid.net/e/music-thing-modular-move"
manual: "collateral/Move_Manual_2022.pdf"

yt:
- 
  link: "qqdTFyolurw"
  title: "My big face explaining how this works"



pars:
- "This is how this happened. I was watching <a href=https://www.timhunkin.com/a241_component-videos.htm>The Secret Life of Components</a> with Tim Hunkin, the episode on Sensors, where he <a href=https://youtu.be/FNnP84tTSFY?t=2765>started talking about PIR Sensors</a> - those simple sensors inside garden lights that turn on when you move. "
- "My initial idea for Move was to create something slightly meditative: to 'lock' your modular so you can't get too close, or fiddle with it. You have to step back and listen, because any change cuts off the audio. "
- "But of course there are lots of other ways to use it: Run two clocks through the two switches, into one sequencer, and patterns will speed up or slow down depending on whether you're moving." 
- "Or, turn your modular into a huge, expensive, and annoying burglar alarm and cat-frightener." 
- "Move uses an actual garden light sensor, so it comes on immediately, then there's a delay for a couple of seconds before it switches off." 
- "The sensor controls a two-channel relay. The relay acts as a mechanical switch connecting each input with its output. It’s a completely passive connection - just a wire - so can actually be connected in either direction. It should be a perfect connection with no signal degradation. " 
- "You’ll hear a click from the module every time the relay flips. If you find this annoying while you’re not using the module, connect a cable from ‘Move’ to one of the inputs, and it will stop clicking." 
- "With both switches in ‘MOVE’ position, there is only a connection between input and output when the module detects movement (or during the 1-2 second delay after movement). With switches in ‘STOP’ the situation is reversed. Signal only passes when the module detects no movement. "
- "If nothing is plugged into an input, it's normalled to +5v, so you can use the movement as a gate signal."
- "The FLIP input overrides the PIR sensor. Add a square wave, LFO or any other signal, and the relay will flip each time it passes above the threshold, which is around or just below one volt. The relay is pretty fast, and can flip at low audio rates — this is very audible from the module itself. If you're interested in this idea, have a look at the <a href=https://www.tindie.com/products/hackmodular/1606-electro-magnetic-switch/>Hack Modular 1606 Electromagnetic Switch</a> or the <a href=https://gieskes.nl/eurorack/?file=relay-perc>Geiskes Relay-Perc</a>."
- "<a href=../collateral/Move-Module-Documentation-Build-Guide.pdf>Move Build Guide</a>" 
- "<a href=../collateral/Move_Manual_2022.pdf>Move Manual</a>"



---

