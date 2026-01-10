---
title: "Towards Gamma Functions for Figurate Numbers"
description: "I plant a question motivated by generalizing the GCD to varieties and inspired by Euler's interpolation: Does there exist a function attached to each figurate number that extends it to continuous domains, analogous to how the Gamma function extends the factorial?"
pubDate: "January 10 2026"
heroImage: "/itemPreview.webp"
badge: "number algorithms"
tags: ["figurate numbers", "integer sequences", "gamma function", "factorial", "figuratenum", "python"]
---

Recently, I was reviewing how to extend the greatest common divisor function for two integers, because I wanted to imagine associating a kind of rays emerging from the points of a geometric object.

In this regard, being a bit verbose, if $ x_\mathbb{Z} = \prod p^{\alpha_p}$ and $y_\mathbb{Z} = \prod p^{\beta_p}$ are prime factorizations of $x, y$, then:

$$
\gcd(x, y) = \prod_{p \mid x,\, p \mid y} p^{\min(\alpha_p, \beta_p)}.
$$

If $\gcd(x,y) = 1$, then $x$ and $y$ are comprime. However, points on varieties $X$ are also defined over $\mathbb{Q}$, as well as over $\mathbb{R}$, $\mathbb{C}$, including number fields.

Therefore, I had a searching question:

> Does there already exist a function $f$, with connections to the arithmetic and geometric world, that has extended its domain from $\mathbb{Z}$ to $\mathbb{Q}$, or even beyond?

## Prelude to the Nap of Euler

I found that for certain types of domains, called Unique Factorization Domains (UFDs), there is an analogous notion with some subtleties. For example, the rings of integers $\mathbb{Z}[i]$ and $\mathbb{Z}[\sqrt{d}]$ (for certain values of $d$) are UFDs where $\gcd$ behaves similarly to the classical case.

But, I didn't want to enter the terrain of ideals and abstract techniques of algebraic number theory. I really needed to go step by step. In $\mathbb{Q}$, I found that there exists a trick using $\mathrm{lcm}$ to define something like a $\gcd$, but it didn't convince me, because it's particular to this context. And what about $\mathbb{R}$?

I also realized that the issue in the `reals`, and in every `field`, is that the notion of $\gcd$ becomes trivial from an algebraic standpoint. Since every non-zero element is invertible, every element divides every other, making the concept vacuous.

So, because it's good to revisit techniques and ideas from even earlier times, I remembered, of course, that `Euler`, a few centuries ago, had already carried out this process in a phenomenal way with another arithmetic ubiquitous function.

## Triangular Numbers are The Prototype

For me, a practical, though not complete, way of seeing figurate numbers is that they are a mixture of arithmetic and geometry. That is, it is a representation of numbers as points in the plane, space, or $k-$space creating a figure.

The main question to be raised in this post comes in two steps from what is presented in the engaging article by <a href="https://people.math.osu.edu/gautam.42/S20/DavisGammaFunction.pdf" target="_blank" rel="noopener noreferrer">Philip J. Davis</a>. The first step occurs on page `850`,  where he explains that  interpolating the formula for the $n$-th triangular number with rationals $x_\mathbb{Q}$ is practically natural and remains well-defined.

$$
T(x_\mathbb{Q})= \frac{x(x + 1)}{2}.
$$

For now, my library <a href="https://pypi.org/project/figuratenum/" target="_blank" rel="noopener noreferrer">figuratenum</a> only allows you to do the following to generate integers $x_\mathbb{Z}$.

```py
from figuratenum import PlaneFigurateNum as fgn
# Generate triangular numbers
seq_loop = fgn()
gen = seq_loop.triangular()
triangular_num = [next(gen) for _ in range(100)]
# [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, ...]
```

The `type hints` for the generators I've made `int`, for the moment, so it will throw an error if you enter a `float` in `range()`.

Finally, on the next page `851`, he warns about the crux of this question. If we substitute the additive operation in the expansion of $T(n_\mathbb{Z})$ with the multiplicative one, we obtain nothing other than the factorial function commonly denoted

$$
x_{\mathbb{Z}}! = \prod_{k=1}^{x} k .
$$

But, how to put the factorial in a continuous line?

## Recharge On The Gamma Function

Again, as with many great identities and formulas, the answer lies in the Gamma function, one of my favorite functions in all of mathematics.  Although in <a href="https://edelveart.github.io/blog/generators-as-symbolic-exploration/" target="_blank" rel="noopener noreferrer">another post</a> on my blog and in my ideas I deal with the modern integral version in the complex plane, here I invoke the second Eulerian Integral (according to Legendre):

$$
\Gamma(x_\mathbb{R}) = \int_{0}^{1} (- \log{t} )^{x} \ dt .
$$

As `Philip J. Davis` mentions, it was a matter of interpolation that invoked Euler's mind to define the factorial function $x_\mathbb{Z}!$ this way. But, although it is a simple integral to visualize, this was not as easy to deduce as it can be done for triangular numbers.

## The Dual Question

I'll go straight to posing the analogy here, along with the diagram:

<div align="center">
  <img src="/svg-ggb/blog-gamma-analogue.svg" alt="Towards a New Class of Gamma Functions for Figurate Numbers" class="w-full" />
  <p>Towards a New Class of Gamma Functions for Figurate Numbers</p>
</div>

Let's think of the figure in two components. Let's start with what we already have some grounding for: the left side. First, we observe that several operations occur simultaneously towards more general instances. The first is a transfer of notion by `substitution`: they are triangular figures, then it's factorial.

The $x_\mathbb{Z}!$ allows for the definition of the multidimensional triangular numbers, also called the $k$-hypertetrahedron, denoted as $H_k(n)$. This is defined through a recursive formula and an alternative definition using the rising factorial, as discussed in the book <a href="https://www.worldscientific.com/worldscibooks/10.1142/8188#t=aboutBook" target="_blank" rel="noopener noreferrer">Figurate Numbers (2012)</a> (another alternative involves the binomial coefficient)

On the other hand, the detour with an arrow pointing to $\Gamma$ is extremely important, because it is a transfer towards a broader domain by `interpolation`, and allows restriction to the integer version and to a possible complex version of the hypertetrahedron.

For instance, here's how you generate a `120`-dimensional hypertetrahedron in `figuratenum`:

```py
from figuratenum import MultidimensionalFigurateNum as fgn

seq_loop = fgn()
gen = seq_loop.k_dimensional_hypertetrahedron(120)
k_100_hypertetrahedron_num = [next(gen) for _ in range(100)]
# [1, 121, 7381, 302621, 9381251, 234531275, 4925156775,
# 89356415775, 1429702652400, 20492404684400, 266401260897200,
# 3172596834321200, 34898565177533200, 357039166816301200,...]
```

But the good part comes here: in the right component of the figure, $P(x_{\mathbb{Z}})$ is a polygonal number or any figurate number in the plane.
The $P_{k-\textrm{dim}}(x_\mathbb{Z})$ is its corresponding multidimensional version. Let's remember that there are many figurate numbers that don't have a multidimensional counterpart.

The $\Delta$ and $\delta$ functions are the analogues of the Gamma function (by interpolation) and factorial function by operation substitution that correspond to each type of figurate number $P$.

Well, after so many twists and turns, the naive question I arrive at goes like this:

> Does there exist a function $\Delta_P(x_\mathbb{R})$ analogous to $\Gamma(x_\mathbb{R})$ by substitution and interpolation for each type of figurate number $P$ that can define similar new multidimensional geometric objects over UFDs, complex numbers, or in  a number field $K/\mathbb{Q}$?

I would expect such a $\Delta_P(x_\mathbb{R})$ to inherit beautiful properties, like convexity, perhaps log-convexity, or functional recurrence relations.

$$
\Delta_P(x + 1) = P(x) \cdot \Delta_P(x)
$$

But whether these properties hold in general, or need tailoring to specific $P$, well, that's part of the puzzle. Maybe they fit together like pieces of a larger mosaic with other special arithmetic functions already known to us.  Could be a rewarding exploration for anyone curious enough to dig in.


