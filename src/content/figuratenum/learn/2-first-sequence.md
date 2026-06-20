---
title: "Sequences and Families"
description: "Generate your first figurate number sequences in a few minutes."
order: 2
---

The square numbers are where most people first meet figurate numbers, even without the name: $1, 4, 9, 16, \ldots$, each term the count of points in a square grid.
FigurateNum produces these as lazy generators (more on that in the next section), so a call to `next(seq)` pulls one term at a time.

```python
from figuratenum import FigurateNum

seq = FigurateNum().square()
print([next(seq) for _ in range(8)])
```

```python
[1, 4, 9, 16, 25, 36, 49, 64]
```

## Families of figurate sequences

Triangular, square, pentagonal, and hexagonal numbers belong to the same family. The only difference is the number of sides.
FigurateNum captures that with a single parameter, $m \ge 3$.

```python
seq = FigurateNum().polygonal(m=3)
print([next(seq) for _ in range(8)])
```

```python
[1, 3, 6, 10, 15, 21, 28, 36]
```

At $m=3$ this is the triangular numbers; raise it to $m=4$ and the squares from the first example reappear.

## Into three dimensions

The same logic that builds a triangle out of rows of points builds a tetrahedron out of layers of triangles. The tetrahedral numbers count the points in three-dimensional stacks of triangles, forming one of the five Platonic solids.

```python
seq = FigurateNum().tetrahedral()
print([next(seq) for _ in range(8)])
```

```python
[1, 4, 10, 20, 35, 56, 84, 120]
```

## Past three dimensions

Once dimension itself becomes a parameter, call it `k`, the construction keeps going past anything that can still be visualized. The hypertetrahedron generalizes the tetrahedron the way the tetrahedron generalized the triangle.

```python
seq = FigurateNum().k_dim_hypertetrahedron(k=4)
print([next(seq) for _ in range(8)])
```

```python
[1, 5, 15, 35, 70, 126, 210, 330]
```

Here $k \ge 4$ and must be an integer. Changing it selects a different sequence entirely, the same role $m$ played for polygonal numbers earlier.
