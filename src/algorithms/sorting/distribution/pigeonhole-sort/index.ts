/**
 * Pigeonhole Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pigeonholeSort } from "./sources/pigeonhole-sort.ts?fn";
import { generatePigeonholeSortSteps } from "./step-generator";
import { pigeonholeSortEducational } from "./educational";

import typescriptSource from "./sources/pigeonhole-sort.ts?raw";
import pythonSource from "./sources/pigeonhole-sort.py?raw";
import javaSource from "./sources/PigeonholeSort.java?raw";
import rustSource from "./sources/pigeonhole-sort.rs?raw";
import cppSource from "./sources/PigeonholeSort.cpp?raw";
import goSource from "./sources/pigeonhole-sort.go?raw";

const pigeonholeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.PIGEONHOLE_SORT!,
    name: "Pigeonhole Sort",
    category: CATEGORY.SORTING!,
    technique: "distribution",
    description:
      "Places each element into its own value-indexed hole, then collects in order — O(n + range)",
    timeComplexity: {
      best: "O(n + range)",
      average: "O(n + range)",
      worst: "O(n + range)",
    },
    spaceComplexity: "O(range)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: pigeonholeSort,
  generateSteps: generatePigeonholeSortSteps,
  educational: pigeonholeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(pigeonholeSortDefinition);
