---
title: "Modular Patterns"
description: "Visualize figurate number sequences in modular arithmetic."
order: 5
---

`DiscreteViz` reduces a sequence modulo $n$ and traces the result as an orbit on a circle. Each term $a_k \bmod n$ lands on one of $n$ positions, and consecutive terms are joined by an edge $a_k \to a_{k+1}$. This was inspired by [Rogelio Pérez Buendía (2025)](https://yoyontzin.substack.com/p/espirografos-orbitas-y-relojes).

```python
from figuratenum.figurate_viz import DiscreteViz

d = DiscreteViz()
d.visualize_plane("polygonal", m=17, n_terms=330, circ_color="g", bg_color="k")
```

## Three methods, one per dimension

`visualize_plane` handles 2D sequences, `visualize_space` handles 3D, and `visualize_multidim` handles $k$-dimensional and generalized families.

<!-- <figure class="mb-8">
  <img
    src="/svg-ggb/five-dim-hyperoctahedron.webp"
    alt="Five dimensional hyperoctahedron"
    width="288"
    height="288"
    class="mx-auto"
  />
  <figcaption class="mt-2 text-center">
    <em>A 5D hyperoctahedron (reproduce it using the code below)</em>
  </figcaption>
</figure> -->

```python
d.visualize_space("icosahedral", n_terms=300)

d.visualize_multidim(
    "k_dim_hyperoctahedron", k=5, n_terms=704,
    circ_color="m", bg_color="k", ext_circle=True, rotate=-1
)
```

`visualize_multidim` takes `k` to select the dimension; all three take `m` instead, for sequences with an $m$-gonal shape.

## Interpretation

Symmetry in the orbit depends on the modulus $n$, not on the dimension of the family: a 2D sequence can produce an irregular pattern under one $n$ and a spirograph-like pattern under another, and the same holds for $k$-dimensional sequences.

Trying different values of `n_terms` and `h_modulo` on the same sequence is the way to find where the structure shows up.

## Parameters

- `figuratenum_name`: the sequence, passed positionally.
- `m`: m-gonal parameter, for sequences with that structure.
- `k`: dimension parameter (`visualize_multidim` only).
- `n_terms`: number of terms generated and plotted.
- `h_modulo`: the modulus $n$ for the circular mapping. Defaults to the sequence length.
- `circ_color`, `bg_color`, `num_color`: color of orbit edges, background, and position labels.
- `num_text`: whether numeric labels are drawn at each position.
- `ext_circle`: whether an outer reference circle is drawn.
- `rotate`: rotational offset applied to the layout.
- `show`: display immediately (default `True`) or return the figure unshown.
