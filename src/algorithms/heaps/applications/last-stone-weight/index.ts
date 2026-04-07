import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { lastStoneWeight } from "./sources/last-stone-weight.ts?fn";
import { generateLastStoneWeightSteps } from "./step-generator";
import type { LastStoneWeightInput } from "./step-generator";
import { lastStoneWeightEducational } from "./educational";

import typescriptSource from "./sources/last-stone-weight.ts?raw";
import pythonSource from "./sources/last-stone-weight.py?raw";
import javaSource from "./sources/LastStoneWeight.java?raw";
import rustSource from "./sources/last-stone-weight.rs?raw";
import cppSource from "./sources/LastStoneWeight.cpp?raw";
import goSource from "./sources/last-stone-weight.go?raw";

function executeLastStoneWeight(input: LastStoneWeightInput): number {
  return lastStoneWeight(input.array) as number;
}

const lastStoneWeightDefinition: AlgorithmDefinition<LastStoneWeightInput> = {
  meta: {
    id: ALGORITHM_ID.LAST_STONE_WEIGHT!,
    name: "Last Stone Weight",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Repeatedly smash the two heaviest stones using a max-heap; return the last remaining weight (LeetCode 1046)",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [2, 7, 4, 1, 8, 1] },
  },
  execute: executeLastStoneWeight,
  generateSteps: generateLastStoneWeightSteps,
  educational: lastStoneWeightEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(lastStoneWeightDefinition);
