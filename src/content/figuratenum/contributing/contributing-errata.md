---
title: "Contributing"
description: "How to run tests, add sequences, and contribute to FigurateNum."
order: 31
---

FigurateNum is maintained by a single developer and has been downloaded nearly 20,000 times over the last two years. Contributions of any size are welcome.

## Development setup

```bash
git clone https://github.com/edelveart/figuratenum.git
cd figuratenum
pip install -e ".[figurate-viz]"
pytest
```

## Ways to contribute

| Type          | Details                                                                |
| ------------- | ---------------------------------------------------------------------- |
| New sequences | Include a mathematical reference (OEIS, paper, or book)                |
| Tests         | Cover the first known terms of the sequence                            |
| Documentation | Corrections, examples, or improvements                                 |
| Bug reports   | Open a [GitHub Issue](https://github.com/edelveart/figuratenum/issues) |
| Errata        | Corrections to *Figurate Numbers* (Deza & Deza, 2012)                  |

## Adding a new sequence

Each sequence is a generator function exposed through a facade class. Aliases for alternative names live on the class only.

```python
def centered_square() -> Generator[int]:
    delta = 1
    while True:
        yield 2 * delta**2 - 2 * delta + 1
        delta += 1

class PlaneFigurateNum:
    def centered_square(self) -> Generator[int]:
        return centered_square()
    diamond = centered_square
```

Add the generator function in the appropriate module, expose it through the corresponding facade class, and add a test under `tests/` covering its first several terms. Following an existing sequence in the same family is the fastest way to match the expected shape.

## Commit conventions

| Prefix     | Description           |
| ---------- | --------------------- |
| `feat`     | new functionality     |
| `fix`      | bug fixes             |
| `refactor` | code improvements     |
| `docs`     | documentation updates |
| `test`     | test changes          |

## Contributing to the errata

Mathematical errors in *Figurate Numbers* (Deza & Deza, 2012), in formulas, definitions, or indexing, are tracked in [`docs/errata/errata-figuratenum.tex`](https://github.com/edelveart/figuratenum/blob/main/docs/errata/errata-figuratenum.tex). Identifying and documenting these is a genuine scientific contribution. Open a PR against the `.tex` source with the error, its location, and the fix, or open an issue if you spotted a discrepancy but are unsure of the correction.
