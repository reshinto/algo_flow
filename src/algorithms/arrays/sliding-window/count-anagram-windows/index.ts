/**
 * Count Anagram Windows algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { countAnagramWindows } from "./sources/count-anagram-windows.ts?fn";
import { generateCountAnagramWindowsSteps } from "./step-generator";
import { countAnagramWindowsEducational } from "./educational";

import typescriptSource from "./sources/count-anagram-windows.ts?raw";
import pythonSource from "./sources/count-anagram-windows.py?raw";
import javaSource from "./sources/CountAnagramWindows.java?raw";

interface CountAnagramWindowsInput {
  text: number[];
  pattern: number[];
}

const countAnagramWindowsDefinition: AlgorithmDefinition<CountAnagramWindowsInput> = {
  meta: {
    id: ALGORITHM_ID.COUNT_ANAGRAM_WINDOWS!,
    name: "Count Anagram Windows",
    category: CATEGORY.ARRAYS!,
    technique: "sliding-window",
    description:
      "Finds all starting positions in a text where a window of pattern length is an anagram of the pattern using a sliding frequency map",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      text: [1, 2, 3, 1, 2, 1, 3, 2, 1],
      pattern: [1, 2, 3],
    },
  },
  execute: (input: CountAnagramWindowsInput) => countAnagramWindows(input.text, input.pattern),
  generateSteps: generateCountAnagramWindowsSteps,
  educational: countAnagramWindowsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(countAnagramWindowsDefinition);
