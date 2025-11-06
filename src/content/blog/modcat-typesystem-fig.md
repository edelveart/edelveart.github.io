---
title: "Category of Modules and Type-Level Programming with Figurate Numbers"
description: "A piece on the intersection of figurate numbers and modules, demonstrating how type-level programming unlocks new ideas for math and live coding music."
pubDate: "October 25 2025"
heroImage: "/itemPreview.webp"
badge: "Type-Level Algorithmic Music"
tags: ["algebra", "typescript",  "type-level programming",   "figurate numbers", "module theory"]
---

Where do numbers live when a program computes them? Not in memory, exactly, that's just their temporary residence. I mean their abstract home, the mathematical space where sequences unfold according to their rules.

While reviewing basics notions in category theory, I found myself contemplating this question: where, in some platonic sense, do my libraries that generate figurate numbers actually perform their work?

## The Beginnings

My interest in type systems began pragmatically: I needed them. While developing ts-tonnetz for <a href="https://topos.live/#ziffers_tonnetz/" target="_blank" rel="noopener noreferrer">Topos</a>. Later, in 2024, I built <a href="https://www.npmjs.com/package/fignumbers" target="_blank" rel="noopener noreferrer">fignumbers</a>, a library for generating figurate number sequences.

The technical challenges were immediate. I needed arbitrary-precision arithmetic, so I used `BigInt`. I needed flexible sequence generators, so I explored mapped types. Here's a glimpse of the machinery in `fignumbers/core`:

```ts
type GenRecord = Record<
  string,
  { generate: (...fignumbersParams: Record<string, bigint | undefined>[]) => Generator<bigint> }
>;

export type MappedTypeConfig<TMapStrategy extends GenRecord> = {
  [Key in keyof TMapStrategy]: Parameters<TMapStrategy[Key]["generate"]>[0];
};
```
These explorations raised a deeper question: could mathematical operations be computed at the type level, during compilation rather than runtime?

This is indeed possible through Type-Level Programming, where TypeScript's type system becomes a computational medium in its own right.

However, as I thought more about this, something even more fascinating came to mind:  a bridge between discrete sequences and continuous geometry, between compile-time types and algebraic structures.
What follows is a `low-level` narrative of that analogy.

## From Triangular Numbers to Polygonal Modules

The route we will take begins with triangular numbers, arrangements of dots forming perfect triangles. From there, we ascend to polygonal numbers, parametrized by the number of sides.

Then we introduce the Fibonacci sequence, which, though not figurate, fits as another special case of the same structure.

Finally, we arrive at a unified framework where recursive definitions find their home in the algebra of free modules.

### Building the Mathematical Notions

In the book Figurate Numbers (2012), polygonal numbers have two equivalent definitions. One is in closed form (which is efficient for `generators` in code), and the other is recursive. We will focus on the latter conception.

In general, polyonal numbers can be expressed as one of the many possible non-homogeneous linear recurrences of order $k=1$ (a complicated name, but the idea is simple):
$$
a_n = \sum_{j=1}^{k} c_j a_{n-j} + f(n),
$$

The beauty lies in what happens when we reexamine this from a geometric-arithmetic perspective. Consider triangular numbers:

$$
T_{n+1} = T_n + (n + 1), \quad T_1 = 1.
$$

What if, instead of adding numbers, we're adding *spaces*? I thought about reinterpreting this through **free modules over a ring $R$** (or vector spaces when $R = \mathbb{R}, \mathbb{C}$). Consider this recursive definition:

We set the vector space $$V_1 = \mathbb{R}$$ for the base case $T_1$. Then recursively define

$$
V_{n+1} = V_n \oplus \mathbb{R}^{n+1}.
$$

For example, when $n=1$, we have $V_2 =  \mathbb{R} \oplus \mathbb{R}^{1+1} \cong \mathbb{R}^3$. Then,
if we try $n=2$, we have $V_3 =  \mathbb{R}^3 \oplus \mathbb{R}^{2+1} \cong \mathbb{R}^6$, an son on.

We can see that the ranks under direct sums of modules behaves additively,
$$
\text{rank}(M \oplus N) = \text{rank}(M) + \text{rank}(N),
$$

so the sequence of dimensions $\{\operatorname{rank}(V_n)\}_{n \ge 0}$ exactly recovers the triangular numbers.

> Arithmetic has become geometry.

But why stop at triangles? Polygonal numbers admit a natural generalization.
Borrowing the formula presented on page $5$ of <a href="https://www.worldscientific.com/worldscibooks/10.1142/8188#t=aboutBook" target="_blank" rel="noopener noreferrer">Figurate Numbers (2012)</a>:

$$
p_m(n+1) = p_m(n) +  (1 + (m − 2)n)
$$
with $ p_m(1) = 1$.

In this formula, $m$ is the number of sides and controls how quickly the sequence grows.

### Polygonal Modules

We can lift this entire family of $p_m$ polygonal numbers into the algebraic setting by mimicking the pattern at the level of modules.

Let $R$ be a ring, and let $M_R$  be a free module over $R$. We call $\mathfrak{p}_m$ the set of polygonal modules with $m$ sides, defined by

$$
\mathfrak{p}_m = \left\{ M_n \mid M_{n+1} = M_n \oplus R^{1 + (m - 2)n} \right\}
$$

where $M_1 = R$, with $m \geq 3$ and $n \geq 1$.

This encodes the entire zoo of polygonal numbers: $m=3$ gives triangular modules, $m=4$ gives square modules, and so on. For instance, if we take $m = 5, n= 2$,  we compute the third pentagonal number:

$$
M_3 = \mathbb{C}^5 \oplus \mathbb{C}^{1+(5-2)2} \cong \mathbb{C}^{12}.
$$

What have we gained by this "little game"? We've elevated a numerical pattern into categorical structure, where arithmetic recurrences become functorial constructions.

## When Types Operate as Real Vectors or Modules Over a Ring

Having established the algebraic framework with modules and direct sums, we now translate these ideas into TypeScript's type system.

The construction mirrors our mathematical definitions, i.e., a recursive type builds vector spaces whose dimensions encode the numerical sequences we seek.

The foundation consists of two primitives. First, `VectorSpace<dim>` constructs an array type of length `dim`, representing a vector space of that dimension.

Second, `DirectSum<V, W>` concatenates two vector spaces, mirroring the module operation $M\oplus N$ where ranks add:

```ts
type VectorSpace<dim extends number, A extends number[] = []> = A["length"] extends dim
  ? A
  : VectorSpace<dim, [number, ...A]>;

type DirectSum<V extends number[], W extends number[]> = VectorSpace<[...V, ...W]["length"]>;

type V1 = VectorSpace<200>;
type V2 = VectorSpace<335>;
type V3 = DirectSum<V1, V2>;
```

With these building blocks, we can now implement triangular numbers. The type `VecTriangular<n>` recursively constructs $V_{n}$ exactly as we defined algebraically.
At each step, we extract the array length, this is our `dim` that encodes the $n$-th triangular numbers.

```ts
type VecTriangular<
  n extends number,
  T_1 extends number[] = VectorSpace<1>,
  IterCount extends number[] = [1]
> = IterCount["length"] extends n
  ? T_1
  : VecTriangular<
      n,
      DirectSum<T_1, VectorSpace<[...IterCount, 1]["length"]>>,
      [1, ...IterCount]
    >;

type T_3 = VecTriangular<3>;
type T_5 = VecTriangular<5>;
type T_20 = VecTriangular<20>;
type T_50 = VecTriangular<50>;
```

One important thing here is that the type  `VectTriangular<n>` represents our triangular numbers in a vectorial way. But what happens if we set `n=50`?

> Type instantiation is excessively deep and possibly infinite.

Other errors you might encounter include those that occur when you define different types implementation:

> Type is excessively deep and possibly infinite.

> Type produces a tuple type that is too large to represent.

These happen because TypeScript's type system struggles with heavy recursion.
If you try using `BigInt`, you’ll find that even `1n` won’t work.

We’re essentially hitting a type depth limit (I think of it as a kind of *Type Overflow*). While optimization techniques exist, that’s not our focus here.

## Fibonacci as homogeneous case

Here comes the twist. While Fibonacci numbers aren't figurate, they align with this framework as well. They exemplify a linear *homogeneous* recurrence of order $k=2$
$$
a_n = a_{n-1} + a_{n-2} + 0
$$

with initial conditions  $a_0=0$ and $a_1 = 1$.

The key difference from polygonal numbers is that there's no external term $f(n)$, Fibonacci builds itself entirely from its own past.  Yet the module construction adapts seamlessly.

We can again represent this in a module theory framework. Let $M_R^{\text{free}}$ be a  free module over $R$ and define

$$
M_0 = \{0\}, \quad M_1 = R,
$$
with the recursive rule
$$
\quad M_n = M_{n-1} \oplus M_{n-2},
$$
for $n \geq 2$.

For example, we immediately return the second term when we take
$$
M_2 = M_1 \oplus M_0 = \{0\} \oplus R \cong R,
$$
if we set $(0, r) \mapsto r$. The next term is  $M_3 = R \oplus R \cong R^2$, which has rank 2.

Continuing this pattern, the set of ranks $\{\operatorname{rank}(M_n)\}_{n \ge 0}$ reflects the Fibonacci sequence in a natural algebraic way.

What strikes me most is the asymmetry of initial conditions: one is the trivial space  $\{0\}$, the other is $R$  (homeomorphic to a line when $R=\mathbb{R}$). From this imbalanced seed, nothing and a line, the entire Fibonacci sequence unfolds through pure categorical structure, yesterday and the day before yesterday, adding past to past in an eternal recursion.

### Fibonacci Types

The Fibonacci construction translates naturally into types.  Here, `VecFib<n>` implements the module recursion $M_n=M_{n−1} \oplus M_{n−2}$ tracking two previous states and building forward through direct sums:

```ts
type VecFib<
  n extends number,
  V_n_minus_2 extends number[] = VectorSpace<0>,
  V_n_minus_1 extends number[] = VectorSpace<1>,
  IterCount extends number[] = []
> = IterCount["length"] extends n
  ? V_n_minus_2
  : VecFib<n, V_n_minus_1, DirectSum<V_n_minus_2, V_n_minus_1>, [1, ...IterCount]>;

type VecFib_15 = VecFib<15>;
type DimVecFib_15 = VecFib<15>["length"];
```

Of course, at runtime we can simulate the same logic with ordinary functions:

```ts
function vectorSpace(n: number): number[] {
  return new Array(n).fill(0);
}

function directSum(v1: number[], v2: number[]): number[] {
  return [...v1, ...v2];
}

function vecFib(n: number, V_n_minus_2 = vectorSpace(0), V_n_minus_1 = vectorSpace(1), iterCount: number[] = []): number[] {
  if (iterCount.length === n) {
    return V_n_minus_2;
  }
  return vecFib(n, V_n_minus_1, directSum(V_n_minus_2, V_n_minus_1), [1, ...iterCount]);
}
```

This runtime version mirrors the type-level construction, though we traditionally compute Fibonacci with simpler direct recursion, without the apparatus of arrays and concatenation. The point here isn't efficiency, but conceptual fidelity.

Both implementations, at compile-time $\mathcal{C_{Time}}$ and runtime $\mathcal{E_{Time}}$, faithfully express the algebraic structure we defined with modules.

## Two Perspectives on the Same Structure

We've constructed sequences as modules, sequences as types, sequences as runtime values. But step back: what have we actually built? There's a kind of discrete dynamics here, where modules over rings evolve as abstract entities.

This construction admits two complementary interpretations, two paths that arrive at the same destination through different landscapes.

### Internal path

Notice how arithmetic and algebra mirror each other: adding numbers corresponds to taking direct sums of modules. This isn't coincidental, it's functorial.

Let $k \geq 1$. Using categorical machinery, we can formalize this as:

$$
\mathcal{F}: \mathbb{N}^k \longrightarrow \mathbf{Mod}_R^{\text{free}}.
$$

Here $k = 2$ for polygonal modules $\mathfrak{p}_m$, which are parametrized by $(m, n)$, and $k = 1$
for the Fibonacci sequence, parametrized by $n$ alone.

The structure is **built from within**.  Each module contains the previous as a submodule, preserving inclusions $M_n \hookrightarrow M_{n+1}$.
We're not jumping to some external geometric space; rather, the sequence *grows* its geometry organically through recursion.

This recursive functorial mapping bridges discrete and continuous, a sequence of integers becomes a sequence of vector spaces.

Instead of focusing on numbers, we now think in terms of lines, planes, and higher-dimensional Euclidean (or possibly non-Euclidean, if we choose a different bilinear form) spaces, all connected through their underlying topological nature.

Dimension, that quintessential geometric concept, encodes our arithmetic.

### External path

On the other hand, let’s consider a more naive approach and, for such, we set $R = \mathbb{R}$. We’re thinking of calculating and implementing a space focused purely on dimensionality, a functor that doesn’t account for any internal constructive structure:

$$
n \xrightarrow{\psi}a_n \xrightarrow{\;\mathbb{R}^{[\cdot]}\;} \mathbb{R}^{a_n}.
$$

First we perform arithmetically ($\psi$ could be any figurate number sequence), then we inject into geometry ($R^{[\cdot]}$ builds the free module of that rank). The composite functor is:

$$
\mathbb{R}^{[\cdot]} \circ \psi : \mathbb{N}^{k} \longrightarrow \mathbf{Mod}_R^{\text{free}}
$$

Both paths isomorphic structures. The ranks match and the modules are equivalent. Yet they emphasize different philosophies: one builds through recursive construction, preserving history at each step; the other composes through direct calculation, caring only about the final destination.

## A Broader View

Beyond mathematics and type theory, I often find that figurate numbers offer potential for driving algorithmic compositions in MaMuTh (Mathematical Music Theory).

My current <a href="https://rubygems.org/gems/figurate_numbers" target="_blank" rel="noopener noreferrer">figurate_numbers</a> library for Sonic Pi operates purely at runtime $\mathcal{E_{Time}}$ with numeric sequences through `Enumerators`.

```rb
# SONIC PI
# Once the gem is installed, retrieve the entry point path
# from 'lib/figurate_numbers.rb' using the console:
# $ gem which figurate_numbers
# Then, paste the path into "<PATH>".

require "<PATH>"
pol_num = FigurateNumbers.polygonal(20).take(10) # Icosagonal numbers
# pol_num = [1, 20, 57, 112, 185, 276, 385, 512, 657, 820]
350.times do
  play pol_num.tick % 10 * 6,   # Some mathematical function
    release: 0.25
  sleep 0.125
end
```

Although Ruby lacks a type system, the approach described here hints at how these ideas could be applied to type-level musical structures in languages that support them.

It also proposes a dual implementation, integrating both runtime and compilation $\mathcal{C_{Time}}$, encompassing traditional numeric sequences and evolving modules over a ring, as shown in the diagram.

<p align="center">
    <img
        src="/svg-ggb/system-type-mamuth.svg"
        alt="Type System MaMuTh Diagram"
        class="w-full h-full"
      />
</p>

In fact, this framework is only one possibility. There exist other constructions with different mathematical objects, other structural fusions and immersions waiting to be explored.

Perhaps that's what I've been after all along is showing how analogical thinking can illuminate unexpected relationships across mathematical territories.
