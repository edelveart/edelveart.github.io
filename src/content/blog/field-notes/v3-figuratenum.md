---
title: "Two years leading to FigurateNum v3 visualizations in the complex plane"
description: "A short personal note on the visualization layer of FigurateNum v3, where figurate numbers enter the complex plane through domain coloring."
pubDate: "June 28 2026"
heroImage: "/itemPreview.webp"
badge: "Field Notes"
tags: ["figurate numbers", "visualization", "complex analysis",  "phase portraits", "generating functions", "domain coloring", "complex plane", "python"]
---

After almost two years and nearly reaching 20 thousand downloads, between readings, late nights, music, and new questions, I begin with this mathematical and poetic quote that inspired me to develop version 3 of [FigurateNum](https://pypi.org/project/figuratenum/), now on `PyPI`:

<blockquote class="my-10">
Precise knowledge of the behavior of an analytic function in the neighborhood of its
singular points is a source of number-theoretic theorems.
<footer class="text-xs mt-1">— E. Hecke</footer>
</blockquote>

This note reflects on recent developments, implementation details, and ideas behind FigurateNum v3.

![FigurateNum](v3-figuratenum.svg)

## What this version 3 brings

From a broader perspective, I have carried out a moderate restructuring of the visualization API. I split it into two special classes that allow **visualization**, which I see, in a recursive sense, as the geometric realization of structures that themselves originate from geometry.

### DiscreteViz

The first is `DiscreteViz`, which emulates the kind of luminous reflections on coffee cups that [Rogelio Pérez Buen Día](https://www.cimat.mx/~rogelio.perez/) might describe when performing geometric multiplication in $\mathbb{Z}/n\mathbb{Z}$ over figurate numbers (already present since version 2 of FigurateNum).

### ComplexViz

The second is a new addition in version 3, and almost a natural necessity: `ComplexViz`. The new `ComplexViz` brings complex analysis to the Sunday morning table. The main reference has been *Visual Complex Functions* by [Elias Wegert (2012)](https://link.springer.com/book/10.1007/978-3-0348-0180-5), particularly the idea of phase portraits.

Phase portraits offer a way of globally visualizing numbers through domain coloring techniques. FigurateNum approaches this through generating functions $f(z)$ defined mathematically in [Deza & Deza (2012)](https://www.worldscientific.com/worldscibooks/10.1142/8188), along with some necessary extensions from the literature.

What do they look like? You can see them below in the complex plane $\mathbb{C}$, arranged along the main diagonal of a $2 \times 2$ pseudo-matrix gallery.

![Figurate Numbers Gallery](https://raw.githubusercontent.com/edelveart/figuratenum/main/docs/images/figuratenum-gallery.webp)

With `ComplexViz`, I begin to address the lack of basic analytic tools for understanding figurate numbers beyond their combinatorial and discrete existence.

This opens access to more than `150` figurate functions in $\mathbb{C}$, together with zeros and poles as the most significant points of the functions, and artistic possibilities such as Matplotlib-based coloring.
Some of these are not yet included in the generators, which in fact include many more (`235+`), and may invite you to start experimenting with just a few lines of code.

## What happened under the hood?

What I did in the design of the library was to rethink its internal construction and build a new structure with slightly less pure Python generators and, as already used in version 2, Matplotlib. In this version 3, it also incorporates **SymPy**.

Under the hood, sequences are born in a symbolic storage layer and then evaluated with NumPy. In any case, the library remains firmly within the classical Python ecosystem for these purposes.

I should clarify that the inclusion of SymPy was mainly necessary with an eye toward the future of the library (nothing more). It needed to be grounded in something that could allow **algebraic manipulation** and greater **freedom** with related mathematical objects.

### Classes outside the API

Inside version 3, there are a couple of classes that are not exposed in the main API: `SeriesExpansion` (relatively trivial for now) and `MobiusMuViz`, both within the visualization context.

I wrote this `MobiusMuViz` quickly in order to bring some questions to a talk at the end of February by Professor [Andrés Chirre](https://sites.google.com/view/andreschirre/home) at IMCA (Instituto de Matemática y Ciencias Afines of Perú), who currently works on sums and bounds of the Möbius function $\mu(n)$.

For now, the implementation has **performance degradation** since each large $n$-term requires factorization. Some sequences were tested for a few minutes (I don’t remember the exact time), reaching around $2.5 \times 10^6$ terms.

## Problems throughout development

I should mention that the most **time-consuming** part has been **designing** the **general system** of figurate numbers in a way that can be extended cleanly in the future. The next major bottleneck has been verifying **errata**, checking for mistakes and avoiding **false positives**.

I also found additional errors in the context of the generating functions $f(x)$, which are documented in a $\LaTeX$ file in the repository at  [docs/errata/errata-figuratenumber.tex](https://github.com/edelveart/figuratenum/blob/main/docs/errata/errata-figuratenum.tex). This is an area where collaboration is especially welcome.

## New official docs

Along with version 3, I decided to launch the [official documentation](https://edelveart.github.io/figuratenum/), which I will continue expanding over time. You can access it by clicking the FigurateNum v3 banner also (guess which sequence is showed).

[![Official documentation](@assets/figuratenum-v3.webp)](https://edelveart.github.io/figuratenum/)

Although still in its early stages, it already contains what I consider sufficient material to approach the topic from scratch (this was requested by some musician and musicologist friends), as well as a slightly more detailed explanation of the theoretical ideas behind figurate numbers for readers with some mathematical background.

The docs have four sections: **Learn**, **Mathematical Theory**, **API**, and **Contributing**. The API documentation is generated directly from the source repository. Choose your path.

## What happened along the way, and what comes next?

I reach the final *term* of this short figurate note. What comes next?

At the beginning of March (9–13), I returned to [IMCA](https://imca.edu.pe/en/), attended several talks in the School of Geometry as an observer, and spent time in informal conversations with professors.
A few ideas came out of those exchanges. They were small at first, but they have stayed with me ever since.

I plan to explore some of those sketches in future releases of **FigurateNum**. As with many things in this library, they will probably grow slowly, one question at a time.
