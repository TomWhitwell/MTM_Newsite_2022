---
layout: module
permalink: /Graphic-EQ/

order: 19
title:  "Graphic EQ Eurorack Module DIY"
module-name: "Graphic EQ"
designed: "November 2017" 
image: "/images/graphic_600.png" 
excerpt: "is a compact, clean, seven band Eurorack graphic equaliser" 
# overlay: "NEW "
thonk-url: "https://www.thonk.co.uk/shop/mtm-graphic-eq-kit/?utm_source=MTM&utm_campaign=Graphic" 
size: "6 HP"
depth: "25mm"
supply: "77mA"
mgrid: "https://www.modulargrid.net/e/music-thing-modular-graphic-eq"
github: "https://github.com/TomWhitwell/Graphic/"
schematic: "https://musicthing.co.uk/collateral/graphic_schematic.pdf"
yt:
- 
  link: "UOzfUe6o-qc"
  title: "Me talking about the history of graphic EQ at Thonk"
-  
  link: "lcR8zWEXC9I"
  title: "Fab build guide and demo from Synth DIY Guy"
-  
  link: "GfTwtb2YZt0"
  title: "Nice demo from Sunday Afternoon Modular"
-  
  link: "W9cRXlotMQ0"
  title: "Great build guide from Molten Modular"

pars:
- "A simple, compact and high quality seven band graphic equaliser for Eurorack. Inspired by the Boss GE-7 pedal, but with pristine low-noise circuitry and a much broader frequency range."
- "The design was inspired by <a href=https://www.modwiggler.com/forum/viewtopic.php?p=1637717#1637717>this post by rhizomatik on ModWiggler</a>, which suggested building an EQ based on the Boss pedal."
- "Push the faders up and to the left to boost, down and to the right to cut. By the time I realised that 'up and right' might feel more logical, it was too late"
- "The <a href=http://www.effectsbay.com/2015/11/guest-post-boss-ge-7-low-noise-modification/>problem with the Boss GE-7</a> is noise. A 7-band equaliser needs at least 9 op-amps. In 1981 when the GE-7 was designed, op-amps used a fair amount of power. To get the pedal working from a 9v battery, the designers used TL022 chips, which drew just 10mA in total, but have pretty poor noise specifications. Cutting frequencies works fine, but boosting high frequencies adds a lot of hiss. This module is much quieter."
- "It uses NE5532 op-amps, and is based on a design in <a href=https://amzn.to/2wTCfmn>Douglas Self's masterful 'Small Signal Audio Design'</a>. The 5532 isn't some boutique audiophile chip, but it's clean and works really well in this context."
- "The 5 x NE5532s in this module draw 7.8ma each, a total of 39ma from the chips, generating a little bit of warmth - you might be able to feel it on the panel. With 7 x LEDs, total current draw is around 77ma. If you're worried about current draw, you can you can pull the LEDs out of their sockets in the sliders and replace them as you like. If you're really worried, you could pull out the LEDs and replace the 5532s with TL072s, which would reduce the draw to just 14mA."
- "The default EQ range is a good general hi-fi spread, with a bit of bass-shaping and a wide 16khz boost to add 'air'."
- "You can modify the EQ range yourself by changing a few resistors and capacitors. If you want to do this, find an '<a href=https://www.ebay.co.uk/sch/i.html?_nkw=0805+resistor+capacitor&_sacat=0>0805 Resistor and Capacitor Sample Book</a>' from EBay. Calculating the ranges is fiddly: you want to select a frequency, a gain range, and a Q (width of the band) and obviously they're all interdependent."
- "The board is designed with 3 spaces for tuning caps for each channel, so you have space to experiment, combining caps to find precise values. Many are left empty in the default build."
- "Some frequency ranges found while researching this module:
<ul>
<li>Boss GE-7: 100hz 200hz 400hz 800hz 1.6khz 3.2khz 6.4khz
</li><li>
Douglas Self: 63hz 160hz 410hz 1khz 2.5khz 7.7khz 16khz
</li><li> 
API 560:  31hz 63hz 125hz 250hz 500hz 1khz 2khz 4khz 8khz 16khz
 </li><li>
MakeNoise FxD: 'Low' 198hz 373hz 692hz 1.411khz 'high' 
 </li><li>
Verbos Bark Filter: &lt;100hz 300hz 510hz 770hz 1.08khz 1.48khz 2khz 3.7khz 5.3khz 7.7khz &gt;10.5k  
</li><li>
Buchla 296: &lt;100hz 150hz 250hz 350hz 500hz 630hz 800hz 1khz 1.3khz 1.6khz 2khz 2.6khz 3.5khz 5khz 8khz &gt;10k  
</li><li>
Serge Resonant EQ: 29hz 61hz 115hz 218hz 411hz 777hz 1.5khz 2.8khz 5.2khz 11khz 
 </li><li>
Moog 914 Filter Bank: 'Low' 125hz 175hz 250hz 350hz 500hz 700hz 1khz 1.4khz 2khz 2.8khz 4khz 5.6khz 'high'
</li>
 </ul>"
- "If you feed the out back into the input, you can get the module to feedback, oscillating at the centre frequencies (find out if your components match the calculations). Experiment with inverting or boosting the signal in the feedback loop."
- "If you're assembling the pre-built kit from Thonk make sure you follow the instructions carefully - this is a dense board, so you're working around some tiny components."
---

