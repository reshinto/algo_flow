import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { longestValidParentheses } from "./sources/longest-valid-parentheses.ts?fn";
import { generateLongestValidParenthesesSteps } from "./step-generator";
import type { LongestValidParenthesesInput } from "./step-generator";
import { longestValidParenthesesEducational } from "./educational";

import typescriptSource from "./sources/longest-valid-parentheses.ts?raw";
import pythonSource from "./sources/longest-valid-parentheses.py?raw";
import javaSource from "./sources/LongestValidParentheses.java?raw";

function executeLongestValidParentheses(input: LongestValidParenthesesInput): number {
  return longestValidParentheses(input.inputString) as number;
}

const longestValidParenthesesDefinition: AlgorithmDefinition<LongestValidParenthesesInput> = {
  meta: {
    id: ALGORITHM_ID.LONGEST_VALID_PARENTHESES!,
    name: "Longest Valid Parentheses",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "validation",
    description:
      "Use a stack of indices with a sentinel base to find the length of the longest well-formed parentheses substring in a single pass",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { inputString: "(()())" },
  },
  execute: executeLongestValidParentheses,
  generateSteps: generateLongestValidParenthesesSteps,
  educational: longestValidParenthesesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(longestValidParenthesesDefinition);
