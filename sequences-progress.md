44. centered_cube_numbers
rhombic_dodecahedral_numbers
hauy_rhombic_dodecahedral_numbers
centered_tetrahedron_numbers = centered_tetrahedral_numbers
centered_square_pyramid_numbers = centered_pyramid_numbers
centered_pentagonal_pyramid_numbers != centered_octahedron_numbers (equality only in quantity)
centered_hexagonal_pyramid_numbers
centered_heptagonal_pyramid_numbers
centered_octagonal_pyramid_numbers

## 3
KdimensionalHyperoctahedron
k_dimensional_mgonal_pyramidal_numbers
centered_biquadratic_numbers


## Problema con los valores no bigint:
para permitir tuve que agregar any o unknown:

> git commit -m "test(plane-fignumbers/integration): force type error in test cases by using 'any | unknown' for non-bigint values"

## Método de división sucesiva para usar logaritmos con bigint
export const log2BigInt = (delta: bigint) => {
  if (delta <= 0n) {
    throw new Error("El logaritmo en base 2 no está definido para valores <= 0");
  }

  let result: bigint = 0n; // Usamos BigInt para result
  let value: bigint = delta;

  // Dividimos el valor por 2 hasta llegar a 1, y contamos las divisiones
  while (value > 1n) {
    value /= 2n;
    result += 1n; // Incrementamos result usando BigInt
  }

  return result;
};


## Operador bitwise

1 & 1 da como resultado 1.
1 & 0 da como resultado 0.
0 & 1 da como resultado 0.
0 & 0 da como resultado 0.
Propiedad útil:

Un número es potencia de dos si y solo si tiene un solo bit en 1 en su representación binaria. Ejemplos:

    1 es 0001 en binario (potencia de dos: 2^0)
    2 es 0010 en binario (potencia de dos: 2^1)
    4 es 0100 en binario (potencia de dos: 2^2)
    8 es 1000 en binario (potencia de dos: 2^3)

¿Cómo se utiliza el operador &?

Para determinar si un número es potencia de dos, podemos aprovechar el hecho de que un número que es potencia de dos tiene exactamente un bit de valor 1. La operación n & (n - 1) tiene una propiedad clave: si n es una potencia de dos, el resultado de esta operación será 0.

¿Por qué?

Cuando restas 1 a un número que es potencia de dos, todos los bits de la derecha del bit más significativo (el de valor 1) se invierten (cambian de 0 a 1 y de 1 a 0). Por lo tanto, cuando haces n & (n - 1), todos los bits en n donde hay 1 se "apagan" porque en n - 1 esos bits son 0, y viceversa. Así, el resultado de la operación será 0 solo si n tiene un único bit 1.
Ejemplo:

    Para n = 4 (que es 0100 en binario):
        n - 1 = 3 (que es 0011 en binario).
        n & (n - 1) = 0100 & 0011 = 0000.


Recomendaciones de nombres más atractivos:

    Figgy – Un nombre corto, fácil de recordar, con un toque amistoso y relacionado con figuras y números.
    Numera – Evoca la idea de "números" y "cálculos", es pegajoso y tiene un sonido moderno.
    Figura – Enfocado en la palabra "figura" (números figurados) con un toque en español, lo que lo hace único.
    Geonum – Hace referencia a "geometría" y "números", lo que podría aludir a la naturaleza matemática de los números figurados.
    Numfig – Una mezcla de "número" y "figura", simple y conciso.
    Fignum – Similar a las anteriores, pero con una sonoridad más moderna y de fácil memorización.
