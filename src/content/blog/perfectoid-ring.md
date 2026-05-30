---
title: "Perfectoid Rings Breakdance in Sonic Pi?"
description: "I wonder about a few ideas from perfectoid rings, and whether some of them could someday become playful features for Sonic Pi."
pubDate: "January 14 2026"
heroImage: "/itemPreview.webp"
badge: "number algorithms"
tags: ["figurate_numbers", "integer sequences", "Sonic Pi", "perfectoid", "p-adics", "live coding" ]
---

One of the ideas that comes to mind when I think about prime numbers is their staticness, that naive definition we've known forever. I wanted primes $p$ to spin, or do something different; to become scores, in the musical sense of the word.

But that's exactly what happens when we run a loop to check their divisors (I won't cite that here because it's a classic), when we put them through a computer. We iterate, we move something. In that sense, I discovered long ago that this obsession with iteration exists in number theory as a beautiful notion called **p-adic numbers**.

In my library <a href="https://rubygems.org/gems/figurate_numbers" target="_blank" rel="noopener noreferrer">figurate_numbers</a> for Sonic Pi, I introduced some time ago a transformation of sequences into their $p$-adic versions. Since I loved the taste of algebra (and of course **Serre's book**), I implemented it as an inverse limit, that is, iterating over powers of primes. I phrase it like this:

$$
\mathbb{Z}_p = \varprojlim_{N} \mathbb{Z}/p^N\mathbb{Z}
$$

To the topological eye, we have discrete groups that, through a system of modular reductions, give rise to a profinite topology.

I also added a couple of important definitions: the **p-adic valuation** and the **p-adic norm** (both of which I had already read about in 2018 in the opening pages of **Koblitz's book**). What you can do in  `figurate_numbers` is summarized in these commands:

```rb
# ArithTransform.ring_padic_expansion(seq, p, precision = 11, reverse: false)
# ArithTransform.ring_padic_val(seq, p)
# ArithTransform.ring_padic_norm(seq, p)

amp_seq = SpaceFigurateNumbers.centered_hendecagonal_pyramidal
100.times do
  # p-adic amplitude control
  sample :bd_sone, amp: ArithTransform.padic_norm(amp_seq.next, 3)
  sleep 0.25
end
```

Afterwards I became interested in the **p-adic versions** of many other mathematical objects. Once you pick up a new lens, it's natural to want to test how the mathematics deforms under the new structure to find the analogues. But since I saw no further comments on the <a href="https://in-thread.sonic-pi.net/t/figurate-numbers-for-sonic-pi-new-ruby-gem-for-infinite-number-sequences-and-patterns/8962/21" target="_blank" rel="noopener noreferrer">Sonic Pi forum</a>.

I decided to leave things in suspense, and not only for that reason. I'm also watching the evolution of the new software Sam Aaron is building with `SuperSonic` and the version 5 of `Sonic Pi`, still in beta. What he's crafting looks formidable.

## Perfectoid rings

The p-adic theory has grown enormously, and a great deal of current mathematical research revolves around its methods. One definition I plan to eventually develop for `Sonic Pi` (once the new version drops) is that of a **perfectoid ring**, at least in its most naive form.

I'll use $p = 3$. Also, calling in the integers, let's look at $\mathbb{Z}_3$. To begin, a number $x$ can be written in this three-phase universe as

$$
x = a_0 + a_1 3 + a_2 3^2 + a_3 3^3 + \cdots .
$$

The values of each $a_i$ are simply the set $\{0, 1, 2\}$. For instance: $2 + 3 + 9 = 14$. Yes, one example is enough.

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

or as an infinite series

$$
x = 2 + 3^{1/3} + 3^{2/3} + 3^{8/9} + \cdots.
$$

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

The second sufficient example: set $x = 1 + \pi$. We expand as a cubic polynomial in the pseudo-uniformizer by raising to the third power:

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


## The Capsule Corp

Everything above is captured in the following more formal definition. If $A$ is a topological ring, we will call it an **integral perfectoid ring** if there exists an element $\pi$ such that

$$
A \cong \varprojlim_{N} A / \pi^N A,
$$

$p \in \pi^p A$, and the Frobenius map

$$
A/\pi A \longrightarrow A/\pi^p A
$$

is an isomorphism.


## Towards Sonic Pi

At this point I'm genuinely unsure what direction the translation of all this into Sonic Pi's musical terrain might take. I'll definitely post something in the community at some point to see if anyone's interested.

The perfectoid structure carries infinite root towers, profinite completions, Frobenius symmetry (all of which feel rich enough to generate interesting **live coding** material).

But how to map that faithfully, or even playfully, into sequences, amplitudes, or rhythmic patterns is still an open question for me. I'll leave it here, as an unresolved $n$-chord, with $n \ge 3^{3^3}$.
