---
title: "Working with Generators"
description: "Learn how FigurateNum generates sequence terms on demand."
order: 3
---

Every sequence in FigurateNum is infinite, and yet none of them are ever fully computed. They're implemented as `lazy generators`: each term is produced only when asked for, so an infinite sequence costs exactly as much memory as a single term.

## Retrieving terms one at a time

```python
from figuratenum import FigurateNum

seq = FigurateNum().polygonal(m=17)
print(next(seq))
print(next(seq))
print(next(seq))
```

```python
1
17
48
```

Each call to `next()` advances the generator's internal state and returns the following term. We use `m=17` here as a small nod to Gauss, who proved the regular $17$-gon constructible by ruler and compass.

## Collecting finite terms

```python
seq = FigurateNum().centered_cuboctahedron()
print([next(seq) for _ in range(20)])
```

```python
[1, 13, 55, 147, 309, 561, 923, 1415, 2057, 2869, 3871, 5083,
 6525, 8217, 10179, 12431, 14993, 17885, 21127, 24739]
```

Twenty terms, pulled from a sequence that never ends. The generator itself doesn't know it stopped; it's simply waiting for the next call to `next()` that never comes.

## Generator independence

Each call to a sequence method returns its own generator, with its own internal state. Two generators from the same family don't share a position, a counter, or any memory of each other.

```python
a = FigurateNum().square()
b = FigurateNum().square()
print(next(a))
print(next(a))
print(next(b))
```

```python
1
4
1
```

`a` has already moved two steps ahead, but `b` starts exactly where `a` once did. As many independent generators as needed can run side by side from the same sequence, each tracing its own path through the same infinite family.
