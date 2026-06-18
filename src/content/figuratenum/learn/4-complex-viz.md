---
title: "ComplexViz: Phase Portraits"
description: "Visualize figurate number sequences in the complex plane."
order: 4
---

Instead of the sequence itself, `ComplexViz` looks at its generating function $G(z)$ over the complex plane $\mathbb{C}$, exposing global structure that individual terms don't reveal on their own. The technique is domain coloring, producing a phase portrait following Wegert (2012).

```python
from figuratenum.figurate_viz import ComplexViz

c = ComplexViz()
c.visualize_plane("triangular", cmap_color="cividis", disk_radius=2.0)
```

## Three methods, one per dimension

`visualize_plane` handles 2D sequences, `visualize_space` handles 3D, and `visualize_multidim` handles k-dimensional and generalized families.

```python
c.visualize_space("tetrahedral", cmap_color="twilight")

c.visualize_multidim("k_dim_hypertetrahedron", k=4, cmap_color="twilight")
```

`visualize_multidim` takes `k` to select the dimension; the other two take `m` instead, for sequences with an $m$-gonal geometry.

## Interpretation

The portrait encodes phase and magnitude through color, following [Wegert (2012)](https://doi.org/10.1007/978-3-0348-0180-5). A few points stand out at a glance: that's where $G(z)$ changes dramatically. For figurate generating functions this tends to happen near $z = 1$; the full explanation lives in [Theory](/figuratenum/theory#generating-functions).

## What's worth tuning

`name_seq` (passed positionally) selects the sequence; `m` and `k` select which member of a parametric or k-dimensional family, depending on the method. Beyond that, `cmap_color` and `disk_radius` are the two parameters that most change what a portrait looks like: the colormap shapes how phase is rendered, and the plot domain itself is a rectangle set by `domain_grid_radius`, with `disk_radius` cropping it to a circular mask, smaller values zooming into the region near $z=1$ where most of the interesting structure sits.

The constructor exposes finer controls (`plot_type`, `xlim`/`ylim`, `show_axes`, `figsize`, `brightness`, `num_lines`) for adjusting the figure beyond these defaults.

## Parameters

- `name_seq`: the sequence, passed positionally. Names depend on the method: plane sequences for `visualize_plane`, space sequences for `visualize_space`, k-dimensional and generalized sequences for `visualize_multidim`.
- `m`: m-gonal parameter (`visualize_plane`, `visualize_space`, `visualize_multidim`).
- `k`: dimension parameter (`visualize_multidim` only).
- `plot_type`: `"pure_phase_portrait"`, `"phase_contours"`, `"modulus_contours"`, or `"enhanced_phase_portrait"` (default).
- `cmap_color`: colormap, e.g. `"hsv"` (default), `"cividis"`, `"twilight"`.
- `disk_radius`: radius of the circular mask applied to the rectangular domain; must be positive if set.
- `domain_grid_radius`: half-width of the rectangular evaluation domain.
- `xlim`, `ylim`: explicit plane limits, overriding `domain_grid_radius`.
- `show_axes`: whether to display the Re/Im axes.
- `show`: display immediately (default `True`) or return the figure unshown.

Unset options fall back to the constructor's defaults: `figsize`, `cmap_color`, `brightness`, `num_lines`, `disk_radius`, `domain_grid_radius`, `show_axes`.
