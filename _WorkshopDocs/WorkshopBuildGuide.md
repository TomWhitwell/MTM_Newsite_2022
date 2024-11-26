---

layout: documentation
output: false
page-name: "How to build your Workshop System" 
order: 0


---


{% include linkedHeading.html heading="Build Guide " level=1 %}

Build order 
1. REMEMBER, AT THE END OF THIS YOU'LL NEED A USB-C POWER SUPPLY 
1. Assemble the case 
    * Replace the pins 
    * Attach the foam 
    * Attach the sticker 
    * Stick on the rubber feet 
1. Assemble the PSU 
    * Screw on the standoffs 
    * Stick on the rubber Feet 
    * Sign and date the PSU 
    * Make a note of the serial number 
1. Soldering the contact mic   
    * Attach piezo to the front panel 
        * Stick it on with some tape 
        * Solder it 
1. Getting to know the components  
    * Warning, some things are slightly different 
    * A quick look at the finished thing 
        * Pots 
        * Switches 
        * LEDs 
        * Pushbuttons 
        * SD card slot 
    * Understanding power headers 
    * Understanding potentiometers 
    * Understanding switches
    * Understanding LEDs 
    * Understanding sockets 
1. Assembling the first board 
	* Before you start
		* Solder all the power headers *video storage ran out* 
		* Put one nut onto each switch 
    * Build the VCO 
    * Place the pots 
		* Tall and short 
        * Metal and plastic 
	* Place the screw trimmers 
		* Screws on the left 
    * Place the Sockets 
        * Note the green socket 
    * Connect to the front panel 
        * Careful with the screw trimmers 
        * Add a couple of nuts 
        * Check parallel and all through the holes 
        * Check Trimmers are straight 
    * Solder 1 point on each component 
        * Check again! 
    * Solder all the other points 
        * Check you haven't missed any 
	* VCO is done 
1. Assembling the other boards 
    * Process is exactly the same 
    * Things to watch out for on each board 
    * Computer 
        * LEDS
            * Use a bit of tape or blu-tak to line them up to the panel 
            * Ensure the long legs go through the + side 
            * Don't rush it, it's annoying to fix later
        * SD Card Connector 
            * Maybe do this separately if you're nervous 
            * Use a bit of tape or blu-tak to hold it in place 
            * Very small pins, be careful 
		* Switch
			* NB This is ON-OFF-MOM
			* Orientation is important 
	* Mix 
		* Two types of switches
		* Quite cramped switches and LEDs 
		* Quite dense set of pots
		* Simple enough now you’re more confident
		* If you're struggling at all, do it in two stages - switches then LEDs 
    * VCF 
		* Definitely the fiddliest board mechanically
		* ON-ON switches are tricky to nudge through the panel
		* Lots of tight LEDs around the Amplifier knob 
		* Assemble this in three stages
		* First: Sockets, LEDs and switches 
		* Second: Take the panel off and do pushbuttons 
		* Finally, once you're happy, connect the Contact Microphone 
1. Assemble into the PSU and testing - don't put on all the nuts yet 
1. Final assembly - nuts and screws 





{% include linkedHeading.html heading="Understanding the parts" level=2 %}
* The Workshop System kit includes: 
    * Four printed circuit boards: Computer, VCO Oscillators, VCF Filters, Mixer. Each of these needs to populated with bigger through-hole components 
    * Labelled bags containing all those components 
    * Power Supply Board - another circuit board, fully populated
    * Front panel - another circuit board, which needs to have a piezo contact microphone soldered to the back 
    * Case, including custom-cut foam to hold the finished system. This has two plastic pins holding on the lid, which can be replaced with metal pins for easier removal  
    * Program Cards used by the computer module. 
    * A black label for the case, which is actually another PCB
    * Self adhesive feet for both the system and the case 


* The Workshop System might be the most complicated thing you’ve ever built. Even for an experienced DIYer, there’s a lot to build.  
* Fortunately, the circuit boards are already populated with over 650 tiny components. Your job is to attach the interface elements: pots, knobs, switches, sockets (so many sockets), and LEDs.  
* This pretty straightforward, but you do need to get it right.  
* A few parts of the build are counter-intuitive, so please read this all carefully. If anything is unclear, contact support@thonk.co.uk, ask for help, send photos.  

{% include linkedHeading.html heading="Understanding power headers" level=4 %}

{% include documentation_image.html filename="images/WS_Power_header.jpg" caption="Check that your power headers go out the back, like this" %}




* There are 4 x power headers, one for each PCB 
* Attach these first, before doing anything else 
* Power Headers come out of the back of each module - on the opposite side to the pots and sockets 
* This means that solder points are on the front of the PCB, next to the tiny surface mount components 
* If you are in any doubt at all, please check before soldering - support@thonk.co.uk 
* Every time we run a workshop, someone puts the power header on the wrong side, and it's very annoying to fix! 

{% include linkedHeading.html heading="Understanding pots" level=4 %}
* There are four different types of pot in the workshop system. 
* Make your you know which pot goes in which space. It's difficult and annoying to remove and replace a pot. 
   * **Metal Pots** are standard high quality 9mm pots with three connections and two legs and a 'knurled' metal shaft for the knobs
   * **Dual Pots** are also metal, but have six connections. There are two Dual Pots, one is the master stereo volume control, the other is in Amplifier. 
   * **Tall Trimmers** are plastic pots with longer shafts, generally used in hard-to reach parts of the system.  
    * **Short Trimmers** are plastic pots with shorter shafts, used around the edges of the system. 
* But wait: Pots also come in different values. 
    * Metal Pots are all B100K 
    * Dual Pots can be A100K or A1M 
    * Tall Trimmers can be B100K or A1M 
    * Short Trimmers can be B100K, B25K, B10K 
* Please put the right pot of the right value in the right spot!

{% include linkedHeading.html heading="Understanding switches" level=4 %}
* There are three types of toggle switch in the workshop system 
* Two of them **look exactly the same but are very different so really please don't mix them up**
	* **ON-ON** switches have two positions. They're always at an angle. They're only in the Filter module. They're a bit annoying to fit through the panel. It doesn't matter which way round you put them. 
	* **ON-OFF-ON** switches have three positions: Up, Middle, Down. It doesn't matter which way round you put them. 
	* **ON-OFF-MOM** switches have three positions, but one is momentary. It doesn't latch. You can only tell the difference by feeling them, moving the toggle. **NB: The direction of this type is very important, and clearly marked on the PCB.** 
* Please put the right switch in the right spot, the right way round! 
{% include linkedHeading.html heading="Understanding LEDs" level=4 %}
* All the the Workshop System LEDs are the same
* Direction is very important. The long leg goes in the hole marked +. 
* The LEDs have flat tops which should be flush with the panel. Use a piece of tape or blu-tack to line them up before soldering, and check twice before cutting off the legs. 

{% include linkedHeading.html heading="Understanding sockets" level=4 %}
* The Workshop System has two types of sockets. 
    * Black sockets 
    * Green sockets 
* The green sockets are clearly marked, everything else is black. 

{% include linkedHeading.html heading="Starting to build" level=2 %}

Build your boards in this order:

* #1: Oscillators. The oscillator board has no LEDs, no switches so it’s a good place to start. 
* #2: Computer. Just six LEDs and one momentary switch, it’s a quick easy build
* #3: Mix. Two types of switches, dense pots, but simple enough now you’re more confident. 
* #4: Filters. Definitely the fiddliest board mechanically, with ON-ON switches that are tricky to nudge through the panel, close-packed LEDs and pushbuttons.  
