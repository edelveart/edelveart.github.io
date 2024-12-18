---
title: "Funciones currificadas para almorzar | Parte 2"
description: "Exploraremos las bondades y el lado oscuro de la fuerza de las funciones currificadas, y cerraremos con el uso de parámetros nombrados en el estilo Curry."
pubDate: "December 16 2024"
heroImage: "/post2/curry-function.webp"
badge: "v0.5.0"
tags: ["typescript", "funciones currificadas", "programación funcional"]
---

**Resumen**: En esta segunda parte de los cuentos de funciones currificadas, hablaremos de sus bondades, pero también del lado oscuro de su fuerza. Finalizamos con los parámetros nombrados en el modo Curry.

### Parte 2. La bondad del uno a uno

En la [Parte 1](funciones-currificadas-para-almorzar--parte-1) nos habíamos quedado dando la hora con la belleza de una línea:

```ts
type SumFourNumbersType = (x: number) => (y: number) => (z: number) => (w: number) => number
const sumFourNumbers: SumFourNumbersType = (x) => (y) => (z) => (w) => x + y + z + w;
```

Ahora es momento de aprender a aprovechar este superpoder que nos ha dejado.

El truco para trabajar con estas funciones es visualizar paréntesis adyacentes, uno tras otro, según los parámetros que recibe la función. De manera general, para una función cualquiera `f_n` con `n` parámetros, mandamos algo como esto:

$$
f_n \left( \right)_1 \left( \right)_2 \left( \right)_3 \cdots \left( \right)_n
$$

En TypeScript, el codiguillo termina siendo

```ts
const  totalSum = sumFourNumbers(10)(20)(30)(40);
console.log(totalSum);
```

- Tú leyendo: Es igual a la función tradicional con cuatro parámetros, ¿para qué hemos hecho todo el paseo hasta aquí?

### Compón paso a paso

Aparentemente, como el título de la salsa de *Tony Vega*, hemos hecho todo por las puras. Pero, una de las cosas más chéveres que tienen las funciones currificadas es que te dejan separar tus bebidas para la mañana y para la tarde:

```ts
const partialSum = sumFourNumbers(100)(100);
const totalSum = partialSum(100)(100);
```

Como ves, hemos separado dos tazas de café (en mg de cafeína) para el desayuno y dos para el lonche. Con las funciones tradicionales, tendríamos que tomarnos las 4 tazas de café a la vena, de un solo sorbo.

Siendo más meticulosos con nuestras bebidas, podríamos recargarnos con un único café y un té muy cargado para ir a descansar por día:

```ts
const aCoffe = sumFourNumbers(100)
const aTeaForDreams = aCoffe(150)
```

Debes saber que si mandamos `aCoffe` por consola al *Playground*, nos muestra los números que faltan alimentar a nuestra función y potenciar nuestro entusiasmo.

```ts
console.log(aCoffe)
// (y) => (z) => (w) => x + y + z + w
```

Igual pasa con `aTeaForDreams`.

En dos días completamos las 4 bebidas no espirituosas.

### Recibe y bota las funciones que quieras

`sumFourNumbers` pone las cosas más versátiles en cuanto a funciones de orden superior. Dado que cada parte es una función por sí misma, puedes mandarla como argumento o retornarla desde otras funciones.

- Tú leyendo: ¿Cómo se come eso?

Veamos un ejemplo, donde pasamos la versión currifidada como argumento:

```ts
const scaleBy = (func: SumFourNumbersType, times: number)=> {
  return (x: number) => (y: number)=> (z: number) => (w: number) => {
    const totalSum = func(x)(y)(z)(w);
    return totalSum * times;
  };
};

const sumWithScaleByTwo = scaleBy(sumFourNumbers, 2);

const finalUltramanTiga = sumWithScaleByTwo(10)(20)(30)(40);
console.log(finalUltramanTiga);

// Playground arroja: 200
```

Primero, hemos aplicado el escalamiento por dos a nuestra función `sumFourNumbers`. Luego, la llamamos como siempre, pasándole los números físicos.

### No X-men unitarios

Por último, otra gran bondad, cuando escribimos los tests en el modo Curry de las funciones, es que cada valor puede validarse por separado. La comprobación de cada paso no interfiere con los demás.

- Tú leyendo: ¿Y los efectos secundarios?

El estado global ni las variables fuera del *scope* presentan la realidad alterada. También somos más predecibles, estamos declarando con claridad cómo *baila* cada función.

### ¿Todo es color de *rose*?

- Tú leyendo: ¿Me parece o estás exagerando con lo bueno?

De cierta manera, sí, estamos motivándonos  hacia la visión Curry.
En ese sentido, aunque todo suena de maravilla, hay algunos *handicaps* al tratar las cosas currificadas.

El primer inconviente que observas es que, como la marea al atardecer, **crece la pila de llamadas**. Las funciones se llaman unas a otras, ¡míralas!
Sin embargo, no te preocupe,  estamos lejos del *stack overflow*. La profundidad de la pila depende de la *aridad* de `fn`.

El segundo inconveniente está en el ecosistema TypeScript. En la comunidad, la mayoría de las funciones con las que te encontrarás están en su forma tradicional o expresada, no currificada. Muchas bibliotecas y frameworks adoptan por defecto el enfoque convencional. (¡Sí, existe Ramda para el sabor funcional!)

El tercer problemilla, que surge del segundo, es que el código puede parecer raro al principio (especialmente si trabajas en equipo), para aquellos que no están familiarizados con la idea de currificación.

### ¿Queda o no queda? EL lado oscuro de la fuerza

- Tú leyendo:  ¿Entonces, cuándo aplicar la salsa? Creo que varias cosas se hacen sin Curry.

Para empezar, vamos con lo obvio: si vas a llamar a una función con todos los parámetros de buenas a primeras, entonces será más conveniente la función tradicional, sencilla y ergonómica.

Mas, si  quieres seleccionar argumentos, quizás podrías plantearte dos cosas:

1. Tipar con parámetros opcionales: `?`
2. Sobrecargar la firma de la función

El punto uno es quizás más directo y digerible; la sobrecarga no es como en `C#`.

Por último, hay un caso raro: si tu equipo y el proyecto siguen estilo currificado. ¡Uno nunca sabe!

### Los nombres del expediente X-Curry

Supongamos que el equipo decide refactorizar hacia una versión currificada. ¡Vaya gemita!

Cuando tienes varios parámetros en la función, tienes que cuidar el orden.

- Tú leyendo: No quiero marearme con el orden y recordar qué estoy movilizando.

Te propongo una **alternativa** que no he visto mucho por ahí:

> Funciones currificadas con parámetros nombrados.

Vamos a echar mano del `destructuring` para siguiendo la belleza de una línea, tipar ahora la *belleza nombrada de una línea*:

```ts
type SumWithDestructuring= ({x}: {x: number})=> ({y}: {y: number}) => ({z}: { z: number}) => ({w}: {w: number}) => number;
const sumFourNumbers: SumWithDestructuring = ({ x}) =>  ({ y}) => ({ z }) => ({w }) => x +y + z+ w;

const finalSum = sumFourNumbers({ x: 5 })({ y: 3 })({ z: 2 })({ w: 7 });
```

Igual lo puedes hacer por partes, para mañana y para la noche. ¿Más verboso? Sí, pero ahora es más explícito lo que estás cocinando.

¡Eso es todo, amigos!

###  ¿Qué veremos en la parte 3 de cuentos de las funciones currificadas?

En esta publicación , hemos explorado tanto lo bueno como el lado oscuro de las funciones currificadas.
- ¿Cómo puedo crear una función así para preparar mi comida?

En la tercera parte, plantearé una ligera variación en la que nos alejaremos de los números puros, pero mantendremos el quid de lo tratado, asi como si estuviéramos siguiendo una receta.

