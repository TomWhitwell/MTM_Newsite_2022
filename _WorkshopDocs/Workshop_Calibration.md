---

layout: documentation
output: false
page-name: "Workshop System Calibration" 
permalink: "/Workshop_System_Calibration/"
order: 2
title:  "Music Thing Workshop System Calibration"


---
https://www.youtube.com/watch?v=FebtWwpal5A 

{% include linkedHeading.html heading="Calibrating the Workshop System" level=1 %}  

{% include linkedHeading.html heading="A quick note on calibration" level=3 %}  

The original Workshop Systems used at the [Dyski workshop](https://dyski.co/Port-Navas-Sessions) had no calibration at all. No way to fine-tune the oscillators or play MIDI notes in tune. I liked the purity of that, but realised it was silly. It's nice to [play melodic sequences](https://www.instagram.com/p/DCTmBretEFf/) on the system, and I look forward to people using it in that way.  

Calibration is necessary because oscillators and even computers are made of physical objects - resistors and capacitors and transistors - that are imperfect little lumps of matter. A computer can send the number 261,200 to an output, but it takes resistors and amplifiers to turn that into 0 Volts. That's where the calibration comes in. 

But the imperfection remains. When calibrating the Computer, and even more so the VCOs, you can get better, closer, more accurate. But you can't get perfect. I'm annoyed I said 'exactly' a few times in the video above, because it isn't exact. It's close.  

Some people find that annoying. They want perfection. A 1970s oscillator made of slices of silicon and splinters of nickel-chromium alloy won't be perfect, but it can be useful and fun. 

If it sounds good, it is good. 

{% include linkedHeading.html heading="What do I need to calibrate?" level=3 %}  
* There are two things in the Workshop System that can be calibrated: 
    * The Computer 
    * The two SineSquare Oscillators 
* **Most people will only ever need to calibrate the Computer.** To play the Workshop System over MIDI, you need to teach the Computer to put out the right voltages for the oscillators. It doesn't matter how those oscillators are calibrated, because they only need to be in tune with the Computer. 
* **Some people will need to calibrate the oscillators to work with other equipment.** I have a little [Arturia Keystep](https://www.arturia.com/products/hybrid-synths/keystep/overview) keyboard which has a CV Pitch output. To use that, I have to calibrate the oscillators to respond to the voltages put out by the Keystep. Once I've calibrated the oscillators, I can go back and re-calibrate the Computer, so it puts out the same signals as the keystep. 
* If you do want to calibrate your oscillators, **do that first**, before calibrating the computer. 
* One other option: If you happen to have a high-end voltmeter, you can use that to calibrate Computer (+2.000V, 0.000V, -2.000V), then use that to calibrate the oscillator. That's what I do. 

https://www.youtube.com/watch?v=FebtWwpal5A 

{% include linkedHeading.html heading="How to calibrate the Computer" level=2 %}  

The best way to explain Computer calibration is with [this seven-minute video](https://www.youtube.com/watch?v=FebtWwpal5A) (with slightly odd sound balance) but I've described the process in words below. 

* To calibrate the computer you need: 
  * A MIDI card 
  * A computer with a MIDI sequencer like Ableton Live that can connect to the Workshop System over USB-C. The computer doesn't need USB-C sockets; you can use a USB-A to USB-C cable if necessary. 
  * A tuner. Most DAWs have a built-in tuner, or you can use a phone app. 
  * NB Use normal patch cables for calibration. Do not use illuminated patch cables, or Stackables that split the signal to two outputs. 

* Start by connecting the Computer to your computer.  
* Put the MIDI card into the Computer slot and press reset. 
* If the LEDs keep blinking, the Computer has not connected over USB. 
   * Turn the Workshop System power off and on again 
   * Check you have a USB-C cable that can pass data, not just power  
* The LEDs should blink very briefly then turn off  
* Enter calibration mode by holding down the toggle switch while you tap the reset button next to the Program Card slot.  
* LEDs should start to flash. Release the toggle switch
* Now, the centre left LED will start to flash
	* If the LEDs continue to flash, you're not connected to a computer. Try the fixes above. 
* Patch the top oscillator in the Workshop System to an output so you can hear it, and your tuner can hear it. 
	* Make sure FM is fully off
	* Use the tuner to tune the oscillator to C3
	* BE CAREFUL not to nudge the coarse or fine controls on the oscillator. Yes, it's all a bit close. If you nudge a control, remove the patch cable,  retune to C3, continue. 
* Next, patch the left CV output to the top oscillator 'Pitch' input
* If the oscillator changes tune (it probably will, a little bit) you need to calibrate 0V
* Flip the toggle switch up (again, be careful not to nudge anything!) 
* The LED will start to flash more slowly
* Now you can use the big knob and the X knob as coarse/fine controls to set the position of 0V. Fiddle around until C3 is back in tune
* When you're ready, carefully flip the toggle switch down to save the setting.
* Now tap the toggle switch, and the LED will move to the top left LED
This indicates it is sending +2V from the left hand output. So the oscillator should now give C5. 
* If not, flip the switch up, and tweak the knobs until the oscillator gives a C5 in tune.
* Push the switch back to the middle to save that setting, then tap down again to set -2V to C1
* Tap the switch again, and the LED will move to the right column, in the middle.
* This represents the 0V output for the right hand CV output.
* Repatch at this point, so the right CV output controls the Bottom oscillator.
* Because the oscillators aren't calibrated, each oscillator will respond differently. This process tunes the left output to the top oscillator, the right to the bottom. 
* You can tap through the voltages to check everything is working as it should, flipping up to change any voltages you're not happy with.
* Once you're finished, press reset to return to normal MIDI mode.

IMPORTANT: You've calibrated the left CV output to the top oscillator, and the right CV output to the bottom oscillator. If you use them the other way around, they'll be out of tune. 

https://youtu.be/JDn54STRaz8  
{% include linkedHeading.html heading="How to calibrate the SineSquare Oscillators" level=2 %}    

Remember, you only need to calibrate the oscillators if you are using external equipment - a CV keyboard or sequencer.  

Again, the best way to explain oscillator calibration is with [this six-minute video](https://www.youtube.com/watch?v=JDn54STRaz8) but I've described the process in words below.

Try not to get obsessed with this calibration process. These oscillators are not laboratory equipment. You will not be able to get 6+ octaves of perfect tuning, but 3-4 octaves should be fine. 

To calibrate the oscillators you need: 
  * A tuner. Most DAWs have a built-in tuner, or you can use a phone app.  
  * A small flat head screwdriver
  * NB Use normal patch cables for calibration. Do not use illuminated patch cables, or Stackables that split the signal to two outputs. 
 
  * Patience and time. Please don't try to do this in a hurry or while distracted. 
  
{% include linkedHeading.html heading="Short version" level=4 %}    
 
* Set up the top oscillator so you can hear it. 
* Using the keyboard, play a note. 
* Then play a note an octave above. 
* Are the two notes in tune? 
* No? If the high octave is flat, turn the little gold screw one turn clockwise. And vice-versa. 
* Yes? Try a two octave gap and continue until the whole keyboard feels in tune. 
* [Calibrate the Computer](#how-to-calibrate-the-computer) once you've finished, using the instructions above.
  
{% include linkedHeading.html heading="Long version" level=4 %}    
* Set up your Workshop System so you can listen to the top oscillator 
* Ensure FM is turned fully down 
* Patch the keyboard (or sequencer) to the Pitch input. Ensure that the keyboard notes are changing the pitch. 
* Select a note on the keyboard, around the middle of the range. If you know which note is set to zero volts (likely C3 or C4) use that, but it doesn't matter. 
* With that note playing, tune the oscillator to the note you've chosen, for example C3. 
* Now play a note two octaves higher - in this case C5. 
* Check the tuner: 
    * Too sharp: Turn the little gold trimmer anti-clockwise one turn. 
    * Too flat: Turn the little gold trimmer clockwise one turn. 
    * IMPORTANT: Do not try to keep turning the trimmer until the note is in tune. That feels like the right thing to do, but it is not! Just do one or two  turns, then go back and check. 
* Return to the original note, which should be out of tune. Re-tune it to C3. 
* Now play C5 again and check the tuning. If it's still flat, try another turn clockwise. If you've overshot and it's sharp, try half a turn anti-clockwise. 
* Repeat the process until you are happy. Retune, play an octave, turn the gold trimmer. 
* Repeat the process with the bottom oscillator. 
* When I calibrated oscillators from the first batch, I normally had to turn about three turns clockwise to get close. Your experiences may be different. 
* [Calibrate the Computer](#how-to-calibrate-the-computer) once you've finished, using the instructions above.

 
