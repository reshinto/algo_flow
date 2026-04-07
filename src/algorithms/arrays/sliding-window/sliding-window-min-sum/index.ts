/**
 * Sliding Window (Min Sum) algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minSumSubarray } from "./sources/sliding-window-min-sum.ts?fn";
import { generateSlidingWindowMinSumSteps } from "./step-generator";
import { slidingWindowMinSumEducational } from "./educational";

import typescriptSource from "./sources/sliding-window-min-sum.ts?raw";
import pythonSource from "./sources/sliding-window-min-sum.py?raw";
import javaSource from "./sources/SlidingWindowMinSum.java?raw";
import rustSource from "./sources/sliding-window-min-sum.rs?raw";
import cppSource from "./sources/SlidingWindowMinSum.cpp?raw";
import goSource from "./sources/sliding-window-min-sum.go?raw";

interface SlidingWindowMinSumInput {
  inputArray: number[];
  windowSize: number;
}

const slidingWindowMinSumDefinition: AlgorithmDefinition<SlidingWindowMinSumInput> = {
  meta: {
    id: ALGORITHM_ID.SLIDING_WINDOW_MIN_SUM!,
    name: "Sliding Window (Min Sum)",
    category: CATEGORY.ARRAYS!,
    technique: "sliding-window",
    description:
      "An efficient technique for finding the minimum sum subarray of a fixed size by sliding a window across the array",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      inputArray: [4, 2, 1, 7, 8, 1, 2, 8, 1, 0],
      windowSize: 3,
    },
  },
  execute: (input: SlidingWindowMinSumInput) => minSumSubarray(input.inputArray, input.windowSize),
  generateSteps: generateSlidingWindowMinSumSteps,
  educational: slidingWindowMinSumEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(slidingWindowMinSumDefinition);
