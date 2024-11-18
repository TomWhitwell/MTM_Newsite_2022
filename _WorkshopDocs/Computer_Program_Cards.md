---

layout: documentation
output: false
page-name: "Computer Program Cards" 
permalink: "/Computer_Program_Cards/"
order: 2


---


# Program Cards and the Computer
 &nbsp;
 
 {% include linkedHeading.html heading="MIDI" level=2 %}

  {% include documentation_image.html filename="images/WS_MIDI_Ableton.jpg" caption="The MIDI card shows up over USB Midi as an input AND an output" %}
  
  [This Instagram Reel explains the MIDI card in 90 seconds](https://www.instagram.com/reel/DBjZivNN67D/)
  


 {% include linkedHeading.html heading="Turing Machine" level=2 %}
  {% include documentation_image.html filename="images/WS_Turing_Editor.jpg" caption="The Turing Machine Card has four configurable Turing Machine random looping sequencers" %}

 <a href="/web_config/turing.html" class="buy-btn">Launch the Turing Machine Web Editor</a>
 
[Here's a quick demo of the Turing Machine card on Instagram](https://www.instagram.com/reel/DCTmBretEFf/) 
 
 {% include linkedHeading.html heading="Reverb+" level=2 %}
 {% include documentation_image.html filename="images/WS_Reverb+_Editor.jpg" caption="Reverb+ works as an excellent mid-fi reverb, but is much, much, much more than that." %}

<a href="/web_config/reverb.html" class="buy-btn">Launch the Reverb+ Web Editor</a>


Reverb+ combines a CV-controllable 'Hall' reverb algorithm with a flexible range of other utilities: MIDI to gate/CV, Bernoulli gate, Turing Machine, sample & hold, and two internal clock sources, all with associated clock dividers. These utilities are configured through a browser-based editor.
 {% include linkedHeading.html heading="User Interface" level=3 %}

The top row of jacks, the Z switch, and LEDs have fixed functions.
* The top row of jacks are always connected to the reverb inputs and outputs:
* The left audio in and the inverted right audio in are summed to form the (mono) input of the reverb.
* The left and right audio outputs are the stereo reverb output

The Z switch controls a noise gate and reverb 'freeze'
* When in the up position, the input signal passes directly into the reverberator
* When in the middle position, a noise gate is applied to the combined reverb input, useful for noisy input signals with long periods of silence 
* When in the (momentary) down position, the reverb is frozen: the input to the reverb is muted and the reverb decay is extended to infinity

The six LEDs have the following meaning:
* The column of three LEDs on the left show a VU meter for the wet reverb output. Solid illumination of the top LED indicates clipping of the output.
* The top LED of the right column lights when the input signal is clipped.
* Middle-right and bottom-right LEDs show the state of Pulse Out 1 and Pulse Out 2, respectively.

 {% include linkedHeading.html heading="Configuring Reverb+" level=3 %}
The remaining eight jack sockets and three knobs on the Computer have their function set through the [configuration editor](/web_config/reverb.html).

A new Reverb+ card is set up with this default configuration: 

* Main Knob: sets reverb wet/dry balance
* Knob X: sets reverb decay, from short room-like reverb to near-infinite sustain
* Knob Y: sets reverb tone, adjusting the balance of low and high frequencies in the reverb
* CV in 1: added to Knob X to set reverb decay
* CV in 2: added to Main Knob to set reverb wet/dry balance
* Pulse in 1: high input freezes the reverb

The CV outputs and remaining pulse inputs/outputs are dedicated to various utilities, focused on generation of random CVs:

* Pulse out 1: outputs a short (~2ms) trigger pulse at a fixed 120bpm
* Pulse out 2: output of a Bernoulli gate, that toggles between high and low with a 10% probability at each trigger pulse
* CV out 1: stepped random noise, sampled every other trigger pulse (i.e. 60bpm)
* CV out 2: the analogue output of an 8-step Turing Machine, with 10% chance of flipping each bit
* Pulse in 2: clock input for the Turing Machine

Return to defaults: Holding the Z switch down while turning on or rebooting the card will overwrite any saved configuration with these default settings.

 {% include linkedHeading.html heading="The web configuration editor" level=3 %}

To run the configuration editor, first plug a laptop/desktop computer into the (Workshop System) Computer using a USB cable, and load the editor at [musicthing.co.uk/web_config/reverb.html](/web_config/reverb.html). A browser that supports WebMIDI, such as Google Chrome, is required.

The editor interface is simply a list of sentences describing the functionality of the module, which can be changed by clicking any of the red words. Changing the sentences updates the card functionality immediately, but the new configuration is not saved onto the card until the 'Save to flash card' button is pressed.

Eight parameters are controlled by this interface:
* Four reverb settings: wet/dry, decay, tone and freeze
* Pulse outputs 1 and 2
* CV outputs 1 and 2

Additional sentences appear as needed to set options for the internal clocks, Turing Machine or Bernoulli gate.

**Configuration notes:**
* MIDI input is through USB. The Reverb+ card acts as a USB Midi Device, meaning that it must be connected to USB Host (such as a laptop) rather than another USB device (such as most MIDI controllers/keyboards)
* MIDI note pitches use CV output calibration set by the 00 Simple MIDI card.
* Pulse outputs have gate and trigger mode: the trigger mode generates a ~2ms pulse at a rising edge of the chosen gate source, useful for triggering the Slopes module on the Workshop System.
* The clock dividers for each output are independent (not synchronised)
* The Bernoulli Gate is based loosely on Mutable Instruments Branches, and the Turing Machine on the Music Thing Modular module, with similar inputs, outputs and parameters.

 {% include linkedHeading.html heading="Reverb+ Patch Tips" level=3 %}
* The most straightforward role of the Reverb+ is at both the start and end of the signal chain. CV and gate generation from the Reverb+ modulates analogue filters and oscillators, which feed into the reverb. The stereo reverb outputs are connected to Mix channels 1 and 2, panned hard left and right.
* The Reverb+ is designed to be fed back into itself, with tones ranging from a tonally coloured 'halo' around the input signal, through sustained metallic timbres to outright distortion, depending on the amplitude of feedback. Try feedback through both normal and inverting inputs, which may give different tones, or adding filters, ring mod, or other effects into the feedback path.
* Modulation of the Reverb Decay parameter causes a pitch shift, which can be exploited for unusual effects, or even to create melodic patterns. 
* CV and gate outputs can be fed back into CV and gate inputs - allowing a S&H triggered by the output of a Bernoulli gate, clocks with randomly varying frequency, self-modulated reverb parameters, etc.
* When the noise S&H is run continuously, the resulting white noise output reaches well into the audible range, useful as an audio source for percussion or subsequent shaping with filters.
* Up to four independent pulse outputs at different frequencies can be generated - useful for exploring polyrhythms and phasing.


 {% include linkedHeading.html heading="Blank" level=2 %}

