---
title: "Perfectoid Rings Breakdance in Sonic Pi?"
description: "I move through perfectoid rings, p-adic towers, and the Frobenius map, wondering if any of it could ever end up in Sonic Pi’s sandbox."
pubDate: "May 25 2026"
heroImage: "/itemPreview.webp"
badge: "number algorithms"
tags: [ "perfectoid rings", "figurate_numbers", "live coding", "Sonic Pi",  "p-adics",  "infinite sequences" ]
---

One of the ideas that comes to mind when I think about prime numbers is their staticness, that naive definition we've known forever. I wanted primes $p$ to spin, or do something different; to become scores, in the musical sense of the word.

But that's exactly what happens when we run a loop to check their divisors (I won't cite that here because it's a classic), when we put them through a computer. We iterate, we move something. In that sense, I discovered long ago that this obsession with iteration exists in number theory as a beautiful notion called **p-adic numbers**.

## P-adics in Sonic Pi

In my library <a href="https://rubygems.org/gems/figurate_numbers" target="_blank" rel="noopener noreferrer">figurate_numbers</a> for Sonic Pi, I introduced some time ago a transformation of sequences into their $p$-adic versions.

You can istall it with the next command:
```shell
gem install figurate_numbers
```

 Since I loved the taste of algebra (and of course **Serre's book**), I implemented it as an inverse limit, that is, iterating over powers of primes. I phrase it like this:

$$
\mathbb{Z}_p = \varprojlim_{N} \mathbb{Z}/p^N\mathbb{Z}
$$

To the topological eye, we have discrete groups that, through a system of modular reductions, give rise to a profinite topology.

I also added a couple of important definitions: the **p-adic valuation** and the **p-adic norm** (both of which I had already read about in 2018 in the opening pages of **Koblitz's book**). What you can do in  `figurate_numbers` is summarized in these commands:

```rb
# Simply copy the entry point path
# from the lib/figurate_numbers.rb file
# where the gem is installed.
require "<PATH>"

amp_seq = SpaceFigurateNumbers.centered_hendecagonal_pyramidal
100.times do
  # p-adic amplitude control
  sample :bd_sone, amp: ArithTransform.padic_norm(amp_seq.next, 3)
  sleep 0.25
end
```

Afterwards I became interested in the **p-adic versions** of many other mathematical objects. Once you pick up a new lens, it's natural to want to test how the mathematics deforms under the new structure to find the analogues.

But since I saw no further comments on the <a href="https://in-thread.sonic-pi.net/t/figurate-numbers-for-sonic-pi-new-ruby-gem-for-infinite-number-sequences-and-patterns/8962/21" target="_blank" rel="noopener noreferrer">Sonic Pi forum</a>. I decided to leave things in suspense, and not only for that reason.

I'm also watching the evolution of the new software Sam Aaron is building with `SuperSonic` and the version 5 of `Sonic Pi`, still in beta. And I need to see the terrain made of rocks so I can think of something interesting to build on top of it first.

Up to now, these are the commands available for a single note (`n`) or an array (`seq`) in Sonic Pi or Ruby:

```rb
ArithTransform.padic_val(n, p)
ArithTransform.ring_padic_val(seq, p)
ArithTransform.ring_padic_norm(seq, p)
```

Below, I will present the function that is perhaps the most natural way to start thinking about the main ideas of this post.

## Perfectoid rings

The p-adic theory has grown enormously, and a great deal of current mathematical research revolves around its methods. One definition I plan to eventually develop for `Sonic Pi` (once the new version drops) is that of a **perfectoid ring**, at least in its most naive form.

I'll use $p = 3$. Also, calling in the integers, let's look at $\mathbb{Z}_3$. To begin, a number $x$ can be written in this three-phase universe as

$$
x = a_0 + a_1 3 + a_2 3^2 + a_3 3^3 + \cdots .
$$

The values of each $a_i$ are simply the set $\{0, 1, 2\}$. For instance: $2 + 3 + 9 = 14$. Yes, one example is enough.

Let’s see this in a number of vertices of the absurd `four-dimensional dodecagonal pyramidal` infinite sequence:

```rb
dode_pyr_4D = FigurateNumbers.four_dimensional_dodecagonal_pyramidal.take(10)
# [1, 14, 60, 170, 385, 756, 1344, 2220, 3465, 5170]

ArithTransform.padic_expansion(dode_pyr_4D[1], 3, precision = 11, reverse: false)
# [2, 1, 1, 0, 0, 0, 0, 0, 0, 0]
# reads as 2 + 1·3 + 1·9 = 14 (exactly as shown above)
```
But, as in many things in life, we need to plant the tree by its roots, not with the crown in the dirt. We need many of these `roots`, an infinite myriad of them

$$
3^{\frac{1}{3}},\quad 3^{\frac{1}{9}},\quad 3^{\frac{1}{27}},\quad \ldots,
$$

and so on. With this you can now denote the slightly more general form of the ring $A$, keep it in memory like this

$$
A = \widehat{\mathbb{Z}_3[3^{\frac{1}{3^{\infty}}}]}.
$$

You can see that raising to powers gives $(3^{1/3})^3 = 3$ and $(3^{1/9})^3 = 3^{1/3}$, and so on down the chain.

> As I mentioned at the start of this post, this obsession with iteration shows up again and again.


Now, as in many theories in algebra, we need a special element. Here that element is called the `pseudo-uniformizer`,

$$
\pi = 3^{\frac{1}{3}}
$$

and $3$ is the uniformizer raised to $p = 3$, meaning $3 = \pi^3$.

This tells us that $3$ lives inside $\pi^3 A$ (keep that membership handy, it'll come in useful in a moment).


## Perfectoid magnifying glasses

What do numbers in this ring actually look like? An $x$ might appear as

$$
x = 1 + 3^{1/3} + 2 \cdot 3^{1/9}
$$

or as an infinite series (which reminds me of figurate numbers interacting with other figurate numbers, almost like a two-voice counterpoint)

$$
x = 2 + 3^{1/3} + 3^{2/3} + 3^{8/9} + \cdots.
$$

Well, what we note here is that, unlike ordinary $\mathbb{Z}_3$ expansions, these expressions allow **fractional exponents** with ever-growing denominators. As a result, the digits are placed at increasingly refined scales; each new root adds a finer layer of $π$-adic resolution.

And we can already perform reductions that were not available before. The element $\pi$ allows reductions to ignore every multiple of itself, so

$$
1 + 3^{1/3} \equiv 1 \pmod{\pi}.
$$

## Frobenius

Finally, the last thing to file away for quick access is the **Frobenius**. Here is what we do with the ring

$$
A / \pi A \longrightarrow A / \pi^3 A,
$$

given by $x \mapsto x^3$.

The second sufficient example: set $x = 1 + \pi$. We expand as a cubic polynomial (borrow the silhouette of $y^2 = x^3+ Ax + B$) in the pseudo-uniformizer by raising to the third power:

$$
x^3 = (1 + \pi)^3 = 1 + 3\pi + 3\pi^2 + \pi^3.
$$

Now here is why we spent years grinding through mechanical substitutions. Since $3 = \pi^3$, we get
$$
1 + \pi^4 + \pi^5 + \pi^3,
$$

because $3\pi = \pi^3 \cdot \pi = \pi^4$ and $3\pi^2 = \pi^3 \cdot \pi^2 = \pi^5$. Every term has order $\geq 3$. Topologically, this is of small size (with respect to the $\pi$-adic topology). So we have

$$
(1 + \pi)^3 \equiv 1 \pmod{\pi^3}
$$

because, grouping the expression like this

$$
1 + \pi^3(1 + \pi + \pi^2),
$$

we can see it lies in $\pi^3 A$.

Before serving the main course, what follows is a rough draft, kind of an attempt to give the expansion a voice in musical lines.

```rb
use_bpm 30
a_i = (ring 1.0, 1.0/3, 1.0/9, 1.0/27)

# a_0, large-scale structure ::
with_fx :reverb, room: 0.9, mix:  0.7 do
  live_loop :a_0 do
    synth :organ_tonewheel, note: :a1, amp: a_i[0],
      release: a_i[0] + rand(0.3), cutoff: 60
    sleep a_i[0]
  end
end

# a_1·3^(1/3) ::
with_fx :reverb, room: 0.7, mix:  0.7 do
  live_loop :a_1 do
    synth :prophet, note: (chord :a3, :m).choose,
      amp: 0.4, release: 0.25, cutoff: 80
    sleep a_i[1]
  end
end

# a_2·3^(1/9) ::
with_fx :reverb, room: 0.5, mix:  0.7 do
  live_loop :a_2 do
    synth :rhodey, note: (chord :a2, :m).choose,
      amp: 0.1, release: 0.1, cutoff: 100
    sleep a_i[2]
  end
end

# a_3·3^(1/27), almost imperceptible 1 + 3^{1/3} \equiv 1 \pmod{\pi}
# muting this changes nothing fundamental ::
with_fx :reverb, room: 0.3, mix:  0.7 do
  live_loop :a_3 do
    synth :fm, note: (chord :a4, :m).choose,
      amp: 0.08, release: 0.05, cutoff: 120
    sleep [a_i[3], 0.05].max
  end
end
```

## The Capsule Corp

After all these divagations, everything above is captured in the following more formal definition. If $A$ is a topological ring, we will call it an **integral perfectoid ring** if there exists an element $\pi$ (non zero divisor) such that

$$
A \cong \varprojlim_{N} A / \pi^N A,
$$

$p \in \pi^p A$, and the Frobenius map

$$
A/\pi A \longrightarrow A/\pi^p A
$$

is an isomorphism.

But, note the isomorphism earns its place. The ring $A$ is a musical echo of characteristic $p$. This echo is the **tilt** of $A$, which is beautifully denoted with a flat musical symbol: $A^{\flat}$.
And an interval, a semitone transition between mixed characteristic, can be tilted to characteristic $p$, solved there, and returned (*Da Capo al Fine*).

## Towards Sonic Pi Again

At this point I'm genuinely unsure what direction the translation of all this into Sonic Pi's musical sand might take. I'll definitely post something in the community at some point to see if anyone's interested.
The **perfectoid structure** carries infinite root towers, profinite completions, Frobenius symmetry, all of which feel rich enough to generate interesting **live coding** material.

Stepping out for a moment before the ice melts and **Watanabe's** ice cream vendor fails: I also found a distant resemblance in my interest for objects that repeat in different places, something I wrote some time ago for carpentry (**sawtooth** in electronic music) with Fourier, like the repeated figures of an album.

For instance, rewriting the classical real trigonometric functions as solutions to the harmonic oscillator,
$$
\frac{d^2 f}{dt^2} + \left(2 \left(\int_{-\infty}^{\infty} e^{-\tau^2}\, d\tau\right)^2 f_0\right)^2 f(t),
$$
which is required to vanish. Yes, evidently as a game under the sun, this could be the case $p=2$:
$$
\mathbb{Q}_2 (2^{\frac{1}{2^\infty}}).
$$

But how to map that faithfully, or even playfully, into sequences, amplitudes, or rhythmic patterns is still an open question for me. I'll leave it here, as an unresolved $n$-chord, with $n \ge 3^{3^3}$.
