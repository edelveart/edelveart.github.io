---
title: "El parque de Magdalena del Mar es un astroide"
description: "Hagamos las matemáticas de una plaza de la ciudad de Lima"
pubDate: "December 08 2024"
heroImage: "/plaza-magdalena-del-mar.png"
badge: "v0.9.0"
tags: ["Plaza de Magdalena del Mar", "Astroide", "Curvas planas", "Geometría "]
---
<!-- Script - LaTex -->
<!-- <script async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"
  type="text/javascript">
</script> -->
<script type="text/javascript"
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
</script>
<!-- Script - LaTex -->
> Recuerda citar esta publicación

### Crónica de una fiesta, amanecida y geometría


#### 3:00 am

Luego del tono, fuimos un rato al parque Túpac Amaru (ese que está en Magdalena del Mar) con unos amigos.

#### 3:15 am

Propuse dar unas vueltas a hablar de lo que sea por el parque, y mientras caminábamos, algo raro me llamó la atención. **Las veredas parecían seguir una ecuación paramétrica**, algo que reconocí, felizmente el trago ya estaba de bajada.

#### 3:20 am

De repente, recordé una de las figuras más clásicas: el **astroide**. Mientras caminaba sobre el lugar geométrico, tarareaba entre la embriaguez y la lucidez. Pensé que podría encajar la figura dentro de un conjunto más grande de curvas planas.

#### 3:25 am

¿De dónde surge un astroide? Pensé en la estela que deja un punto $P$ de un círculo que rueda a lo largo de una línea recta fija $L$ de forma tangencial. El nombre técnico es **trocoide**. Es una de las curvas ampliamente usadas para el diseño de engranajes.

Aquí, de inmediato, surgieron las clasificaciones:

- Si el punto $P$ está en la circunferencia será llamada cicloide normal o cicloide.
- Si el punto está dentro  del círculo, se llamará trocoide contraída.
- Si el punto está fuera del círculo, se llamará trocoide extendida.

Si el radio del círculo es $R$, entonces tendremos las ecuaciones paramétricas:

$$
x  =  R \varphi - P \sin \varphi
$$
$$
y  =  R - P \cos \varphi
$$
En nuestro caso, $R = P$.

¿Qué curioso que un punto cambie tantas cosas? Así de lindas son las matemáticas.

#### 3:30 am

Mi curiosidad, siempre inquieta, me llevó a una nueva reflexión:

> Si rodamos sobre una línea $L$, ¿por qué no rodar sobre cualquier otra figura, sobre cualquier otra curva plana? ¿Qué pasaría si no nos limitáramos a la simpleza de la recta? Después de todo, las matemáticas no tienen límites.

La primera y más natural idea es pensar que, en lugar de hacer rodar un círculo sobre una línea, ahora tenemos un círculo rodante que gira sobre otro *círculo base estacionario*. La estela de este giro de un círculo sobre un círculo fijo produce una nueva curva.

Una vez más, se abre una clasificación, pero esta vez, pensando en si rueda por fuera o por dentro del círculo base inmóvil.

- Si rueda por fuera, le llamaremos **epicicloide**.
- Si rueda por dentro, le pondremos de nombre **hipocicloide**.

#### 3:35 am

Otra vez me siento incómodo con una clasificación incompleta. El simple hecho de que existan epicicloide e hipocicloide me hace regresar a la clasificación de rodar sobre la línea. ¿Y si $P$ es mayor o menor? Sí, efectivamente, también hay más opciones:

- Epitrocoide ($P$ fuera)
- Hipotrocoide ($P$ dentro)

Y hay una posibilidad más, algo más exótica: la *pericicloide*, pero esa la dejaremos de lado por ahora.

#### 3:35  am

Ya estamos listos para la astroide con sus ecuaciones, porque, al fin, estamos relativamente ubicados. Desde un punto de vista puramente intuitivo, un astroide se ve como una *estrella inflada de 4 puntas*. El término más apropiado en este contexto sería el de **cúspides**.

Así que creemos un astroide simple, con cúspides de longitud $1$ respecto al origen.

$$
x = \sin ^3 (\varphi)
$$
$$
y = \cos ^3 (\varphi),
$$

donde $0 \leq \varphi \leq 2\pi.$

#### 10:00 am

Acabo de despertar. ¿Y dónde está la figura paramétrica de anoche? Vamos a usar GeoGebra para graficar el astroide del parque.

Necesitamos un par de ecuaciones paramétricas, nada del otro mundo, solo algo muy similar a lo que describimos anoche.

Lo único que agregaremos para darle un toque de dinamismo es un *control deslizante*. Lo llamaremos $\varphi$, para que la figura se mueva mientras exploramos la curva.

**Te juego el codiguillo**:

```geogebra
varphi = 2 pi
Curva(sen³(u), cos³(u), u, 0, varphi)
```
Agregamos algo de color y listo, ahí está nuestro astroide. Con el control deslizante $\varphi$ en acción, la figura toma vida, mostrando su dinamismo.

<img src="/post1.png" width="700px" alt="Map of Magdalena Del Mar Park" style="border-radius: 15px;"/>

Ahora, al compararla con la foto panorámica del parque de Magdalena del Mar, la conexión entre la geometría y el paisaje se vuelve curioso. Tenemos un juego entre lo físico y lo abstracto.

<img src="/post1-park.png" width="700px" alt="Map of " style="border-radius: 15px;"/>

##  Hora de ir a tomar desayuno

Es rarísimo topar con algo así, ¿verdad? Salir a divertirte con tus amigos y terminar haciendo hora con algo de geometría.

