/**
 * Quickselect (K-th Smallest) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { quickselect } from "./sources/quickselect.ts?fn";
import { generateQuickselectSteps } from "./step-generator";
import { quickselectEducational } from "./educational";

import typescriptSource from "./sources/quickselect.ts?raw";
import pythonSource from "./sources/quickselect.py?raw";
import javaSource from "./sources/Quickselect.java?raw";

interface QuickselectInput {
  inputArray: number[];
  targetK: number;
}

const quickselectDefinition: AlgorithmDefinition<QuickselectInput> = {
  meta: {
    id: ALGORITHM_ID.QUICKSELECT!,
    name: "Quickselect (K-th Smallest)",
    category: CATEGORY.ARRAYS!,
    technique: "sorting-partitioning",
    description:
      "Finds the K-th smallest element in O(n) average time using Lomuto partition and recursing only on the relevant half",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(log n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [7, 2, 1, 6, 8, 5, 3, 4],
      targetK: 4,
    },
  },
  execute: (input: QuickselectInput) => quickselect(input.inputArray, input.targetK),
  generateSteps: generateQuickselectSteps,
  educational: quickselectEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(quickselectDefinition);
