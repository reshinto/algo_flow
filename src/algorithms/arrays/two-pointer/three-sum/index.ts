/**
 * Three Sum algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { threeSum } from "./sources/three-sum.ts?fn";
import { generateThreeSumSteps } from "./step-generator";
import { threeSumEducational } from "./educational";

import typescriptSource from "./sources/three-sum.ts?raw";
import pythonSource from "./sources/three-sum.py?raw";
import javaSource from "./sources/ThreeSum.java?raw";

interface ThreeSumInput {
  inputArray: number[];
}

const threeSumDefinition: AlgorithmDefinition<ThreeSumInput> = {
  meta: {
    id: ALGORITHM_ID.THREE_SUM!,
    name: "Three Sum (Zero Triplets)",
    category: CATEGORY.ARRAYS!,
    technique: "two-pointer",
    description:
      "Finds all unique triplets in an array that sum to zero by sorting and applying a two-pointer search for each anchor element",
    timeComplexity: {
      best: "O(n^2)",
      average: "O(n^2)",
      worst: "O(n^2)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [-1, 0, 1, 2, -1, -4],
    },
  },
  execute: (input: ThreeSumInput) => threeSum(input.inputArray),
  generateSteps: generateThreeSumSteps,
  educational: threeSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(threeSumDefinition);
