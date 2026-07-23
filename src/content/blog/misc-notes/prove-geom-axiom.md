---
title: "Can Axiomatic Systems Have a Geometry and a Type?"
description: "A Saturday reflection on imagining a geometry of axiomatic systems and wondering whether theories could become types that carry information about what can and can't be proven about them, inspired by proof assistants like Lean."
pubDate: "July 18 2026"
badge: "misc notes"
tags: ["logic", "axiomatic method", "type theory", "philosophy of mathematics", "lean"]
---

Every once in a while, after long stretches of time, and again this Saturday, I have wondered about the future of the axiomatic method ever since I read Robert Blanché's [*La axiomática*](https://books.google.com.pe/books/about/La_Axiom%C3%A1tica.html?id=Rf--PQAACAAJ&redir_esc=y).

I've also been circling an idea about how to build new intuitions about formal objects out of things from the past.
Along those lines, questions like these come to me.

Will we simply find new axioms, with properties like consistency, independence, or decidability, for models that today seem scattered and loosely related to one another?
Or will the next step be developing a mathematics whose object of study is theories themselves?

I remember some talks by Fernando Echaiz at [IMCA](https://imca.edu.pe/en/) (Instituto de Matemática y Ciencias Afines del Perú) that I unfortunately missed.
They were about building a new mathematics out of fuzzy sets, redefining the concept of number, interval, curve, function, derivative, integral, and everything else.

The only question I managed to ask him during the last talk was whether, if proofs no longer follow only classical Aristotelian logic, anything can still be proven in a mathematics with more than a simple yes and no.

I mentioned another concern to him afterward:

> Hundreds of mathematics could also be built as different logics get proposed. I even wondered whether the same mathematics could adopt pieces of one logic for certain sectors and pieces of another for others, a kind of controlled mediation between logics.

From there I started thinking that axiomatic systems might recover a certain geometric intuition. There are two ideas I want to leave here. The first is relatively easy to picture; the second strikes me as more interesting.

## Axiomatic Systems as Points

Much of this idea comes to me from functional analysis. First I thought about unknowns, then functions, then function spaces, then operators. So I asked myself, why not also think about spaces whose points are axiomatic systems, or even logics?

Axioms could recover a more intuitive representation. Complete theories would be points in a space. I'm not sure axioms should be understood literally as coordinates (equivalent axiomatizations complicate that picture), but maybe as a set of generators for a theory's position.

Neighborhoods could represent theories that differ in a few axioms. Connected components, theories that are. Arrows would be interpretations or translations between theories.
Invariants would preserve metamathematical properties like consistency, completeness, or decidability, even under certain transformations and deformations.

Naturally, almost every geometric notion would need reconstructing distance, deformation, continuity, curvature, and so on.
Precedents exist (which I only know superficially) in [topos theory](https://ncatlab.org/nlab/show/classifying+topos), categorical logic, and other areas I still find hard to approach formally.

A caveat worth naming. For a fixed language, this space of theories is a legitimate set, essentially what a [Stone space](https://en.wikipedia.org/wiki/Stone_space) is built from. Letting the language vary freely is what risks the same kind of problem as "the set of all sets."

## Typing the Axiomatic

But I want to go a little further.

The second idea imagines that every theory could be described through a generic type. This intuition clearly comes from programming languages and from proof assistants like [Lean](https://lean-lang.org/).
The question would be whether, beyond formalizing a theory and its models in an assistant like this, the theory itself could also be typed.
One could imagine something as simple as

```shell
Theory<Consistent, Classical, FirstOrder, Decidable?>
```

or maybe something more structured

```shell
Theory<
    Logic,
    Signature,
    AxiomSet
>
```

or even something close to this

```shell
Theory<
    Logic := Classical,
    Language := L,
    Axioms := A,
    ProofSystem := Hilbert
>

instance : Consistent T := ...
instance : DecidableTheory T := ...
```

Here, though, I trip over something I can't just type past. That `instance : Consistent T` assumes the consistency of $T$ can be proved and attached to $T$ like any other property.
But [Gödel's second incompleteness theorem](https://plato.stanford.edu/entries/goedel-incompleteness/) says exactly that no consistent theory capable of encoding a reasonable amount of arithmetic can prove its own consistency using only its own resources.

That instance could never be filled from within $T$; it would always need a strictly stronger metatheory, in this case Lean's own type logic, sitting outside $T$.

This is exactly the wall the whole idea of typing the axiomatic runs into, and I wonder whether we'd also need to type, explicitly, from which metatheory each instance gets proved.
A theory's description would grow to include these properties as they get proved, rather than assuming them from the start.

They'd simply be provable and attached to it as part of its description.
Perhaps it would then be enough to restrict those types to know which models a theory admits, which transformations preserve its properties, and which stop making sense.

It’s still a very naive idea, but I like to imagine proof assistants as tools for exploring the space of theories itself.
I should say this with complete honesty. I didn't look for precedents before writing this, simply for lack of time, on a Saturday you think fast and write even faster. If any of this already exists elsewhere under another name, I didn't know it when I imagined it.

Finally, it is natural to ask whether we will ever be able to study the space of possible mathematics as a mathematical object.
Across mathematics and physics, the move toward formalization became one of the great milestones of thought, shaping how we build and organize theories.

I'll close this note with a question that keeps circling back to me:

> What could come after the axiomatic method?

<p class="text-xs italic mt-10">
    I didn’t have anyone around to discuss it with, so I ended up using an AI to work through the logical side. The two ideas themselves, and the choice not to look for precedents, came before that.
</p>
