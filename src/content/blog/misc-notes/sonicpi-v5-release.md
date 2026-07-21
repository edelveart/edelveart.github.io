---
title: "Sonic Pi 5 RC First Impressions with What Is Love"
description: "First impressions of Sonic Pi 5 RC through live coding, interface improvements, new musical features, and my What Is Love (Haddaway) adaptation."
pubDate: "July 20 2026"
heroImage: "/sonicpi-v5-docs.webp"
badge: "misc notes"
tags: ["sonic pi", "live coding", "ruby", "creative coding", "sonic pi tutorial", "music technology", "computer music", "algorithmic composition", "mathematics"]
---

I am going to share my first impressions of the new **Sonic Pi 5** release candidate from the perspective of someone who loves live coding, including the new interface, documentation workflow, editor visualizations, audio features, and some of the new musical material.
At the end of this post, I’ll also share a small gift that some people have asked me for so they can experiment with it.

> I also checked my `Ruby` gems, and they still work correctly: [figurate_numbers](https://rubygems.org/gems/figurate_numbers) and [modular_forms](https://rubygems.org/gems/modular_forms/versions/0.0.5)

## First look at the new interface

The interface redesign also made a great impression on me. It feels more modern, cleaner, and more enjoyable to work with.

We finally have theme customization, including **hue** changes, **transparency**, **monochrome**, and **color inversion**, providing a more personalized experience. The available themes are:

- Light
- Dark
- High Contrast
- Mild Dark (really nice on my eyes)
- Phosphor (I selected this one for the images below and guessed the percentage of hue adjustment I used)
- Signal

Continuing with the interface improvements, what I found especially interesting is how the new control sliders support understanding and experimentation.

<img class="rounded-md shadow-sm shadow-primary/50" src="/svg-ggb/sonicpi-v5.webp" alt="Sonic Pi v5">

Beyond explaining **ADSR envelopes**, these controls make the possible range of each `parameter` much clearer. Instead of guessing valid values or discovering them through trial and error, the visual interface immediately shows the available possibilities and encourages exploration.

For example, a parameter such as `phase` becomes more intuitive when its range is visually represented:

$$
\textrm{phase} \in \mathbb{R}, \quad 0 \le \textrm{phase} \le 1.
$$

This kind of feedback creates a natural connection between programming and mathematical concepts such as intervals and functions.

Likewise, the visual representation of the `cutoff` parameter through bars (visible in the image above) provides an immediate view of how **filtering changes** the frequency range, particularly the attenuation of higher frequencies, without relying only on numerical values.

### Editor

I noticed the new dynamic event visualization features in the editor. Each triggered sound event can now create visual feedback. The three available options with adjustable brightness are:

- Flash code on sound trigger
- Flash gutter on sound trigger
- Show live loop scopes


## Documentation as a learning tool

The documentation available through the help panel using the **`F1` key** is impressive. It creates a natural bridge for people coming from music production environments, **DAWs**, and hardware synthesizers.

<img class="rounded-md shadow-sm shadow-primary/50" src="/svg-ggb/sonicpi-v5-docs.webp" alt="Sonic Pi v5 DOCS Panel">

The combination of **code**, **parameter controls**, **knobs**, and visual controllers connects familiar musical workflows with live coding, making experimentation between **sound design** and programming much more fluid.

For example, a `mod_saw` (**modulated saw wave**) synth allows you to explore parameters such as `mod_range` directly with the knob, preview the sound using the virtual keyboard, and then transfer the result into your live coding session. This workflow creates a natural path from experimentation to code.


### Interface observations

While exploring this **release candidate**, I noticed what might be a small interface detail related to zoom scaling. When the documentation zoom level is increased, some interface elements do not seem to adapt completely to the larger size. Some labels appear partially hidden or overlap, and the full names of certain controls are not always visible.

<img class="rounded-md shadow-sm shadow-primary/50" src="/svg-ggb/sonicpi-v5-problems.webp" alt="Sonic Pi v5 DOCS Panel Zoom In">

It is a minor detail, but perhaps it could be improved with better spacing, responsive resizing, or a horizontal scroll option. I also noticed that the text labels inside some knobs do not appear to scale with the zoom level.

Additionally, it would be great if the lists inside **`Tutorial`**, **`Examples`**, **`Synths`**, **`Fx`**, **`Samples`**, and **`Lang`** could also support text scaling for users who need better visual accessibility.

This is only a design observation from my experience using the interface, but I think these small details could make Sonic Pi even more comfortable for a wider range of users.


## Music material: new scales and samples

Using `puts scale_names`, I found some new scales available in this version:

```rb
(ring
  :acoustic,
  :altered,
  :byzantine,
  :lydian_dominant,
  :phrygian_dominant
)
```

Likewise, with `puts chord_names`, I found these new chord options:

```rb
(ring
  "7+9",
  "9-5",
  "mM7",
  "maj13",
  "min7",
  "minor_major7",
  "mmaj7"
)
```

## Audio

Finally, one of the major changes is the new audio architecture powered by **SuperSonic**. The panel now provides a more engineering-oriented view of the audio node tree:

- ENGINE
- OSC
- CLOCK
- DSP
- Link Audio
- SCSYNTH
- BUFFERS
- ERRORS

<img class="rounded-md shadow-sm shadow-primary/50" src="/svg-ggb/sonicpi-v5-node-tree.webp" alt="Sonic Pi v5 Node Tree">

We can also observe **`Groups`**, **`Synths`**, **`FX`**, and **`Samples`** operating in real time inside this tree.

This is a really valuable visualization for anyone interested in touch what happens behind the scenes during a performance. And what you are seeing here is exactly **What Is Love**. Below comes the promised gift.

## Code and performance

For this version, I revisited my adaptation of **"What Is Love" (Haddaway)**, originally created several years ago (2021).

Use the copy button to quickly try the code in your own Sonic Pi session.

```ruby
##| What Is Love (HADDAWAY) for Sonic Pi

use_bpm 126

##| ARP
with_fx :reverb, mix: 0.5, room: 0.85 do
  with_fx :distortion, distort: 0.4 do
    live_loop :intro_melody do
      use_random_seed dice(4)
      a = (ring :Bb4, :A4, :Bb4, :G4)
      b = (ring :Bb4, :A4, :Bb4, :F4)
      c = (ring :A4, :G4, :A4, :F4)
      synth :chiplead, note: (knit a.tick, 8, b.look, 8, c.look, 16).look,
        release: rrand(0.15, 0.25), sustain: 0.1, attack: 0,
        decay: 0, amp: 0.4
      sleep 0.5
    end
  end
end

##|HARMONY
with_fx :reverb, mix: 0.5, room: 0.9 do
  live_loop :chords, delay: 16, sync: :intro_melody do
    with_fx :slicer, phase: 0.75 do
      use_synth :dsaw
      chordas = [(ring :G4,:BB4,:D4), (ring :F4,:BB4,:D4),
                 (ring :F4,:A4,:D4), (ring :F4,:A4,:C4)].tick
      play chordas, amp: 0.75, sustain: 3, attack: 0.25,  release: 0.25
      sleep 4
    end
  end
end

##|SPLASH
with_fx :panslicer, invert_wave: 1, phase: 1.0/4 do
  live_loop :splash,  delay: 32 * 1 do
    use_random_seed 43
    sample :ambi_lunar_land, release: 0.25, amp: rrand(0.2,0.3)*1
    sleep 0.5
  end
end

##| BEEPFUSION
with_fx :reverb, mix: 0.3, room: 0.7 do
  with_fx :echo, mix: 1, phase: 0.5 do
    live_loop :harp_music, delay: 48*1 do
      use_random_seed 123
      8.times do
        tick
        with_fx :panslicer, phase: 0.75, invert_wave: [1,0].choose do
          p = (ring :G4, :Bb4, :A4, :F4)
          synth :dtri, note: p.choose, release: 0.2
          sleep (ring 0.25,0.75,0.5).look
        end
      end
    end
  end
end

##| BASS GROOVE
with_fx :distortion, distort: 0.5 do
  live_loop :bassus_impro,  delay: 64 * 1 do
    t = (ring :G3, :G3, :G3, :G3, :F3, :Bb3,
         :Bb3,  :Bb3, :C4,  :Db4, :D3,  :D3, :D3,
         :D3, :D3, :F3,  :F3,  :F3,   :D3,  :F3) - 12
    synth :fm, note: t.tick, release: 0.45,
      sustain: 0.15, amp: 1.2
    sleep (ring 1,0.75,0.75,1, 0.5).look
  end
end

##| TEK DRUM
live_loop :eternal, delay: (64+16)*1 do
  sample :bd_haus, amp: 2.5, cutoff: 93, rate: 0.97, compress:  1
  sleep 1
end

##| DRUMS
live_loop :bom, delay: (64 + 32)*1 do
  sample :bd_sone, amp: 1, compress: 1, rate: 1.7
  sleep 1
  with_fx :reverb, mix: 0.2, room: 0.14 do
    sample :sn_dolf,  amp: [1,1].tick
    sleep 1
  end
end

##| SING THE MELODY
with_fx :reverb, room: 0.5, mix: 0.8 do
  with_fx :ping_pong, mix: rrand(0.55,0.6), amp: 0.5, phase: 0.25 do
    with_fx :echo, phase: 0.25, mix: 0.5, pre_mix: 1, max_phase: 1, decay: 1.5 do
      with_fx :distortion, mix: 0.2, distort: 0.8 do
        live_loop :principal_melody, delay: (64 + 64)*1 do
          melody = [:r, :D4, :Eb4, :D4, :F4, :D4,
                    :D4, :F4, :D4, :D4, :C4, :D4, :F4, :G4]
          sleep_m = [2,0.5,0.5,0.5,1,2.5,0.5,1,2.5,0.5,3,0.5,0.5,0.5].ring
          synth :supersaw, note: melody.tick, amp: 0.6, release: 0.35, sustain: 0.2
          sleep sleep_m.look
        end
      end
    end
  end
end
```

## Closing thoughts

My thanks to [**Sam Aaron**](https://www.patreon.com/samaaron/posts/sonic-pi-v5-1-164093369) and the entire [**Sonic Pi**](https://in-thread.sonic-pi.net/) community for continuing to evolve this amazing creative environment.

