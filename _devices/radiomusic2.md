---
layout: module
permalink: /Radio-Music/

order: 0
designed: 2014
updated: 2026
title:  "Radio Music mk2 Eurorack Sampler Module"
module-name: "Radio Music"
categories: eurorack
image: /images/RM_and_radio_remote_Rev1.png
wide-image: "false" 
opening-image-wide: true
product-summary-position: below-image
excerpt: "is a sampler pretending to be a radio, with a cute remote control"
overlay: "NEW "

side-desc: "DIY sample playback module"
size: "4 HP"
depth: "25mm"
supply: "50mA current draw, 75mA with Remote"
mgrid: "https://www.modulargrid.net/e/music-thing-modular-radio-music"
github: "https://github.com/TomWhitwell/RadioMusic"
# schematic: "/collateral/RM_schematic1.pdf"
# manual: "https://github.com/TomWhitwell/RadioMusic/wiki"
buy:
  dealers_url: "/buy/#radio-music"
  diy:
    label: "DIY kit"
    text: "Build the module and use it by itself, or add Radio Remote for deeper control."
    dealers: true
  assembled:
    label: "Assembled"
    text: "Ready-made module, with the same optional Radio Remote control."
    dealers: true

product-summary:
  intro: "The classic Eurorack sample player and weird-sound-injector is back. It sounds better and does more, with an optional remote control for more fun."
  bullets:
    - "Use sound as a raw material for modular experiments"
    - "Hi-fi mono playback of long samples"
    - "Optional Radio Remote for hands-on control"
    - "Black or aluminium panels available"

actions:
  enabled: true
  label: "Start here"
  items:
    -
      label: "Radio Music Wiki"
      url: "https://github.com/TomWhitwell/RadioMusic/wiki"
    -
      label: "SD Card Audio"
      url: "https://github.com/TomWhitwell/RadioMusic/wiki/Audio-for-the-SD-Card"
    -
      label: "GitHub"
      url: "https://github.com/TomWhitwell/RadioMusic"

yt:
- 
  link: "9g2Q0esgBuk"
  title: "Perfect introduction to DIY Eurorack via Radio Music by MylarMelodies for Future Music"
- 
  link: "hzsolSURHvE"
  title: "Deep dive from Voltage Control Lab"
- 
  link: "-KxItwUJRFw"
  title: "Build and demo from Synth DIY Guy"
- 
  link: "y9yhMy0LvQo"
  title: "Me showing how to do fake timestretch on a Radio Music"
- 
  link: "2hgJmGDVoO0"
  title: "Study for dual Radio Music, beautiful ambient from Morn Valley, with potplants. "

gallery:
  enabled: true
  title: "Images"
  images:
    -
      image: "/images/MTM_Radio_Music_Front.png"
      webp: "/images/MTM_Radio_Music_Front.webp"
      alt: "Radio Music front panel"
      caption: "Radio Music front panel"
    -
      image: "/images/MTM_Radio_Music_3-4view.png"
      webp: "/images/MTM_Radio_Music_3-4view.webp"
      alt: "Radio Music angled view"
      caption: "Angled view"
    -
      image: "/images/MTM_Radio_Music-W_Remote.png"
      webp: "/images/MTM_Radio_Music-W_Remote.webp"
      alt: "Radio Music with Radio Remote"
      caption: "Radio Music with Radio Remote"
    -
      image: "/images/MTM_Radio_Music_racked_w_remote.png"
      webp: "/images/MTM_Radio_Music_racked_w_remote.webp"
      alt: "Radio Music and Radio Remote in a Eurorack case"
      caption: "In a case with Radio Remote"
    -
      image: "/images/MTM_Radio_Music_overhead-1.png"
      webp: "/images/MTM_Radio_Music_overhead-1.webp"
      alt: "Radio Music overhead view"
      caption: "Overhead view"
    -
      image: "/images/MTM_Radio_Music_overhead-2.png"
      webp: "/images/MTM_Radio_Music_overhead-2.webp"
      alt: "Radio Music and Radio Remote overhead view"
      caption: "Overhead view with Radio Remote"


pars:


- "Radio Music is a virtual radio module. It's a sample player that behaves a bit like a radio, a bit like a tape loop and a bit like an old sampler."
- "Think of it as a fun, controllable source of unexpected audio in a Eurorack system."
- "The Station knob picks a sample just like tuning a radio. The Start knob sets the start point if you retrigger with the Reset button."
- "Push the Start knob to enter pitch mode. Then the knob changes playback pitch and direction. That's really all you need to get started."
- "Radio Music works perfectly by itself, with all options available on the settings file on the SD card. The optional Radio Remote gives deeper and more tactile control to many of those settings."
- "Radio Music has been a popular DIY project since 2014. This 2026 mk 2 version is completely new: New hardware, new software, the same simplicity but lots more depth."
- "Unlike the noisy mk1, Radio Music mk2 now sounds gorgeous. Playback is hi-fi,  speed changes are smooth and tape-like, unless you want them  gnarly like an old Akai."
- "Specs: 
<ul><li>Extremely low latency (<2ms) playback of WAV, AIFF and RAW files up to 24-bit / 96kHz</li>
<li>Better than 86dB measured noise floor</li>
<li>Multi-hour file playback</li>
<li>Fluid forward and reverse playback from +2 oct to -2 oct</li>
<li>Supports microSD cards up to 2TB, up to 800 files on each</li>
<li>Calibrated v/Oct chromatic pitch mode</li>
<li>Speed modes: Tape, Chromatic, Nineties</li>
<li>Tuner modes: Sharp, Soft, Radio</li>
<li>Loop modes: Off, Forward, Ping-pong</li>
<li>Pulse In becomes pulse out in clock divider mode</li>
</ul>"
- "Like a radio, the module works on a series of banks and stations. Each of the 16 banks can contain many different stations. Each station is an audio file stored in a folder on the SD card. Choose a bank by pressing and holding the RESET switch. Choose a station by turning the STATION knob or plugging a voltage into Station."
- "Sadly it is not possible to update a mk1 Radio Music to add the features in mk2." 
- "Radio Remote is a 8mu USB MIDI controller with an alternative front panel, so  you can also use it as a normal MIDI controller. Other midi controllers will not work with Radio Music."
- "If you already have an 8mu, update the firmware to use it with Radio Music." 
- "Like mk1, Radio Music mk2 is designed to be hackable, with alternative firmware development actively encouraged. It runs on the same popular and powerful RP2040 processor as Workshop Computer and 8mu. We'll be sharing documentation and 'Hello World' files demonstrating file access and playback." 

---
