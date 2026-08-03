---

layout: documentation
output: false
page-name: "Computer Program Cards" 
permalink: "/Computer_Program_Cards/"
order: 2
title:  "Music Thing Workshop Computer and Program Cards"
description: "Workshop Computer program cards, how they work, and where to find new cards to download."


---


# Program Cards and the Computer
 {% include documentation_image.html filename="images/MTM_Workshop-System-detail_1.jpg" caption="Computer runs on tiny program cards loaded by pushing the tiny button next to the card slot" %}
Computer is a simple but capable music computer,  inspired by the early music studios like [EMS](https://www.facebook.com/BBCArchive/videos/383617947753333/) in London and [Bell Labs](https://www.youtube.com/watch?v=mT3U98cFqSs) where computers were used to control analog oscillators and filters, compose algorithmic music and generate waveforms. 

Computer is powerful enough to do audio effects, sequencing and connecting with other devices over USB.  
 {% include documentation_image.html filename="images/MTM_Workshop-System-stompbox_computer_cards-w-ring.jpg" caption="The system comes with Midi, Turing, Reverb+ and one blank card" %}

Computer loads programs stored on tiny custom-made program cards slightly larger than Micro SD cards. It has three pairs of inputs and outputs: for Audio/CV, for precision control voltages for pitch, and for pulses. 

The Workshop System comes with these cards: 

**[00 Simple MIDI](https://computer.musicthing.co.uk/programs/00-simple-midi/)**    
**[03 Turing Machine](https://computer.musicthing.co.uk/programs/03-turing-machine/)**  
**[20 Reverb+](https://computer.musicthing.co.uk/programs/20-reverb/)**    
**[88 Blank 2mb](https://computer.musicthing.co.uk/)**     

Find program cards for the blank card at [ computer.musicthing.co.uk](https://computer.musicthing.co.uk/). 



 

{% include linkedHeading.html heading="Computer FAQ" level=2 %}

* **How do I use the program cards?** 
	* Insert the card with the gold connector facing down (matching the white symbol below the card slot!). 
	* Tap the little reset button next to the slot to load the program.  
* **What's with the numbers, like *03 Turing Machine*?**
	* Blank cards come with space to write two numbers, so this started as a way for developers to keep track of cards. 
	* I'm not sure what will happen when we have 99 finished cards. 
* **I can't connect to MIDI or the web editor** 
	* **Always cycle power**, rather than just pressing reset, when connecting to a computer. This ensures that the Workshop Computer connects to the host computer.  
	* Some USB-C cables are power only, and cannot transmit any data. If you have one of these I'd suggest labelling it or destroying it.  
* **How do I write a blank program card?**
	* [This page explains how to write blank program cards](/workshopsystem/program-cards/install/)
* **Can I use a normal SD Card?**
    * No, the program cards are completely different from SD Cards - different chips, different power. 
* **Can I power the Computer from the front panel USB socket?**
    * No, the computer cannot draw power from the front panel USB socket. 
* **Can I power USB things from the front panel USB socket?**
    * Yes, but the power available is limited to ~100mA. 
* **I've lost or damaged my program cards, can I get a replacement?** 
	* Contact [Thonk Support](mailto:support@thonk.co.uk?subject=Workshop%20System%3A%20Lost%20Program%20Cards%20)  
* **What is Computer, really?** 
    * Computer's CPU is a RP2040 32-bit 133mhz dual core microprocessor. It has 264K of RAM. Program cards store either 2mb or 16mb. Program cards contain the entire memory of the Computer, and can be written in any language that is compatible with the RP2040, including Arduino, C++, and Circuit Python. 
* **Can I write code for Computer and release my own cards?** 
	* Yes, definitely. Start at the [Workshop Computer Github](https://github.com/TomWhitwell/Workshop_Computer), and in the #computer channel on the [Discord](https://musicthing.co.uk/discord).  
 

