// Configuración para cada generador

// Interfaz para las estrategias
interface NumberGeneratorStrategy<T> {
  generate(config: T): Generator<number>;
}

// Generadores específicos para cada secuencia

class PronicGenerator implements NumberGeneratorStrategy<MConfig> {
  *generate({ step = 1 }: MConfig): Generator<number> {
    let delta = 1; // Comienza en 1
    while (true) {
      yield delta * (delta + 1); // Calcula el número prónico
      delta += step; // Incrementa delta por el paso
    }
  }
}

class PolygonalGenerator implements NumberGeneratorStrategy<StartStepMConfig> {
  *generate({ start = 1, step = 1, m = 3 }: StartStepMConfig): Generator<number> {
    let delta = start;
    while (true) {
      yield ((m - 2) * delta ** 2 - (m - 4) * delta) / 2;
      delta += step;
    }
  }
}

class PoliteGenerator implements NumberGeneratorStrategy<MConfig> {
  *generate({ step = 1 }: MConfig): Generator<number> {
    let delta = 1;
    while (true) {
      yield delta + Math.floor(Math.log2(delta + Math.log2(delta)));
      delta += step;
    }
  }
}

type MConfig = {
  step?: number;
};

type StartStepMConfig = {
  start?: number;
  step?: number;
  m?: number; //
};
type GeneratorConfigPronic = {
  step?: number; // Solo `step` es válido para esta estrategia
};

type GeneratorConfigPolygonal = {
  start?: number;
  step?: number;
  m?: number; // `m` es necesario para esta estrategia
};

type GeneratorConfigPolite = {
  step?: number; // Solo `step` es válido para esta estrategia
};

// Definimos un tipo que representa la configuración válida según la estrategia
type ContextAConfigMap = {
  pronic: MConfig;
  polygonal: StartStepMConfig;
  polite: MConfig;
};

type ContextAMappedTypeFromConfigMap = {
  [key in keyof ContextAConfigMap]: NumberGeneratorStrategy<ContextAConfigMap[key]>;
};

const contextASwitchStrategy: ContextAMappedTypeFromConfigMap = {
  pronic: new PronicGenerator(),
  polygonal: new PolygonalGenerator(),
  polite: new PoliteGenerator(),
};

// Contexto que usa las estrategias
class ContextA {
  // Usamos un tipo condicional que inferirá el tipo adecuado para la configuración
  static generate<K extends keyof ContextAConfigMap>(
    strategyName: K, // La estrategia debe ser uno de los valores literales: 'pronic', 'polygonal', 'polite'
    config: ContextAConfigMap[K], // La configuración será inferida según la estrategia
  ): Generator<number> {
    return contextASwitchStrategy[strategyName].generate(config); // Genera directamente el generador adecuado
  }
}

const pronicGenerator = ContextA.generate("polygonal", { start: 1, step: 1, m: 5 });

console.log(pronicGenerator.next().value); // 2 (1 * (1 + 1))
console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))
console.log(pronicGenerator.next().value); // 2 (1 * (1 + 1))
console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))
console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))
console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))
console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))

// const pronicGenerator = PlaneGeneratorContext.generate("polygonal", {});

// console.log(pronicGenerator.next().value); // 2 (1 * (1 + 1))
// console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))
// console.log(pronicGenerator.next().value); // 2 (1 * (1 + 1))
// console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))
// console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))
// console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))
// console.log(pronicGenerator.next().value); // 6 (2 * (2 + 1))

const testFigurateNumbers = (generatorType: string, config: object, expectedSeq: number[]) => {
  it(`should return the correct sequence for ${generatorType}`, () => {
    const generator = PlaneFigNumbers.generate(generatorType, config);
    const arrOfFigNumbers = createArrOfFigNumbers(expectedSeq.length, generator);
    expect(arrOfFigNumbers).toEqual(expectedSeq);
  });
};

describe("Plane Figurate Numbers Class Context", () => {
  testFigurateNumbers(
    "polygonal",
    { step: 1 },
    [1, 3, 6, 10, 15, 21, 28, 36, 45, 55, 66, 78, 91, 105, 120, 136, 153, 171, 190, 210],
  );
  testFigurateNumbers("polygonal", { m: 4 }, [1, 4, 9, 16, 25, 36]);
  testFigurateNumbers(
    "polygonal",
    { m: 5 },
    [1, 5, 12, 22, 35, 51, 70, 92, 117, 145, 176, 210, 247, 287, 330, 376, 425, 477, 532, 590],
  );
  testFigurateNumbers(
    "polygonal",
    { m: 8 },
    [1, 8, 21, 40, 65, 96, 133, 176, 225, 280, 341, 408, 481, 560, 645, 736, 833, 936, 1045, 1160],
  );
  testFigurateNumbers(
    "centeredPolygonal",
    { m: 3, start: 1 },
    [
      1, 4, 10, 19, 31, 46, 64, 85, 109, 136, 166, 199, 235, 274, 316, 361, 409, 460, 514, 571, 631,
      694, 760, 829, 901, 976, 1054, 1135, 1219, 1306, 1396, 1489, 1585, 1684, 1786, 1891, 1999,
      2110, 2224, 2341, 2461, 2584, 2710, 2839, 2971, 3106, 3244, 3385, 3529, 3676, 3826, 3979,
      4135, 4294, 4456, 4621, 4789, 4960, 5134, 5311,
    ],
  );
  testFigurateNumbers(
    "cross",
    {},
    [
      1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45, 49, 53, 57, 61, 65, 69, 73, 77, 81, 85, 89, 93,
      97, 101, 105, 109, 113, 117, 121, 125, 129, 133, 137, 141, 145, 149, 153, 157, 161, 165, 169,
      173, 177, 181, 185, 189, 193, 197, 201, 205, 209, 213, 217, 221, 225, 229, 233, 237,
    ],
  );
});

// Probar generadores solos
const trica = new PyramidalGenerator();
const t = trica.generate({ m: 4 });

console.log(t.next().value);
console.log(t.next().value);
console.log(t.next().value);
console.log(t.next().value);
console.log(t.next().value);
console.log(t.next().value);
console.log(t.next().value);
