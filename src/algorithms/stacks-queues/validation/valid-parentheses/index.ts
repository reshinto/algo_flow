import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { validParentheses } from "./sources/valid-parentheses.ts?fn";
import { generateValidParenthesesSteps } from "./step-generator";
import type { ValidParenthesesInput } from "./step-generator";
import { validParenthesesEducational } from "./educational";

import typescriptSource from "./sources/valid-parentheses.ts?raw";
import pythonSource from "./sources/valid-parentheses.py?raw";
import javaSource from "./sources/ValidParentheses.java?raw";

function executeValidParentheses(input: ValidParenthesesInput): boolean {
  return validParentheses(input.inputString) as boolean;
}

const validParenthesesDefinition: AlgorithmDefinition<ValidParenthesesInput> = {
  meta: {
    id: ALGORITHM_ID.VALID_PARENTHESES!,
    name: "Valid Parentheses",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "validation",
    description:
      "Use a stack to verify that every opening bracket has a correctly ordered matching closing bracket",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { inputString: "({[]})" },
  },
  execute: executeValidParentheses,
  generateSteps: generateValidParenthesesSteps,
  educational: validParenthesesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(validParenthesesDefinition);
