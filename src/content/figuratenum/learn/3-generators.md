---
title: "Working with Generators"
description: "Learn how FigurateNum generates sequence terms on demand."
order: 3
---

Every sequence in FigurateNum is infinite, and yet none of them are ever fully computed. They are implemented as `lazy generators`, where each term is produced only when it is requested, so an infinite sequence costs exactly as much memory as a single term.

## Retrieving terms one at a time

Each call to `next()` advances the internal state of the generator and returns the following term. We use $m = 17$ here as a small nod to Gauss, who proved that a regular $17$-gon is constructible with ruler and compass.

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

## Collecting finite terms

Twenty terms pulled from a sequence that has no end. The generator remains active, waiting for the next call to `next()` that never comes.

```python
seq = FigurateNum().centered_cuboctahedron()
print([next(seq) for _ in range(20)])
```

```python
[1, 13, 55, 147, 309, 561, 923, 1415, 2057, 2869, 3871,
5083, 6525, 8217, 10179, 12431, 14993, 17885, 21127, 24739]
```

## Generator independence

Each call to a sequence method returns a new generator with its own internal state. Generators created from the same sequence or family evolve independently, without sharing position, counters, or memory.

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

Observe that `a` has already moved two steps ahead, while `b` starts from the initial position.
Multiple generators can run in parallel from the same sequence, each following its own path through the infinite family.
