---
title: "Advanced Theory"
description: "Generalized figurate numbers, recursive structures, equivalent polynomial forms, and their computational representations."
order: 12
---

## Generalized Figurate Numbers

Based on [Deza & Deza (2012)](https://doi.org/10.1142/8188), many figurate numbers admit extensions beyond their standard index range or dimensional setting. In particular, some classical families can be generalized to negative or shifted indices while preserving their polynomial form.

A key example is the **generalized pentagonal numbers**, defined by evaluating the same polynomial over the integers:

$$
S_5(n) = \frac{n(3n - 1)}{2}, \quad n \in \mathbb{Z}.
$$

For negative indices,

$$
S_5(-n) = \frac{n(3n + 1)}{2}.
$$

This yields the interleaved sequence

$$
\ldots, 40, 26, 15, 7, 2, 0, 1, 5, 12, 22, 35, \ldots
$$

Reordering by $n = 0, \pm1, \pm2, \pm3, \ldots$ gives

$$
0, 1, 2, 5, 7, 12, 15, 22, 26, \ldots
$$

corresponding to **OEIS A001318** and Euler’s pentagonal number theorem:

$$
\prod_{j=1}^{\infty} (1 - z^j)
=
\sum_{n \in \mathbb{Z}} (-1)^n z^{\frac{n(3n-1)}{2}}.
$$

In general, FigurateNum `generators` evaluate the polynomial sequentially over integer values of $n$.
Alternative enumerations (e.g. symmetric indexing $0, \pm1, \pm2, \ldots$) are not part of the computational model, but can be obtained by reordering evaluations.

## Computational Representation

In [Deza & Deza (2012)](https://doi.org/10.1142/8188), figurate numbers are given both recursively and through closed-form polynomial formulas.
The hypertetrahedral numbers illustrate this well: they can be expressed through recursive definitions, factorial expressions, binomial coefficients, or Gamma-function identities, all describing the same mathematical object.

For example, since

$$
S_3^3(n)=\frac{n(n+1)(n+2)}{3!},
$$

the recursive construction for a $k$-dimensional family is given by

$$
S_3^k(n+1)=S_3^k(n)+S_3^{k-1}(n+1),
$$

with initial condition

$$
S_3^k(1)=1.
$$

## Implementation

By default, FigurateNum uses optimized, mathematically equivalent implementations that are significantly faster, especially for multidimensional figurate numbers.

Incremental computation and precomputed values allow terms to be generated efficiently without repeatedly evaluating factorials or traversing recursive definitions.

The default implementation uses an incremental binomial update:

```python
def k_dimensional_hypertetrahedron(k: int) -> Generator[int]:
    delta = 1
    bin_coeff = 1

    while True:
        yield bin_coeff
        bin_coeff = bin_coeff * (delta + k) // delta
        delta += 1
```

The original formulations from the literature remain available through the corresponding `*_from_book()` methods for reference, validation, and testing.

