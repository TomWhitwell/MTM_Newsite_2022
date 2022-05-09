---
layout: module
permalink: /Radio-Music/

order: 4
designed: 2014
updated: 2017
title:  "Radio Music Eurorack Sampler Module"
module-name: "Radio Music"
categories: eurorack
image: /images/radio-music_600.png
excerpt: "is a sampler pretending to be a radio, inspired by John Cage"
# overlay: "NEW"

thonk-url: "https://www.thonk.co.uk/shop/radio-music-full-diy-kit/?utm_source=MTM&utm_campaign=RadioMusic"

side-desc: "DIY sample playback module"
size: "4 HP"
depth: "40mm"
supply: "75mA"
mgrid: "https://www.modulargrid.net/e/music-thing-modular-radio-music"
github: "https://github.com/TomWhitwell/RadioMusic"
schematic: "/collateral/TuringMachine_schematic.pdf"


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


pars:
- "Radio Music is a virtual radio module, so it behaves a bit like a radio. It is designed to be a source of unexpected audio, not a drum loop player or a sample mangler. That said, plenty of people enjoyed it for playing drum loops or mangling samples."
- "Radio Music has been a popular DIY project since 2014, and has been used by <a href=https://twitter.com/chris_carter_/status/562889299621076993>Chris Carter</a>, <a href=https://twitter.com/russellhaswell/status/552213743363690496>Russell Haswell</a>, <a href=https://vimeo.com/150015591>Richard Devine</a>, and <a href=https://www.youtube.com/watch?v=mfrWxACXkzs>Robin Rimbaud</a>."
- "In 2017, the module's firmware was completely rewritten and updated, bringing new features including pitch shifting, .wav file support and a new way to configure settings on the module. You can <a href=http://polyfather.com/radio_music/>download the latest firmware here</a>, which will run on any Radio Music module. "
- "It's a well documented project, with a lengthy <a href=https://github.com/TomWhitwell/RadioMusic/wiki>Radio Music Wiki</a> and an active <a href=https://github.com/TomWhitwell/RadioMusic/issues?utf8=%E2%9C%93&q=is%3Aissue>issues list</a> for people seeking help with a build."
- "Like a radio, the module works on a series of banks and stations. Each of the 16 banks can contain many different stations. Each station is an audio file stored in a folder on the SD card. Choose a bank by pressing and holding the RESET switch. Choose a station by turning the STATION knob or plugging a voltage into TUNE."
- "Radio Music runs on a <a href=https://www.pjrc.com/teensy/>Teensy</a> 3.1 (or 3.2) microcontroller, which is programmed by USB and runs a very well documented Arduino-like language, so it's easy to hack."
- "Because the audio streams from the SD card, it can handle long files easily. In the default setting, it switches between long recordings just as if they were radio stations — as if the audio was playing in the background."
- "There are multiple alternative firmwares for Radio Music <a href=https://github.com/TomWhitwell/RadioMusic/wiki/Alternative-firmware-for-Radio-Music>documented in the github</a>, and on <a href=https://www.voltagecontrollab.com/2016/10/25/radio-music-alternative-firmware/>Voltage Control Lab</a> including: <ul> <li>Chord Organ is just an alternative firmware for Radio Music, but is also available as a separate module. You can turn a RM into a CO (or vice versa) at any time using a normal Micro USB cable. </li>
<li><a href=https://www.modwiggler.com/forum/viewtopic.php?p=2623815#2623815>Telharfauxnium</a> is an additive synthesis firmware.  </li>
<li>James Carruthers has written <a href=https://github.com/jamescarruthers/RadioMusicAltFirmware>several different firmwares</a>, including a cool 808 drum machine</a>
</li><li>
I often use this <a href=https://www.youtube.com/watch?v=znC3cyozuME>Loop Divider</a> firmware to sync everything to loops in a small case.</li></ul>"

---
