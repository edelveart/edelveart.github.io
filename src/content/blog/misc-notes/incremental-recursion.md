---
title: "Optimización de generadores de números figurados con recurrencia incremental"
description: "Una optimización de lo más simple para generar término por término números figurados en figuratenum mediante diferencias finitas. No válido en casas de más de cien dimensiones, al día de hoy."
pubDate: "November 03 2026"
lang: "es"
badge: "misc notes"
updatedDate: "Nov 04 2026"
tags: ["figurate numbers", "finite differences", "optimization", "generators", "big o", "figuratenum"]
---

Estaba jugando con `math.comb` de Python para computar los números hipertetraédricos  $\mathfrak{f}^4(n)= S_3^4(n)$ y noté que la función generadora  que los producía con `yield` término por término los calculaba más rápido que mi fórmula cerrada.
Para ser precisos, la fórmula que proviene de una relación recursiva y que implementé del libro de cajón de **números figurados** escrito por [Elena Deza y Michel Deza (2012)](https://www.worldscientific.com/worldscibooks/10.1142/8188), era más lenta.

Entonces me tuve que preguntar si debería reescribir cada función o, al menos, mejorar la velocidad de computar cada término. Quiero contar cómo es que llegué a una implementación optimizada de manera curiosa.

> Puedes usar mi librería [**figuratenum**](https://pypi.org/project/figuratenum/), que es donde subiré esta nueva optimización en un futuro próximo.

> Por otra parte, no soy obsesivo con la optimización porque espero ya las cosas cuánticas y los planos poscuánticos. Esta nota es la excusa para añadirme la idea de diferencia finita.

## Comparativa a primera vista

Para no ir a polinomios de grado $k=4$, basta ver la idea con polinomios de grado $k=2$. Obviamente, esto te lo digo posterior a lo que descubrí, así que tómalo y olvídalo también a partir de ahora.

### Los triangulares

Especificaré que fui primero con los números triangulares, $\mathfrak{f}^2(n)=S_3^2(n) = S_3(n)$. Son, matemáticamente hablando, definidos de manera cerrada así

$$
S_3(n) = \frac{n(n+1)}{2},
$$

como una función de $\mathbb{N} \longrightarrow \mathbb{N}$. Hasta la versión `3.0.0` de `figuratenum`, había escrito lo siguiente:

```py
def triangular_closed() -> Generator[int]:
    n = 1
    while True:
        yield (n * (n + 1)) // 2
        n += 1
```

O, equivalentemente, los puedes ver en mi librería como

```py
from figuratenum import FigurateNum

seq = FigurateNum().triangular()
print([next(seq) for _ in range(100)])
#[1, 3, 6, 10, 15, 21, 28, ...]
```
Como fórmula cerrada es bastante concisa y, por supuesto, precisa. Pero me pregunté qué tan rápido lo haría calculando muchos términos (millones). Comencé entonces pensando si alguna función de Python me permitiría ir más rápido. Entonces recordé que $S_3^2$ así como los hipertetraédricos salen también mediante coeficiente binomial, que lo ves conocido si escribo concatenado así
$$
S_3(n)  = \frac{n(n+1)}{2} = \binom{n+1}{2}
$$

Así que me puse manos al teclado e importé `comb`, como te conté al inicio.

```py
from math import comb

def triangular_comb() -> Generator[int]:
    n = 1
    while True:
        yield comb(n + 1, 2)
        n += 1
```

Bien, lo que tenemos es que hacerles unos piques de velocidad en quién produce más rápido, por ejemplo $N=5\,000\,000$ de términos.
Hacia el final te pondré la plantilla de cómo hice la medición, como es en el fondo solo una plantilla, hice uso de la bifurcadora por excelencia del momento [(mira mi post anterior sobre cuándo uso IA).](https://edelveart.github.io/es/blog/mirada-somera-y-analitica-con-inteligencia-artificial/)

Listo, las respuestas son las siguientes con $7$ rondas y $3$ repeticiones en mi ordenador `AMD` antiguo

```py
Comb        : 0.988133 s
Closed      : 1.029515 s
```

En efecto, es más rápida con el `comb`, aunque por poquito (alrededor de un $4\%$).

> Pero, como curioso, me pregunté, ¿habrá algo más rápido que esto, más rápido que usar el coeficiente binomial?

## Incremental

Luego de buscar algo sobre algoritmos para polinomios y secuencias, encontrarás una técnica muy conocida que son las **diferencias finitas**, sumamente simple: toma las diferencias de términos consecutivos, luego las diferencias de esas diferencias y así hasta que el asunto se vuelva constante.

Me gusta a mí pensarlo como niveles de diferencias entre términos (restas en el sentido común). Escribiré

$$
\Delta_+ S_3(n) = S_3(n+1) - S_3(n),
$$
que si reemplazamos y luego restamos te quedará así
$$
\Delta_+ S_3(n) = n + 1
$$

En números llanos, son $3-1=2$, $6-3=3$, $10-6=4$. Como puedes ver tienen la forma $2,3,4,5, \ldots$ y así hasta el fin del tiempo.

Ahora, la segunda diferencia es restar entre ellos, $3-2 = 1$, $4-3=1$, $5-4=1$, por lo que todos son $1$ y aquí termina. Más elegante se puede decir

$$
\Delta_{+}^2 S_3(n) = \Delta_+ S_3(n+1) - \Delta_+ S_3(n)
$$
que es igual (de forma circular) a $(n+2) - (n+1) = 1 = \Delta_{+}^2 S_3(n)$.

Perfecto, entonces los números triangulares pueden escribirse mediante estas diferencias.

### Las matemáticas de lo incremental

Para polinomios de grado $k=2$, nuestro requerimiento son $3$ inicializadores. Para hacerlo simple pensé en $a,b,c$ como variables. El `a` será el primer término que, como empezamos en $n=1$, será exactamente $1$. El número `b` es la primera diferencia entre el término segundo y el término primero, es decir $2$, y por último, `c` es la diferencia constante, nuevamente $1$.

Y para acomodarlo en el generador necesitamos la siguiente idea que podemos deducir casi de inmediato y es la **de cajón de sueño** de toda esta nota

> Si quiero avanzar una posición más, tendré que sumar la primera diferencia al término actual. Y cada vez que avanzo sumo la segunda diferencia a la primera.

Ahora lo haré con números, porque puede parecer extraño. Comienzo con `a=1`, al que le voy a sumar el `2` que es la primera diferencia. Con esto tengo ya `3`. Y toca ahora sumar la segunda diferencia (el `1`) a la primera que es el `2`, con lo que tengo `3`, nuevamente.

Como esto va subiendo, haremos ahora con este valor con el que nos quedamos. Ya habíamos llegado a `3`, y a este `3` le voy a sumar el otro `3` que conseguimos, entonces `3+3=6`. Y también le sumamos la segunda diferencia `1` a este incremento, `3+1=4`. Y una de yapa más para que quede diáfano, le sumo `6+4=10`, y agrego `4+1=5` y ya estoy listo para la siguiente iteración. Repítase este proceso sempiternamente.

Vamos ahora a formalizar un poquito, para un vector $(a,b,c) \in \mathbb{N}^3$, en cada iteración haremos

$$
(a,b,c) \longmapsto (a+b, b+c, c)
$$

Y repetimos el proceso actualizando el vector paso a paso. Con este truco, la fórmula cerrada deja de lado, por un lado, la multiplicación y, por otro, la división, para operar todo con puras sumitas.

### El algoritmo

Demos pase pues, al algoritmo incremental, le pondré un comentario para repetir y grabar lo que ya dije.

```py
def triangular_incremental() -> Generator[int]:
    a = 1  # Valor de inicio y actual
    b = 2  # Primera diferencia
    c = 1  # Segunda diferencia

    while True:
        yield a
        a += b
        b += c
```

Los he puesto a calcular (`triangular_closed()`, `triangular_incremental()`) el triple de la competencia de velocidad anterior, $N=15\,000\,000$. Estos son los *récords* con `7` rondas y `3` repeticiones:

```shell
Incremental : 1.780446 s
Comb        : 2.836282 s
Closed      : 3.104405 s
```

En general, podemos decir que realiza los cálculos con un $42.65\%$ menos tiempo frente a `closed` y un $37.23\%$ menos frente al coeficiente binomial. Es $1.74$ veces más rápido que el más lento.
Esto se debe a que hay un costo por evaluar el expresivo polinomio para generar cada término nuevo.


### El tamaño del número

Bien, a todo esto se me hizo la pregunta, ¿de qué tamaño es el número triangular en el término $N$ que computamos en la prueba? Como sabemos hay enteros de $64$ bits que tienen un límite
$$
-2^{63} \le x \le 2^{63}-1
$$
y que al traspasar y no hacer caso a Alfred, ocurre un desbordamiento. Pero, Python tiene las cosas bajo control de cauce y puede hacer todo con **precisión arbitraria**. Claro, siempre limitado hasta lo que tu central hidroeléctrica soporte.

Para calcular explícitamente el número de bits del $S_3(15\,000\,000)$ que concursamos es

$$
\lfloor \log_2 S_3(N) \rfloor + 1.
$$

Por suerte también tenemos el método `bit_length` de fábrica y vemos que

```python
N = 15_000_000

S_3 = N * (N + 1) // 2

print(S_3)
print(S_3.bit_length())
# 112500007500000
# 47
```

El número tiene $47$ bits, es decir, es menor que $2^{47}$, aún algo lejano de traspasar el límite de los enteros de $64$ bits.

## La carrera en cuatro dimensiones

Bien, veamos también en `4D`, $S_3^{4}(n)$. Te comparto ambas implementaciones con un nombre también natural para estos números hipertetraédricos.

```py
def pentatope_closed() -> Generator[int]:
    delta = 1
    while True:
        yield (delta * (delta + 1) * (delta + 2) * (delta + 3)) // 24
        delta += 1

def pentatope_incremental() -> Generator[int]:
    a, b, c, d, e = 1, 4, 6, 4, 1
    while True:
        yield a
        a += b
        b += c
        c += d
        d += e
```

Computando  $N=15\,000\,000$ de términos en $7$ rondas y $3$ repeticiones, tuve la puntuación de la carrerita

```shell
Incremental : 2.757217 s
Closed      : 5.099289 s

Best: Incremental
Improve: 45.93%
Speedup: 1.85x
```

Con lo que realmente he mejorado la forma de generar los números figurados en cuestión de velocidad.

## Los números figurados bajo recursión incremental

En mi serie, aún en proceso, de [notas sobre curvas elípticas y ecuaciones diofánticas](https://edelveart.github.io/es/blog/divagaciones-diofanticas-entre-numeros-figurados-y-curvas-elipticas/) definí que un número figurado es un polinomio $\mathfrak{f}(X)$ en $\mathbb{Q}[X]$ que induce una función de $\mathbb{Z}$ a $\mathbb{Q}$ y se puede ver como una sucesión bilátera de la forma

$$
    \bigl(\mathfrak f^k(n)\bigr)_{n\in\mathbb Z}
    =
    \left(
    \sum_{j=0}^{k} a_j n^j
    \right)_{n\in\mathbb Z},
$$

donde $a_k$ es el coeficiente principal del polinomio de grado $k \ge 2$. El método de diferencias con el que planteé el algoritmo para `figuratenum` es

$$
\Delta_+^{j} \mathfrak{f}^k(n) = \Delta_+^{j-1}\mathfrak{f}^{k}(n+1) - \Delta_+^{j-1}\mathfrak{f}^k(n), \quad j \ge 1,
$$

con $\Delta_+^0 \mathfrak{f}^k(n) = \mathfrak{f}^k(n)$. Pues lo bonito es que cada diferencia va bajándole los tablones al grado $k$.

La primera diferencia, lo deja en grado $k-1$, la segunda en $k-2$ y así hasta la $k$-ésima diferencia lo deja en $0$.
De aquí es natural saber que

$$
\Delta_+^{k}\mathfrak{f}^k(n)= \Gamma(k+1) a_k,
$$

y si nos pasamos a $\Delta_+^{k+1}$ sale un gran cero; así que la diferencia de orden $k$ es totalmente constante.

En palabras simples y comunes, la última diferencia disponible se calcula directamente desde el factorial de $k$ (el grado) y el coeficiente principal que ya sabes por qué lo mencioné.

Para seguir mi ejemplo $S_3(n)$, tiene el coeficiente principal $a_2 = \frac{1}{2}$. Pero según lo que dedujimos

$$
\Delta_+^2 S_3(n) = \Gamma(2+1) \cdot \frac{1}{2} = 1.
$$

Listo, ahora también me gustó pensarla mediante álgebra de matrices, ya que arriba hablé de $(a,b,c)$ como un tipo de espacio.

Tenemos el vector de inicio que luego va a ir mutando, es decir, un módulo de estados

$$
\mathfrak{F}_n =
\begin{pmatrix}
\mathfrak{f}^k(n)\\
\Delta_+ \mathfrak{f}^k(n)\\
\Delta_+^2 \mathfrak{f}^k(n)\\
\vdots\\
\Delta_+^k \mathfrak{f}^k(n)
\end{pmatrix}
$$

Y, a lo cálculo discreto, la matriz de transición de un estado hacia el siguiente (cosa que dije arriba mientras puse esa flecha) es

$$
M = \begin{pmatrix}
1 & 1 & 0 & 0 & \cdots & 0\\
0 & 1 & 1 & 0 & \cdots & 0\\
0 & 0 & 1 & 1 & \cdots & 0\\
\vdots & \vdots & \ddots & \ddots & \ddots & \vdots\\
0 & 0 & \cdots & 0 & 1 & 1\\
0 & 0 & \cdots & 0 & 0 & 1
\end{pmatrix}
$$

De hecho, cuando hablé de espacio, me refería a una acción del grupo aditivo de $(\mathbb{Z}, +)$ sobre ese conjunto de todos los estados de cada número figurado

$$
\varphi: \mathbb{Z} \times \mathbb{Q}^{k+1}
\longrightarrow \mathbb{Q}^{k+1},
$$

dada para cada $n$ y cada estado $v$ por

$$
\varphi(n,v)=M^n v,
$$

de modo que,  $\mathfrak{F}_n=\varphi(n,\mathfrak{F}_0)$.
Potencias y más potencias generan más y más términos, en cortas palabras (el primer componente, el que está arribita en $\mathfrak{F}_n$). Y, particularmente, para pasar de un término de estado figurado $n$ hacia el siguiente $n+1$ le hago

$$
\mathfrak{F}_n \longmapsto M\mathfrak{F}_n = \mathfrak{F}_{n+1}.
$$

El generador de arriba acelera en $\mathfrak{F}_1 = M\mathfrak{F}_0$; por eso en el caso triangular `a=1`, `b=2`, `c=1`, mientras que $\mathfrak{F}_0 = (0, 1, 1)^T$.

## Otra vez a lo mismo

Para cerrar el penúltimo broche de generador, creo que es bueno juntar las piezas del **lego**, desde la matriz $M = I  + N$, donde $I$ es la matriz identidad y le adiciono una matriz $N$ (la de unos sobre la diagonal superior), con $N^{k+1}= 0$, que es nilpotente. Sale directo aplicar el binomial de Newton

$$
M^n = (I+N)^n = \sum_{j=0}^{k} \binom{n}{j} N^j
$$

Ahora mira, lo único que haré es colocar al ladito derecho el vector de **término figurado inicial** y, quedamos en lo siguiente

$$
\mathfrak{F}_n =
\sum_{j=0}^{k} \binom{n}{j} N^j \mathfrak{F}_0
$$

Espera, aún falta un kilómetro de la montaña de los quince millones $N$ de colores. La primera componente de $N^j\mathfrak{F}_0$ corresponde a la diferencia finita de orden $j$ evaluada en cerapio,

$$
\left(N^j\mathfrak{F}_0\right)_0
=
\Delta_+^j \mathfrak{f}^k(0)
$$

Por ende, tomo la primera componente del término figurado y cada $\mathfrak{f}^k(n)$ se puede expresar binomialmente como la suma

$$
\mathfrak{f}^k(n)
=
\sum_{j=0}^{k}
\binom{n}{j}
\Delta_+^j \mathfrak{f}^k(0).
$$

Añado, si pensamos en $\binom{n}{j}$ generalizado, es válido también para términos $n$ negativos.

Y este cuento casi ha comenzado, porque aún falta implementar para dimensiones $k \ge 5$. Al respecto, tuve problemas porque dentro de los generadores auxiliares necesité colocar un bucle, y eso reducía bastante la velocidad. Pensé también en crear funciones como plantillas, aunque eso me pareció no muy natural.

## Finale

Lo prometido fue el código de plantilla de IA que usé para corroborar las carreritas:

```python
from itertools import islice
from statistics import median
from timeit import timeit
from math import comb

N = 15_000_000
ROUNDS = 7
REPEAT = 3

tests = {
    "Closed": pentatope_closed,
    "Incremental": pentatope_incremental,
}

results = {name: [] for name in tests}

# Para que calientes antes de la maratón
for function in tests.values():
    for _ in islice(function(), 10_000):
        pass

# Para medir alternadamente como en grupos alternados que nada tienen que ver
for i in range(ROUNDS):
    ordered = list(tests.items())

    if i % 2:
        ordered.reverse()

    for name, function in ordered:
        elapsed = timeit(
            lambda: list(islice(function(), N)),
            number=REPEAT
        ) / REPEAT

        results[name].append(elapsed)

# Los puntajes de la carrera

medians = {
    name: median(times)
    for name, times in results.items()
}

for name, elapsed in sorted(
    medians.items(),
    key=lambda x: x[1]
):
    print(f"{name:12}: {elapsed:.6f} s")

# Comparación con porcentajes %

fastest = min(medians.items(), key=lambda item: item[1])
slowest = max(medians.items(), key=lambda item: item[1])

improvement = (
    (slowest[1] - fastest[1]) / slowest[1]
) * 100

speedup = slowest[1] / fastest[1]

print(f"\nBest: {fastest[0]}")
print(f"Improve: {improvement:.2f}%")
print(f"Speedup: {speedup:.2f}x")
```

Para terminar la nota, debo decir que ese método me pareció particularmente simple de mejorar la velocidad de cálculo.
No obstante, en cuanto a la complejidad temporal, las **cosas asintóticas** no clasifican con diferencia el problema, como sí lo hacen el número de operaciones y la dificultad para computar determinadas operaciones como potencias, antes que, por ejemplo, puras sumas que se actualizan.

### Comparativa a segunda vista

Otra vez a lo mismo, pero a segunda vista. Para los hipertetraédricos de grado $k$ y $N$ términos, en el modelo de **costo uniforme** (cada operación aritmética cuesta lo mismo, $O(1)$) ambos generadores salen parejos. Sin embargo, en el de **costo por bits**, salta una diferencia pequeña que explico más abajito.

| Criterio                                                 |                       `closed` (cerrada)                       |        `incremental`         |
| :------------------------------------------------------- | :------------------------------------------------------------: | :--------------------------: |
| Operaciones por término (costo uniforme)                 | $2k$: $k-1$ sumas, $k-1$ productos, $1$ división y el contador |          $k$ sumas           |
| Tiempo para $N$ términos (costo uniforme)                |                          $\Theta(kN)$                          |         $\Theta(kN)$         |
| Tiempo por término (costo por bits, productos escolares) |                        $O(k^2\log^2 n)$                        |        $O(k^2\log n)$        |
| Espacio auxiliar del generador                           |                     $\Theta(1)$ registros                      |    $\Theta(k)$ registros     |
| Espacio si guardo los $N$ términos                       |                      $\Theta(N)$ enteros                       |     $\Theta(N)$ enteros      |
| Un término suelto $\mathfrak{f}^k(n)$                    |                          $\Theta(k)$                           | $\Theta(nk)$ desde el inicio |

Como puedes ver en el tabloide (me echó una mano una IA) ambas implementaciones son $\Theta(kN)$.
La mejora está en el costo de cada trote, `pentatope_closed()` hace unas $2k$ operaciones por término, mientras que `pentatope_incremental()`,  únicamente $k$. Así que son dos veces menos operaciones.

Bajo la sombra de todas estas hipótesis ideales, mis carreritas, no obstante, dieron $1.74\times$ para $k=2$ y $1.85\times$ para $k=4$.
El porqué están cerca a $2\times$, es que hay unos baches naturales que son los costos compartidos.
A saber, el bucle, el `yield`, el `islice` y hasta armar la lista `list` con la cantidad ingente de enteros. En general, esto es bastante común en un consumo real.
Pero $\Theta(2kN)$ y $\Theta(kN)$ son la misma clase; Big $O$ quita las constantes y mi mejora es justamente una constante de Quevedo más allá de las cotas.

En la breve conversación que tuve con la IA sobre esta nota,  me dijo esto (es justo la perspectiva que pasé por alto):
> No todas las operaciones pesan igual: sumar dos enteros de $B$ bits cuesta $O(B)$, mientras que multiplicar enteros de $B$ y $L$ bits cuesta $O(BL)$ con el método escolar. Como los productos intermedios crecen, la fórmula cerrada cuesta $O(k^2\log^2 n)$ por término; en cambio, las diferencias decrecen en grado y el método incremental cuesta $O(k^2\log n)$, para $k$ fijo.
> En tu prueba, los factores individuales caben en un dígito interno de 30 bits de CPython, por lo que esta diferencia asintótica apenas se aprecia. Para probar índices como $2^{500}$, habría que inicializar directamente el vector de diferencias en ese índice $n$ correspondiente y contabilizar también ese costo.

Lo que también he pensado es añadir un parámetro para cada método generador, algo para seleccionar `term_by_term` (incremental) o `nth_term` (usar la fórmula cerrada del libro), porque la velocidad tiene sus efectos.
La forma incremental acumula $\Theta(k)$ registros en vez de $\Theta(1)$, lo cual es una nimiedad para valores $k$ pequeños (nadie lo notará).

Todavía mis métodos omiten el ir directo a seleccionar el **término $N$ a granel**; la bolsa sellada viene grano a grano, con términos haciendo una cola infinita en el tiempo.
Probaré a computar $2^{\mathfrak{f}^k(N)}$ con $k = \mathfrak{f}^k(N-1)$ , ¿cuánto me tardaré?

