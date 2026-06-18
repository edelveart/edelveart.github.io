---
title: "Contributing"
description: "How to run tests, report issues, and contribute to FigurateNum."
order: 30
---

FigurateNum is maintained by a single developer. Contributions are welcome, and the process is informal: open a pull request or an issue, and it will be reviewed directly.

## Running tests

Tests run via `pytest` and are checked automatically on every push through GitHub Actions.

```bash
git clone https://github.com/edelveart/figuratenum.git
cd figuratenum
pip install -e ".[figurate-viz]"
pytest
```

## Adding a new sequence

Each sequence is a plain generator function, grouped by module according to its family (e.g. `plane_figuratenum.py` for 2D sequences). A facade class (e.g. `PlaneFigurateNum`) imports these functions and exposes them as methods. Alternative names for the same sequence are added as aliases on the facade class only; the underlying function is defined once.

```python
def centered_square() -> Generator[int]:
    delta = 1
    while True:
        yield 2 * delta ** 2 - 2 * delta + 1
        delta += 1
```

```python
class PlaneFigurateNum:
    def centered_square(self) -> Generator[int]:
        return centered_square()
    diamond = centered_square
```

To add a new sequence, write the generator function in the appropriate module, expose it as a method on the corresponding facade class, and add a test under `tests/` covering its first several terms. Following an existing sequence in the same family as a template is the fastest way to match the expected shape.

Open an issue first if you're unsure where a new sequence fits, or just submit a PR directly.

## Reporting issues

Bugs in the implementation (incorrect output, broken installation, API issues) go to [GitHub Issues](https://github.com/edelveart/figuratenum/issues).

## Contributing to the errata

FigurateNum is grounded in [Deza & Deza (2012)](https://doi.org/10.1142/8188). Like any text of that scope, it contains occasional mathematical errors in formulas, indices, or definitions, independent of this library's code. Identifying and documenting these is a genuine scientific contribution, not a bug report.

Corrections are tracked in the [errata LaTeX source](https://github.com/edelveart/figuratenum/blob/main/docs/errata/errata-figuratenum.tex). To propose a correction, open a PR against the `.tex` source with the error, its location in the book, and the fix, or open an issue if you've spotted a discrepancy but aren't sure of the correction.
