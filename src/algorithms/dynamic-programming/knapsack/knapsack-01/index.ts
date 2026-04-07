import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { knapsack01 } from "./sources/knapsack-01.ts?fn";
import { generateKnapsack01Steps } from "./step-generator";
import { knapsack01Educational } from "./educational";

import typescriptSource from "./sources/knapsack-01.ts?raw";
import pythonSource from "./sources/knapsack-01.py?raw";
import javaSource from "./sources/Knapsack01.java?raw";
import rustSource from "./sources/knapsack-01.rs?raw";
import cppSource from "./sources/Knapsack01.cpp?raw";
import goSource from "./sources/knapsack-01.go?raw";

export interface KnapsackInput {
  weights: number[];
  values: number[];
  capacity: number;
}

const knapsack01Definition: AlgorithmDefinition<KnapsackInput> = {
  meta: {
    id: ALGORITHM_ID.KNAPSACK_01!,
    name: "0/1 Knapsack (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "knapsack",
    description:
      "A bottom-up dynamic programming approach that finds the maximum value of items fitting within a capacity constraint, using a 1D DP table updated right-to-left to enforce the 0/1 (each item used at most once) constraint",
    timeComplexity: {
      best: "O(n × capacity)",
      average: "O(n × capacity)",
      worst: "O(n × capacity)",
    },
    spaceComplexity: "O(capacity)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { weights: [2, 3, 4, 5], values: [3, 4, 5, 6], capacity: 8 },
  },
  execute: (input: KnapsackInput) => knapsack01(input.weights, input.values, input.capacity),
  generateSteps: generateKnapsack01Steps,
  educational: knapsack01Educational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(knapsack01Definition);
