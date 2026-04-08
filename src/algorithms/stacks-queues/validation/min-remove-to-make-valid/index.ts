import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { minRemoveToMakeValid } from "./sources/min-remove-to-make-valid.ts?fn";
import { generateMinRemoveToMakeValidSteps } from "./step-generator";
import type { MinRemoveToMakeValidInput } from "./step-generator";
import { minRemoveToMakeValidEducational } from "./educational";

import typescriptSource from "./sources/min-remove-to-make-valid.ts?raw";
import pythonSource from "./sources/min-remove-to-make-valid.py?raw";
import javaSource from "./sources/MinRemoveToMakeValid.java?raw";
import rustSource from "./sources/min-remove-to-make-valid.rs?raw";
import cppSource from "./sources/MinRemoveToMakeValid.cpp?raw";
import goSource from "./sources/min-remove-to-make-valid.go?raw";

function executeMinRemoveToMakeValid(input: MinRemoveToMakeValidInput): string {
  return minRemoveToMakeValid(input.inputString) as string;
}

const minRemoveToMakeValidDefinition: AlgorithmDefinition<MinRemoveToMakeValidInput> = {
  meta: {
    id: ALGORITHM_ID.MIN_REMOVE_TO_MAKE_VALID!,
    name: "Min Remove to Make Valid",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "validation",
    description:
      "Use a stack of indices to track unmatched '(' and a set for unmatched ')', then rebuild the string excluding all unmatched indices",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { inputString: "a(b(c)d" },
  },
  execute: executeMinRemoveToMakeValid,
  generateSteps: generateMinRemoveToMakeValidSteps,
  educational: minRemoveToMakeValidEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(minRemoveToMakeValidDefinition);
