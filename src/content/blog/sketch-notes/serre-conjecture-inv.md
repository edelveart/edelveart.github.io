---
title: "Conjetura de Serre e inversiones"
description: "Otro motivo de mis amanecidas es pensar en invertir asociaciones que aparecen por doquier, en preguntas y definiciones cuya respuesta simula sencillez. Cuento tres ejemplos, uno asimétrico."
pubDate: "September 1 2026"
badge: "sketch notes"
heroImage: "serre-conjecture-inv.svg"
lang: "es"
tags: ["modular forms", "live coding", "galois representation", "elliptic curves", "Serre conjecture", "number theory"]
---

Muchas veces durante estas notas he dado vueltas como esos agujeros que uno cava en la arena de la playa con una lampa de juguete para observar el agua desaparecer. La idea de iterar, un giro ascendente o descendente con diferentes objetos matemáticos que esperan ser uno solo, alguna vez, o resumirse.
Pero llega la tarde y el sol desciende con una cadencia imposible como es la inversión.

## Sobre *Modular Forms*

Entre abril y mayo del 2025, empecé y lancé una versión alfa de [modular_forms](https://rubygems.org/gems/modular_forms), una librería mínima para hacerse con objetos circundantes del Último teorema de Fermat dentro de [Sonic Pi](https://sonic-pi.net/).

El germen fueron las curvas elípticas $E(K)$, un tipo de objeto geométrico que imaginé constantemente en **live coding**, lejano de sus fauces criptográficas, por cierto. Más bien para expresar la aritmética como movimientos de puntos musicales.

Luego, vinieron las formas modulares $f$, esas hermosas funciones generadoras que subsumen aritmética de forma natural.
Para mí son un punto de luz en una naturaleza muerta.

> Muchas de las verificaciones numéricas y los *tests* de `modular_forms` las cotejé con [LMFDB](https://www.lmfdb.org/). Aún queda mucho por determinar, sobre todo en lo relativo al *DSL*. Aquí tienes el [código fuente](https://github.com/edelveart/modular_forms). Si lo usas en tu proyecto, cítalo mediante [**Zenodo**](https://doi.org/10.5281/zenodo.19503416).

Al respecto, luego leí muy someramente sobre la **conjetura de Serre**, cuyos objetos llamados representaciones de Galois aún no he implementado computacionalmente, y no espero hacerlo hasta que tengan para mí ese sabor natural y espontáneo.

Sin embargo, detrás de la apariencia de estas ideas dispares y de la aritmética puedo atisbar por doquier cosas invertibles, preguntas simples que hablan sobre el sentido contrario de un artefacto.

En lo que viene haré un pasacalle con  algunos ejemplos donde pienso que aparece constantemente el proceso invertible.


## Grupos y zeta de Riemann

Entre las series que se tratan en Cálculo, tal vez sea la serie armónica una de las que más curiosidad pueda tener para los de música. La compone la idea de tomar inversos multiplicativos, una operación elemental que también aparece como axioma indispensable en ciertas estructuras algebraicas.

Entonces, puedo pensar de naturales $\mathbb{N}$ a racionales  $\mathbb{Q}$

$$
\displaystyle
\begin{array}{c}
a \\
\big\downarrow \\

a^{-1} = \frac{1}{a} \\
\end{array}
$$


Ahora lo que haremos es sumar esos recíprocos hasta el infinito. Aquí mezclamos la idea de iteración, $1,2,3,4,5$ y lo que yo considero toda serie:
> Acumulación de memorias, es el peso del recuerdo.

Y además, la inversión que mencionamos.

$$
\sum_{a=1}^{\infty}\frac{1}{a}
$$

Por último, el proceso de convertirla en función zeta es la introducción de un parámetro $s$, inicilamente en la región $\Re(s) > 1$, usando los inversos de las potencias $a^{s}$ sobre un objeto ya iterado y acumulado, y luego la continuación analítica. Cuando probamos que la serie diverge, realmente pienso que el peso de los recuerdos es inabordable, desborda a la creatura matemática.

## Problema inverso de Galois

Otro de los ejemplos que más reflejan estos binoculares invertibles es el **problema inverso de Galois**. Fue el primero que me pareció ejemplo prototipo de espontaneidad de este tipo de cuestiones.

La teoría permite asociar a un polinomio $p(X) \in K[X]$ el grupo de Galois de su cuerpo de descomposición (como escribo con las flechas)

$$
\begin{array}{c}
\operatorname{Gal}(L/K)\\
\big\uparrow\\
L\\
\big\uparrow\\
p(X)
\end{array}
$$

Modelamos $K$ en los racionales y qué pregunta es más natural que decir:

> Si tengo un grupo finito $G$, ¿existe un polinomio $p(X) \in \mathbb{Q}[X]$ cuyo grupo de Galois sea isomorfo a dicho $G$?

Para grupos pequeños, aparecen realizaciones con suavidad casi artesanal. Hay sabores comunes como $C_2, C_3, S_3, S_4, A_5$, u otros similares. Pero si tomamos un grupo arbitrario, ¿cómo podemos responder afirmativamente a tal posible realización?

$$
\begin{array}{c}
G \\
\big\downarrow\\
L\\
\big\downarrow\\
p(X)
\end{array}
$$


## Representaciones de Galois

Este es el último ejemplo que tocaré. Seré muy liviano de formalidad, puesto que quiero solamente enfocar la inversión como fenómeno.
Primero, sea $f$ una forma modular. A ella le podemos asociar, bajo las condiciones adecuadas, una representación de Galois

$$
\begin{array}{c}
\bar\rho_f :
 \operatorname{Gal}( \overline{\mathbb{Q}}/ \mathbb{Q})
\longrightarrow
\operatorname{GL}_2(\overline{\mathbb{F}}_p)
\\
\big\uparrow
\\
 f
\end{array}
$$

La representación es una correspondencia entre cada automorfismo (simetría) de ese grupo complicado (no logro interpretarlo con naturalidad) y una matriz cuadrada con coeficientes en la clausura algebraica de un cuerpo finito.

A tal efecto, tenemos un circuito de ida. El retorno es lo interesante y el **gesto espontáneo**. Si tomamos una representación $\bar\rho$ cualquiera, la pregunta es:

> ¿Existe una $f$ de tal manera que $\bar\rho \cong \bar\rho_f$?

### Refinamiento con horas

Pero cuando dije cualquiera, falta refinar un poco las condiciones. Entonces, (ya algo con un poco más de bagaje de horas en esto) nace preguntar:

> ¿En qué espacio debe habitar $f$?

Primero, consideramos representaciones continuas, irreducibles e impares. La condición de imparidad se refiere a la conjugación compleja $c$ y significa que $ \det(\bar\rho(c))=-1$.

Hay tres datos, además. A saber, $N(\bar\rho)$, que es el nivel determinado por la ramificación de $\bar\rho$, $k(\bar\rho)$, que es el peso y depende de cómo la representación se comporte localmente en el primo $p$, y $\xi(\bar\rho)$, el carácter que aparece asociado al determinante de $\bar\rho$.

Son, en cierto modo, los tres diapasones que hay que afinar (pesar, medir, moldear) antes de que el circuito de vuelta encuentre su resonancia. Bien, sin entrar en detalles y haciendo una pausa al verso, Serre predice que hay una *eigenforma cuspidal*

$$
f \in S_{k(\bar\rho)}
\bigl(\Gamma_0(N(\bar\rho)),\xi(\bar\rho)\bigr)
$$

tal que $\bar\rho_f \cong \bar\rho$. A lo Galois, diagramáticamente escribo

$$
\begin{array}{c}
\bar\rho
\\
\big\downarrow
\\
f
\end{array}
$$

Ese $\Gamma_0$ es un subgrupo del grupo modular, en palabras a nivel del mar $c\equiv 0 \pmod{N(\bar\rho)}$.

## La mixtura de inversión

En estos ejemplos, aparece un proceso de mezcla, *mix* en sentido musical. Elementos que jalan desde lo iterativo, lo acumulativo, lo invertible, lo sustituible.

Aunque puse la función $\zeta (s)$ como un objeto más en el pasacalle, es de otra naturaleza que el problema inverso de Galois y la conjetura de Serre. Estas dos últimas hacen la misma pregunta con otro manto terrestre.

> Dado un objeto simplificado (un grupo, una representación), ¿existe siempre un objeto complejo (un polinomio, una forma modular) que lo produzca?

Es, en las simas, preguntar si esa asignación es sobreyectiva. La difícil $\zeta(s)$ invierte a la manera algebraica y se queda ahí. En cambio, las últimas van de lleno hacia preguntas de existencia.

Miramos los objetos hacia adelante. Por otra parte, las flechas son objetos que esperan una inversión para preguntar si hay camino de regreso al páramo en llamas.
Y dado el peso de los objetos iterados, de esas memorias, podríamos ir dejando de lado eso que se acumuló durante tanto tiempo en un muladar de hojas y papeles.
