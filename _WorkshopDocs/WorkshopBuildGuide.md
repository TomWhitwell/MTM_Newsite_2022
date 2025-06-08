---

layout: documentation
output: false
page-name: "How to build your Workshop System" 
permalink: "Workshop_System_Build_Guide/"
title:  "Music Thing Workshop System Build Guide"

order: 0


---


https://youtu.be/M3mMAsjv3QE?si=SlriylUZx2sPlxuQ

{% include linkedHeading.html heading="Workshop System Build Guide " level=1 %}
\
The Workshop System is a complete modular synth that you can build in an evening or two. \
\
The four circuit boards are pre-populated with over 650 tiny components. Your job is to attach the interface elements: pots, knobs, switches, sockets (so many sockets), and LEDs.\
\
A few parts of the build are slightly counter-intuitive, so please read this all carefully. If anything is unclear, contact [support@thonk.co.uk](mailto:support@thonk.co.uk?subject=Workshop%20System%20Build%20Advice), ask for help on the Discord, send photos.  

{% include linkedHeading.html heading="TL;DR Summary for new or nervous builders " level=2 %}  
* If you've never soldered before, practise on something else — I always recommend [8mu](https://www.musicthing.co.uk/8mu_page/) or [Mikrophonie](https://www.musicthing.co.uk/Mikrophonie/).
* If you're comfortable soldering but are a new builder, start by [watching the build video above](https://www.youtube.com/watch?v=M3mMAsjv3QE). It's me (Tom, Music Thing Designer) talking through the entire build process in real time. Maybe the closest thing you can get to an online build workshop. 
* That video is the same length as Gladiator or Pulp Fiction, but not quite as dramatic. 
* If you're uncertain about anything, ask for help before soldering, not after. 

{% include linkedHeading.html heading="TL;DR Summary for experienced builders " level=2 %}  

* If you're a confident builder, there are a few things that might trip you up. (Two beta builders made the same mistake, based on an assumption)
    * There are **four different types of potentiometer**, and **six different values**. They're all marked on the PCB — make sure the right pot is in the right place 
    * There are **three different types of toggle switch**. They look the same but feel and work differently. One has a specific orientation. It's all marked on the PCB but make sure you understand my weird symbols. 
    * There are **two different tactile switches**, one 12mm long, one 13mm long. 
    * Longer legs on LEDs are marked with a + symbol.
    * There are three green (stereo) sockets.  
* If you understand all that, it's a very straightforward build. You'll probably be fine. 
* You can [calibrate](/Workshop_System_Calibration/) your system once you've finished. 

{% include linkedHeading.html heading="Contents" level=2 %}
1. **[What do I need to build the Workshop System?](#what-do-i-need-to-build-the-workshop-system)**
1. **[Assemble the case](#assemble-the-case)**
1. **[Assemble the power supply](#assemble-the-power-supply)**
1. **[Prepare the front panel](#prepare-the-front-panel)**   
1. **[Understanding the parts](#understanding-the-parts)**  
1. **[Starting to build](#starting-to-build)** 
1. **[Recommended build order](#starting-to-build)**
1. **[Power headers and switch prep](#power-headers-and-switch-prep)**
1. **[Build the VCO](#building-the-vco)**
1. **[Build Computer](#building-computer)**
1. **[Build Mix](#building-mix)**
1. **[Build the VCF](#building-the-vcf)**
1. **[Putting it all together](#putting-it-all-together)**
1. **[Calibration](/Workshop_System_Calibration/)**
1. **[Troubleshooting](#troubleshooting)**
1. **[Modifying and personalising your system](/Workshop_Quick_Start/#modifying-and-personalising-your-system)** 



{% include linkedHeading.html heading="Before you start" level=2 %}
* [Sign up for the Workshop System Newsletter](https://workshopsystem.substack.com/) - for new program cards, gigs, demos, patch ideas, collaboration opportunities, workshops and so on.
* [Join the Workshop System Discord](https://discord.gg/j79Dk88Dms) - musicians and coders using and developing the system. 


{% include linkedHeading.html heading="What do I need to build the Workshop System?" level=2 %}
Apart from the kit, you'll need: 
* A USB-C PD power supply that can give 15 Volts, to power the system when you're finished. [Full power details](/Workshop_Quick_Start/#power-supply). 
* A soldering iron. Something with temperature control and a clean fine tip. It doesn't need to be tiny, but shouldn't be huge. 
* Solder, either leaded or unleaded, with the soldering iron set to the appropriate temperature 
* A tip cleaner, I use brass wool, some people use a sponge 
* A small cross-head screwdriver 
* Some tape or blu-tack to hold parts in place. I use thin [Kapton](https://en.wikipedia.org/wiki/Kapton) tape which is cheap and heat resistant, but you can use any kind of masking tape. 
* A Sharpie or something else to sign the PSU board 
* Some double-sided tape or epoxy glue to attach the label to the case 
* Enough light and magnification so you can see small things clearly
* Enough ventilation so you don't have solder fumes in your face. I use a small desktop fan and an open window. 
* Space and time and a clear head. 
	


{% include linkedHeading.html heading="Assemble the case" level=2 %}
{% include documentation_image.html filename="images/WS_Case_Prepare.jpg" caption="Swap the plastic hinge pins for metal pins, attach the label to the lid" %}
* [VIDEO LINK: Assembling the case](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=226s). 
* From the factory, the case lid is attached with two 3mm plastic pins. 
* Swap these for the attached steel pins, so the lid is easier to remove. Just use the steel pin to push out the plastic, then replace it. 
* The kit also includes a label for the case. 
* Either use epoxy glue - put a weight on the label while the glue sets. Or use double-sided tape, cut to size. 
* I also used double-sided tape to stick the case foam into the box. Check the larger hole lines up with the Stompbox power outlet. 
* The kit includes eight stick-on rubber feet. Four for the case, four for the system itself. 


{% include linkedHeading.html heading="Assemble the Power Supply" level=2 %}
{% include documentation_image.html filename="images/WS_PSU_Prepare.jpg" caption="Add the spacers, date the board, make a note of the serial number" %}
* [VIDEO LINK: Assembling the PSU](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=582s). 
* Stick the rubber feet onto the PSU board 
* Screw the six hexagonal spacers onto the PSU board 
* Don't forget to sign and date the PSU board 
* Make a note of the serial number 



{% include linkedHeading.html heading="Prepare the Front Panel" level=2 %}

{% include documentation_image.html filename="images/WS_Panel_Prepare.jpg" caption="Solder the piezo microphone to the back of the front panel" %}
* [VIDEO LINK: Soldering the piezo mic](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=922s)
* Before soldering the rest of the kit, attach the small brass piezo microphone to the front panel. 
* You can use solder or epoxy or superglue to do this
* The position is marked. Tape the disk down and solder the three marked points. It's quite a large area, so hold the soldering iron down for 5-10 seconds to heat it through before trying to solder. 
* You might want to tape the wires down to keep them out of the way for the rest of the build. 


{% include linkedHeading.html heading="Understanding the parts" level=2 %}

Before we starting to build the circuit boards, take a few minutes to understand the components we'll be using.\
\
In [this section of the build video](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=1131s), I talk through and explain all the parts on a complete Workshop System, explaining what goes where and what to look out for. 

{% include linkedHeading.html heading="Understanding power headers" level=3 %}
{% include documentation_image.html filename="images/WS_Power_header.jpg" caption="Check that your power headers go out the back, like this" %}
* There are 4 x power headers, one for each PCB 
* Power Headers come out of the back of each module - on the opposite side to the pots and sockets 
* This means that solder points are on the front of the PCB, next to the tiny surface mount components 
* If you are in any doubt at all, please check before soldering - support@thonk.co.uk 
* Every time we run a workshop, someone puts the power header on the wrong side, and it's very frustrating for them to fix.  

{% include linkedHeading.html heading="Understanding pots" level=3 %}
{% include documentation_image.html filename="images/WS_pots.jpg" caption="Four types of pots, make sure you know which is which" %}

* There are four different types of pot in the workshop system. 
* Make sure you know which pot goes in which space. It's difficult and annoying to remove and replace a pot. 
   * **Metal Pots** are standard high quality 9mm pots with three connections and two legs and a 'knurled' metal shaft for the knobs
   * **Dual Pots** are also metal, but have six connections. There are two Dual Pots, one is the master stereo volume control, the other is in Amplifier. 
   * **Tall Trimmers** are plastic pots with longer shafts, generally used in hard-to reach parts of the system.  
    * **Short Trimmers** are plastic pots with shorter shafts, used around the edges of the system. 
{% include documentation_image.html filename="images/WS_pot_values.jpg" caption="Every pot also has a value" %}

* But wait: Pots also come in different values. 
    * Metal Pots are all B100K 
    * Dual Pots can be A100K or A1M 
    * Tall Trimmers can be B100K or A1M 
    * Short Trimmers can be B100K, B25K, B10K 
* Please put the right pot of the right value in the right spot!

{% include linkedHeading.html heading="Understanding switches" level=3 %}
{% include documentation_image.html filename="images/WS_switches.jpg" caption="Three types of switches, make sure you know which is which" %}

* There are three types of toggle switch in the workshop system 
* Two of them **look exactly the same but are very different so really please don't mix them up**
	* **ON-ON** switches have two positions. They're always at an angle. They're only in the Filter module. They're a bit annoying to fit through the panel. It doesn't matter which way round you put them. 
	* **ON-OFF-ON** switches have three positions: Up, Middle, Down. It doesn't matter which way round you put them. 
	* **ON-OFF-MOM** switches have three positions, but one is momentary. It doesn't latch. You can only tell the difference by feeling them, moving the toggle. **NB: The direction of this type is very important, and clearly marked on the PCB.** 
* Please put the right switch in the right spot, the right way round! 
{% include linkedHeading.html heading="Understanding LEDs" level=3 %}
{% include documentation_image.html filename="images/WS_led.jpg" caption="On LEDs, the long leg goes to the + mark on the PCB" %}
{% include documentation_image.html filename="images/WS_LED_placement.jpg" caption="You never need to bend out the LED legs — the legs fit into holes next to each other." %}

* All the Workshop System LEDs are the same
* Direction is very important. The long leg goes in the hole marked +.
* You never need to bend out the LED legs, they always go into two pins next to each other.  
* The LEDs have flat tops which should be flush with the panel. Use a piece of tape or blu-tack to line them up before soldering, and check twice before cutting off the legs. 
* NB: from 2025, kits include three tiny plastic spacers to protect the legs of Computer LEDs. [How to install the LED spacers](#building-computer).

{% include linkedHeading.html heading="Understanding sockets" level=3 %}
* The Workshop System has two types of sockets: Black sockets which are mono, and green sockets which are stereo.  
* The green sockets are clearly marked, everything else is black. 
<div style="clear: both;"></div>

{% include linkedHeading.html heading="Starting to build" level=2 %}

Build your boards in this order:

1. **VCO / Oscillator** The oscillator board has no LEDs, no switches so it’s a good place to start. 
1. **Computer** Just six LEDs and one momentary switch, it’s a quick easy build
1. **Mix** Two types of switches, dense pots, but simple enough now you’re more confident. 
1. **VCF / Filters** Definitely the fiddliest board mechanically, with ON-ON switches that are tricky to nudge through the panel, close-packed LEDs and pushbuttons.  
\
{% include linkedHeading.html heading="Power headers and switch prep" level=2 %}
{% include documentation_image.html filename="images/WS_switch_power.jpg" caption="Before doing anything else, add one nut to each switch and solder on all four power headers" %}
* [VIDEO LINK: Soldering headers and preparing switches](https://youtu.be/M3mMAsjv3QE?si=tzG7qnlgFVh3NBUS&t=2105)
* Before starting to build the circuit boards: 
* Put one nut from the switch nuts bag onto each switch. This means they'll be properly spaced behind the panel. NB: Sometimes the nut spins on the switch rather than tightening. That's not a problem. 
* Solder all the power headers. Take your time, the pins are quite large so need a moment to heat up before you apply the solder. 


{% include linkedHeading.html heading="Building the VCO" level=2 %}
{% include documentation_image.html filename="images/WS_build_vco.jpg" caption="Assemble the board and fit it to the front panel before doing any soldering" %}
* [VIDEO LINK: Building the VCO](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=2427s)
* PCB photos: 
    * Bare: [Front](/images/VCO_Front.JPG) [Back](/images/VCO_Back.JPG)  
    * Populated: [Front](/images/VCO_pop_front.jpg ) [Back](/images/VCO_pop_back.jpg ) [Side](/images/VCO_pop_side.jpg )
* Use this technique for all boards:
* First, mount all the components on the PCB, without soldering anything (apart from the power header, which is already in place) 
	* Ensure all pots are of the correct type and value 
	* There is one green socket on this board 
	* Check the screw trimmers are correctly aligned. The gold screws are marked on the PCB. 
{% include documentation_image.html filename="images/WS_VCO_Pot_Positions.jpg" caption="Check the pot positions are correct before soldering" %}
* Before soldering, push the PCB and components onto the panel. Add a couple of nuts to metal pots and a few sockets. 
* Check everything is in place: trimmers can all be turned, the little gold screws are through the holes in the panel.
* Ensure the panel is parallel to the board.  
* Solder one point on each component. At this point, it's still easy to move any parts that are wrong. Check again for placement. 
* Once you're happy, go back and solder all the points. 
* Double check! At this point I normally use a magnifier to check over all the solder points, touching up any that are blobby or missing. 
<div style="clear: both;"></div>        
{% include linkedHeading.html heading="Building Computer" level=2 %}
{% include documentation_image.html filename="images/WS_computer_build.jpg" caption="Check everything is parallel, that LEDs are lined up, and that the tiny solder points on the SD card holder look good" %}
{% include documentation_image.html filename="images/WS_build_Computer_LED.jpg" caption="Add the little LED spacers - only on the LED legs nearest to the edge of the system" %}

* [VIDEO LINK: Building the Computer](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=3664s)
* PCB photos 
    * Bare: [Front](/images/Computer_Front.JPG) [Back](/images/Computer_back.JPG) 
    * Populated: [Front](/images/computer_pop_front.jpg ) [Back](/images/computer_pop_back.jpg ) [Side](/images/computer_pop_side.jpg )
* Computer is built in exactly the same way, with a few different details 
* **LED SPACERS** From 2025, kits include three tiny plastic spacers to protect the legs of Computer LEDs. Add them to the LEDs on the left hand side of Computer, close to the edge of the PCB. Orientation of the plastic spacers doesn't matter, but be careful to still put the long legs through the holes marked with +. 
* There are two tactile pushbutton switches. They look the same, but one is 12mm long, the other 13mm. The shorter switch goes at the top, behind the main knob. 
* The switch is an ON-OFF-MOM. Check that the alignment of the switch - the momentary side - is downward, as marked on the board. 
* Use a bit of tape or blu-tack to line LEDs up to the panel before soldering 
* Ensure the long LED legs go through the hole marked +. Don't rush it, it's annoying to fix later
* The SD Card is a little fiddly. Maybe do this separately, after all the other components. Use a bit of tape or blu-tack to hold it in place. It has very small pins, be careful when soldering to avoid shorts from big solder blobs.

{% include linkedHeading.html heading="Building Mix" level=2 %}
{% include documentation_image.html filename="images/WS_build_mix.jpg" caption="Build in two stages. Do the dense switches and LEDs after the sockets and pots are in place" %}
* [VIDEO LINK: Building Mix](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=4980s)
* PCB photos
    * Bare: [Front](/images/Mix_Front.JPG) [Back](/images/Mix_Back.JPG)  
    * Populated: [Front](/images/mix_pop_front.jpg )  [Side](/images/mix_pop_side.jpg )
* This is a dense board, so maybe build it in two stages. 
    * First, assemble all the pots and sockets. 
    * Then go back to do the dense switches and LEDs 
* There are two types of switches - ON-OFF-ON and ON-OFF-MOM. Check they're in the right place and the right orientation, as marked on the board. 

{% include linkedHeading.html heading="Building the VCF" level=2 %}
{% include documentation_image.html filename="images/WS_build_vcf.jpg" caption="The last picture shows the 'little finger to hold up the switch before soldering' technique" %}
* [VIDEO LINK: Building the VCF](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=6288s)
* PCB photos 
    * Bare: [Front](/images/VCF_Front.JPG) [Back](/images/VCF_back.JPG)  
    * Populated: [Front](/images/VCF_pop_front.jpg ) [Back](/images/VCF_pop_back.jpg ) [Side](/images/VCF_pop_side.jpg )

* This is the fiddliest board mechanically
* The ON-ON switches are tricky to nudge through the panel. You can try balancing them in the centre position, or just jiggling them a bit. 
* The easiest method is to assemble in two stages. First do the sockets, LEDs and switches. Then take the panel off and do pushbuttons. 
* The pushbuttons have one flat side, which is clearly marked on the PCB. 
* The pushbuttons need to be held in place before they're soldered. I use a little finger to push them up from behind, soldering one of the mechanical pins before checking that they're moving smoothly. You might also use blu-tack to hold them in place. Take it slow. 

{% include linkedHeading.html heading="Putting it all together" level=2 %}
{% include documentation_image.html filename="images/WS_build_piezo.jpg" caption="Solder the contact microphone, then loosely assemble and test the board before putting on all the nuts and knobs" %}
* [VIDEO LINK: Putting it all together](https://www.youtube.com/watch?v=M3mMAsjv3QE&t=7724s)
* Once the boards are complete, you can assemble the whole thing. 
* I'd suggest attaching the boards to the panel with just a few hand-tightened nuts and soldering on the piezo microphone (ensure black goes to black and red goes to red)
* Then carefully mount the panel onto the PSU. Be particularly careful when later removing the board from the PSU — the connectors are easily bent. 
* Connect power and test the board. [Test details in the quick start guide](../Workshop_Quick_Start/).
* If everything is working, add nuts to the pots, switches and sockets, and screw the front panel to the spacers.
* Congratulations, you've made a Workshop System. 
* Enjoy playing with it, and at some point you can think about [Calibration](/Workshop_System_Calibration/). 

{% include linkedHeading.html heading="Troubleshooting" level=2 %}
If something isn't working...
* **Do not poke anything metal onto powered PCBs** The PCBs contain hundreds of very small components, and in some places, +12V and -12V traces near components that can only handle +3.3V signals. If you try to test the boards with multimeter probes while the system is powered up, there is a significant risk you'll destroy components and/or the power supply board. If you're concerned that something doesn't work, contact support@thonk.co.uk and send photographs. 
* **Slopes don't loop** If neither Slope loops, this is a sign that the USB power supply is not giving 15 volts, just 5 Volts or 9 Volts. Check with another supply. 
* **Sometimes the Slope LEDs flicker when I touch the switch** I'm not completely sure why this happens, but it's normal.  
* **An LED doesn't light** Most likely that LED is not properly soldered, or has been soldered the wrong way around. Inverted LEDs in Slopes behave very oddly. 
* **Computer won't connect to a computer** Before doing anything else, ensure that your USB-C cable can pass data. Some cables only pass power. 
* **A module behaves strangely: too loud, out of control** Sometimes this is a sign that a potentiometer pin hasn't been soldered, or is short-circuited. 
* **A module is silent or doesn't pass audio** This can happen when an input or output socket either isn't soldered or is short-circuited to ground by a blobby solder joint. 
* **The PSU makes a whining noise** This is a sign there is a major short-circuit somewhere in the power circuitry, so a module is pulling much too much power. If you have a eurorack power cable, you can power up each module individually, to identify the culprit. 

