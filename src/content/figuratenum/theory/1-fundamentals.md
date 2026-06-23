---
title: "Fundamentals"
description: "Introduction to figurate numbers, their geometric origins, and the main families and visualizations used in the library."
order: 11
---

FigurateNum follows the definitions and organization of the book [Figurate Numbers](https://doi.org/10.1142/8188)
by Elena Deza and Michel Deza (2012), and can serve as a computational companion to it.

> Sequences, families, and generating functions documented here correspond directly to those
in that work, with corrections tracked in the [**errata**](https://github.com/edelveart/figuratenum/blob/main/docs/errata/errata-figuratenum.tex).

## The basic idea

Arrange pebbles on a table and some quantities form perfect triangles, others perfect squares. The Pythagoreans noticed this and called the resulting numbers **figurate**, from the Latin *figura* (shape): a number that counts the points in a regular geometric arrangement.

The simplest case is the triangular numbers,

$$
S_3(n) = \frac{n(n+1)}{2},
$$

so $S_3(1) = 1$, $S_3(2) = 3$, $S_3(3) = 6$, $S_3(4) = 10$, and so on. Stack them as rows of pebbles and the result is an equilateral triangle.

Square numbers $n^2$ do the same for grids, and the pattern extends to any regular polygon: pentagonal, hexagonal, heptagonal, and beyond.
What changes between them is the **number of sides** $m$ of the polygon. The general formula for the $n$-th $m$-gonal number is

$$
S_m(n) = \frac{n\bigl((m-2)n - (m-4)\bigr)}{2}.
$$

Setting $m = 3$ recovers the triangular numbers; $m = 4$ gives the squares.

## From geometry to number theory

The idea is old enough that it has had time to prove itself useful. Diophantus studied figurate numbers in the 3rd century, and over a thousand years later Fermat conjectured that every positive integer is a sum of at most three triangular numbers, four squares, five pentagonal numbers, and so on: the **Polygonal Number Theorem**.

Gauss proved the triangular case in 1796, writing in his diary: *ΕΥΡΗΚΑ! num = Δ + Δ + Δ*. The general theorem took until 1813, when Cauchy finally closed it. These results place polygonal numbers in the context of additive number theory.

> A set $A$  is called an additive basis of order $h$ if every nonnegative integer can be expressed as the sum of at most $h$ elements of $A$, with repetitions allowed.

Classical examples include the squares (Lagrange), polygonal numbers (Fermat–Cauchy), and $k$-th powers (Waring), while the primes appear in Goldbach-type problems.

## Sequences and generating functions by dimension

FigurateNum organizes the 235+ sequences and families into three groups by dimension.

- **Plane figurate numbers (2D)**: polygonal numbers, centered polygonal numbers, pronic numbers, and their relatives. Centered polygonal numbers build outward from a single point, surrounded by successive polygonal shells.
- **Space figurate numbers (3D)**: pyramidal numbers (polygonal numbers stacked as layers) and polyhedral numbers, whose terms count vertices of the Platonic solids: tetrahedral, cubic, octahedral, dodecahedral, icosahedral.
- **Multidimensional figurate numbers (4D and beyond)**: hypertetrahedra, hypercubes, hyperoctahedra, and their centered variants, generalizing the 2D/3D constructions to arbitrary dimension $k$.

> Within each family and dimension, some sequences admit natural extensions to integer indices $n \in \mathbb{Z}$, giving rise to their generalized variants.

## Generating functions and analysis

Figurate numbers admit a rational generating function. In general, for $(a_n)_{n \geq 0}$, we have

$$
f(z) = \sum_{n=1}^{\infty} a_n z^n.
$$

For the triangular numbers, $f(z) = \frac{z}{(1-z)^3}$, and for the squares, $f(z) = \frac{z(z+1)}{(1-z)^3}$. Both share the denominator $(1-z)^3$ and both vanish at $z=0$.

For $m$-gonal numbers in general, the denominator is always $(1-z)^3$, with $m$ encoded in the numerator. The degree of the denominator tracks dimension. Pyramidal numbers have $(1-z)^4$, and $k$-dimensional analogues have $(1-z)^{k+1}$.

**ComplexViz** renders the phase portrait of $f(z)$ in $\mathbb{C}$, via domain coloring after [Wegert (2012)](https://doi.org/10.1007/978-3-0348-0180-5). The enhanced phase portrait makes the analytic structure of $f(z)$ directly readable:

- poles, typically at $z = 1$ for these families, where $|f(z)| \to \infty$
- zeros, where $f(z) = 0$

Both leave characteristic signatures in the coloring.

## Modular structure

Instead of the values $a_k$ themselves, consider their residues modulo a fixed integer $n$,

$$
r_k \equiv a_k \bmod n,
$$
with $r_k \in \{0, 1, \ldots, n-1\}.$  Place $n$ points evenly on a circle, indexed $0$ through $n-1$. Each term $a_k$ maps to position $r_k$, and consecutive terms are joined by an edge $r_k \to r_{k+1}$.
The resulting orbit (the modular pattern) is what **DiscreteViz** draws, inspired by [Pérez Buendía (2025)](https://yoyontzin.substack.com/p/espirografos-orbitas-y-relojes).

Since $(a_k)$ is typically polynomial in $k$, the residue sequence $(r_k)$ becomes eventually periodic for any fixed $n$, and the orbit closes into a finite cycle in $\mathbb{Z}/n\mathbb{Z}$.

Symmetry in the resulting pattern depends on the pair $(a_k, n)$ rather than on the sequence alone.
A sequence may be symmetric for one modulus and asymmetric for another, while different sequences may exhibit similar patterns under a shared modulus.
