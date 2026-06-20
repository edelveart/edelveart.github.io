---
title: "Contributing"
description: "How to contribute code, tests, documentation, and mathematical corrections to FigurateNum."
order: 31
---
Thank you for your interest in **FigurateNum**.

FigurateNum has been downloaded nearly 20,000 times over the last two years. Contributions of any size are welcome, particularly from first-time contributors.

## Development setup

```bash
git clone https://github.com/edelveart/figuratenum.git
cd figuratenum
pip install -e ".[figurate-viz]"
```

## Running tests

Tests are executed automatically through GitHub Actions on every push and pull request.

```bash
pytest
```

Please ensure all tests pass before submitting a pull request.

## Ways to contribute

* Add new figurate sequences.
* Add tests for existing sequences.
* Improve documentation and examples.
* Report bugs or API issues.
* Correct mathematical references and errata.

If you add a new sequence, please include a reliable mathematical reference whenever possible (OEIS, books, papers, or other scholarly sources).

## Adding a new sequence

Each sequence is implemented as a generator function and exposed through a facade class.

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

To add a new sequence:

1. Implement the generator function in the appropriate module.
2. Expose it through the corresponding facade class.
3. Add tests covering the first known terms.
4. Include a mathematical reference.

Following an existing sequence is usually the easiest way to get started.
We value **careful, well-understood contributions** over speed.

## Commit conventions

When possible, use conventional commit prefixes:

| Prefix     | Description           |
| ---------- | --------------------- |
| `feat`     | new functionality     |
| `fix`      | bug fixes             |
| `refactor` | code improvements     |
| `docs`     | documentation updates |
| `test`     | test changes          |

## Reporting issues

Please use GitHub Issues for bug reports, installation problems, incorrect outputs, or API inconsistencies.

When reporting a bug, include:

* FigurateNum version
* Python version
* Minimal reproducible example
* Expected and actual results

## Contributing to the errata

FigurateNum is based primarily on *Figurate Numbers* (Deza & Deza, 2012).

Corrections to formulas, definitions, references, or indexing errors in the book are maintained in:

```text
docs/errata/errata-figuratenum.tex
```

Errata contributions are scientific contributions and are always welcome.

## Questions

If you are unsure where to start, open an issue and we can discuss the best approach before implementation.

