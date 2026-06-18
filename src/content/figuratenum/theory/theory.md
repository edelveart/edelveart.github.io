---
title: "Theory"
description: "What figurate numbers are, where they come from historically, the four
        families the library organizes them into, and the mathematical structure
        behind the two visualizations."
order: 11
---

Arrange pebbles on a table and some quantities form perfect triangles, others perfect squares. The Pythagoreans noticed this and called the resulting numbers **figurate**, from the Latin *figura* (shape): a number that counts the points in a regular geometric arrangement.

## The basic idea

The simplest case is the triangular numbers,

$$
T_n = \frac{n(n+1)}{2},
$$

so $T_1 = 1$, $T_2 = 3$, $T_3 = 6$, $T_4 = 10$, and so on. Stack them as rows of pebbles and the result is an equilateral triangle. Square numbers $n^2$ do the same for grids, and the pattern extends to any regular polygon: pentagonal, hexagonal, heptagonal, and beyond.

What changes between them is the **number of sides** $m$ of the polygon. The general formula for the $n$-th $m$-gonal number is

$$
P(m, n) = \frac{n\bigl((m-2)n - (m-4)\bigr)}{2}.
$$

Setting $m = 3$ recovers the triangular numbers; $m = 4$ gives the squares.

## A brief history

The idea is old enough that it has had time to prove itself useful. Diophantus studied figurate numbers in the 3rd century, and over a thousand years later Fermat conjectured that every positive integer is a sum of at most three triangular numbers, four squares, five pentagonal numbers, and so on: the **Polygonal Number Theorem**. Gauss proved the triangular case in 1796, writing in his diary: *ΕΥΡΗΚΑ! num = Δ + Δ + Δ*. The general theorem took until 1813, when Cauchy finally closed it.

## Three families

FigurateNum organizes the 235+ sequences from [Deza & Deza (2012)](https://doi.org/10.1142/8188) into four families.

**Plane figurate numbers** (2D): polygonal numbers, centered polygonal numbers, pronic numbers, and their relatives. Centered polygonal numbers build outward from a single point, surrounded by successive polygonal shells; the centered triangular numbers begin $1, 4, 10, 19, 31, \ldots$

**Space figurate numbers** (3D): pyramidal numbers (polygonal numbers stacked as layers) and polyhedral numbers, whose terms count vertices of the Platonic solids: tetrahedral, cubic, octahedral, dodecahedral, icosahedral.

***k*-dimensional figurate numbers**: hypertetrahedra, hypercubes, hyperoctahedra, and their centered variants, generalizing the 2D/3D constructions to arbitrary dimension $k$.

**Generalized figurate numbers**: parametric extensions of any of the above, with the defining parameter (sides, dimension, or both) left free.

## Generating functions

Every sequence in FigurateNum has a rational generating function. For $(a_n)_{n \geq 0}$,

$$
G(z) = \sum_{n=0}^{\infty} a_n z^n.
$$

For the triangular numbers, $G(z) = \dfrac{z}{(1-z)^3}$. For $m$-gonal numbers in general, the denominator is always $(1-z)^3$ and the numerator encodes $m$; the denominator degree grows with dimension: pyramidal numbers have $(1-z)^4$, and $k$-dimensional sequences have $(1-z)^{k+1}$.

This is what **ComplexViz** visualizes: the phase portrait of $G(z)$ in $\mathbb{C}$, via domain coloring after [Wegert (2012)](https://doi.org/10.1007/978-3-0348-0180-5). The poles of $G(z)$, generally at $z = 1$ for these families, appear as the bright singularities; their order corresponds to the dimension of the sequence.

## Modular structure

A different lens: instead of the values $a_n$ themselves, consider their residues modulo a fixed integer $N$,

$$
r_n \equiv a_n \bmod N, \qquad r_n \in \{0, 1, \ldots, N-1\}.
$$

Place $N$ points evenly on a circle, indexed $0$ through $N-1$. Each term $a_n$ maps to position $r_n$, and consecutive terms are joined by an edge $r_n \to r_{n+1}$. The resulting orbit (the modular pattern) is what **DiscreteViz** draws, inspired by [Pérez Buendía (2025)](https://yoyontzin.substack.com/p/espirografos-orbitas-y-relojes).

Because $(a_n)$ is typically polynomial in $n$, $(r_n)$ is eventually periodic for any fixed $N$, so the orbit closes into a fixed pattern. Quadratic sequences such as the polygonal numbers produce symmetric, spirograph-like figures in $\mathbb{Z}_N$; higher-dimensional sequences produce more intricate orbits. The same sequence, viewed through $G(z)$ and through $(r_n)$, shows two distinct facets of the same object: one analytic, one arithmetic.
