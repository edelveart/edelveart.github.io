---
title: "API: SpaceFigurateNum"
description: "Auto-generated reference for all sequence generators, ComplexViz, and DiscreteViz."
order: 21
---

This reference is auto-generated from the source code on [GitHub](https://github.com/edelveart/figuratenum). For explanations and mathematical context, see [Fundamentals](/figuratenum/fundamentals) and [Learn](/figuratenum/sequences-and-families).

All sequences are available through the `FigurateNum` class or directly via the `SpaceFigurateNum` class, with identical behavior.

```py
from figuratenum import SpaceFigurateNum
```

> Note: Some sequences share names across geometric, combinatorial, or historical contexts. While outputs may coincide, their interpretations differ.


| #   | Canonical                                                           | Aliases                    |
| --- | ------------------------------------------------------------------- | -------------------------- |
| 1   | `m_pyramidal(m: int)`                                               | —                          |
| 2   | `cubic()`                                                           | —                          |
| 3   | `tetrahedral()`                                                     | —                          |
| 4   | `octahedral()`                                                      | —                          |
| 5   | `dodecahedral()`                                                    | —                          |
| 6   | `icosahedral()`                                                     | —                          |
| 7   | `truncated_tetrahedral()`                                           | —                          |
| 8   | `truncated_cubic()`                                                 | —                          |
| 9   | `truncated_octahedral()`                                            | —                          |
| 10  | `stella_octangula()`                                                | —                          |
| 11  | `centered_cube()`                                                   | —                          |
| 12  | `rhombic_dodecahedral()`                                            | —                          |
| 13  | `hauy_rhombic_dodecahedral()`                                       | —                          |
| 14  | `centered_tetrahedron()`                                            | `centered_tetrahedral()`   |
| 15  | `centered_square_pyramid()`                                         | `centered_pyramid()`       |
| 16  | `centered_mgonal_pyramid(m: int)`                                   | —                          |
| 17  | `centered_octahedron()`                                             | —                          |
| 18  | `centered_icosahedron()`                                            | `centered_cuboctahedron()` |
| 19  | `centered_dodecahedron()`                                           | —                          |
| 20  | `centered_truncated_tetrahedron()`                                  | —                          |
| 21  | `centered_truncated_cube()`                                         | —                          |
| 22  | `centered_truncated_octahedron()`                                   | —                          |
| 23  | `centered_mgonal_pyramidal(m: int)`                                 | —                          |
| 24  | `centered_hexagonal_pyramidal()`                                    | `hex_pyramidal()`          |
| 25  | `hexagonal_prism()`                                                 | —                          |
| 26  | `mgonal_prism(m: int)`                                              | —                          |
| 27  | `generalized_mgonal_pyramidal(m: int, start_num)`                   | —                          |
| 28  | `generalized_cubic(start_num: int = 0)`                             | —                          |
| 29  | `generalized_octahedral(start_num: int = 0)`                        | —                          |
| 30  | `generalized_icosahedral(start_num: int = 0)`                       | —                          |
| 31  | `generalized_dodecahedral(start_num: int = 0)`                      | —                          |
| 32  | `generalized_centered_cube(start_num: int = 0)`                     | —                          |
| 33  | `generalized_centered_tetrahedron(start_num: int = 0)`              | —                          |
| 34  | `generalized_centered_square_pyramid(start_num: int = 0)`           | —                          |
| 35  | `generalized_rhombic_dodecahedral(start_num: int = 0)`              | —                          |
| 36  | `generalized_centered_mgonal_pyramidal(m: int, start_num: int = 0)` | —                          |
| 37  | `generalized_mgonal_prism(m, start_num: int = 0)`                   | —                          |
| 38  | `generalized_hexagonal_prism(start_num: int = 0)`                   | —                          |
| 39  | `triangular_pyramidal()`                                            | —                          |
| 40  | `square_pyramidal()`                                                | `pyramidal()`              |
| 41  | `pentagonal_pyramidal()`                                            | —                          |
| 42  | `hexagonal_pyramidal()`                                             | —                          |
| 43  | `heptagonal_pyramidal()`                                            | —                          |
| 44  | `octagonal_pyramidal()`                                             | —                          |
| 45  | `nonagonal_pyramidal()`                                             | —                          |
| 46  | `decagonal_pyramidal()`                                             | —                          |
| 47  | `hendecagonal_pyramidal()`                                          | —                          |
| 48  | `dodecagonal_pyramidal()`                                           | —                          |
| 49  | `tridecagonal_pyramidal()`                                          | —                          |
| 50  | `tetradecagonal_pyramidal()`                                        | —                          |
| 51  | `pentadecagonal_pyramidal()`                                        | —                          |
| 52  | `hexadecagonal_pyramidal()`                                         | —                          |
| 53  | `heptadecagonal_pyramidal()`                                        | —                          |
| 54  | `octadecagonal_pyramidal()`                                         | —                          |
| 55  | `nonadecagonal_pyramidal()`                                         | —                          |
| 56  | `icosagonal_pyramidal()`                                            | —                          |
| 57  | `icosihenagonal_pyramidal()`                                        | —                          |
| 58  | `icosidigonal_pyramidal()`                                          | —                          |
| 59  | `icositrigonal_pyramidal()`                                         | —                          |
| 60  | `icositetragonal_pyramidal()`                                       | —                          |
| 61  | `icosipentagonal_pyramidal()`                                       | —                          |
| 62  | `icosihexagonal_pyramidal()`                                        | —                          |
| 63  | `icosiheptagonal_pyramidal()`                                       | —                          |
| 64  | `icosioctagonal_pyramidal()`                                        | —                          |
| 65  | `icosinonagonal_pyramidal()`                                        | —                          |
| 66  | `triacontagonal_pyramidal()`                                        | —                          |
| 67  | `triangular_tetrahedral()`                                          | —                          |
| 68  | `triangular_square_pyramidal()`                                     | —                          |
| 69  | `square_tetrahedral()`                                              | —                          |
| 70  | `square_square_pyramidal()`                                         | —                          |
| 71  | `tetrahedral_square_pyramidal()`                                    | —                          |
| 72  | `centered_pentagonal_pyramid()`                                     | —                          |
| 73  | `centered_hexagonal_pyramid()`                                      | —                          |
| 74  | `centered_heptagonal_pyramid()`                                     | —                          |
| 75  | `centered_octagonal_pyramid()`                                      | —                          |
| 76  | `centered_triangular_pyramidal()`                                   | —                          |
| 77  | `centered_square_pyramidal()`                                       | —                          |
| 78  | `centered_pentagonal_pyramidal()`                                   | —                          |
| 79  | `centered_heptagonal_pyramidal()`                                   | —                          |
| 80  | `centered_octagonal_pyramidal()`                                    | —                          |
| 81  | `centered_nonagonal_pyramidal()`                                    | —                          |
| 82  | `centered_decagonal_pyramidal()`                                    | —                          |
| 83  | `centered_hendecagonal_pyramidal()`                                 | —                          |
| 84  | `centered_dodecagonal_pyramidal()`                                  | —                          |
| 85  | `generalized_pentagonal_pyramidal()`                                | —                          |
| 86  | `generalized_hexagonal_pyramidal()`                                 | —                          |

**Sequences in SpaceFigurateNum: 86**
