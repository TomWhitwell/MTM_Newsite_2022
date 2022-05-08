---
layout: module
order: 6
title:  "Spring Reverb DIY module for Eurorack Modular"
module-name: "Spring"
designed: "2013"
updated: "2017"
categories: eurorack
image: /images/spring2_600.png
excerpt: "is a fun, versatile spring reverb for modular, built for experimentation" 
# overlay: "NEW"
thonk-url: "https://www.thonk.co.uk/shop/turingmkii/?utm_source=MTM" 
size: "6 HP"
depth: "40mm"
supply: "75mA"
mgrid: "https://www.modulargrid.net/e/music-thing-modular-spring-reverb-mkii"
github: "https://github.com/TomWhitwell/Spring-Reverb-Mk-2"
schematic: "/collateral/SpringReverbMk2-Schematic.pdf"

yt:
- 
  link: "dQl8YyCtgHE"
  title: "DivKid's introduction to the module"
- 
  link: "OKJYk8k4YNw"
  title: "Super detailed build and demo video"
- 
  link: "out6CbqSBWY"
  title: "Lovely build video from LeoMakes"


pars: 
- "Spring is a flexible, easy-to-build voltage controlled DIY mono spring reverb module. Traditional guitar reverbs are tuned to the sound of the guitar and the amplifier it is played through. This circuit is different; designed to be relatively clean and hi-fi, with a lot of bass response. "
- "I wrote a longer piece about spring reverb and this module over on Medium: <a href=https://medium.com/music-thing-modular-notes/everything-i-know-about-spring-reverb-1fb4b32abf87>Everything I know about Spring Reverb</a>."
- "The module works with either external electromechanical reverb tanks or a solid-state reverb 'brick' from Accutronics that fits on the back of the module."
- "The Brick is a curious <a href=https://www.google.co.uk/patents/US8204240>patented</a> device designed in 2007 by <a href=https://neunaber.net/>Brian Neunaber</a>. Inside the epoxy block are three PT2399 chips. These are cheap digital delay chips designed for  karaoke machines. The brick uses them to create short reverb-like delays. I used to have a Dynacord VRS23, a rackmount analog delay from the '80s. It had a 'reverb' mode that sounded very like one of these bricks. 
Only  <a href=http://www.accutronicsreverb.com/main/?skin=sub01_05_1.html>BTDR-2H</a> bricks will work (you can also use BTDR-2V bricks, but they'll poke out the back of the module some way)."
- "The 2017 mkii version added a feedback control and a feedback inversion switch, to add anything from a subtle 'glow' to screaming howlround."
- "Reverb is a really complex audio signal - multiple copies of the original sound (including the original itself), delayed and filtered by different amounts. That's why phase is important. Signals that are in phase get louder, signals that are out of phase get quieter. "
- "Instead of reading all this, <a href=https://www.youtube.com/watch?v=dQl8YyCtgHE>here's DivKid's brilliant explanation of the module and how it works</a>."
- "And, if you're thinking about building one yourself, <a href=https://www.youtube.com/watch?v=OKJYk8k4YNw>here's Markus Fuller's fantastic and very detailed build and theory video</a>."
- "The feedback switch inverts the signal as it feeds back into itself, or turns feedback off. With a spring, the difference is hard to describe but easy to hear - one version might be brighter, the other duller. One might feed back easily, the other more reluctantly. With a brick, runaway feedback seems to only happen in one position (the middle setting) while the bottom setting feels more like a short delay. In both cases, results will be unpredictable. The input signal has a huge impact on the output. Sometimes, feedback is immediate and uncontrollable, other times it never comes. That's one reason why feedback isn't CV controlled; it normally seems to need a human ear and hand as part of the circuit (though it's easy to patch CV-controlled feedback by putting a VCA in the feedback loop.) It's all about experimentation - flick, turn, listen, keep your hand on the controls to stop runaway noise (or encourage it)."
- "The feedback input can also be used as a second input to the reverb, with the level set by the feedback control - making it a simple two-channel mixer."
- "The x-fade input turns the module into a voltage controlled crossfader. The circuit uses a vactrol, so has a little bit of lag (or bounce). Both inputs must be used - unfortunately you can't really crossfade into silence and have it work like a VCA. Also, the inputs are AC coupled so you can't crossfade control voltages."
- "Patch anything between wet out  and feedback in to disrupt the feedback path; bandpass filters are particularly effective, delays or waveshapers are fun. A phaser will be interesting."
- "I'm very happy with how this circuit sounds, <a href=https://soundcloud.com/musicthing/voltage-controlled-spring>particularly in this audio demo</a>."
- "But it’s not always easy to coax such smooth tones from a spring reverb. Don’t assume there is a fault with your module if you don’t immediately get this kind of sound - I made that mistake a few times on breadboard. Here’s what I’ve learned about getting a good,rich, warm, clean sound. What you get out depends on what you
put in. By far the biggest factor in the tone of the
reverb is - obviously - the tone being fed into it.
Software reverbs can put the same smooth
mushy sound over whatever your run into them.
This isn’t like that at all. Remember that it’s a
physical system moving about, driven by
magnets and electricity and springs.
I’ve found that smooth, clean, FM-ed sinewaves
work very well with the springs. On the other hand, square waves
try to bash the springs about. There’s no way that
a magnet can move a spring in anything like a
square wave, so the sound coming out will sound
little like a square wave. Small changes in the input sound can be
amplified and enhanced by the reverb."
- "Spring reverb tanks come in many flavours. If you're buying a new tank for this module, I’d recommend one of these fairly common models: Accutronics 9EB2C1B A big 17” long reverb
tank with six springs. Accutronics 8EB2C1B A smaller 10” version with three springs. This is the tank from a Fender Blues Junior amp, so is very common. Other makes with the same number (i.e. MOD 8EB2C1B or Ruby 3EB2C1B) should also work."
- "The Tested spring specs are: 
<ul><li>Input: 150Ω to 800Ω  </li>
<li>Output: 2,250Ω to 2,575Ω </li>
<li>Insulated input, Grounded output</li></ul>"
- "
Beyond this range, you may need to do some research or experimentation. Accutronics/Belton tanks all have a code like 9EB2C1B. 

<ul>
<li >The first number doesn't matter to the circuit (it's the size). 
</li>
<li >The second code (E) is input impedance: should be B, C, D or E.
</li>
<li >The third code (B) is output impedance: should only be B. 
</li>
<li >The fourth code (2) is the decay time, the circuit doesn't care.  
</li>
<li >The fifth code (C) describes the connections, and is important. It must be C = Input Insulated / Output Grounded. This module assumes Red=Output, White=Input. Check your tank carefully. The mini tanks that come with a Doepfer A199 are sometimes coded differently.
</li>
<li >The sixth & seventh codes (1B) are about locking systems and orientation. The circuit doesnt care.  
</li>

</ul>"

- "Choice of spring tank is not absolutely
critical. Big long six spring tanks will sound
bigger than small tanks, but I’ve found that - at
least with my limited selection - it is less
important than the other factors in this list. I got
pretty good reverb from the tiny plastic-boxed
new reverb that Belton are developing. You can
use EQ to compensate for the choice of tank to
some extent."

- "Hum is caused (and can often be cured)
by the exact position of the tank. A reverb
tank is not unlike a big, highly amplified singlecoil
guitar pickup. It will pick up 50/60hz mains
hum, particularly from transformers but probably
also from dimmer switches or fluorescent tubes.
That hum can often be stopped completely by
moving the tank away from the source or - often
more practically - by just changing the position of
the tank. Try shifting it through 90 degrees - on
whichever axis is practical - and often the hum
will drop. If you want to mount your tank inside a
case, experiment with the exact position to find
the quietest spot before fixing anything."

- "Noise (hiss, white noise, not hum) is
caused by the high-gain op amp in the
recovery section. I’ve tried to reduce it as far
as possible by using low-impedance resistors. I
also tried two lower-gain op amps in series, which
seriously increased the noise. It may be that
using other dual op-amps could reduce this noise
even further. Or just think of it as tape hiss,
adding mojo."

- "Spring reverb is chaotic and hard to
predict. Spring reverb is a strange, gnarly,
physical effect. When I tried to calibrate and
measure this circuit, I’d find that a sine wave at,
for example, 400hz, might barely excite the
springs at all, while a sine at 405hz would bust
them into fuzzy overdrive. Change a component,
and that response changes completely."

- "The Spring Reverb is a fairly straightforward through-hole DIY build, but it's fairly dense and takes a while to complete, so probably shouldn't be a first DIY project (I always recommend Mikrophonie or Mini Drive as a first build). Build documents are <a href=https://www.thonk.co.uk/shop/mtm-spring-reverb-mkii-kit/?utm_source=MTM&utm_campaign=SpringPage>available from Thonk</a>. If you get stuck, the <a href=https://github.com/TomWhitwell/Spring-Reverb-Mk-2/issues>Github Issue List</a> is probably the best place to start - remember to check closed issues as well as open ones. "

- "Once you've built the module, don't forget to calibrate it, using the trimmer behind the main pot. Balance the gain so it doesn't overdrive the spring, and matches the dry signal. Trimming has no effect on the Brick reverb. "


---
