---
title: "Sonic Pi 5 RC First Impressions with What Is Love"
description: "My first impressions of Sonic Pi 5 RC, including interface and audio improvements, documentation workflow, new musical features, a custom card deck tutorial, a Gabberkick validation issue I helped fix, and my adaptation of What Is Love by Haddaway."
pubDate: "July 20 2026"
heroImage: "/svg-ggb/blog-sonicpi-v5-node-tree.webp"
badge: "misc notes"
updatedDate: "July 27 2026"
tags: ["sonic pi",     "live coding",     "ruby", "creative coding",  "sonic pi tutorial", "music technology",  "computer music", "algorithmic composition", "mathematics"]
---

These are my first impressions of the new Sonic Pi 5 release candidate from the perspective of someone who loves live coding and contributed a fix to the Sonic Pi codebase while testing it.

I'll cover the new interface, documentation workflow, editor and audio features, some of the new musical material, and how to create your own card decks. I'll also talk about the contribution process and, at the end, share a gift that some people have asked me to make available so they can experiment with it.

> I also tested my two **Ruby** gems, [figurate_numbers](https://rubygems.org/gems/figurate_numbers) and [modular_forms](https://rubygems.org/gems/modular_forms/versions/0.0.5), and they continue to work correctly in this version.

<details class="[&_li]:my-0 [&_ul]:my-0.5">
<summary>Contents</summary>

- [Preferences: First look at the new interface](#preferences-first-look-at-the-new-interface)
  - [Editor Visuals](#editor-visuals)
  - [Audio and Recording](#audio-and-recording)
- [The documentation is a live learning tool](#the-documentation-is-a-live-learning-tool)
- [Fixing a Gabberkick validation issue in RC-3](#fixing-a-gabberkick-validation-issue-in-rc-3)
- [Music materials: new scales, samples and methods](#music-materials-new-scales-samples-and-methods)
- [Card Decks: A Tutorial](#card-decks-a-tutorial)
- [Phase and the oscilloscope](#phase-and-the-oscilloscope)
- [SuperSonic, node tree and live metrics](#supersonic-node-tree-and-live-metrics)
- [Code and performance](#code-and-performance)
- [Closing thoughts](#closing-thoughts)

</details>


## Preferences: First look at the new interface

The interface redesign also made a great impression on me. It feels more modern, cleaner, and more enjoyable to work with.

![Preferences](sp5-preferences.png)

We finally have theme customization, including **hue** changes, **transparency**, **monochrome**, and **color inversion**, providing a more personalized experience. The available themes are:

| Theme         | Hover description                                  |
| ------------- | -------------------------------------------------- |
| Light         | Light colour scheme                                |
| Dark          | Dark colour scheme                                 |
| High Contrast | High-contrast colour scheme for maximum legibility |
| Mild Dark     | A softer, low contrast color scheme                |
| Phosphor      | A green-on-black CRT colour scheme                 |
| Signal        | High-contrast blue-and-gold colour scheme          |

I selected **Phosphor** for the images below. Can you guess the hue adjustment value I used? However, I think I’ll be working with **Mild Dark** on a daily basis, as it feels really comfortable and easy on the eyes.

For those who enjoy the conveniences of modern code editors, it now includes a toolbar with **Cut**, **Copy**, **Paste**, and, most importantly, **Search**.

![Show editor toolbar](sp5-editor-toolbar.png)

Continuing with the interface improvements, what I found especially interesting is how the new control sliders support understanding and experimentation.

![Sonic Pi cutoff](sp5-cutoff.webp)

Beyond explaining the meaning of each envelope and parameter, these controls make valid ranges immediately visible, reducing trial and error and the need to consult the documentation.

For example, the visualization of `phase` in the **Echo FX** clearly defines its operating range:

$$
\textrm{phase} \in \mathbb{R}, \quad 0 \le \textrm{phase} \le 1.
$$

This kind of feedback creates a natural connection between programming and mathematical concepts such as intervals and functions.

Likewise, the visual representation of the `cutoff` through bars (visible in the image above) provides an immediate view of how **filtering changes** the frequency range, particularly the attenuation of higher frequencies, without relying only on numerical values.

### Editor Visuals

I noticed the new **dynamic event visualization** features added to the editor. Now, every triggered sound event can generate visual feedback through three customizable options, each with adjustable brightness:

- Flash code on sound trigger:
- Flash gutter on sound trigger
- Show live loop scopes
- Scrolling live loop scopes

Most interesting is the small oscilloscope and spectrum display (bar-style visualization) attached directly to the code line.

### Audio and Recording

What is immediately noticeable is the possibility to **record audio + video**. This is superb, as it removes the need for external software to capture our sessions.
There are also the audio options, such as selecting the audio device/driver, sample rate, and buffer size.

![Record audio and video](sp5-rec-audio.png)

## The documentation is a live learning tool

The documentation available through the help panel using the **`F1` key** is impressive. It creates a natural bridge for people coming from music production environments, **DAWs**, and hardware synthesizers.

![Sonic Pi v5 DOCS Panel](sp5-docs.webp)

> Now the docs and `f1` panes are independent windows. The help pane can be moved to another monitor, allowing you to keep your live session uninterrupted while adjusting its size and zoom as needed.

The combination of **code**, **parameter controls**, **knobs**, and visual controllers connects familiar musical workflows with live coding, making experimentation between **sound design** and programming much more fluid.

For example, a `mod_saw` (**modulated saw wave**) synth allows you to explore parameters such as `mod_range` directly with the knob, preview the sound using the virtual keyboard, and then transfer the result into your live coding session. This workflow creates a natural path from experimentation to code.

In RC-3, autocomplete previews samples with their **duration** in the editor.
Previously, you had to query it manually:

```rb
puts sample_duration(:arovane_beat_a)
# 14.767278911564626
```

Now, you see the rounded value **14.8s**, which is all you need for practice and improvisation.

## Fixing a Gabberkick validation issue in RC-3

> This was my first direct contribution to the Sonic Pi codebase: I identified an edge case in the synth validation system and fixed the problem.

While testing the Gabberkick synthesizer from the documentation, I ran into an issue when changing the `slope_intermediate` parameter:

![Gabberkick bug](sp5-gabberkick.png)

```shell
Runtime Error Sonic Pi doesn't know a function called >=
Example: play :e3, release: 0.5
Docs: play
buffer sonic-pi-tutorial-keys, line 4
NoMethodError: undefined method '&gt;=' for nil
line 4: play 34, slope_intermediate: 88
Backtrace:
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/synths/synthinfo.rb:335:in 'block in SonicPi::Synths::BaseInfo#v_positive'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/synths/synthinfo.rb:163:in 'block (2 levels) in SonicPi::Synths::BaseInfo#validate!'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/synths/synthinfo.rb:162:in 'Array#each'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/synths/synthinfo.rb:162:in 'block in SonicPi::Synths::BaseInfo#validate!'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/synths/synthinfo.rb:158:in 'Hash#each'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/synths/synthinfo.rb:158:in 'SonicPi::Synths::BaseInfo#validate!'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/lang/sound.rb:4379:in 'SonicPi::Lang::Sound#validate_if_necessary!'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/lang/sound.rb:3963:in 'SonicPi::Lang::Sound#trigger_synth'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/lang/sound.rb:3887:in 'SonicPi::Lang::Sound#trigger_inst'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/lang/sound.rb:1293:in 'SonicPi::Lang::Sound#synth'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/lang/sound.rb:1390:in 'SonicPi::Lang::Sound#play'
sonic-pi-tutorial-keys:4:in 'block (2 levels) in SonicPi::RuntimeMethods#__spider_eval'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/runtime.rb:1391:in 'Kernel#eval'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/runtime.rb:1391:in 'block (2 levels) in SonicPi::RuntimeMethods#__spider_eval'
C:/Program Files/Sonic Pi BETA/app/server/ruby/lib/sonicpi/runtime.rb:1636:in 'block (2 levels) in SonicPi::RuntimeMethods#__in_thread'
```

According to the documentation, `slope_start` has a default value of `84`, so I expected this to work:

```rb
use_synth :gabberkick

play 34,
  slope_intermediate: 88
```

However, it produced the error above. Interestingly, if I changed the `slope_start` value from the documentation or added it manually in the editor:

```rb
use_synth :gabberkick
play 34,
  slope_start: 84,
  slope_intermediate: 88
```

everything worked correctly. This meant that `slope_intermediate` only failed when `slope_start` was not explicitly provided.
To find the cause, I checked the Sonic Pi source code. The synth definitions themselves were correct, but in:

```text
.../app/server/ruby/lib/sonicpi/synths/synthinfo.rb
```

I found a validation error in the Gabberkick synthesizer argument metadata around line `4975`:

```rb
:slope_intermediate =>
{
  :doc => "The note where the frequency passes through after `:slope_length1`, typically much nearer to the final note.",
  :validations => [v_positive(:slope_start)],
  :modulatable => false
},
```

The validation was referencing the wrong parameter. It should validate `slope_intermediate` instead of `slope_start`:

```rb
:slope_intermediate =>
{
  :doc => "The note where the frequency passes through after `:slope_length1`, typically much nearer to the final note.",
  :validations => [v_positive(:slope_intermediate)],
  :modulatable => false
},
```

After making this small change locally, the problem was fixed and `slope_intermediate` works correctly (editor and docs) without requiring `slope_start` to be explicitly provided.

The issue was fixed in the GitHub commit:

- [`7740efc`](https://github.com/sonic-pi-net/sonic-pi/commit/7740efcfdff2c5cbfe2d472efb8b6051239d3552)


<!-- ### Interface observations (Solved in RC-2)

While exploring this **release candidate**, I noticed what might be a small interface detail related to zoom scaling. When the documentation zoom level is increased, some interface elements do not seem to adapt completely to the larger size. Some labels appear partially hidden or overlap, and the full names of certain controls are not always visible.

![Sonic Pi v5 DOCS Panel Zoom In](sp5-problems.webp)

It is a minor detail, but perhaps it could be improved with better spacing, responsive resizing, or a horizontal scroll option. I also noticed that the text labels inside some knobs do not appear to scale with the zoom level.

Additionally, it would be great if the lists inside **`Tutorial`**, **`Examples`**, **`Synths`**, **`Fx`**, **`Samples`**, and **`Lang`** could also support text scaling for users who need better visual accessibility.

This is only a design observation from my experience using the interface, but I think these small details could make Sonic Pi even more comfortable for a wider range of users. -->

## Music materials: new scales, samples and methods

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

I noticed an improvement in the explanation of `play_pattern` and `play_pattern_timed` in Tutorial section **8.2**.
There is also a new method in section **8.5** for ring chains called `invert_around`.

```rb
puts (ring 60, 64, 67).invert_around(:e4) # or 64
# (ring 68.0, 64.0, 61.0)
```

Mathematically, if $x$ is a note and $p$ is the pivot note (MIDI value or `:symbol`), the inversion is defined by

$$
\phi(x) = 2p-x.
$$

Equivalently, letting $d(x, p) = x-p$ denote the signed distance from $x$ to $p$,

$$
\phi(x) = p - d(x, p).
$$

Geometrically speaking, this is the reflection of the note $x$ across the pivot note $p$, which acts as the axis of symmetry.
Try another note and verify the result yourself.

<!--
In this version, our sample database currently contains **206 built-in samples**. Using `sample_groups`, `sample_names`, and `length`, we can generate easily the following table: -->

<!-- ```rb
sp5_samples = 0
sample_groups.each do |g|
  sp5_samples += sample_names(g).length
end
puts sp5_samples
``` -->

<!--

| Group       |    # | Sample Names                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----------- | ---: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:ambi`     |   11 | `:ambi_choir`, `:ambi_dark_woosh`, `:ambi_drone`, `:ambi_glass_hum`, `:ambi_glass_rub`, `:ambi_haunted_hum`, `:ambi_lunar_land`, `:ambi_piano`, `:ambi_sauna`, `:ambi_soft_buzz`, `:ambi_swoosh`                                                                                                                                                                                                                      |
| `:arovane`  |    5 | `:arovane_beat_a`, `:arovane_beat_b`, `:arovane_beat_c`, `:arovane_beat_d`, `:arovane_beat_e`                                                                                                                                                                                                                                                                                                                         |
| `:bass`     |    9 | `:bass_dnb_f`, `:bass_drop_c`, `:bass_hard_c`, `:bass_hit_c`, `:bass_thick_c`, `:bass_trance_c`, `:bass_voxy_c`, `:bass_voxy_hit_c`, `:bass_woodsy_c`                                                                                                                                                                                                                                                                 |
| `:bd`       |   15 | `:bd_808`, `:bd_ada`, `:bd_boom`, `:bd_chip`, `:bd_fat`, `:bd_gas`, `:bd_haus`, `:bd_jazz`, `:bd_klub`, `:bd_mehackit`, `:bd_pure`, `:bd_sone`, `:bd_tek`, `:bd_zome`, `:bd_zum`                                                                                                                                                                                                                                      |
| `:drum`     |   20 | `:drum_bass_hard`, `:drum_bass_soft`, `:drum_cowbell`, `:drum_cymbal_closed`, `:drum_cymbal_hard`, `:drum_cymbal_open`, `:drum_cymbal_pedal`, `:drum_cymbal_soft`, `:drum_heavy_kick`, `:drum_roll`, `:drum_snare_hard`, `:drum_snare_soft`, `:drum_splash_hard`, `:drum_splash_soft`, `:drum_tom_hi_hard`, `:drum_tom_hi_soft`, `:drum_tom_lo_hard`, `:drum_tom_lo_soft`, `:drum_tom_mid_hard`, `:drum_tom_mid_soft` |
| `:elec`     |   25 | `:elec_beep`, `:elec_bell`, `:elec_blip`, `:elec_blip2`, `:elec_blup`, `:elec_bong`, `:elec_chime`, `:elec_cymbal`, `:elec_filt_snare`, `:elec_flip`, `:elec_fuzz_tom`, `:elec_hi_snare`, `:elec_hollow_kick`, `:elec_lo_snare`, `:elec_mid_snare`, `:elec_ping`, `:elec_plip`, `:elec_pop`, `:elec_snare`, `:elec_soft_kick`, `:elec_tick`, `:elec_triangle`, `:elec_twang`, `:elec_twip`, `:elec_wood`              |
| `:glitch`   |    8 | `:glitch_bass_g`, `:glitch_perc1`, `:glitch_perc2`, `:glitch_perc3`, `:glitch_perc4`, `:glitch_perc5`, `:glitch_robot1`, `:glitch_robot2`                                                                                                                                                                                                                                                                             |
| `:guit`     |    4 | `:guit_e_fifths`, `:guit_e_slide`, `:guit_em9`, `:guit_harmonics`                                                                                                                                                                                                                                                                                                                                                     |
| `:hat`      |   21 | `:hat_bdu`, `:hat_cab`, `:hat_cats`, `:hat_gem`, `:hat_gnu`, `:hat_gump`, `:hat_hier`, `:hat_len`, `:hat_mess`, `:hat_metal`, `:hat_noiz`, `:hat_psych`, `:hat_raw`, `:hat_sci`, `:hat_snap`, `:hat_star`, `:hat_tap`, `:hat_yosh`, `:hat_zan`, `:hat_zap`, `:hat_zild`                                                                                                                                               |
| `:loop`     |   17 | `:loop_3d_printer`, `:loop_amen`, `:loop_amen_full`, `:loop_breakbeat`, `:loop_compus`, `:loop_drone_g_97`, `:loop_electric`, `:loop_garzul`, `:loop_industrial`, `:loop_mehackit1`, `:loop_mehackit2`, `:loop_mika`, `:loop_perc1`, `:loop_perc2`, `:loop_safari`, `:loop_tabla`, `:loop_weirdo`                                                                                                                     |
| `:mehackit` |   11 | `:mehackit_phone1`, `:mehackit_phone2`, `:mehackit_phone3`, `:mehackit_phone4`, `:mehackit_robot1`, `:mehackit_robot2`, `:mehackit_robot3`, `:mehackit_robot4`, `:mehackit_robot5`, `:mehackit_robot6`, `:mehackit_robot7`                                                                                                                                                                                            |
| `:misc`     |    3 | `:misc_burp`, `:misc_cineboom`, `:misc_crow`                                                                                                                                                                                                                                                                                                                                                                          |
| `:perc`     |   10 | `:perc_bell`, `:perc_bell2`, `:perc_door`, `:perc_impact1`, `:perc_impact2`, `:perc_snap`, `:perc_snap2`, `:perc_swash`, `:perc_swoosh`, `:perc_till`                                                                                                                                                                                                                                                                 |
| `:ride`     |    2 | `:ride_tri`, `:ride_via`                                                                                                                                                                                                                                                                                                                                                                                              |
| `:sn`       |    4 | `:sn_dolf`, `:sn_dub`, `:sn_generic`, `:sn_zome`                                                                                                                                                                                                                                                                                                                                                                      |
| `:tabla`    |   26 | `:tabla_dhec`, `:tabla_ghe1`, `:tabla_ghe2`, `:tabla_ghe3`, `:tabla_ghe4`, `:tabla_ghe5`, `:tabla_ghe6`, `:tabla_ghe7`, `:tabla_ghe8`, `:tabla_ke1`, `:tabla_ke2`, `:tabla_ke3`, `:tabla_na`, `:tabla_na_o`, `:tabla_na_s`, `:tabla_re`, `:tabla_tas1`, `:tabla_tas2`, `:tabla_tas3`, `:tabla_te1`, `:tabla_te2`, `:tabla_te_m`, `:tabla_te_ne`, `:tabla_tun1`, `:tabla_tun2`, `:tabla_tun3`                          |
| `:tbd`      |   11 | `:tbd_fxbed_loop`, `:tbd_highkey_c4`, `:tbd_pad_1`, `:tbd_pad_2`, `:tbd_pad_3`, `:tbd_pad_4`, `:tbd_perc_blip`, `:tbd_perc_hat`, `:tbd_perc_tap_1`, `:tbd_perc_tap_2`, `:tbd_voctone`                                                                                                                                                                                                                                 |
| `:vinyl`    |    4 | `:vinyl_backspin`, `:vinyl_hiss`, `:vinyl_rewind`, `:vinyl_scratch`                                                                                                                                                                                                                                                                                                                                                   |
 -->


## Card Decks: A Tutorial

In the **Menu → Examples**, there is a `QuickStart Cards` option that opens a panel with code snippet cards. These cards allow you to **copy** the snippet, **drag** it into the code editor, and listen to it with a play button, among other features. In fact, this is a wonderful educational tool. Here I'll show you how to create your own.

![Sonic Pi v5 CARD](sp5-cards.webp)

> Card decks are independent windows, like the `F1` help panels

To create a personalized card deck, go to **Examples → Load Card Set...** and create a `my-example-deck.txt` file. If you try to open an empty file or one with an invalid format, you will see this message:

```txt
my-example-deck.txt is not a valid card set.
No card decks were found.
A card set needs at least one "Deck: name" line followed by "## Card title" cards
```

The format I will use for my own `figurate-numbers.txt` card deck is based on polygonal numbers

$$
\begin{array}{ccc}
S_3(n) & S_4(n) & S_5(n)\\[2mm]
\text{triangular} & \text{square} & \text{pentagonal}
\end{array}
$$

````md
# Deck: Figurate Numbers
Numbers that grow into shapes. Turn mathematical patterns into musical melodies.

## Triangular Numbers
Numbers that form triangle patterns, with each step adding a new layer.
```
live_loop :triangular do
  notes = (ring 1, 3, 6, 10, 15)
  play notes.tick + 60
  sleep 0.5
end
```

## Square Numbers
Numbers formed by equal rows and columns, creating square patterns.
```
live_loop :square do
  notes = (ring 1, 4, 9, 16, 25)
  play notes.tick + 48
  sleep 0.5
end
```

## Pentagonal Numbers
Numbers that follow five-sided shapes, growing with each step.
```
live_loop :pentagonal do
  notes = (ring 1, 5, 12, 22, 35)
  play notes.tick + 52
  sleep 0.5
end
```
````

Simply keep the same structure and change the deck names, card titles, descriptions, and Sonic Pi snippets.

> A single `.txt` file can contain multiple `# Deck` sections with multiple `## Card` examples inside each one.

## Phase and the oscilloscope

One of the interesting parameters we can explore with the **Sine** synth is `phase_offset`. It lets us choose where the waveform starts inside its cycle.

![Lissajous example of three sine waves](sp5-lissajous.png)

Using the triangular number idea from the deck section,
you can play with different phase relationships and see their Lissajous patterns in the figure above:

```rb
triangular_notes = (ring 1, 3, 6, 10, 15, 21, 28, 35)
use_synth :sine

play triangular_notes[1] + 60,
  amp: 1.5, pan: -1,
  sustain: 6, phase_offset: 0.125

play triangular_notes[4] + 60,
  amp: 2, pan: 1,
  sustain: 6, phase_offset: 0.25

play triangular_notes[7] + 60,
  amp: 0.25, pan: 0,
  sustain: 6, phase_offset: 0.5
```

The value goes from $0$ to $1$, representing a fraction of a complete cycle (as mentioned in the docs).
Since one cycle corresponds to $360^\circ$, we can express the phase angle as:

$$
\theta = \text{phase\_offset}\times360^\circ .
$$

Well, let's make an $8$-step conversion table.

| `phase_offset` | Fraction of cycle | Degrees $\theta$ | Radians          |
| -------------- | ----------------- | ---------------- | ---------------- |
| `0`            | $0$               | $0^\circ$        | $0$              |
| `0.125`        | $\frac{1}{8}$     | $45^\circ$       | $\frac{\pi}{4}$  |
| `0.25`         | $\frac{1}{4}$     | $90^\circ$       | $\frac{\pi}{2}$  |
| `0.375`        | $\frac{3}{8}$     | $135^\circ$      | $\frac{3\pi}{4}$ |
| `0.5`          | $\frac{1}{2}$     | $180^\circ$      | $\pi$            |
| `0.625`        | $\frac{5}{8}$     | $225^\circ$      | $\frac{5\pi}{4}$ |
| `0.75`         | $\frac{3}{4}$     | $270^\circ$      | $\frac{3\pi}{2}$ |
| `0.875`        | $\frac{7}{8}$     | $315^\circ$      | $\frac{7\pi}{4}$ |
| `1`            | $1$               | $360^\circ$      | $2\pi$           |

Note that mathematically `phase_offset: 1` is equivalent to `phase_offset: 0`.

## SuperSonic, node tree and live metrics

For me, one of the most impressive things is the new **SuperSonic** audio backend. I haven’t explored the full codebase yet, but the ideas behind it are fascinating.
The new audio architecture gives us a much more **engineering-oriented** view of what is happening internally. The panel now shows the live audio node tree.

| Panel      | Metrics                                   |
| ---------- | ----------------------------------------- |
| ENGINE     | Version, Rate, Block, Channels, Ticks     |
| OSC        | Sent, Recv In, RT Out, NRT Out            |
| CLOCK      | Tempo, Beat, Phase, Playing, Peers        |
| DSP        | Load, Peak, Overruns                      |
| LINK AUDIO | In, Underruns, Buffered, Drift, Publish   |
| SCSYNTH    | Msgs, Queue, Max-Last, Late Age, Debug    |
| BUFFERS    | SynthDefs, Buffers, Buf Bytes             |
| ERRORS     | Dropped, Q Drop, Seq Gaps, Lates, Corrupt |

<img src="/svg-ggb/blog-sonicpi-v5-node-tree.webp" alt="Sonic Pi v5 Node Tree">

We can also observe **`Groups`**, **`Synths`**, **`FX`**, and **`Samples`** interacting in real time within this graph structure. This makes it much easier to trace the flow of audio and see how the different components are connected during a performance.

And what you are seeing in the image above is exactly **What Is Love**. At the beginning of the track, the **sample counter** is still at zero. Now, as promised, here comes the gift.

## Code and performance

For this version, I revisited my adaptation of **["What Is Love" (Haddaway)](https://www.youtube.com/watch?v=DLPzGmeS4Xg)**, originally created several years ago (2021).

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

Many thanks to [**Sam Aaron**](https://www.patreon.com/samaaron/posts/sonic-pi-v5-1-164093369) and the entire [**Sonic Pi**](https://in-thread.sonic-pi.net/) community for continuing to shape and evolve this amazing creative instrument.

You can also join the [community discussion](https://in-thread.sonic-pi.net/t/sonic-pi-v5-rc1-is-now-available-to-download/10023).
