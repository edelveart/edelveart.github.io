---
title: "My Journey with Figurate Numbers"
description: "How I developed two of my most downloaded libraries that fuse mathematics, art, and music."
pubDate: "September 13 2025"
heroImage: "/itemPreview.webp"
badge: "algorithms"
tags: ["python", "ruby", "figurate numbers",  "live coding", "integer sequences"]
---

## The Spark

The first thing that caught my attention was a book by Fernando Zalamea Traba: Razón de la frontera y fronteras de la razón (2010), a Colombian mathematician and philosopher, in which he discussed the vision of Pavel Florensky, a Russian Orthodox priest with a unique perspective on mathematics, art, and philosophy. I found a beautiful quote that I’ll copy below:

> If it is possible to represent space on a plane, this can only be done by destroying the form of what is represented" (Florensky, 2003, cited in Zalamea, 2010, p. 39).

<p align="center">
    <img
        src="/svg-ggb/figurate-plane.svg"
        alt="Figurate Number in Polar Coordinates"
        class="w-72"
      />
  <p align="center"><em>Pentagonal and Triangular Numbers</em></p>
</p>

## The Foundation

My curiosity led me to Greece, where I studied the solids and figurate numbers in Plato. From there, I came across a Beamer presentation of the book Figurate Numbers by Michel Deza and Elena Deza (2012). This book is one of the most systematic compendium of this topic  through recursive and iterative definitions and their proofs.

For example, the definition of hypertetrahedron numbers in
\\(k\\) dimensions is the following (my admiration for the Gamma functions stems from Artin’s profound insights):

\\[
H_k = \frac{\Gamma(n+k)}{\Gamma(n) \Gamma(k+1)}
\\]

\\[
= \frac{\int_0^\infty t^{n+k-1} e^{-t} \ dt}{\left( \int_0^\infty t^{n-1} e^{-t} \ dt \right) \left( \int_0^\infty t^k e^{-t} \ dt \right)}.
\\]

This work became the foundation for creating figurate number generators in both Ruby and Python. What is wonderful about this book is that it covers everything from plane and spatial numbers to multidimensional numbers.

## Implementation in Ruby and Sonic Pi

Inspired by Ziffers, an algorithmic composition and code improvisation system by Miika Alonen, I integrated figurate numbers into Sonic Pi to generate sonic representations of these sequences. I sent him a couple of pull requests with some sequences, like the dodecahedral numbers, which he later merged into Ziffers. In that enthusiasm, I decided to create **figurate_numbers**, a complete version of the book in Ruby, which currently has over 4,200 downloads. With it, you can experiment with the sonification of the sequences using different musical algorithms and parameters.

```rb
# Sonic Pi
require "<PATH>"

amp_seq = SpaceFigurateNumbers.centered_hendecagonal_pyramidal
100.times do
  # p-adic amplitude control
  sample :bd_sone, amp: ArithTransform.padic_norm(amp_seq.next, 3)
  sleep 0.25
end
```

## Implementation in Python

It didn’t take long before I created a version in Python, with the idea that it would be useful for scientific calculations and mathematical exploration. To date, over 13,000 people have downloaded **figuratenum**, showing the community’s interest in applying mathematical concepts to various fields.

Finally, I adapted generators to a more computationally efficient form:

```py
def k_dimensional_hypertetrahedron(k: int) -> Generator[int]:
    """Optimized version using iterative
    binomial coefficient update for better performance."""
    delta = 1
    bin_coeff = 1
    while True:
        yield bin_coeff
        bin_coeff = bin_coeff * (delta + k) // delta
        delta += 1
```

## One of the Thousands of Geometries

Recently, I came across an autobiographical note by Rogelio Pérez Buendía, a Mexican mathematician, in which he spoke about spirographs, cardioids, and coffee cups. This led me to explore timetables and modular arithmetic. This prompted a new question:

> What would happen if we applied this geometric mapping to figurate numbers?

Thus, a new phase of the library was born, revealing fascinating mathematical symmetries in the representations of figurate numbers, and creating truly beautiful visualizations with just a few algorithms using `matplotlib` and `numpy`.

<p align="center">
    <img
        src="/svg-ggb/centered-hexagonal-pyramidal.svg"
        alt="Figurate Number in Polar Coordinates"
        class="w-72 h-72 mb-[-2rem]"
      />
  <p align="center"><em>Centered Hexagonal Pyramidal</em></p>
</p>

## What’s Next?

Today, I share this journey between mathematics, art, and music, with the satisfaction of having connected with a community passionate about these topics. I’m thinking about what other types of mappings could be useful to represent these beauties.

You can try both libraries here:

```bash
pip install figuratenum[figurate-viz]
```

```bash
gem install figurate_numbers
```
