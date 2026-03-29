import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { wordBreakTabulation } from "./sources/word-break-tabulation.ts?fn";
import { generateWordBreakTabulationSteps } from "./step-generator";
import { wordBreakTabulationEducational } from "./educational";

import typescriptSource from "./sources/word-break-tabulation.ts?raw";
import pythonSource from "./sources/word-break-tabulation.py?raw";
import javaSource from "./sources/WordBreakTabulation.java?raw";

interface WordBreakInput {
  text: string;
  dictionary: string[];
}

const wordBreakTabulationDefinition: AlgorithmDefinition<WordBreakInput> = {
  meta: {
    id: ALGORITHM_ID.WORD_BREAK_TABULATION!,
    name: "Word Break (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "string-dp",
    description:
      "A bottom-up dynamic programming approach that determines whether a string can be segmented into dictionary words, using a DP table where dp[i]=1 if text[0..i-1] is fully segmentable",
    timeComplexity: {
      best: "O(n × m × k)",
      average: "O(n × m × k)",
      worst: "O(n × m × k)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { text: "leetcode", dictionary: ["leet", "code"] },
  },
  execute: (input: WordBreakInput) => wordBreakTabulation(input.text, input.dictionary),
  generateSteps: generateWordBreakTabulationSteps,
  educational: wordBreakTabulationEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(wordBreakTabulationDefinition);
