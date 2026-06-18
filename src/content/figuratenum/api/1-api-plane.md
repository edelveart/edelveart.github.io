---
title: "API: PlaneFigurateNum"
description: "Auto-generated reference for all sequence generators, ComplexViz, and DiscreteViz."
order: 20
---

This reference is auto-generated from the source code on [GitHub](https://github.com/edelveart/figuratenum). For explanations and mathematical context, see [Theory](/figuratenum/theory) and [Learn](/figuratenum/learn).

All sequences are available through the `FigurateNum` class or directly via the `PlaneFigurateNum` class, with identical behavior.

```py
from figuratenum import PlaneFigurateNum
```

> Note: Some sequences share names across geometric, combinatorial, or historical contexts. While outputs may coincide, their interpretations differ.

## PlaneFigurateNum

| #   | Canonical                                              | Aliases                             |
| --- | ------------------------------------------------------ | ----------------------------------- |
| 1   | `polygonal(m: int)`                                    | —                                   |
| 2   | `centered_square()`                                    | `diamond()`                         |
| 3   | `centered_dodecagonal()`                               | `star()`                            |
| 4   | `centered_mgonal(m: int)`                              | —                                   |
| 5   | `pronic()`                                             | `heteromecic()`, `oblong()`         |
| 6   | `polite()`                                             | —                                   |
| 7   | `impolite()`                                           | —                                   |
| 8   | `cross()`                                              | —                                   |
| 9   | `aztec_diamond()`                                      | —                                   |
| 10  | `polygram(m: int)`                                     | `centered_star_polygonal(m: int)`   |
| 11  | `pentagram()`                                          | —                                   |
| 12  | `gnomonic()`                                           | —                                   |
| 13  | `truncated_triangular()`                               | —                                   |
| 14  | `truncated_square()`                                   | —                                   |
| 15  | `truncated_pronic()`                                   | —                                   |
| 16  | `truncated_centered_pol(m: int)`                       | `truncated_centered_mgonal(m: int)` |
| 17  | `truncated_centered_hexagonal()`                       | `truncated_hex()`                   |
| 18  | `generalized_mgonal(m: int, start_num: int = 0)`       | —                                   |
| 19  | `generalized_centered_pol(m: int, start_num: int = 0)` | —                                   |
| 20  | `generalized_pronic(start_num: int = 0)`               | —                                   |
| 21  | `triangular()`                                         | —                                   |
| 22  | `square()`                                             | —                                   |
| 23  | `pentagonal()`                                         | —                                   |
| 24  | `hexagonal()`                                          | —                                   |
| 25  | `heptagonal()`                                         | —                                   |
| 26  | `octagonal()`                                          | —                                   |
| 27  | `nonagonal()`                                          | —                                   |
| 28  | `decagonal()`                                          | —                                   |
| 29  | `hendecagonal()`                                       | —                                   |
| 30  | `dodecagonal()`                                        | —                                   |
| 31  | `tridecagonal()`                                       | —                                   |
| 32  | `tetradecagonal()`                                     | —                                   |
| 33  | `pentadecagonal()`                                     | —                                   |
| 34  | `hexadecagonal()`                                      | —                                   |
| 35  | `heptadecagonal()`                                     | —                                   |
| 36  | `octadecagonal()`                                      | —                                   |
| 37  | `nonadecagonal()`                                      | —                                   |
| 38  | `icosagonal()`                                         | —                                   |
| 39  | `icosihenagonal()`                                     | —                                   |
| 40  | `icosiheptagonal()`                                    | —                                   |
| 41  | `icosidigonal()`                                       | —                                   |
| 42  | `icositrigonal()`                                      | —                                   |
| 43  | `icositetragonal()`                                    | —                                   |
| 44  | `icosipentagonal()`                                    | —                                   |
| 45  | `icosihexagonal()`                                     | —                                   |
| 46  | `icosioctagonal()`                                     | —                                   |
| 47  | `icosinonagonal()`                                     | —                                   |
| 48  | `triacontagonal()`                                     | —                                   |
| 49  | `centered_triangular()`                                | —                                   |
| 50  | `centered_pentagonal()`                                | —                                   |
| 51  | `centered_hexagonal()`                                 | —                                   |
| 52  | `centered_heptagonal()`                                | —                                   |
| 53  | `centered_octagonal()`                                 | —                                   |
| 54  | `centered_nonagonal()`                                 | —                                   |
| 55  | `centered_decagonal()`                                 | —                                   |
| 56  | `centered_hendecagonal()`                              | —                                   |
| 57  | `centered_tridecagonal()`                              | —                                   |
| 58  | `centered_tetradecagonal()`                            | —                                   |
| 59  | `centered_pentadecagonal()`                            | —                                   |
| 60  | `centered_hexadecagonal()`                             | —                                   |
| 61  | `centered_heptadecagonal()`                            | —                                   |
| 62  | `centered_octadecagonal()`                             | —                                   |
| 63  | `centered_nonadecagonal()`                             | —                                   |
| 64  | `centered_icosagonal()`                                | —                                   |
| 65  | `centered_icosihenagonal()`                            | —                                   |
| 66  | `centered_icosidigonal()`                              | —                                   |
| 67  | `centered_icositrigonal()`                             | —                                   |
| 68  | `centered_icositetragonal()`                           | —                                   |
| 69  | `centered_icosipentagonal()`                           | —                                   |
| 70  | `centered_icosihexagonal()`                            | —                                   |
| 71  | `centered_icosiheptagonal()`                           | —                                   |
| 72  | `centered_icosioctagonal()`                            | —                                   |
| 73  | `centered_icosinonagonal()`                            | —                                   |
| 74  | `centered_triacontagonal()`                            | —                                   |
| 75  | `truncated_centered_triangular()`                      | —                                   |
| 76  | `truncated_centered_square()`                          | —                                   |
| 77  | `truncated_centered_pentagonal()`                      | —                                   |
| 78  | `generalized_pentagonal()`                             | —                                   |
| 79  | `generalized_hexagonal()`                              | —                                   |

**Sequences in PlaneFigurateNum: 79**
