import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { backspaceStringCompare } from "./sources/backspace-string-compare.ts?fn";
import { generateBackspaceStringCompareSteps } from "./step-generator";
import type { BackspaceStringCompareInput } from "./step-generator";
import { backspaceStringCompareEducational } from "./educational";

import typescriptSource from "./sources/backspace-string-compare.ts?raw";
import pythonSource from "./sources/backspace-string-compare.py?raw";
import javaSource from "./sources/BackspaceStringCompare.java?raw";

function executeBackspaceStringCompare(input: BackspaceStringCompareInput): boolean {
  return backspaceStringCompare(input.firstString, input.secondString) as boolean;
}

const backspaceStringCompareDefinition: AlgorithmDefinition<BackspaceStringCompareInput> = {
  meta: {
    id: ALGORITHM_ID.BACKSPACE_STRING_COMPARE!,
    name: "Backspace String Compare",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "stack-applications",
    description:
      "Use a stack to process each string where '#' acts as backspace, then compare the two resulting stacks for equality",
    timeComplexity: {
      best: "O(n+m)",
      average: "O(n+m)",
      worst: "O(n+m)",
    },
    spaceComplexity: "O(n+m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { firstString: "ab#c", secondString: "ad#c" },
  },
  execute: executeBackspaceStringCompare,
  generateSteps: generateBackspaceStringCompareSteps,
  educational: backspaceStringCompareEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(backspaceStringCompareDefinition);
