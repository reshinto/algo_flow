import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kCombinations } from "./sources/k-combinations.ts?fn";
import { generateKCombinationsSteps } from "./step-generator";
import type { KCombinationsInput } from "./step-generator";
import { kCombinationsEducational } from "./educational";

import typescriptSource from "./sources/k-combinations.ts?raw";
import pythonSource from "./sources/k-combinations.py?raw";
import javaSource from "./sources/KCombinations.java?raw";

function executeKCombinations(input: KCombinationsInput): number[][] {
  return kCombinations(input.elements, input.chooseK) as number[][];
}

const kCombinationsDefinition: AlgorithmDefinition<KCombinationsInput> = {
  meta: {
    id: ALGORITHM_ID.K_COMBINATIONS!,
    name: "K-Combinations",
    category: CATEGORY.SETS!,
    technique: "generation",
    description:
      "Generate all C(n,k) k-element subsets using backtracking — recurse from each start index, emit only when the subset reaches the target size k",
    timeComplexity: {
      best: "O(k × C(n,k))",
      average: "O(k × C(n,k))",
      worst: "O(k × C(n,k))",
    },
    spaceComplexity: "O(k × C(n,k))",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { elements: [1, 2, 3, 4, 5], chooseK: 3 },
  },
  execute: executeKCombinations,
  generateSteps: generateKCombinationsSteps,
  educational: kCombinationsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(kCombinationsDefinition);
