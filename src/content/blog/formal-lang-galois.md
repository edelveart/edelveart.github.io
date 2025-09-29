---
title: "Formal Languages as Field Extensions"
description: "A look at how algebraic structures might inform our approach to truth and interpretation in formal logic."
pubDate: "September 16 2025"
heroImage: "/itemPreview.webp"
badge: "Algebraic Metalanguages"
tags: ["abstract algebra", "formal logic", "Tarski hierarchy"]
---

Many times I think of certain objects (mathematical, algorithmic, musical) as if they were towers of field extensions, standing or leaning, but always with a structural foundation that could be formalized.

Sometimes, I pause and revisit ideas in my head, defining and repeating them, as if I'm re-explaining them to myself, like practicing scales on an instrument.

The idea I propose here is a different, and perhaps fruitful, way to look at the hierarchy of languages in formal logic via algebra theory. First I’ll tell you where this analogy came to me.

## The Tower of Algebraic Extensions

I’ve been going over some classic concepts of abstract algebra, like how irreducible polynomial equations $p(X)$ with coefficients in a field $k$ require building a field extension to find their zeroes.

Field towers look like this when they are resting:

$$
\mathbb{Q} \rightarrowtail \mathbb{Q}(i) \rightarrowtail \mathbb{Q}(i, \sqrt{5})
$$

Here I was able to see, with somewhat more perspective, that the higher we climb like ants up the tower, we really can think that we have more expressions, more roots, more functions (this was necessary to approach the next patch of ground).

## Tarski’s Hierarchy

Days later I had been readin some things about `DSLs`, because of something I’ll tell you later. I like to approach topics from perspectives that are sometimes absurdly wide.

In this winding way I arrived at formal logic, where there is Tarski’s hierarchy, which I can summarize like this: denote $M_0$ as the object language (for example, first‑order logic) and $M_1$ as the metalanguage that defines truth for $M_0$.
Likewise, $M_2$ would be the metalanguage speaking about $M_1$, and so on.

This started to give me a feeling of closeness, though I couldn’t yet identify exactly what concept it was connected to.

## Finding the Link

Today, after lunch in the afternoon, I finally remembered where that idea was rooted.

On the algebraic side, we cannot express imaginary or irrational roots using only rational numbers $\mathbb{Q}$. In an analogous way, certain “truths” or interpretations are not definable in $M_0$ but are definable in $M_1$.

We can think that a formula in $M_0$ is like a polynomial without solution in that base field, but that finds its “root” in $M_1$. For example, the equation $x^2 = 2$ has no solution in $\mathbb{Q}$, but it does in $\mathbb{Q}(\sqrt{2})$.
There, in the extension, we can do everything we did in the base field, and more.

Thus I realized that this seems to align particularly with Tarski:

> Each metalanguage explains the previous language and operates over it, but cannot be reduced to the previous language without losing expressivity and power.

## Defining the Analogy: Algebraic Roots and Semantic Truth

I go back over the idea to try to explain it better: I realized we are facing an ascending structure, in which each language or field serves as the base for the next, and each new level brings a broader vision that the previous cannot reach.
At heart, this is a matter of growing expressivity: the superior language or field can perform operations and define truths that the inferior has no way to express.

We are expanding the idea of algebraic solution toward metalanguages as semantic solutions, which can be truth or interpretation.
In this way, the higher entity extracts roots or solves problems that before were undecidable or undefinable.

> Thus, one can imagine $M_0$ as a field in which there is a polynomial with coefficients in $M_0[X]$ that has no roots in that very language, and the metalanguage $M_1$ is the extension that adds those roots.

## Some Natural Questions

Just for fun, to move into mathematical space, I like to symbolize this immersion of a language as:

$$
M_i \mapsto \mathbb{M}_i
$$

Questions arise quite naturally by analogy; for example, one may wonder if it is possible to refine the structure backwards in the metalanguages, exploring concepts analogous to normality or separability in algebra.

Also, the question of whic metalanguage is the most economical to define truth arises, in a way similar to how in algebra we care about minimal extensions.

Another immediate question is how far we must go to resolve a given concept, which could be understood as a matter of the degree of extension of the language, expressed by

$$
[\mathbb{M}(\mathcal{L}_1, \mathcal{L}_2) : \mathbb{M}]
$$

of language extension.

In a more poetic sense, and entering the terrain of Galois, one could ask:

> Are there automorphisms among the different metalanguages $M_i$?

Going further, from a topological perspective,we might imagine a logical closure and a morphism leading to a representation of logics.
This could even be a geometric or arithmetic structure, which is where my fondness for elliptic curves and Galois representations comes in.

$$
\rho: \textrm{Gal}(\overline{\mathbb{M}}) \longrightarrow \textrm{GL}(n, V)
$$

Of course, all of this still needs to be formalized in precise symbolic terms. But for now, I’m happy to leave the idea of a leaning Tower of Pisa of Language standing as a metaphor.
