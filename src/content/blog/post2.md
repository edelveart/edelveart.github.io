---
title: "Funciones currificadas para almorzar | Parte 1"
description: "En la primera parte de los cuentos sobre funciones currificadas, nos enfocaremos en familiarizarnos con la noción y las diversas formas de plasmar en código esta idea."
pubDate: "December 15 2024"
heroImage: "/post2/curry-function.webp"
badge: "v0.5.0"
tags: ["typescript", "funciones currificadas", "programación funcional"]
---

**Resumen**: En la primera parte de los cuentos sobre funciones currificadas, nos enfocaremos en familiarizarnos con la noción y las diversas formas de plasmar en código esta idea.

### Parte 1. Currificando en TypeScript

Currificar, en palabras simples y comunes (como diría *Chayanne*), consiste en convertir una función con varios argumentos en una serie de funciones más simples, cada una tomando solo uno de esos argumentos.

Así, por ejemplo, si tenemos una función que recibe cuatro parámetros, la descomponemos en cuatro funciones que toman uno de esos parámetros en cada llamada.

- Tú leyendo: Mucho floro, necesito el código.

Comencemos entonces.

### De la declaración al modo Curry

En TypeScript tenemos varias aproximaciones sintácticas y con ciertas minuciocidades que no vamos a sumergirnos demasiado. Empecemos por el conocimiento previo.

```ts
function sumFourNumbers(x: number, y: number, z: number, w: number): number{
  return x+ y + z + w;
}
```
Aquí tenemos la sencilla función declarada `sumFourNumbers`, que recibe 4 parámetros y retorna la suma de esos números bien físicos.

Ahora, pongámosle un toque de Curry... ¡es broma! Vamos a currificarla con un tipado no tan estricto en su retorno:

```ts
function sumFourNumbers(x: number)  {
  return function(y: number){
    return function(z: number) {
      return function(w: number): number {
        return x + y + z + w;
      };
    };
  };
}
```

- Tú leyendo: ¿Pero qué clase de *Hadōken* es esto?

Tenemos una función declarada que devuelve una serie de funciones anónimas anidadas, una dentro de otra.
Es importante notar que cada una de estas funciones recibe un único valor y retorna otra función, salvo la última, que devuelve la suma total al final.

### Las flechas dan poder, pero con gran responsabilidad, dice el Tío Ben.

Recuerda que desde ECMAScript 6 hay funciones flecha, las `() => {}`.  Pues apliquémoslas a nuestro código de arriba (es equivalente, pero recuerda cómo pelotea `this` en este contexto):

```ts
function sumFourNumbers(x: number)  {
  return (y: number) => {
    return (z: number) => {
      return (w: number): number => {
        return x + y + z + w;
      };
    };
  };
}
```

- Tú leyendo: Ya lo tengo, me costó pero ya estoy en modo activado.

Aún podemos ser más explícitos en el tipado, definiendo el tipo de cada función anidada:

```ts
function sumFourNumbers(x: number): (y: number) => (z: number) => (w: number) => number {
  return function(y: number): (z: number) => (w: number) => number {
    return function(z: number): (w: number) => number {
      return function(w: number): number {
        return x + y + z + w;
      };
    };
  };
}
```

Este es el *real Hadōken*, apúntalo.

Pero, en realidad, no necesitamos ser tan explícitos ni repetitivos. Para eso existe la inferencia de tipos. Basta con definir la firma de la función en la cabecera. Aquí lo ves con las funciones flecha:

```ts
function sumFourNumbers(x: number): (y: number) => (z: number) => (w: number) => number {
  return (y: number)=> {
    return (z: number) => {
      return (w: number): number => {
        return x + y + z + w;
      };
    };
  };
}
```

Sin embargo, todo esto resulta aún verboso.

- Tú leyendo: ¿Existe una forma más concisa de hacer todo este juego sin tanta salsa?

### Hacia la belleza lineal

Sí, el tipado está complicado, o mejor dicho, verborreico. Armemos la misma vaina con una *función expresada*, la montamos sobre una constante con el mismo nombre:

```ts
const sumFourNumbers = (x: number) => {
  return (y:number) =>{
    return (z: number) => {
      return (w: number): number => {
        return x + y + z +w;
      };
    };
  };
};
```

¿Más de lo mismo, no? Sí, pero ahora podemos agregar un alias de tipo para modularizar nuestro juego.

```ts
type SumFourNumbersType= (x: number) => (y: number) => (z: number) => (w: number) => number

const sumFourNumbers: SumFourNumbersType = (x)=> {
  return (y) => {
    return (z) =>{
      return (w) => {
        return x + y + z + w;
      };
    };
  };
};
```

¿Esto está mejor, cierto? Sí, está más amigable, pero nuestra función es reasignable, para bien o para mal. Además, ¿qué pasó con el *hoisting*, papá? En fin...

- Tú leyendo: Espera, tengo dos preguntas: ¿Se puede ser más tonero chill? ¿Me parece o puedo quitar los `return`?

> ¡Sí, el alias de tipo ya te está cantando las fijas!

Pues, luego de tanto viaje, hemos llegado a la *belleza en una línea*:

```ts
type SumFourNumbersType = (x: number) => (y: number) => (z: number) => (w: number) => number
const sumFourNumbers: SumFourNumbersType = (x) => (y) => (z) => (w) => x + y + z + w;
```

¡Eso es todo, amigos!

###  ¿Qué veremos en la parte 2 de cuentos de las funciones currificadas?

Logramos pasar de un *Haōken* a una sola línea de función currificada y su tipado.
- Tú leyendo: Perfecto ¿pero qué ventajas ofrece hacer las cosas a lo *Curry*?

En la segunda parte veremos el quid de la cuestión.

