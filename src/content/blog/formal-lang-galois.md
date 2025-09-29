---
title: "A Field Extension Perspective on Formal Languages"
description: "This post explores an analogy between formal languages and field extensions, using ideas from Galois theory to reframe truth, interpretation, and metalanguage hierarchies in logic."
pubDate: "September 27 2025"
heroImage: "/itemPreview.webp"
badge: "Algebraic Metalanguages"
tags: ["field extensions", "formal logic", "Tarski hierarchy", "galois representation", "metalanguages", "mathematics"]
---

Many times, I think of certain objects, whether mathematical, algorithmic, or musical, as towers of field extensions standing or leaning, but always grounded on a structural foundation that could be formalized.

Sometimes I pause and revisit ideas in my mind, defining and repeating them as if re-explaining to myself, like practicing scales on an instrument.

The idea I propose here offers a different and perhaps fruitful perspective on the hierarchy of languages in formal logic through the lens of algebraic theory. First, I will share where this analogy came from.

## The Tower of Algebraic Extensions

I’ve been going over some classic concepts of abstract algebra, like how irreducible polynomial equations $p(X)$ with coefficients in a field $k$ require building a field extension to find their zeroes ($r_i$).

These extensions naturally form towers, which we might picture in their resting position as:

$$
k \rightarrowtail k(r_1) \rightarrowtail k(r_1, r_2).
$$

As we ascend, we gain access to new roots, new functions, and new forms of reasoning. For example, extending the real numbers to the complex field enables the development of Riemann surfaces, which rely on the algebraic and topological structure of $\mathbb{C}$.

## Tarski’s Hierarchy

Days later I had been readin some things about `DSLs`, because of something I’ll tell you later. I like to approach topics from perspectives that are sometimes absurdly wide.

In this winding way I arrived at formal logic, where there is Tarski’s hierarchy, which I can summarize like this: denote $M_0$ as the object language (for example, first‑order logic) and $M_1$ as the metalanguage that defines truth for $M_0$.
Likewise, $M_2$ would be the metalanguage speaking about $M_1$, and so on.

This started to give me a feeling of closeness, though I couldn’t yet identify exactly what concept it was connected to.

## Finding the Link

Today, after lunch in the afternoon, I finally remembered where that idea was rooted.

On the algebraic side, we cannot express imaginary or irrational roots using only rational numbers $\mathbb{Q}$. In an analogous way, certain “truths” or interpretations are not definable in $M_0$ but are definable in $M_1$.

We can think that a formula in $M_0$ is like a polynomial without solution in that base field, but that finds its “root” in $M_1$. For example, the equation $x^2 = 2$ has no solution in $\mathbb{Q}$, but it does in quadratic field $\mathbb{Q}(\sqrt{2})$.
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

To begin exploring this analogy in mathematical terms, I like to symbolize the semantic immersion of a language as:

$$
M_i \mapsto \mathbb{M}_i.
$$

From this, several natural questions arise. For instance:
> Can the structure be refined backwards in the hierarchy of metalanguages?

What would concepts like normality (truth-completeness) or separability (uniqueness of truth values) mean in this context, mirroring their algebraic counterparts?

Also, the question of which metalanguage is the most economical to define truth arises, in a way similar to how in algebra we care about minimal extensions.

Another immediate question is how far we must go to resolve a given concept, which could be understood as a matter of the degree of extension of the language, expressed by

$$
[\mathbb{M}(\mathcal{l}_1, \mathcal{l}_2) : \mathbb{M}].
$$

This can be thought of as the dimension of a semantic extension space, composed of truth-valued $n$-ary predicates.

In a more poetic sense, and stepping into Galois-theoretic territory, one might ask:

> Are there automorphisms among the different metalanguages $\mathbb{M_i}$?

In this respect, one might model translations between equivalent semantic theories, or even internal proof-theoretic transformations.

## Galois Representation of Logical Towers

Going further, from a topological or algebraic perspective, one might envision a logical closure and a morphism that leads to a representation of logics.

This could even be a geometric or arithmetic structure, which is where my fondness for elliptic curves and Galois representations comes in. I present an immediate notation:

$$
\rho_{\mathcal{L}}: \textrm{Gal}(\overline{\mathbb{M}}/\mathbb{M}) \longrightarrow \textrm{GL}(n, V_{\mathcal{L}}).
$$

Here, $\rho_{\mathcal{L}}$ can be interpreted as a homomorphism that encodes the symmetries (or automorphisms) of an extended semantic structure $\overline{\mathbb{M}}$ into linear transformations of a vector space $V_{\mathcal{L}}$.

These transformations may correspond to semantic operations on models of the language $\mathcal{L}$, such as reinterpretations, definable permutations, or higher-level logical equivalences.

<div align="center">
  <img src="/svg-ggb/POST-FORMAL-LANG-GALOIS.svg" alt="Analogy Between Field Extensions and Logical Language Hierarchies" class="w-[95%]" />
  <p>Analogy Between Field Extensions and Logical Language Hierarchies</p>
</div>

## What’s Going On?

Of course, all of this still remains to be formalized with precise symbolic definitions.


For now, I’m content to leave it as a metaphorical Leaning Tower of Pisa of Language, still incomplete and perhaps only suggestive of a deeper, fruitful structure waiting to be made rigorous.
