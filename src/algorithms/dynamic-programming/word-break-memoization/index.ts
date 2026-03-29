import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { wordBreakMemoization } from "./sources/word-break-memoization.ts?fn";
import { generateWordBreakMemoizationSteps } from "./step-generator";
import { wordBreakMemoizationEducational } from "./educational";

import typescriptSource from "./sources/word-break-memoization.ts?raw";
import pythonSource from "./sources/word-break-memoization.py?raw";
import javaSource from "./sources/WordBreakMemoization.java?raw";

interface WordBreakInput {
  text: string;
  dictionary: string[];
}

const wordBreakMemoizationDefinition: AlgorithmDefinition<WordBreakInput> = {
  meta: {
    id: ALGORITHM_ID.WORD_BREAK_MEMOIZATION!,
    name: "Word Break (Memoization)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    description:
      "A top-down dynamic programming approach that determines whether a string can be segmented into a sequence of dictionary words using recursion with memoization",
    timeComplexity: {
      best: "O(k)",
      average: "O(n × m × k)",
      worst: "O(n × m × k)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "leetcode", dictionary: ["leet", "code"] },
  },
  execute: (input: WordBreakInput) => wordBreakMemoization(input.text, input.dictionary),
  generateSteps: generateWordBreakMemoizationSteps,
  educational: wordBreakMemoizationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(wordBreakMemoizationDefinition);
