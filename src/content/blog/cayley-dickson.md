---
title: "Counting a Figurate Property in Cayley–Dickson Algebras"
description: "A naive question about Cayley-Dickson algebras, enumerated by a figurate number via type systems, and how that question naturally incorporates itself into other algebraic structures and particularities."
pubDate: "December 27 2025"
heroImage: "/itemPreview.webp"
badge: "number algorithms"
tags: ["cayley-dickson algebra", "figurate numbers", "type system",  "python", "typescript",   "integer sequences", "octonion", "sedenion"]
---

## Cayley-Dickson Algebras

Define something once, observe what follows, then redefine it using what came before.
In simple terms, that formidable game of redefining based on prior objects. Is there anything
more to it when we write `recursive algorithms`?

Figurate numbers, as I mentioned in <a href="https://edelveart.github.io/blog/generators-as-symbolic-exploration/"
target="_blank" rel="noopener noreferrer">earlier posts</a>, overflow what I would call their
combinatorial side $\binom{n}{k}$, the one that defines them, and irrigate neighboring or even subterranean places.
In this very brief post, I want to offer a faint taste of possibility (more **fragile** than anything
logically immediate). Many of these inquiries come from questions closer to **daydreaming**:

> given an object, this object also comes from somewhere else.

Yes, a simple question in the spirit of what I imagine the inverse Galois problem to be, more
precisely, a realization problem: given a structure, which ambient object contains it or generates
it? Figurate numbers also encode the dimensions of algebras
<a href="https://www.gutenberg.org/ebooks/25156" target="_blank" rel="noopener noreferrer">
(you can read an introduction to the topic here)</a>.

When I said *repeat*, I was referring to the Cayley-Dickson construction, which generates a
sequence of algebras over $\mathbb{R}$, the numbers we usually use to **plot functions**, starting
with the reals and doubling the dimension at each step:

$$
A_0 = \mathbb{R}, \quad A_{n+1} = A_n \times A_n,
$$

where $A_{n+1}$ is the set of ordered pairs from $A_n$, equipped with a new multiplication.
Notice that the product defined for
$$
(a,b), (c,d) \in A_n \times A_n
$$
as

$$
(a,b) \cdot (c,d) = (ac - d\bar{b},\ \bar{a}d + cb),
$$

is similar to the complex case, and yes, it coincides exactly when $n = 1$.
Here $\bar{a}$ denotes **conjugation** in $A_n$ (analogous to the conjugation of $i$ in the complex
numbers). Conjugation in $A_{n+1}$ is then defined by

$$
\overline{(a,b)} = (\bar{a},\ -b).
$$

You can take a pen and repeat it. In fact, things get progressively less natural. The construction
successively **loses** commutativity (at $\mathbb{H}$), associativity (at $\mathbb{O}$), and
alternativity beyond that (as we will see again below).

In a post from last months, in this <a href="https://edelveart.github.io/blog/category-of-modules-and-type-level-programming-with-figurate-numbers/"
target="_blank" rel="noopener noreferrer">post</a> on modules over a ring, I showed how to define
figurate numbers in a `type system`. Let me quote exactly what I said there:

Let $R$ be a ring and $M_R$ a free module over $R$, and let $m \ge 3$. Then we can define the
polygonal figurate numbers (extensible by recursion to many others) in a type system as

$$
\mathfrak{p}_m = \left\{ M_n \mid M_{n+1} = M_n \oplus R^{1+(m-2)n} \right\}.
$$

I also copy the simplest example with triangular numbers (you can also see the type-level
difficulties in that post):

```ts
type VectorSpace = A["length"] extends dim
  ? A
  : VectorSpace;

type DirectSum = VectorSpace;

type V1 = VectorSpace<200>;
type V2 = VectorSpace<335>;
type V3 = DirectSum;
```

And to compute, you simply run:

```ts
type VecTriangular
  n extends number,
  T_1 extends number[] = VectorSpace<1>,
  IterCount extends number[] = [1]
> = IterCount["length"] extends n
  ? T_1
  : VecTriangular
      n,
      DirectSum>,
      [1, ...IterCount]
    >;

type T_3 = VecTriangular<3>;
type T_5 = VecTriangular<5>;
type T_20 = VecTriangular<20>;
type T_50 = VecTriangular<50>;
```

With this we have described **numbers as dimensions**. Why did I bring all of this back?
It has to do with the next section.

### Natural inclusions, two by two

Let us enter symbolically into the idea of a **river** from that post mentioned above. Each algebra
embeds into the next via **natural injection** morphisms

$$
i_n: A_n \hookrightarrow A_{n+1}, \quad a \mapsto (a,0).
$$

Landing on the form in which we would study them numerically, and observe how each step sheds
algebraic properties:

$$
\mathbb{R} \hookrightarrow \mathbb{C} \hookrightarrow \mathbb{H} \hookrightarrow \mathbb{O} \hookrightarrow \cdots
$$

From this it is immediate that each algebra $A_n$ has dimension $2^n$. And since figurate numbers
also go to infinity, we are interested in the **unbounded** growth pattern of the sequence of
dimensions, which satisfies

$$
\lim_{n \to \infty} \dim A_n = +\infty.
$$

This coincides exactly with the impolite numbers, i.e., numbers that cannot be expressed as a sum of
consecutive positive integers, which turn out to be precisely the powers of $2$, computable with
my library `figuratenum`:

```py
from figuratenum import PlaneFigurateNum as fgn
# Generate impolite numbers
gen = fgn().impolite()
impolite_num = [next(gen) for _ in range(32)]
# [2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, ...]
```

The initial question appears when playing with Legos and **assembling ad hoc algebras** that respect
the monotone growth of figurate numbers. In fact, figurate numbers can naturally capture a
dimensional particularity of other algebraic spaces. But how many interesting algebras can I
build this way?
A second question, arising from a somewhat more discerning perspective, is:

> Given a not necessarily injective sequence of algebras, does there exist a figurate number
> that counts some really interesting properties of it?

Like music, each note, or each algebra, is part of a single composition, with each stage **filtering** and chaining the harmony of the whole.
We can think of ourselves as that function which computes all possible interpretations of subalgebras, units, idempotents, musical phrases, and dynamics.

It is time to play `Debussy` algebra.
