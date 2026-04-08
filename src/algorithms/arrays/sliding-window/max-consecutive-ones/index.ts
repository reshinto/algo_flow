/**
 * Max Consecutive Ones III algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { maxConsecutiveOnes } from "./sources/max-consecutive-ones.ts?fn";
import { generateMaxConsecutiveOnesSteps } from "./step-generator";
import { maxConsecutiveOnesEducational } from "./educational";

import typescriptSource from "./sources/max-consecutive-ones.ts?raw";
import pythonSource from "./sources/max-consecutive-ones.py?raw";
import javaSource from "./sources/MaxConsecutiveOnes.java?raw";
import rustSource from "./sources/max-consecutive-ones.rs?raw";
import cppSource from "./sources/MaxConsecutiveOnes.cpp?raw";
import goSource from "./sources/max-consecutive-ones.go?raw";

interface MaxConsecutiveOnesInput {
  inputArray: number[];
  maxFlips: number;
}

const maxConsecutiveOnesDefinition: AlgorithmDefinition<MaxConsecutiveOnesInput> = {
  meta: {
    id: ALGORITHM_ID.MAX_CONSECUTIVE_ONES!,
    name: "Max Consecutive Ones III",
    category: CATEGORY.ARRAYS!,
    technique: "sliding-window",
    description:
      "A variable sliding window technique that finds the longest subarray of 1s achievable by flipping at most k zeros",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      inputArray: [1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
      maxFlips: 2,
    },
  },
  execute: (input: MaxConsecutiveOnesInput) => maxConsecutiveOnes(input.inputArray, input.maxFlips),
  generateSteps: generateMaxConsecutiveOnesSteps,
  educational: maxConsecutiveOnesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(maxConsecutiveOnesDefinition);
