---
title: "Funciones currificadas para almorzar | Parte 3"
description: "Todo lo que hemos visto sobre funciones currificadas tiene un fin: prepararnos unos tamales."
pubDate: "December 17 2024"
heroImage: "/post2/curry-function.webp"
badge: "v0.5.0"
tags: ["typescript", "funciones currificadas", "programación funcional"]
---

**Resumen**: En esta tercera parte de los cuentos de funciones currificadas, solo diré una cosa: nos preparamos unos tamales.

### Parte 3. Haciendo de Chef

> Y en la mañana yo preparo los tamales.
> —Burro, *Shrek*

Por fin llegó el momento de preparar un delicioso tamal currificado un domingo por la mañana… o bueno, también podemos comprarlos, ¿quién dijo que no?

```ts
type Amasar = "A mano" | "Amasadora";
type Relleno = "Pollo" | "Chancho";
type Hoja = "Maíz" | "Plátano";

type TamalDomingo = (x: Amasar) => (y: Relleno) => (z: Hoja) => Tamal;

class Tamal {
  amasar!: Amasar;
  relleno!: Relleno;
  hoja!: Hoja;

  prepararTamal: TamalDomingo = (amasar) => (relleno) => (hoja) => {
    this.amasar = amasar;
    this.relleno = relleno;
    this.hoja = hoja;
    return this;
  };
}
```

El método `prepararTamal` de la clase `Tamal` es donde se realiza la currificación. Este método devuelve el propio objeto `Tamal` al final, cumpliendo con el tipo `TamalDomingo`. Los tres pasos que realizaremos a continuación se encadenan de manera fluida y natural.

#### Amasar

Nos ponemos a pensar en cómo preparar la masa para el tamal. Iremos por el camino difícil.

```ts
const miTamalDominguero = new Tamal();
const amasado = miTamalDominguero.prepararTamal("A mano")
```

#### Rellenar

Mucho, pero *mucho* más de cinco minutos después (como diría el meme), porque estuvimos amasando a puro punche con las manos.  Rellenamos con aceitunas y números. Siempre imaginé comerme unos números (no los fideos, aunque también nos dan cierta ilusión).

```ts
const relleno = amasado("Pollo")
```

#### Envolver

Después de un largo tiempo (varios memes más tarde), lo envolvemos en hojas de plátano, como debe ser.

```ts
const envuelto = relleno("Plátano");
```

#### Colocar en la olla de barro

Nuestros tamales **envueltos** están listos para ir a la olla de barro. Espero que hayas puesto hace buen rato la leña a calentar el agua.

¡Eso es todo, amigos!

### Conclusión

Y así, llegamos al final de esta breve introducción a las funciones **currificadas** en TypeScript. Algunos las adoran, otros no les encuentran sentido, y algunos piensan que solo son útiles en casos muy específicos. Pero ahora, ¡ya forman parte de tu **lonchera** para divertirte programando!
