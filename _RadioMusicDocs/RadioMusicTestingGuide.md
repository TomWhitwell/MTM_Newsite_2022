---

layout: documentation
output: false
page-name: "Radio Music Testing Guide"
permalink: "/Radio_Music_Testing_Guide/"
order: 0.5
title: "Radio Music Testing Guide"
description: "Post-build testing guide for Radio Music mk2"
body_class: "documentation-page--compact radio-music-testing-guide"

---

{% include linkedHeading.html heading="Is my Radio Music mk2 working properly?" level=2 %} 

A quick guide to testing and getting to know the controls on your Radio Music mk2. 

Before you start will need: 
- A Radio Music mk2 module. You can tell it's mk2 because it has a USB-C socket on the front.  
- A micro SD card, ideally from a decent brand like SanDisk, with the files from the [Suggested Audio collection](/Radio_Music_Suggested_Audio/) written onto it. You can use the 22GB or the 8GB version. 
- An audio output, mixer, some way to listen to the audio output from the module 
- Some patch cables 
- If you have it, some way to make moving voltages and or pulses - a sequencer or LFO. 

Advice before you start: 
- The second most common problems with modules are missed or bad solder joints, or short circuits. They're usually very easy to fix. Missed joints can give weird intermittent problems, which can be confusing. 
- The most common problem is misunderstanding; testing something in a hurry, not being sure what it's supposed to do, forgetting to turn something on, patching mistakes. 
- Sometimes, but very rarely, there are much more mysterious problems; incompatibility with other gear, faulty components or damaged circuit boards. 
- If you have a problem, don't panic. Take a break. Really! Then write an email to support@thonk.co.uk. Often I find just writing the problem down and looking carefully at the solder joints helps me solve it yourself. 
- If you think something is wrong, don't immediately start trying to remove components and tear apart your module. This is definitely the time to ask for help. 
- When I say 'check the soldering' I mean looking carefully to make sure it's been soldered, then reheating ('reflowing') the joint - touch it with a clean hot wet (with a little solder) soldering iron tip until the solder melts completely, flowing into the joint, leaving it in a 'volcano' shape, not a blob. 

### 1. Install your module 

- With the case switched off, connect the power ribbon.
- Align the red stripe with the RED>>RED marking on the module. 
- Do not insert the SD card yet. 
- Mount the module securely, then...

### 2. Turn on power to the case.

- With no SD card fitted, one light should move slowly across the four top LEDs. This means the module is powered and waiting for a card.


<table class="build-check-table">
  <tr>
    <td>Power header correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
  <tr>
    <td>Top 4 LEDs correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
  <tr>
    <td colspan="2" class="build-check-note">No power?<br>Check the case power and ribbon cable direction, then check soldering on the power header. <br>Dead LED?<br>Check the soldering and orientation of LEDs. You can look at the shapes inside the LEDs to tell if one is the wrong way round</td>
  </tr>
</table>


### 3. Insert the SD card. 

- The gold contacts on the card go on the side marked on the panel. 
- You will see some activity on the LEDs as the module scans the folders for a few seconds, then you’ll see the LEDs flickering as a VU meter. 
- A faster moving light means the card mounted but no valid audio was found.
- Now patch the output from the module to your mixer input and turn up the volume. 
- You will hear audio from the module. If you hear nothing, just turn the top knob - you might just be in a moment of silence. 

<table class="build-check-table">
  <tr>
    <td>Micro SD Holder correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
  <tr>
    <td>Output socket correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
  <tr>
    <td>Files correctly copied to SD Card</td>
    <td class="build-check-mark">✓</td>
  </tr>
    <tr>
    <td colspan="2" class="build-check-note">No sound?<br><a href='/Radio_Music_Reference/#startup-and-sd-card'>Check for LED error messages</a>.<br>
    Check soldering on the output socket for a missing joint. <br>
    Check the very small pins on the SD card socket for missing joints or short circuits. 
    </td>
  </tr>

</table>

### 4. Turn the top knob. 

- This is the Station control, which selects which sample is playing. 
- It works just like a radio tuning knob - you’ll hear the samples changing as you turn it, and it will settle on one sample playing smoothly when you stop moving it. 
- You will be able to hear roughly 10-30 different sounds as you turn the top knob, it depends how many files are in each bank. (Bank 15 only contains two test samples, vinyl crackle and birdsong) 
- The Station knob is also a pushbutton. Use it to select a different bank. A bank is a folder of sounds. On the Suggested Audio SD Card, banks have themes - 0 is music radio, 1 is talk radio etc. 
- Push the top knob in. While it’s held in, turn it round. 
- You’ll hear sounds playing from each bank as you turn it, and the LEDs will show the number of the bank (in binary, obviously!) Release the knob to select that bank. 

<table class="build-check-table">
  <tr>
    <td>Station knob (and pushbutton) correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
      <td colspan="2" class="build-check-note">Station knob strangeness?<br>Check soldering on the station knob. A missing or bad connection on the 3-pin side could give you a very small range or glitchy movement.<br>If you can change stations but not banks, check the 2-pin side, which is the push switch. 
    </td>

</table>

### Push the Reset button. 

- You will hear the audio immediately retrigger (remember it might retrigger at a point where the audio is silent). 
- The LED on the button will flash when you press it.

<table class="build-check-table">
  <tr>
    <td>Reset button correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
        <td colspan="2" class="build-check-note">Reset not working?<br>Check soldering on reset button, and make sure it physically moves and clicks. If the button works but the LED doesn't light, you may have put the button the wrong way round. This is annoying to fix, so contact Thonk to ask for advice.  
    </td>

</table>

### Use the Start knob 
- The Start knob sets where the sample plays from when Reset is pressed. 
- Tap Reset again, move Start, tap reset. You’ll be moving around inside the sample. 
- The Start knob is also a pushbutton.
- Push Start to enter pitch mode. The LED next to the knob will come on, and you’ll immediately hear the audio change speed. 
  - Fully clockwise (5 o’clock) is normal speed. 
  - Fully anti-clockwise (7 o’clock) is reversed. 
  - In the middle (12 o’clock) the audio is extremely slow and may sound silent
- Play with that knob to check it’s working, then tap the knob again to leave pitch mode. 

<table class="build-check-table">
  <tr>
    <td>Start knob (and pushbutton) correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
  <tr>
    <td>Pitch LED correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
        <td colspan="2" class="build-check-note">Start knob strangeness?<br>Check soldering on the start knob. A missing or bad connection on the 3-pin side could give you a very small range or glitchy movement.<br>If you can can't enter pitch mode, check the 2-pin side, which is the push switch. 
    </td>

</table>

### Use the CV and Pulse inputs 

That’s all the physical controls, we’ll now test the CV and pulse inputs. 

- Station CV controls the station selection. 
- It responds to positive 0-5v signals which are added to the pot position.
- The sample selected changes immediately as soon as the voltage changes. 
- Patch an LFO or sequencer to Station CV and turn the top pot fully counter-clockwise. You will hear the station changing. 

<table class="build-check-table">
  <tr>
    <td>Station socket correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
  
          <td colspan="2" class="build-check-note">Just check the three pins on the socket if this doesn't work.
    </td>
</table>

- Start CV controls the start point. 
- Reset is a pulse input that does the same thing as the reset button. 
- Like the knob, Start CV has no effect until the reset button is pushed or a pulse arrives. You can modify this behaviour in settings.txt if you want to. 
- First confirm that the Start/Pitch LED is off, so the module is in Start mode. 
- Turn the Start knob fully counter-clockwise. Patch a 0–5V LFO or sequencer to START and a trigger or gate to RESET. The playback position should change on each reset.
- Radio Music responds very quickly to a rising edge at the RESET input. Some analogue sequencers change their CV slightly after producing their gate or trigger. If the wrong station or start position is occasionally selected, add a short delay using resetDelay in settings.txt. 

<table class="build-check-table">
  <tr>
    <td>Start socket correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
  <tr>
    <td>Reset socket correctly soldered</td>
    <td class="build-check-mark">✓</td>
  </tr>
  
        <td colspan="2" class="build-check-note">Just check the three pins on the sockets if this doesn't work.
    </td>

  
</table>
