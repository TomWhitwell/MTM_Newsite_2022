---
layout: page
order: 1
title:  "Slow Electronics: What I learned building a Princeton Reverb Amplifier"
date: "August 2015"
# image: ""
# excerpt: "" 
# overlay: "NEW"

---
 
This month I had a few days off and built a hand-wired tube amp from scratch. 


It was a [AA1164 Blackface kit from Tube Amp Doctor](https://www.tubeampdoctor.com/en/blackface-14-reverb-aa1164-style-amp-kit) in Germany. Essentially it’s a retro-perfect mid ’60s Princeton Reverb. And yes, the kit is very expensive. You can buy a [brand new Fender Princeton Reverb](http://www.thomann.de/gb/fender_68_custom_princeton_reverb.htm) for less than the price of the kit, but if you do that you’ll miss out on the experience of doing it yourself.

The arguments about PCB vs traditional manufacture (the new Princetons [look like this](http://smg.photobucket.com/user/stratdev/media/57%20Twin%20Reissue/web_8297.jpg.html) inside) are probably 90% snake oil and pseudoscience, but there is a very powerful placebo effect in listening to an amp you built yourself. To me, the amp sounds great – very 3D and hi-fi with huge bass and bright highs, very little hum (although hiss from the retro carbon-composition resistors is audible) spectacularly deep spring reverb and big warm tremolo.


Anyway, the kit comes with rather minimal instructions – [this document](https://www.tubeampdoctor.com/media/pdf/80/ee/16/full_documentation_bf-14-rev_3.pdf) plus a useful printed BOM – so I had the pleasure of working a lot of stuff out as I went along, which I thought I should share.

1.  Take it really, really slowly. This was the great joy of this project; really learning the schematic, researching everything, checking everything before soldering. I spent about an hour investigating UK mains voltage along the way. Doing this in a hurry would be a nightmare.
2.  Do it without distractions. Partly for pleasure, partly for safety. Here’s a good guide to [Tube Amp Safety](http://www.aikenamps.com/index.php/safety-tips-for-working-on-tube-amplifiers) _“Never work on an amp while talking to someone, either in person, or on the telephone. I have gotten more severe shocks by accidentally touching things while someone was standing there watching me, asking questions.”_
3.  You get a huge box of bits; look through everything carefully before you start. I didn’t do this and kept finding interesting / useful bits that I hadn’t imagined, and going back to put them in – things like Bear Trap Tube Clips, lock washers for the pots, fixings for the power cable, sticky-backed aluminium foil to shield the top of the cabinet.
4.  How eyelet board works:
    -  It’s two boards made of ‘vulcanised fibreboard’. The bottom board just has (or needs) mounting holes for bolts holding it to the chassis. The top board has lots of holes, some with metal eyelets. components are soldered to the eyelets, some of the wires run through the holes.
    -  Soldering to the eyelet board is tricky – solder doesn’t really stick to the eyelets very well. Too little, and the eyelet doesn’t close up. Too much, and gravity pulls the solder down into a blob on the leads below. It takes a bit of stroking to get the eyelets sealed up.
3.  I put on all the components, tacked them to the eyelets so they didn’t fall out. Then I put attached all the flying leads off to pots and tube sockets at the board end. Then (after a lot of checking) I bolted the board into place on the chassis – this is really the point of no return. Then I went round connecting the wires to the other components, and trying to make everything neat and tidy.
4.  The three tools for this – probably used equally – were the wiring diagram, the schematic and [images like this one](https://robrobinette.com/AA1164_Princeton_Reverb.htm) which are really helpful and confidence boosting.
5.  The ’60s original Princeton Reverb layout is very well established – Google Images will find lots of inspiration, including some a lot tidier than my effort.
6.  Here’s a [decent video](https://www.youtube.com/watch?v=tg7FqJYiwjo).
5.  Push-back wires are fantastic. This kit used vintage-style cloth-wrapped wires; 22awg for most connections, and thicker 18awg for heater wires (plus two lengths of black and white 18awg for the speaker cable). If you’re used to fiddling around with wire strippers, it’s really nice to just be able to push the insulation back. It was all solid-core wire, so there’s a lot of bending and manipulation with pliers to get everything neat.
6.  I did things in this order, which seemed to work well
    1.  Before doing anything else, use the empty chassis to mark and drill the holes in the cabinet (I didn’t do this, but wish I had)
    2.  Prepare the pots on a temporary bit of cardboard, just to get the hang of shaping and soldering the push-back wire. Then transfer them to the chassis
    3.  Build the rectifier board – a little secondary board with just a couple of components on it, to get the hang of eyelet board. Bolt it into place.
    4.  Bolt the transformers, pilot light, switch, sockets and tube sockets into place. This is fun because it looks like the amp is complete. It isn’t.
    5.  Build the main board away from the chassis – place everything, tack it into place, then add all the flying leads. Only ‘fill’ an eyelet when you’re confident that you won’t need to attach anything else.
    6.  Bolt the main board into place, then go round doing all the wiring. This takes ages. There will also be point-to-point wiring on the main board (the bundle of twisted yellow wires running over the big capacitors) that is easier to do when the board is in place.
    7.  Then you get to the scariest bit – connecting up all the high-voltage cables from the transformers. Check and check and check again.
    8.  My power transformer came with 220v, 230v and 240v connections. After a lot of research and measuring my mains voltage I discovered that we have 240v in Britain (it turns out that European harmonisation on 230v is essentially a myth), so I used that connection.
    9.  The last major bit of wiring are the filament/heater connections – these are the thick green twisted wires over the top of the tube sockets (some people do them first, beneath the other connections). 
    10.  Connect up the mains cable – inserting the little strain relief grommet thing was the hardest single thing in the whole build.
    11.  You’re now at the terrifying point when you realise you’ve finished, and there is nothing further to do but checking, rechecking, rechecking. Sleep on it, if you can bear it.
    12.  [This manual from Mojotone](https://www.mojotone.com/manuals/Princeton_Reverb_Manual.pdf) has sensible advice about a two-stage power up.
        1.  With no tubes but the speaker connected. I did this, the pilot light glowed, and there was blissful silence – no strange pops or puffs of smoke or fire or all the lights in the house going out.
        2.  Finally with the tubes in place. I turned on the power, watched the tubes starting to glow, and heard just the tiniest bit of hum from the speaker. After checking the chassis and guitar input weren’t live, I plugged in a guitar and… it worked.
    13.  Finally, mount it in the cabinet and feel like the smuggest person on the planet.