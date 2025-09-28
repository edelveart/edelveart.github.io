---
title: "Forging a Live Coding Tonnetz Library in TypeScript"
description: "Bringing together topology, group theory, and music into Ziffers and the interactive live coding environment Topos."
pubDate: "September 26 2025"
heroImage: "/itemPreview.webp"
badge: "Algorithmic Music"
tags: ["typescript", "music theory", "mathematics", "live coding", "algorithmic composition", "tonnetz"]
---

## From a Message from Finland to a Live Coding Environment

The story of how I developed `ts-tonnetz`, a **npm** library currently in a pre-alpha but fairly functional state, began rather unexpectedly when I received a single email in September from a faraway country called Finland.

Initially, the goal was to implement the classic Neo-Riemannian transformations ($P$, $R$, and $L$). However, thanks to Miika Alonen’s enthusiasm for mathematics and his brilliant system  <a href="https://topos.live/#ziffers_basics" target="_blank" rel="noopener noreferrer">Ziffers</a> for algorithmic composition, the project evolved into something much broader and deeper.

I ended up combining insights from two PhD dissertations (see references below) both focused on mathematical music theory and one in computation, along with classic articles on graph theory, including those on Hamiltonian cycles and related structures.

This led to the development of over 60 functions involving graphs, cycles, and triad and seventh chord transformations, all integrated into Ziffers and later into the live coding environment <a href="https://topos.live/#ziffers_tonnetz/" target="_blank" rel="noopener noreferrer">Topos</a>, created by Raphaël Forment and Miika Alonen.

## The Beauty of a Line

Behind every line of code lies topology and algebra. Based on <a href=" https://theses.hal.science/tel-01326827" target="_blank" rel="noopener noreferrer">Louis Bigo’s</a> ideas, I embraced simplicial complexes as a natural way to generalize harmonic spaces into alternative configurations.

To that end, I incorporated concepts such as the semidirect product, a central idea in <a href="https://theses.hal.science/tel-02179522" target="_blank" rel="noopener noreferrer">Sonia Cannas’s</a>  dissertation, which establishes several theorems involving isomorphic group structures relevant to musical transformations.

> My vision was to embed all algebraic transformations into a combinatorial topological framework that enables geometric interpretations of harmonic motion.

I applied these ideas in the context of several Tonnetz spaces. For instance, the transformation group $PLRQ$ can be embedded as:

$$
\textrm{PLRQ} \cong \textrm{S}_5 \ltimes \mathbb{Z}_{12}^4 \hookrightarrow \mathcal{K}_{TI}[X,Y,Z]
$$

## Hands on code

Here is a glimpse of how I typed some of these Tonnetz spaces in TypeScript:

```ts
type TonnetzSpaceConnected = [3, 4, 5] | [1, 1, 10] | [1, 2, 9]
```

The harmonies generated from non-classical Tonnetz (different from `[3,4,5]`) spaces often sound unconventional to functional ears. Eventually, I wrapped all of this into code like the snippet below (written around October 2023), when I was just starting to code:

```ts
export const qq51: TransformationFunctionsSeventhChords = (chordFromTonnetz, tonnetz): Tetrachord => {
    const [a, b, c] = tonnetz;
    const modulo = a + b + c;
    const reduceModN = chordNotesToModN(chordFromTonnetz);

    const equalToChordOne = firstChordComparison(reduceModN, diminishedSeventhChord(reduceModN[0], tonnetz));
    const equalToChordTwo = secondChordComparison(reduceModN, dominantSeventhChord(reduceModN[0], tonnetz));

    if (equalToChordOne === equalToChordTwo) return reduceModN;

    let transformedChord: Tetrachord = [...reduceModN];
    if (equalToChordOne) {
        transformedChord = dominantSeventhChord(transformedChord[0] + (c - a), tonnetz);
    } else {
        transformedChord = diminishedSeventhChord(transformedChord[0] - (c - a), tonnetz);
    }
    const targetTetraChord = chordNotesToModN(transformedChord, modulo);
    return targetTetraChord;
}
```

If you review the source code of `ts-tonnetz`, you'll see it was initially built across just a few `.ts` files.
Even the type declarations for each function were done inline.
There was a lot of redundancy, which made sense at the time, since it was a working prototype that needed to be ready yesterday.

## Improvements and Refactoring

About eight months ago, I began redesigning the codebase. The result is what you see now (see image below).
At the start, I organized the code using `static` methods inside classes to group related functions and leverage TypeScript’s typing and autocompletion.

<div align="center">
  <img src="/svg-ggb/blog-tstonnetz-1.svg" alt="TypeScript Tonnetz Objects Injected into Ziffers" class="w-[95%]" />
  <p><em>Sketch of <code>ts-tonnetz</code> Objects Injected into Ziffers</em></p>
</div>

However, I now realize this approach adds unnecessary complexity for the type of functions I’m working with (Miika pointed this out as well). There are fairly straightforward alternatives.

But that’s not all. I ran into a few unexpected quirks that I’ll probably write about some other time.
