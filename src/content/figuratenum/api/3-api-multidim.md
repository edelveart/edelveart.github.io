---
title: "API: MultidimensionalFigurateNum"
description: "Auto-generated reference for all sequence generators, ComplexViz, and DiscreteViz."
order: 22
---

This reference is auto-generated from the source code on [GitHub](https://github.com/edelveart/figuratenum). For explanations and mathematical context, see [Fundamentals](/figuratenum/fundamentals) and [Learn](/figuratenum/sequences-and-families).

All sequences are available through the `FigurateNum` class or directly via the `MultidimensionalFigurateNum` class, with identical behavior.

```py
from figuratenum import MultidimensionalFigurateNum
```

> Note: Some sequences share names across geometric, combinatorial, or historical contexts. While outputs may coincide, their interpretations differ.


| #   | Canonical                                                                        | Aliases                                                                                                                      |
| --- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| 1   | `pentatope()`                                                                    | `hypertetrahedral()`, `pentachoron()`, `cell_5()`, `triangulotriangular()`                                                   |
| 2   | `k_dimensional_hypertetrahedron(k: int)`                                         | `k_hypertetrahedron(k: int)`, `regular_k_polytopic(k: int)`, `figurate_of_order_k(k: int)`, `k_dim_hypertetrahedron(k: int)` |
| 3   | `biquadratic()`                                                                  | `hypercube()`, `octachoron()`, `tesseract()`, `cell_8()`                                                                     |
| 4   | `k_dimensional_hypercube(k: int)`                                                | `k_hypercube(k: int)`, `k_dim_hypercube(k: int)`                                                                             |
| 5   | `hyperoctahedral()`                                                              | `hexadecachoron()`, `four_cross_polytope()`, `four_orthoplex()`, `cell_16()`                                                 |
| 6   | `hypericosahedral()`                                                             | `tetraplex()`, `polytetrahedron()`, `hexacosichoron()`, `cell_600()`                                                         |
| 7   | `hyperdodecahedral()`                                                            | `hecatonicosachoron()`, `dodecaplex()`, `polydodecahedron()`, `cell_120()`                                                   |
| 8   | `polyoctahedral()`                                                               | `icositetrachoron()`, `octaplex()`, `hyperdiamond()`, `cell_24()`                                                            |
| 9   | `k_dimensional_hyperoctahedron(k: int)`                                          | `k_cross_polytope(k: int)`, `k_dim_hyperoctahedron(k: int)`                                                                  |
| 10  | `four_dimensional_mgonal_pyramidal(m: int)`                                      | `mgonal_pyramidal_of_the_second_order(m: int)`, `four_dim_mgonal_pyramidal(m: int)`                                          |
| 11  | `k_dimensional_mgonal_pyramidal(k: int, m: int)`                                 | `mgonal_pyramidal_of_the_k_2_th_order(k: int, m: int)`, `k_dim_mgonal_pyramidal(k: int, m: int)`                             |
| 12  | `centered_biquadratic()`                                                         | —                                                                                                                            |
| 13  | `k_dimensional_centered_hypercube(k: int)`                                       | `k_dim_centered_hypercube(k: int)`                                                                                           |
| 14  | `centered_polytope()`                                                            | `centered_hypertetrahedron()`                                                                                                |
| 15  | `k_dimensional_centered_hypertetrahedron(k: int)`                                | `k_dim_centered_hypertetrahedron(k: int)`                                                                                    |
| 16  | `centered_hyperoctahedral()`                                                     | `orthoplex()`, `centered_hyperoctahedron()`                                                                                  |
| 17  | `nexus(k)`                                                                       | `k_dim_nexus(k)`                                                                                                             |
| 18  | `k_dimensional_centered_hyperoctahedron(k: int)`                                 | `k_dim_centered_hyperoctahedron(k: int)`                                                                                     |
| 19  | `generalized_pentatope(start_num: int = 0)`                                      | —                                                                                                                            |
| 20  | `generalized_k_dimensional_hypertetrahedron(k: int = 5, start_num: int = 0)`     | —                                                                                                                            |
| 21  | `generalized_biquadratic(start_num: int = 0)`                                    | —                                                                                                                            |
| 22  | `generalized_k_dimensional_hypercube(k: int = 5, start_num: int = 0)`            | —                                                                                                                            |
| 23  | `generalized_hyperoctahedral(start_num: int = 0)`                                | —                                                                                                                            |
| 24  | `generalized_k_dimensional_hyperoctahedron(k: int = 5, start_num: int = 0)`      | —                                                                                                                            |
| 25  | `generalized_hyperdodecahedral(start_num: int = 0)`                              | —                                                                                                                            |
| 26  | `generalized_hypericosahedral(start_num: int = 0)`                               | —                                                                                                                            |
| 27  | `generalized_polyoctahedral(start_num: int = 0)`                                 | —                                                                                                                            |
| 28  | `generalized_k_dimensional_mgonal_pyramidal(k: int, m: int, start_num: int = 0)` | —                                                                                                                            |
| 29  | `generalized_k_dimensional_centered_hypercube(k: int, start_num: int = 0)`       | —                                                                                                                            |
| 30  | `generalized_nexus(k: int, start_num: int = 0)`                                  | —                                                                                                                            |
| 31  | `five_dimensional_hypertetrahedron()`                                            | —                                                                                                                            |
| 32  | `six_dimensional_hypertetrahedron()`                                             | —                                                                                                                            |
| 33  | `five_dimensional_hypercube()`                                                   | —                                                                                                                            |
| 34  | `six_dimensional_hypercube()`                                                    | —                                                                                                                            |
| 35  | `four_dimensional_hyperoctahedron()`                                             | —                                                                                                                            |
| 36  | `five_dimensional_hyperoctahedron()`                                             | —                                                                                                                            |
| 37  | `six_dimensional_hyperoctahedron()`                                              | —                                                                                                                            |
| 38  | `seven_dimensional_hyperoctahedron()`                                            | —                                                                                                                            |
| 39  | `eight_dimensional_hyperoctahedron()`                                            | —                                                                                                                            |
| 40  | `nine_dimensional_hyperoctahedron()`                                             | —                                                                                                                            |
| 41  | `ten_dimensional_hyperoctahedron()`                                              | —                                                                                                                            |
| 42  | `four_dimensional_square_pyramidal()`                                            | —                                                                                                                            |
| 43  | `four_dimensional_pentagonal_pyramidal()`                                        | —                                                                                                                            |
| 44  | `four_dimensional_hexagonal_pyramidal()`                                         | —                                                                                                                            |
| 45  | `four_dimensional_heptagonal_pyramidal()`                                        | —                                                                                                                            |
| 46  | `four_dimensional_octagonal_pyramidal()`                                         | —                                                                                                                            |
| 47  | `four_dimensional_nonagonal_pyramidal()`                                         | —                                                                                                                            |
| 48  | `four_dimensional_decagonal_pyramidal()`                                         | —                                                                                                                            |
| 49  | `four_dimensional_hendecagonal_pyramidal()`                                      | —                                                                                                                            |
| 50  | `four_dimensional_dodecagonal_pyramidal()`                                       | —                                                                                                                            |
| 51  | `five_dimensional_mgonal_pyramidal(m: int)`                                      | —                                                                                                                            |
| 52  | `five_dimensional_square_pyramidal()`                                            | —                                                                                                                            |
| 53  | `five_dimensional_pentagonal_pyramidal()`                                        | —                                                                                                                            |
| 54  | `five_dimensional_hexagonal_pyramidal()`                                         | —                                                                                                                            |
| 55  | `five_dimensional_heptagonal_pyramidal()`                                        | —                                                                                                                            |
| 56  | `five_dimensional_octagonal_pyramidal()`                                         | —                                                                                                                            |
| 57  | `six_dimensional_mgonal_pyramidal(m: int)`                                       | —                                                                                                                            |
| 58  | `six_dimensional_square_pyramidal()`                                             | —                                                                                                                            |
| 59  | `six_dimensional_pentagonal_pyramidal()`                                         | —                                                                                                                            |
| 60  | `six_dimensional_hexagonal_pyramidal()`                                          | —                                                                                                                            |
| 61  | `six_dimensional_heptagonal_pyramidal()`                                         | —                                                                                                                            |
| 62  | `six_dimensional_octagonal_pyramidal()`                                          | —                                                                                                                            |
| 63  | `five_dimensional_centered_hypercube()`                                          | —                                                                                                                            |
| 64  | `six_dimensional_centered_hypercube()`                                           | —                                                                                                                            |
| 65  | `five_dimensional_centered_hypertetrahedron()`                                   | —                                                                                                                            |
| 66  | `six_dimensional_centered_hypertetrahedron()`                                    | —                                                                                                                            |
| 67  | `five_dimensional_centered_hyperoctahedron()`                                    | —                                                                                                                            |
| 68  | `six_dimensional_centered_hyperoctahedron()`                                     | —                                                                                                                            |

**Sequences in MultidimensionalFigurateNum: 68**

## ZooFigurateNum

| #   | Canonical       | Aliases |
| --- | --------------- | ------- |
| 1   | `cuban_prime()` | —       |
| 2   | `pell()`        | —       |

**Sequences in ZooFigurateNum: 2**

