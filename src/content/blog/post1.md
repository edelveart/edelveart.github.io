---
title: "Sonic Visualiser: Codificando la r de Pearson"
description: "Tutorial básico para implementar la r de Pearson y divertirte."
pubDate: "Sep 12 2024"
heroImage: "/post_img.webp"
badge: "v1.0.0"
tags: ["Sonic Visualiser", "statistics", "Pearson correlation coefficient", "TypeScript"]
---

> Recuerda citar esta publicación

En esta primera entrada quiero compartir algo súper **chévere** que me he encontrado indagando en las **representaciones gráficas** que generamos a partir de análisis de grabaciones con **Sonic Visualiser**, mientras escuchaba el tema de los *Thundercats*.

Lo que vamos a ver es una forma sencilla y relajada de entender un concepto estadístico clave. Después, lo divertido viene con la implementación en **TypeScript**, que es donde le ponemos el *sabor*. Aquí, no obstante, hay fórmulas porque son elegantes (salió rimando).

Entonces, ¿cuál es el norte en esta publicación?

> Queremos conocer la correlación entre dos performances de una misma pieza musical. Es decir, queremos ver más allá de lo evidente, como si tuviésemos la *espada del augurio*.

### ¿Qué es correlación?

Iniciamos prodigando una definición brumosa, como ciertas mañanas de verano al avistar el mar desde los acantilados de la costa limeña:

- **Definición 1**. La correlación nos indica si dos variables, o más, presentan una dependencia lineal y qué tan fuerte es el grado de dependencia de dichas variables.

Lo lineal debe entenderse como el cambio en simultáneo, al mismo ritmo (en un momento volveremos a este punto). No obstante, debes saber que se trata de una **asociación** y no implica ni pretende dar una explicación del tipo **causa-efecto**.

### Con las formulitas macizas

Las fórmulas matemáticas son sumamente bellas porque abstraen una infinidad de ideas en un par de símbolos. Parte de su belleza radica en su concisión. Seguro estás pensando: "¡Qué tanto bla, bla! Quiero ver ya el contenido.

Vamos al grano, sin más preámbulo:

$$
 r_{Pearson} = \frac{\sum_{i=0}^{N-1}(x_i - \bar{x})(y_i - \bar{y})}
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
\begin{align}
-1 \leq r \leq 1, \ r \in \mathbb{R}.
\end{align}

Nota, además, que no he mencionado las variables independiente y dependiente. En el contexto de una asociación, esa nomenclatura no sería la más adecuada.

Para dar respuesta a la tercera pregunta, nos centraremos de llenoen la implementación en `TypeScript`.

### El codiguillo explayado

Para esta sección, te recomiendo tener a la mano la fórmula de Pearson más arriba descrita.

- **Observación**. No buscaremos la optimización en primera instancia.

### Algo de notación

Las variables `x` y `y` son secuencias de números. El primer **rack** rectangular que elegiremos para ordenar las cosas serán los **arreglos**. Los arreglos son *estructuras de datos linealeas, simples pero poderosas*. Son un caballo ganador para cientos y cientos de batallas.

En TypeScript, los escribimos con sus tipos bien tranquilos así:
```ts
x: number[] = [4, 7, 10, 2]
y: number[] = [3, 5, 8, 1]
```

Continuando con la explicación de la fórmula, seguro observas una `N`, que representa el número de muestras o longitud de los arreglos. Desde un punto de vista programador, tendríamos que `N = 3` para `x` e `y`.

¿Qué es la letra  `i` en la fórmula? Más fácil decir que es el **índice** del arreglo y comienza en `0`.

Quedamos entonces armando las sumatorias:
$$\sum_{i=0}^{N-1} x_i.$$

Parece difícil, pero en realidad solo tendrás que sumar todos los elementos del arreglo `x`, desde el índice `i` hasta el último índice.

Finalmente, el último ingrediente es el **promedio**; el que dejaba roja o azul tu libreta. Siendo más refinados, se le llama *media aritmética*, y la definimos como la suma de todos los elementos entre el número de elementos que tiene el arreglo (`N`). Se denota como sigue:

$$
  \bar{x} = \sum_{i=0}^{N-1}  \frac{x_i}{N}.
$$

Comenzaremos por este último ingrediente:


```ts
function mean(variable: number[]): number {
  let sum = 0;
  const N = variable.length;
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
  let sumProductDeviation = 0;
  for (let i = 0; i < N; i++) {
    sumProductDeviation += (xVariable[i] - meanXVariable) * (yVariable[i] - meanYVariable);
  }
  return sumProductDeviation;
}
```

Observa que le hemos puesto el nombre de **covarianza** para darle más promesa al asunto. Es broma, así también se le llama.  Lo que he hecho es únicamente sumar el producto de las desviaciones de ambas variables respecto a sus medias.

La `sumProductDeviation,` es la partecita de la fórmula que hace:

$$
  \sum_{i=0}^{N-1} (x_i - \bar{x})(y_i - \bar{y}).
$$

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

<!-- Script - LaTex -->

<script
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
  type="text/javascript">
</script>

