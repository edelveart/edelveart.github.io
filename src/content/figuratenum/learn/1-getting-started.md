---
title: "Getting Started"
description: "Install FigurateNum."
order: 1
---

FigurateNum ships in two installation modes: a stable core for sequence generation, and an optional extension for visualization.

## Stable version

This includes sequence generation and core functionality, with no dependencies beyond the Python standard library.
Requires Python `≥ 3.12`.

```bash
pip install figuratenum
```

## Visualization tools (experimental)

> Visualization components are under active development and may change in future versions.

The visualization module provides two experimental classes:

- `ComplexViz`, for rendering generating functions as phase portraits in $\mathbb{C}$
- `DiscreteViz`, for visualizing modular patterns in $\mathbb{Z}/n\mathbb{Z}$

These tools depend on NumPy, SymPy, and Matplotlib.

```bash
pip install figuratenum[figurate-viz]
```


