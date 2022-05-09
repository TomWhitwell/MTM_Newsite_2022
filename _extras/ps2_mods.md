---
layout: page
order: 1
title:  "How to add CV input to a Boss PS-2 Digital Pitch Shifter/Delay"
date: "February 2015"
# image: ""
# excerpt: "" 
# overlay: "NEW"

---
 
There's [a short video demo of this mod here](https://www.youtube.com/watch?v=QtcYGTXjX38).

The Boss PS-2 is a wonderful, gnarly early digital pedal from 1987 with up to 2secs of delay and really out-of control pitch shifting. It’s like an [Eventide H-910](https://valhalladsp.wordpress.com/2010/05/07/early-pitch-shifting-the-eventide-h910-harmonizer/) in a stompbox. For modern Eurorack heads, I’m sure Tom Erbe wouldn’t mind me saying it’s a [Makenoise Echophon](http://www.makenoisemusic.com/echophon.shtml) in a stompbox. They go for £50-£100 on eBay.

This is a simple hack to add CV control over the delay time/shift amount (the Fine/Manual knob).

**Theory**

The Fine/Manual pot is a voltage divider, with +2v on one side, and +7v on the other. We’re going to re-route that voltage to the 3.5mm socket switch. If a plug is inserted into the socket, the voltage from the pot is replaced by the voltage from our modular. Here’s the [Boss PS-2 Schematic](../collateral/roland_ps-2_ET.pdf).

**Parts**

1 x Switching 3.5mm socket (I used a [PJ3410](https://www.thonk.co.uk/shop/pj3410/) from Thonk). If you don’t mind staying on 1/4inch sockets, you could use the existing ‘Tuner Out’ socket that we’ll be replacing.  
Some wire (I used very thin Kynar wire, but anything will work)  
A soldering iron  
A sharp knife  
Wire cutters/strippers  
A multimeter

**Method**

1\. Take the whole pedal apart and remove it from the case; remove the nuts on the pots, sockets etc.  
2\. Cut the trace leading from the centre lug on the the back of the Fine/Manual pot to the ribbon cable. Use the multimeter to check there is no connection left.  
3\. Solder a wire from the middle lug of the Fine/Manual pot to the SWITCH connection on the 3.5mm socket (check the datasheet and experiment until you know which pin is which on the socket)  
4\. Solder a wire from the ‘Tip’ connection on the 3.5mm socket back to the other end of the cut trace  
5\. Remove the ‘Tuner Out’ socket; snip the blue wire, and unsolder the black Ground wire.  
6\. Connect this black ground wire to the ‘sleeve’ pin on the 3.5mm socket  
7\. That’s it; attach a battery to test, then put the whole thing back in the box (this is the hardest part!)

**In use**

The only quirk here is that the pedal is looking for +2 to +7v, and your modular will often spit out 0v to +5v or -5 to +5v. The incoming voltage goes through a diode, so shouldn’t damage the pedal, but you’ll have to experiment to get the right voltages. For example, on the pitch shift, the centre point is about 4.5v. If you put in 0v, it will dive down, shifting down many octaves.

The bonus here is that I think low voltages (0v) will give longer (and dirtier) delay times than are possible with the regular pedal.
