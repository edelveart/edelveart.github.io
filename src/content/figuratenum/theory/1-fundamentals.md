---
title: "Fundamentals"
description: "Introduction to figurate numbers, their geometric origins, and the main families and visualizations used in the library."
order: 11
---

Arrange pebbles on a table and some quantities form perfect triangles, others perfect squares. The Pythagoreans noticed this and called the resulting numbers **figurate**, from the Latin *figura* (shape): a number that counts the points in a regular geometric arrangement.

## The basic idea

The simplest case is the triangular numbers,

$$
S_3 = \frac{n(n+1)}{2},
$$

so $S_3(1) = 1$, $S_3(2) = 3$, $S_3(3) = 6$, $S_3(4) = 10$, and so on. Stack them as rows of pebbles and the result is an equilateral triangle. Square numbers $n^2$ do the same for grids, and the pattern extends to any regular polygon: pentagonal, hexagonal, heptagonal, and beyond.

What changes between them is the **number of sides** $m$ of the polygon. The general formula for the $n$-th $m$-gonal number is

$$
S_m(n) = \frac{n\bigl((m-2)n - (m-4)\bigr)}{2}.
$$

Setting $m = 3$ recovers the triangular numbers; $m = 4$ gives the squares.

## From geometry to number theory

The idea is old enough that it has had time to prove itself useful. Diophantus studied figurate numbers in the 3rd century, and over a thousand years later Fermat conjectured that every positive integer is a sum of at most three triangular numbers, four squares, five pentagonal numbers, and so on: the **Polygonal Number Theorem**.
Gauss proved the triangular case in 1796, writing in his diary: *ΕΥΡΗΚΑ! num = Δ + Δ + Δ*. The general theorem took until 1813, when Cauchy finally closed it.

These results place polygonal numbers in the context of additive number theory. A set $A$  is called an additive basis of order $h$ if every nonnegative integer can be expressed as the sum of at most $h$ elements of $A$, with repetitions allowed.

Classical examples include the squares (Lagrange), polygonal numbers (Fermat–Cauchy), and $k$-th powers (Waring), while the primes appear in Goldbach-type problems.


## Three families

FigurateNum organizes the 235+ sequences following [Deza & Deza (2012)](https://doi.org/10.1142/8188) into four families.

- **Plane figurate numbers** (2D): polygonal numbers, centered polygonal numbers, pronic numbers, and their relatives. Centered polygonal numbers build outward from a single point, surrounded by successive polygonal shells.

- **Space figurate numbers** (3D): pyramidal numbers (polygonal numbers stacked as layers) and polyhedral numbers, whose terms count vertices of the Platonic solids: tetrahedral, cubic, octahedral, dodecahedral, icosahedral.

- **Multidimensional figurate numbers**: hypertetrahedra, hypercubes, hyperoctahedra, and their centered variants, generalizing the 2D/3D constructions to arbitrary dimension $k$.

- **Generalized figurate numbers**: some sequences in different dimensions admit natural extensions to integer indices $n \in \mathbb{Z}$. For example, the generalized pentagonal numbers play a role in Euler's partition theory.

## Generating functions

Every sequence in FigurateNum has a rational generating function. For $(a_n)_{n \geq 0}$,

$$
G(z) = \sum_{n=0}^{\infty} a_n z^n.
$$

For the triangular numbers, $G(z) = \dfrac{z}{(1-z)^3}$. For $m$-gonal numbers in general, the denominator is always $(1-z)^3$ and the numerator encodes $m$; the denominator degree grows with dimension: pyramidal numbers have $(1-z)^4$, and $k$-dimensional sequences have $(1-z)^{k+1}$.

This is what **ComplexViz** visualizes: the phase portrait of $G(z)$ in $\mathbb{C}$, via domain coloring after [Wegert (2012)](https://doi.org/10.1007/978-3-0348-0180-5). The portrait makes the analytic structure of $G(z)$ directly readable: poles (typically at $z = 1$ for these families), where $|G(z)|$ diverges, and zeros, where it vanishes, both leave characteristic signatures in the coloring.ou

## Modular structure

A different lens: instead of the values $a_n$ themselves, consider their residues modulo a fixed integer $N$,

$$
r_n \equiv a_n \bmod N, \qquad r_n \in \{0, 1, \ldots, N-1\}.
$$

Place $N$ points evenly on a circle, indexed $0$ through $N-1$. Each term $a_n$ maps to position $r_n$, and consecutive terms are joined by an edge $r_n \to r_{n+1}$. The resulting orbit (the modular pattern) is what **DiscreteViz** draws, inspired by [Pérez Buendía (2025)](https://yoyontzin.substack.com/p/espirografos-orbitas-y-relojes).

Because $(a_n)$ is typically polynomial in $n$, the residue sequence $(r_n)$ becomes eventually periodic for any fixed $N$, and the orbit closes into a finite cycle in $\mathbb{Z}/N\mathbb{Z}$.

Within this setting, quadratic sequences such as polygonal numbers may exhibit symmetric or asymmetric visual patterns depending on the modulus $N$: the same sequence can appear symmetric for one value of $N$ and asymmetric for another, while different sequences may produce similar visual symmetries under the same modulus.
