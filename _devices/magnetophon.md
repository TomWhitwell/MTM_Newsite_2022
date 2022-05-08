---
layout: module
order: 8
title:  "Magnetophon Cassette Head Eurorack Module DIY"
module-name: "Magnetophon"
designed: "February 2017"
image: "/images/magnetophon_600.png" 
wide-image: "false" 
excerpt: "is a cassette player without the transport mechanism" 
# overlay: "NEW "
thonk-url: "https://www.thonk.co.uk/shop/magnetophon/?utm_source=MTM&utm_campaign=magnetophon" 
size: "4 HP"
depth: "25mm"
supply: "40mA"
mgrid: "https://www.modulargrid.net/e/music-thing-modular-magnetophon"
github: "https://github.com/TomWhitwell/Magnetophon"
schematic: "/collateral/Magnetophon_schematic.pdf"
yt:
- 
  link: "uZ9BOvkQfTw"
  title: "Rubbing the tape head across tape stuck to a sheet of foamcore"
- 
  link: "BKAYTWHYULU"
  title: "Intense experimentation from Neal Beard"
- 
  link: "HT7xCO0VnVQ"
  title: "New Electronic Frontier build and demo"
-
  link: "In47yH80xZM"
  title: "Great video of Urshs using Magnetophon with VCV Rack"

pars:
- "Magnetophon is a cassette player without the transport mechanism — a mono cassette head in the panel and a NAB equalised amplifier circuit, this is a tool for experiments with tape."
- "With a mono cassette head in the panel and a NAB equalised amplifier circuit, Magnetophon is a tool for experiments with tape. Try rubbing old cassette tapes on the panel, or attach a head on a wire to recreate <a href=http://www.medienkunstnetz.de/works/random-access/images/3/>Nam June Paik’s Random Access</a> or Laurie Anderson’s Tape-Bow Violin."
- "NAB stands for National Association of Broadcasters. Their <a href=http://www.richardhess.com/tape/history/NAB/NAB_Reel_Tape_Standard_1965_searchable.pdf>Reel-to-Reel Standard of 1965</a> specifies how tape heads should be amplified. If you plug a tape head into a microphone pre-amp, you get a very tinny sound with no low frequencies at all. Tape playback amplifiers (like the one in this module) boost bass by up to 10dB at 16Hz, while cutting highs by up to 20dB at 20kHz. Tape recorders apply the opposite curve when recording to tape."
- "Don't expect a handheld cassette head rubbing against free-running tape to sound very hi-fi. It turns out all that head alignment and bias adjustment stuff wasn't BS after all."

- "When experimenting with normal cassette tapes, a few things to remember: Stereo tapes carry four signal tracks; Left & Right Forward, and Left & Right Backward. So expect a bit of chaos."
- "I've experimented with spoken word and language cassettes, forgetting that a decent proportion of them is just silence between words."

- "If you have a reel-to-reel tape recorder, you can use an external tape head in a binder clip as a holder for tape loops. This will create a second output from the loop. It's likely to be MUCH lower fidelity than the main tape recorder output, but can sound really interesting mixed with the original signal (very Brian Eno tape loop-ish).
<a href=https://www.instagram.com/p/BWDA_dclcYF/>Here's a quick demo of this technique from Brighton Modular Meet</a>."


- "The tape head inside the panel is fairly impractical for tape use, but can potentially be used for playing the magnetic strips on credit cards, MetroCards and the like. It will also pick up any electromagnetic noise and interference within your case (from switching power supplies, digital modules, colour-changing LEDs and the like)."

- "This is a fairly primitive and very high-gain circuit. In some situations, particularly when using the internal head, the circuit can oscillate. At audio frequencies this will sound like a whine. At frequencies above human hearing, it can just sound like silence, which drowns out whatever signals the tape head is trying to amplify. There is an empty spot for an extra capacitor on the PCB (C7). If you're having problems, try a small capacitor there; maybe 470pf, 1nf or more. Higher values will reduce the overall high frequency response. When using the external head, the capacitance of the cable seems to reduce the problem."

- "This is a fairly simple build, but a rather exotic module. If you have any issues, the best way to get help is to check the <a href=https://github.com/TomWhitwell/Magnetophon>GitHub Issue List</a>, and remember to check closed issues as well as open ones."
---

