/**
 * Four Sum algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { fourSum } from "./sources/four-sum.ts?fn";
import { generateFourSumSteps } from "./step-generator";
import { fourSumEducational } from "./educational";

import typescriptSource from "./sources/four-sum.ts?raw";
import pythonSource from "./sources/four-sum.py?raw";
import javaSource from "./sources/FourSum.java?raw";
import rustSource from "./sources/four-sum.rs?raw";
import cppSource from "./sources/FourSum.cpp?raw";
import goSource from "./sources/four-sum.go?raw";

interface FourSumInput {
  inputArray: number[];
  target: number;
}

const fourSumDefinition: AlgorithmDefinition<FourSumInput> = {
  meta: {
    id: ALGORITHM_ID.FOUR_SUM!,
    name: "Four Sum",
    category: CATEGORY.ARRAYS!,
    technique: "two-pointer",
    description:
      "Finds all unique quadruplets in an array that sum to a given target by sorting and applying two fixed outer pointers with a two-pointer inner search",
    timeComplexity: {
      best: "O(n^3)",
      average: "O(n^3)",
      worst: "O(n^3)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      inputArray: [1, 0, -1, 0, -2, 2],
      target: 0,
    },
  },
  execute: (input: FourSumInput) => fourSum(input.inputArray, input.target),
  generateSteps: generateFourSumSteps,
  educational: fourSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(fourSumDefinition);
