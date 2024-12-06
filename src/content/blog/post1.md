---
title: "Sonic Visualiser: Codificando la r de Pearson"
description: "Tutorial básico para implementar la r de Pearson y divertirte. "
pubDate: "Sep 12 2024"
heroImage: "/blog-1.webp"
badge: "v0.6.0"
tags: ["Sonic Visualiser", "statistics", "Pearson correlation coefficient", "TypeScript"]
---
<!-- Script - LaTex -->
<script async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
  type="text/javascript">
</script>

<!-- <script type="text/javascript"
  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_CHTML">
</script>
<script type="text/x-mathjax-config">
  MathJax.Hub.Config({
    tex2jax: {
      inlineMath: [['$','$'], ['\\(','\\)']],
      processEscapes: true},
      jax: ["input/TeX","input/MathML","input/AsciiMath","output/CommonHTML"],
      extensions: ["tex2jax.js","mml2jax.js","asciimath2jax.js","MathMenu.js","MathZoom.js","AssistiveMML.js", "[Contrib]/a11y/accessibility-menu.js"],
      TeX: {
      extensions: ["AMSmath.js","AMSsymbols.js","noErrors.js","noUndefined.js"],
      equationNumbers: {
      autoNumber: "AMS"
      }
    }
  });
</script> -->
<!-- Script - LaTex -->

> Recuerda citar esta publicación

En esta primera entrada quiero compartir algo súper **chévere** que me he encontrado indagando en las **representaciones gráficas** que generamos a partir de análisis de grabaciones con **Sonic Visualiser**, mientras escuchaba el tema de los *Thundercats*.

Lo que vamos a ver es una forma sencilla y relajada de entender un concepto estadístico clave. Después, lo divertido viene con la implementación en **TypeScript**, que es donde le ponemos el *sabor*. Aquí, no obstante, hay fórmulas porque son elegantes (salió rimando).

Entonces, ¿cuál es el norte en esta publicación?

> Queremos conocer la correlación entre dos performances de una misma pieza musical. Es decir, queremos ver más allá de lo evidente, como si tuviésemos la *espada del augurio*.

### ¿Qué es correlación?

Iniciamos prodigando una definición brumosa, como ciertas mañanas de verano al avistar el mar desde los acantilados de la costa limeña:

- **Definición 1**. La correlación nos  indica si dos variables (o más) presentan una dependencia lineal y cuán fuerte es el grado de dicha dependencia.

Lo *lineal* debe entenderse como un cambio simultáneo y a la misma velocidad (más adelante volveremos a este punto). Sin embargo, es importante aclarar que la correlación se refiere más a una **asociación** entre variables y no implica ni pretende establecer una relación de **causa y efecto**.

### Con las formulitas macizas

Las fórmulas matemáticas son sumamente bellas porque abstraen una infinidad de ideas en un par de símbolos. Parte de su belleza radica en su concisión. Seguro estás pensando: "¡Qué tanto bla, bla! Quiero ver ya el contenido.

Vamos al grano, sin más preámbulo:

$$ r_{xy} = \frac{\sum_{i=0}^{N-1}(x_i - \bar{x})(y_i - \bar{y})}
 {(\sum_{i=0}^{N-1}(x_i - \bar{x})^2 \sum_{i=0}^{N-1}(y_i - \bar{y})^2)^{1/2}}.
$$

Esta es una de las más recurridas correlaciones: la **r** de Pearson. Volviéndonos personas de cultura, el nombre completo es *coeficiente de producto-momento de Karl Pearson*. Vaya nombre maciso.

- **Observación**. *He adecuado un poco el estilo de la definición para aludir a cómo la escribiremos en el codigo; es mi alegato*.

El coeficiente **r** de Pearson es una medida que normaliza la correlación lineal entre las variables **x**  e **y** en el intervalo **[-1, 1]**. Seguro estás preguntándote:
1. ¿Qué son las variables **x** e **y**?
2. ¿Qué es normalización?
3. ¿Qué son las demás cosas?
4. ¿Por qué sigo leyendo esto? :/

En palabras llanas, las variables son secuencias de números y la normalización es el proceso que asegura que el coeficiente solo produzca valores comprendidos entre **-1** y +**1**. Más formalmente,
$$
-1 \leq r \leq 1, \ r \in \mathbb{R}.
$$

Nota, además, que no he mencionado las variables independiente y dependiente. En el contexto de una asociación, esa nomenclatura no sería la más adecuada.

- **Observación**. Hay más condiciones para aplicar la correlación de Pearson  (**r**), como que los datos presenten distribución normal y la ausencia de valores atípicos. Por el momento, nos centraremos únicamente en descifrar la fórmula.

Para dar respuesta a la tercera pregunta, nos centraremos de llenoen la implementación en `TypeScript`.

### El codiguillo explayado

Para esta sección, te recomiendo tener a la mano la fórmula de Pearson más arriba descrita.

- **Observación**. No buscaremos la optimización en primera instancia.

### Algo de notación

Las variables `x` y `y` son secuencias de números. El primer **rack** rectangular que elegiremos para ordenar las cosas serán los **arreglos**. Los arreglos son *estructuras de datos linealeas, simples pero poderosas*. Son un caballo ganador para cientos y cientos de batallas.

En TypeScript, los escribimos con sus tipos bien tranquilos así:
```ts
const x: number[] = [4, 7, 10, 2];
const y: number[] = [3, 5, 8, 4];
```

Continuando con la explicación de la fórmula, seguro observas una `N`, que representa el número de muestras o longitud de los arreglos. Desde un punto de vista programador, tendríamos que `N = 3` para `x` e `y`.

¿Qué es la letra  `i` en la fórmula? Más fácil decir que es el **índice** del arreglo y comienza en `0`.

Quedamos entonces armando las sumatorias:
$$\sum_{i=0}^{N-1} x_i.$$

Parece difícil, pero en realidad solo tendrás que sumar todos los elementos del arreglo `x`, desde el índice `i` hasta el último índice.

Finalmente, el ingrediente faltante es el **promedio**; el que dejaba roja o azul tu libreta. Siendo más refinados, se le llama *media aritmética*, y la definimos como la suma de todos los elementos entre el número de elementos que tiene el arreglo (`N`). Se denota como sigue:

$$
  \bar{x} =  \frac{ \sum_{i=0}^{N-1} x_i}{N}.
$$

¿Cómo funcionan los índices? Tomamos el valor de `x = [4, 8, 10, 3]` y sumamos los elementos accediendo mediante índices:

$$
x[0] + x[1] + x[2] + x[3]
$$
$$
4 + 7 + 10 + 3 = 24.
$$

Contamos el número de elementos en el arreglo `x`:
$$
N = 4.
$$

Por último dividimos
$$
\bar{x} = 24 / 4 = 6.
$$

En TypeScript, la media luce como:

```ts
function mean(variable: number[]): number {
  const N = variable.length;
  let sum = 0;
  for (let i = 0; i < N; i++) {
    sum += variable[i];
  }
  return sum / N;
}
```
Nada nuevo bajo el sol de noviembre en Lima. Sumas todas tus calificaciones y te esperas lo mejor.

### Lo que va arriba en la `r` de Pearson

Vamos ahora al ingrediente numerador de la `r`. Aunque es posible escribirlo en un estilo más funcional con `.reduce()`, preferí el toque clásico con el bucle `for`, puesto que le pone más semejanza a la notación matemática.

```ts
function covariance(xVariable: number[], yVariable: number[]): number {
  const meanXVariable = mean(xVariable);
  const meanYVariable = mean(yVariable);
  const N = xVariable.length;
  let sumProductDeviations = 0;
  for (let i = 0; i < N; i++) {
    sumProductDeviations += (xVariable[i] - meanXVariable) * (yVariable[i] - meanYVariable);
  }
  return sumProductDeviations;
}
```

Observa que le hemos puesto el nombre de **covarianza** para darle más promesa al asunto; así también se le llama.  Lo que he hecho es únicamente sumar el producto de las desviaciones de ambas variables respecto a sus medias.

La `sumProductDeviations,` es la partecita de la fórmula que hace:

$$
  \sum_{i=0}^{N-1} (x_i - \bar{x})(y_i - \bar{y}).
$$

Explayando los cálculos tenemos lo siguiente para el índice `0`:

$$
(x[0] - \bar{x} )  (y[0] - \bar{y})
$$
$$
(4 - 4) \times (3 - 4) = 0
$$

Nuestro acumulador `sumProductDeviations` es cero todavía, no sumó nada a su valor inicial.
Para el índice `1` repetimos lo mismo:
$$
(7-4) \times (5 - 4) =3
$$

En este caso, nuestro *acumulador* se ha actualizado a `0 + 3`, es decir, `3`.

Volvemos a repetir esta operación de producto de desviaciones hasta llegar al último índice y vamos agregándolos al acumulador `sumProductDeviations`. Eso es todo.


### El piso de abajo en la `r` de Pearson:

Solo nos faltaría el último pasajero, el denominador en la fracción de Pearson. También es conocido como producto de desviaciones estándar o, para simplificar, el factor normalizador (el que mencionamos más arriba).

```ts
function normalizationTerm(xVariable: number[], yVariable: number[]): number {
  const meanXVariable = mean(xVariable)
  const meanYVariable = mean(yVariable)
  const N = xVariable.length
  let sumX = 0;
  let sumY = 0
  for (let i = 0; i < N; i++) {
      sumX += (xVariable[i] - meanXVariable) ** 2;
      sumY += (yVariable[i] - meanYVariable) ** 2;
  }
  return (sumX * sumY) ** 1/2;
}
```

**¿Pero qué me estás haciendo aquí?**
Sumamos el cuadrado de las desviaciones de cada variable por separado y luego las multiplicamos.

El `sumX` que está en el bucle tiene esta pinta en la fórmula:
$$
  \sum_{i=0}^{N-1} (x_i - \bar{x})^2.
$$

Igual se hace para el valor de `sumY`,

$$
  \sum_{i=0}^{N-1} (y_i - \bar{y})^2.
$$

Por otra parte, ¿recuerdas que preguntabas para qué jugar con las  propiedades de raíces y potencias? Estás viendo que el término de normalización está elevado a un exponente fraccionario `1/2`. Ni me lo recuerdes.

### Llamando a los términos prohibidos

Finalmente, solo queda llamar a las funciones para armar la fracción tan esperada:

```ts
function rPearsonCoef(x: number[], y: number[]){
    return covariance(x, y) / normalizationTerm(x, y);
}
```

- **Observación**: ¿Se puede refactorizar el código para evitar repetir el cálculo de la media aritmética con muestras enormes?

Estás en lo correcto, citemos al griego:
> La duda es el principio de la sabiduría. (Aristóteles)

¿Qué tal si optimizas el código, cambias a otro estilo, lo haces más semántico utilizando `Math.sqrt()`?  Diviértete un par de minutos.

### ¿Qué viene en la siguiente entrada del blog?

Lo que viene es un *misterio*: algún gráfico loco o el tutorial de cómo dibujar una maceta para una secuoya.

Y hablando de árboles, hasta la próxima, ¡mándale saludos al recordado Hebaristo Valdelomariano!"

// Función curried más breve para 6 parámetros
function curried(fn) {
  return function curriedWrapper(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function(...next) {
      return curriedWrapper(...args, ...next);
    };
  };
}

// La función original con 6 parámetros
function suma(a, b, c, d, e, f) {
  return a + b + c + d + e + f;
}

# Generador de números triangulares grandes con BigInt
function generador_triangulares_bigint()
    n = BigInt(1)
    while true
        yield(n * (n + 1) ÷ 2)
        n += 1
    end
end

# Usar el generador para obtener los primeros 10 números triangulares muy grandes
gen = generador_triangulares_bigint()
for i in 1:10
    println(fetch(gen))
end


# Generador de números triangulares usando función anónima (arrow function) y BigInt
gen_triangulares = (x -> BigInt(x) * (BigInt(x) + 1) ÷ 2 for x in 1:BigInt("Inf"))

# Imprimir los primeros 10 números triangulares
for num in gen_triangulares
    println(num)
    # Puedes detenerlo después de imprimir 10 números, por ejemplo
    break
end

BigInt: Es utilizado para trabajar con enteros de precisión arbitraria, permitiendo que los números crezcan sin límites fijos. Los números grandes no se verán restringidos a los valores máximos de Int64 u otros tipos enteros estándar.
1:BigInt("Inf"): Esto crea un generador infinito, lo que significa que la secuencia de números comenzará en 1 y continuará hasta el infinito, generando valores según la regla de cada secuencia matemática.

# Generador de números cuadrados usando función anónima (arrow function) y BigInt
gen_cuadrados = (x -> BigInt(x)^2 for x in 1:BigInt("Inf"))

# Imprimir los primeros 10 números cuadrados
for num in gen_cuadrados
    println(num)
    # Detener el ciclo después de imprimir 10 números
    break
end

###
En Julia, Inf no es una librería externa, sino una constante incorporada en el lenguaje que representa el infinito. Sin embargo, en el contexto de tu código, hay un pequeño error. La constante Inf se utiliza para representar números de punto flotante infinitos, no para generar secuencias infinitas de enteros.

Para generar una secuencia infinita de números enteros y elevarlos al cuadrado, puedes usar un enfoque diferente. Aquí tienes un ejemplo utilizando Iterators y BigInt:

julia
using Base.Iterators: State, done, iterate

struct InfiniteSquares
    state::BigInt
end

InfiniteSquares() = InfiniteSquares(BigInt(1))

function Base.iterate(iter::InfiniteSquares, state=iter.state)
    return state^2, state + 1
end

gen = InfiniteSquares()
for i in 1:10
    println(next(gen))
end
En este ejemplo, InfiniteSquares es un iterador que genera los cuadrados de números enteros de manera infinita utilizando BigInt para manejar números muy grandes. Este enfoque es más adecuado para trabajar con secuencias infinitas de enteros en Julia.

Espero que esto te haya sido útil. Si tienes más preguntas o necesitas más ejemplos, ¡no dudes en preguntar!


module FigurateNumbers

# Write your package code here.
using Base.Iterators: State, done, iterate

# Generalizando un iterador para cualquier secuencia
struct NumberSequence
    state::Int
    formula::Function  # Función para calcular el siguiente número en la secuencia
end

# Constructor de un iterador para cualquier secuencia
NumberSequence(formula::Function) = NumberSequence(1, formula)

# Función Base.iterate generalizada
function Base.iterate(iter::NumberSequence, state=iter.state)
    next_value = iter.formula(state)  # Usamos la función proporcionada para calcular el siguiente número
    return next_value, state + 1
end

# Función para generar números triangulares
function triangular_formula(n::BigInt)
    return (n * (n + 1)) ÷ 2
end

# Función para generar números cuadrados
function square_formula(n::BigInt)
    return n^2
end

# Función para generar números pentagonales
function pentagonal_formula(n::BigInt)
    return (n * (3 * n - 1)) ÷ 2
end
pentagonal_formula = n -> (n * (3 * n - 1)) ÷ 2
# Ejemplo de uso

# Generar los primeros 10 números triangulares
println("Primeros 10 números triangulares:")
tri_gen = NumberSequence(triangular_formula)
for i in 1:10
    println(next(tri_gen))
end

# Generar los primeros 10 números cuadrados
println("\nPrimeros 10 números cuadrados:")
square_gen = NumberSequence(square_formula)
for i in 1:10
    println(next(square_gen))
end

# Generar los primeros 10 números pentagonales
println("\nPrimeros 10 números pentagonales:")
pent_gen = NumberSequence(pentagonal_formula)
for i in 1:10
    println(next(pent_gen))
end
end
