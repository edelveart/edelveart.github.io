---
title: "Do Group Actions Define Regular Polytopes and Polytypes in Type Systems?"
description: "I introduce an analogy between transitive group actions on flags of polytopes and type systems. This speculative concept aims to offer a naive way of understanding and classifying types through symmetry."
pubDate: "January 17 2026"
heroImage: "/itemPreview.webp"
badge: "Type-Level Geometry"
tags: [ "type theory", "group theory", "polytopes", "abstract algebra","figurate numbers",  "typescript"]
---

Last night I was looking at the hexahedral box where I keep lights of different colors. Generally, I observe $2D$ or $3D$ geometric objects as if they were frozen, like notes on a musical score, truthfully.

The interpreter observes and puts the music into action, extracting unwritten possibilities. In the same way, I was looking at the `vertices` of the box (somewhat flattened by time and its cardboard material), delicately observing also its `edges` and its `faces`, with the inscription, and I began to rotate it on the table, then to position it on a face, on an edge, on the lid.

The same thing happens when I think about  <a href="https://pypi.org/project/figuratenum/" target="_blank" rel="noopener noreferrer">figuratenum</a>, for me they are in movement, they are numbers that are frozen, simply waiting to be moved.

> The generators, for me, are like a kind of obligation to action, to create movement.

With the movement of numbers and boxes, with this simple action really hides something very profound in mathematics, which is that I am really making use of symmetries and group theory in an intuitive way.

<p align="center">
    <img
        src="/svg-ggb/blog-polytypes.svg"
        alt="Polytope and Polytype Diagram"
        class="w-full h-full"
      />
</p>

But as I like to do, not staying still on one side of the equation, I will make an exchange, since I will move from algebra and geometry and figurate numbers and exchange them for theory of computation, playing the game in `TypeScript`.

## The actions $\star$ of a group on X

We recall that a `group` is one of the algebraic structures par excellence that appears everywhere. From particle physics, Mazur's theorem for elliptic curves over $\mathbb{Q}$ (what beauty), and, of course, in the music of Beethoven's 9th Symphony or Xenakis. I will not put references because there are hundreds. I present here, then, for the solution of memory, what a `group action` is.

First, we will say that $P$ is a set that is not empty. Why $P$? Well, very easy, $P$ will be our polygon and polytope or polyhedron for now. Now, I will use  $G$, for group and for being commonly used notation. Well, when moving, were making a group action of $G$ on the hexahedral box $P$:

$$
G \times P \longrightarrow P \\
(g, p) \longmapsto g \star p.
$$

It is s necessary to remember that the thing needs `two conditions`. We will put them in Bourbakist tonality. The `first` of them is that the neutral element $e$ of $G$ acts as the identity on the set of elements $p$ of our polytope $P$.

$$
e \star p = p, \quad \forall p \in P.
$$

The `second` condition is compatibility, that is, regarding associativity:

$$
(g_1 g_2) \star p = g_1 \star (g_2 \star p), \quad \forall g_1, g_2 \in G, p \in P.
$$

This that looks very strange, is simple. If we say it with our verb: if we apply $g_2$ and then apply $g_1$ on $p$, the result will be exactly the same as if we apply the product $g_1 g_2$.

## Triangular numbers $T(n)$ are usually, the Best

I usually use <a href="https://www.worldscientific.com/worldscibooks/10.1142/8188#t=aboutBook" target="_blank" rel="noopener noreferrer">triagular figurate numbers</a> as an example, they are as simple and as profound as the $k$-simplexes used in algebraic topology.

And the square? It is similar, the important thing is to capture the idea.
Well, the symmetry group that acts on a triangle is the group  $D_3$, also called the `dihedral group`.

Every dihedral group consists of two fundamental types of symmetries: the symmetries where we rotate things, and the symmetry where we reflect things.

In total, we have $6$ elements

$$
  D_3 = \{e, r, r^2, s, sr, sr^2 \}.
$$

The $e$ is the `identity`, $r$ are `rotations`, and $s$ the `reflections`. Our set $P$ is the triangle and we will have three interpretations of the action.

Let's think first about the `vertices` (the most common):

$$
  P_0 = \{A_0, B_0, C_0\}
$$

Since the elements of the group set and the polygon set are few, a complete list can be made.
I will give you some hints and you do the rest by composition of  $\star$, for example $r$ makes
$$
 A_0 \rightarrow B_0, \  B_0 \rightarrow C_0, \  C_0 \rightarrow A_0.
$$

The element $s$ makes $A_0 \rightarrow A_0$, $B_0 \rightarrow C_0$ and $C_0 \rightarrow B_0$. Of course, the trivial but indispensable $e$ leaves each vertex in its same position.

You can verify the two `Bourbaki` conditions on your own. But, why is there a subscript zero? Very simple: they are the vertices. Now, let's think about the `edges`.

$$
  P_1 = \{A_0 B_0, B_0 C_0, C_0 A_0\}
$$

Imagine, now it is a line that joins two vertices. Then, I also release the hints toward the treasure. Following the same order, $r$ makes $A_0 B_0 \rightarrow B_0 C_0$, and for instance, $r^2$ makes
$$
A_0 B_0 \rightarrow C_0 A_0.
$$

The element $e$ as always does not move its hands and only observes, and finally, $s$ acts by moving $A_0 B_0 \rightarrow A_0 C_0$. Complete the ones that are missing and verify.

Lastly, what if we consider the `entire triangle` $P_2$?  Of course, the action now moves the entire triangle, including the vertices and their edges and its face. So it is invariant, or more beautifully, it is a trivial action, that is
$$
g \star P_2 = P_2,
$$
for all $g \in D_3$.

The conclusion we can reach is that both the vertices of $P_0$ and the edges of $P_1$ and the complete polytope $P_2$  are acted upon and continue to maintain their beautiful structure.

##  Watanabe wrote "Banderas detrás de la niebla"

José Watanabe Varas was a very personal voice of the 70s generation of Peruvian poets, who published a book in 2006 with the title of this section.  What we did above with the vertices  $P_0$, edges $P_1$, and face $P_2$ or $P$ to abbreviate, is related to the notion of `complete flag`.

The flag is something ascending, unlike what happens in Mario Bros. In this regard, this notion involves an example of each element that a polytope in question possesses. You can understand it like this:
$$
  p_0 \subset p_1 \subset p_2 \subset \cdots \subset p_n.
$$

In this case we can see that the triangle polygon comes to have a $2$-dimensional face. Then, we can define the group action for a complete flag. With our example when$P$ is a triangle:

$$
  f_P = \{A_0, A_0 B_0, P \}.
$$
We see that the rotation $r$ of $120$ degrees makes

$$
r \star f_P = \{B_0, B_0 C_0, P\}.
$$

While the reflection over the altitude from  $A_0$, produces the movement
$$
s \star f_p = \{A_0, A0 C_0, P\}.
$$

Again, only the vertices and edges permute, the face remains the same.

Something much more formal is to say that a flag is an incidence complex that contains substructures of different types.

In our example, $P_2$ is the face or maximal cell for the triangle. I reiterate a bit because it's important, as you see above, a flag deals with exactly one element of each dimension $p_i$  (from 0 to the maximum of the polytope) and that's why it appears in lowercase, which have an `incidence relation` that we denote by the symbol $\subset$.

> The fundamental notion is that $f_P$​ is a hierarchical set of elements, that is, an ordered set of subspaces of increasing dimension, that respects the structure of the geometric figure, that is, of the polytope.

Ready, we now have the ingredients to answer fully the question. What is a regular polygon or what is a regular polyhedron commonly called Platonic solids?

## When you act transitively by nature

There are several questions to position ourselves before what the plain term `regular` means in geometry.

> For example, when we say that a regular polygon do we mean that each side of the polygon measures the same? When we say that a polyhedron is regular is it because it has equal faces, of equal shape?

Well, these questions go in that direction, but they are not adequate to define what a regular polygon or polyhedron is. We could attempt to give a definition, but this can be much broader than what we think by regular and include non-convex figures (I wil probably talk about this later) or
 <a href="https://en.wikipedia.org/wiki/Johnson_solid" target="_blank" rel="noopener noreferrer">Johnson solids.</a>


We need a precise definition. In that sense, everything we have done above has already prepared the path quite well for us. Let's return then to the notion of group action and specialize in a specific type that will help us answer this question of regularity:  `transitivity`.

An action of a group $G$ on the set of complete flags $F$ of a polytope $P$ will be called transitive if any $f_p$ can be transformed into another by some element of $G$. With a dose of formality we say that, for any pair of flags

$$
\{f_P^1, f_P^2\},
$$
 $\exist g \in G$, such that

$$
 g \star f_P^1 = f_P^2.
$$

This definition is indicating to us that the group $G$ acts in a uniform way over the entire structure. In the triangle, the group $D_3$​ permutes all the complete flags.


$$
\{A_0, A_0 B_0, P\} \xrightarrow{r} \{B_0, B_0 C_0, P\} \xrightarrow{s} \{A_0, A_0 C_0, P\}.
$$

As you see, each complete flag can be obtained from any other that exists through a symmetry coming from the action. It is your turn to list the other flags of the triangle.

That's it, we're ready to understand what `regular` means in geometry and make our exchange toward computation.

## Polytopes that are called regular

With everything seen and geometrized and algebraized of the matter, the definition comes to us more natural than ever and says thus:

> Let $d_{ \geq 2}$ be the dimension of a space (let's think Euclidean). We will say that a polytope  $P$  immersed in the space $\mathbb{R}^d$ is regular if its symmetry group $\Delta$ acts transitively on the set of complete flags $F_P$ of $P$.

With the triangle, $\mathbb{R}^2$. Let $p_0 \in P_0$,  a vertex and let us denote by $E_{p_0}$ the set of edges that contain $p_0$. Therefore,

$$
|E_{p_0}|   = |E_{p_0}^{'}| = 2,
$$
for all vertices $p_0$ and ${p_0}^{'}$.

This leads us to say that each vertex is found in the same number $r=2$ of edges.
This uniformity is not a coincidence, it is a consequence of the `transitive action`. Since the symmetry group can transform any vertex into any other vertex, and the group preserves the structure, every vertex must "look the same" from the perspective of the polytope.

In our triangle, each vertex meets exactly $2$ edges, each edge connects exactly $2$ vertices, and each face is bounded by exactly $3$ edges. This is the combinatorial fingerprint of regularity.

## Construing Regular PolyTypes

Now comes the promised exchange, the trade from the algebraic realm to the computational one. But not in the way you might expect.
I am not interested in simply implementing `group actions` in a programming language or DSLs, that is already done in systems like <a href="https://www.gap-system.org/" target="_blank" rel="noopener noreferrer">Gap</a> (Groups, Algorithms, Programming). I am after is something deeper, clearly more theoretical and tentative (a kind of `ts` pseudocoe).

I want to ask:
> What would a `regular type` or, more analogously to the geometric notion, `regular polytype` be?

To try to clarify this somewhat, let me reformulate the question in context. Above, I stated that each complete flag traverses the hierarchy of vertex $\subset$ edge $\subset$ $2-$face, and so on.

This ascending chain can also be captured by data structures, or better yet, by a type system, as I discussed in a previous <a href="https://edelveart.github.io/blog/category-of-modules-and-type-level-programming-with-figurate-numbers/" target="_blank" rel="noopener noreferrer">post complete modeled in TypeScript</a> about categories and geometric sequence modules at the type level.

Then, I needed to start with the idea of analogy, from the notion of dimension in geometry to the notion of dimension in `types`. Because, the ascending chain (like the *Chain of Ascension* in StarCraft) represents a more complex or higher-dimensional type that contains different subtypes.

So, I arrived at this matter:

> A type can exhibit different levels of `dimensionality`: primitive types
> like strings are $0$-dimensional (no internal structure). Type constructors
> with parameters like Vertex<L> introduce one level of structural complexity
> ($1$-dimensional in that parameter), and composed types inherit and extend
> this structural depth.

At the moment, I will remain speculative, without being too precise, as I mentioned before. In this way, I am trying to construct or define an incidence relationship $\subset$  which is interpreted as structural containment: a `type A` is contained in `B` if `A` is a subtype or structural component of `B`.

### Type Flags Surfing

Well, now is the moment to speak with a dreamy tone about `complete type flag`, that we will denote $f_T$. I could write something like what follows. Yes, it is still centered on the geometric concept to seem more familiar, we can later dilute it into a pure notion free of references:

```ts
type Vertex<L extends string> = { label: L; position: [number, number] };
type Edge<V1, V2> = { start: V1; end: V2; length: number };
type Face<E extends readonly Edge<any, any>[]> = { boundary: E; area: number };
```

A `complete type flag` would be a chain of increasingly complex types, where
complexity is measured by structural depth, the number of nested type constructor
applications. Here, to abbreviate, I omit quotation marks, and $V$, $E$ and $F$ stand for `Vertex`, `Edge`, and `Face` respectively:

$$
\text{string} \subset \text{V<A>} \subset \text{E<V<A>, V<B>>} \subset \text{F<[...]>}
$$

Here, each type contains the structure of the previous one: a vertex contains a
string label, an edge contains vertices, and a face contains edges.

### Type Symemetries On The Disco

The second step consists, of course, in the movement that comes from the action of the group. We have talked a lot about symmetries earlier; with more technical jargon, for our lexicon, we will say that symmetries are `automorphisms`. This word is quite complicated, but it means that the structure of the object in question is preserved after the transformations.

With what was explained in the previous paragraph, we now have the question more directed:
> What thing serves as elements that, applied over the types, preserve the structure of these types?

One sufficiently natural answer, I think, lies on the side of TypeScript's  `mapped types`, which I denote by $M$, because they transform one type into another but somehow maintain the structural form, their type geometry.

```ts
type IdentityTransform<T> = T;

type Rotate<T> = {
  [K in keyof T]: K extends 'label'
    ? (T[K] extends 'A' ? 'B' : T[K] extends 'B' ? 'C' : T[K] extends 'C' ? 'A' : T[K])
    : T[K]
};

type RotateInverse<T> = {
  [K in keyof T]: K extends 'label'
    ? (T[K] extends 'A' ? 'C' : T[K] extends 'B' ? 'A' : T[K] extends 'C' ? 'B' : T[K])
    : T[K]
};

type ReflectAB<T> = {
  [K in keyof T]: K extends 'label'
    ? (T[K] extends 'B' ? 'C' : T[K] extends 'C' ? 'B' : T[K])
    : T[K]
};
```

Notice that this is conceptual pseudocode. To truly preserve type constructors  (transforming `Vertex<"A">` into `Vertex<"B">` rather than just object fields), we would need conditional types with `infer`, which is verbose, but feasible.

For sure, is the "group" of mapped types in fact a group? Well, not all $M$ form a group, but if we restrict ourselves those that permute `literal type parameters` like `"A"`, `"B"`, `"C"` while preserving the type constructor, then we obtain something much closer to a genuine group structure.

This Rotate is analogous to the rotation $r \in D_3$. It acts on the type structure, transforming `Vertex<"A">` into `Vertex<"B">`, but preserving the programming type shape (the `Vertex` type constructor itself). Let's continue with this first approach without complete rigor.

### Creating Type Transitivity

Finally, there remains the idea of transitivity that will lead us toward what we are looking for: the word `regular`. By analogy with the geometric definition and for the sake of expediency, I am going to establish that:

> An `action on polytype` would be transitive if there exists some element $m$ in mapped types $M$ (a `type symmetry group`) that can transform any  `complete type flag` $f_T^1$ into any other $f_T^2$.

With hands-on work, I throw this out:

```ts
type TypeFlag = {
  vertex: Vertex<string>;
  edge: Edge<Vertex<string>, Vertex<string>>;
  face: Face<readonly Edge<any, any>[]>;
};
```
This represents the structural schema of a type flag; concrete flags would instantiate the labels (e.g., `Vertex<"A">` vs `Vertex<"B">`). A type transitive symmetry would be a mapped type `M` such that for any two type flags `f_1` and `f_2`, there exists some composition of type symmetries that maps `f_T^1` to `f_T^2`:

$$
M_1 \star M_2 \star \cdots \star M_n : {f_T}^1 \longrightarrow {f_T}^2
$$

### Regular Types

Almost the end of ends. Let $\mathbb{T}^d$ be a space of types with $d$  generic type parameters. So, it can be said that a `regular polytype` would be one where every "instantiation path" through the type hierarchy is equivalent up to type symmetry.

```ts
type Triangle = {
  vertices: [Vertex<"A">, Vertex<"B">, Vertex<"C">];
  edges: [Edge<Vertex<"A">, Vertex<"B">>,
          Edge<Vertex<"B">, Vertex<"C">>,
          Edge<Vertex<"C">, Vertex<"A">>];
  face: Face<readonly [Edge<Vertex<"A">, Vertex<"B">>,
                       Edge<Vertex<"B">, Vertex<"C">>,
                       Edge<Vertex<"C">, Vertex<"A">>]>;
};
```

This type is `regular` if we can define label-permuting transformations forming
a group isomorphic to $D_3$:

$$
M = \{I_T, R_T, R_T^2, S_T, S_TR_T, S_TR_T^2\}
$$

acting uniformly across vertices, edges, and face. Any complete type flag in $F_T$ can then be transformed into any other through composition of these operations.

## Postlude of Types

It occurred to me while having a coffee, looking out the window on a summer night in Lima. If this analogy holds, we might be able to classify type systems (like we classify $d$-dimensional polytopes ) according to their symmetry groups $M$, and languages with richer type-level transformations would be `more symmetric`.

Mapped types give us a glimpse of this, but a truly `regular type system` might require first-class support for type group actions.

As I keep rambling, we can immediately pass to another nearby world. I also think about this beautiful instrument called <a href="https://www.nime.org/proceedings/2018/nime2018_paper0076.pdf" target="_blank" rel="noopener noreferrer">CubeHarmonic</a>, made concrete in the real world, but with a musical meaning at the type level.

For now, it remains both a computational and a music-based type theory dream. Maybe I just need to sleep a bit.
