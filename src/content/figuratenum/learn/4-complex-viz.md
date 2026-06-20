---
title: "Phase Portraits"
description: "Visualize figurate number sequences in the complex plane."
order: 4
---

Instead of the sequence itself, `ComplexViz` looks at its generating function $G(z)$ over the complex plane $\mathbb{C}$, exposing global structure that individual terms don't reveal on their own.
The technique is domain coloring, producing a phase portrait following Wegert (2012).

```python
from figuratenum.figurate_viz import ComplexViz

c = ComplexViz()
c.visualize_plane("triangular", cmap_color="viridis", disk_radius=2.0)
```

## Three methods, one per dimension

`visualize_plane` handles 2D sequences, `visualize_space` handles 3D, and `visualize_multidim` handles k-dimensional and generalized families.

<figure class="not-prose mb-8 text-center">
  <img
    src="/svg-ggb/four-dim-centered-hypertetrahedron.webp"
    alt="4D dimensional centered hypertetrahedron"
    class="w-72 h-auto mx-auto"
  />
  <figcaption class="mt-2 text-center">
    <em>A 4D centered hypertetrahedron (reproduce it using the code below)</em>
  </figcaption>
</figure>


```python
c.visualize_space(
    "tetrahedral",
    plot_type="modulus_contours",
    xlim=(-0.5, 0.5), ylim=(-0.5, 0.5), disk_radius=0.5
)

c.visualize_multidim(
    "k_dim_centered_hypertetrahedron", k=4,
    cmap_color="cividis", disk_radius=2.0
)
```

`visualize_multidim` takes `k` to select the dimension; the other two take `m` instead, for sequences with an $m$-gonal geometry.

## Interpretation

The portrait encodes phase and magnitude through color, following [Wegert (2012)](https://doi.org/10.1007/978-3-0348-0180-5). Certain regions stand out immediately, where $f(z)$ changes rapidly.
For generating functions of figurate numbers, this behavior is typically observed near $z = 1$. See [Theory](/figuratenum/theory#generating-functions) for a more detailed explanation.

## Main controls

`name_seq` selects the sequence; `m` and `k` select which member of a parametric or k-dimensional family, depending on the method.

Beyond that, `cmap_color` and `disk_radius` are the two parameters that most change what a portrait looks like: the colormap shapes how phase is rendered, and the plot domain itself is a rectangle set by `domain_grid_radius` in the constructor, with `disk_radius` cropping it to a circular mask.

## Parameters

- `name_seq`: the sequence, passed positionally.
- `m`: $m$-gonal parameter (`visualize_plane`, `visualize_space`, `visualize_multidim`).
- `k`: dimension parameter (`visualize_multidim` only).
- `plot_type`: `"pure_phase_portrait"`, `"phase_contours"`, `"modulus_contours"`, or `"enhanced_phase_portrait"` (default).
- `cmap_color`: colormap, e.g. `"hsv"` (default), `"cividis"`, `"twilight"`.
- `xlim`, `ylim`: explicit rectangular limits, overriding `domain_grid_radius`.
- `disk_radius`: radius of the circular mask over rectangular domain.
- `show_axes`: whether to display the $\Re$ or $\Im$ axes.
- `show`: display immediately (default `True`) or return the figure unshown.

