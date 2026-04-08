import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { countMinSketch } from "./sources/count-min-sketch.ts?fn";
import { generateCountMinSketchSteps } from "./step-generator";
import type { CountMinSketchInput } from "./step-generator";
import { countMinSketchEducational } from "./educational";

import typescriptSource from "./sources/count-min-sketch.ts?raw";
import pythonSource from "./sources/count-min-sketch.py?raw";
import javaSource from "./sources/CountMinSketch.java?raw";
import rustSource from "./sources/count-min-sketch.rs?raw";
import cppSource from "./sources/CountMinSketch.cpp?raw";
import goSource from "./sources/count-min-sketch.go?raw";

function executeCountMinSketch(input: CountMinSketchInput): {
  results: { value: number; estimatedCount: number }[];
} {
  return countMinSketch(input.elements, input.queries, input.width, input.depth) as {
    results: { value: number; estimatedCount: number }[];
  };
}

const countMinSketchDefinition: AlgorithmDefinition<CountMinSketchInput> = {
  meta: {
    id: ALGORITHM_ID.COUNT_MIN_SKETCH!,
    name: "Count-Min Sketch",
    category: CATEGORY.SETS!,
    technique: "membership",
    description:
      "Probabilistic frequency estimation using a d×w counter matrix and d independent hash functions — O(d) per insert and query, O(d×w) space, with one-sided overcount error",
    timeComplexity: {
      best: "O(d)",
      average: "O(d)",
      worst: "O(d)",
    },
    spaceComplexity: "O(d × w)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      elements: [3, 3, 7, 7, 7, 11],
      queries: [3, 7, 11, 5],
      width: 8,
      depth: 3,
    },
  },
  execute: executeCountMinSketch,
  generateSteps: generateCountMinSketchSteps,
  educational: countMinSketchEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(countMinSketchDefinition);
