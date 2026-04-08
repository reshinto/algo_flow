import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { removeKDigits } from "./sources/remove-k-digits.ts?fn";
import { generateRemoveKDigitsSteps } from "./step-generator";
import type { RemoveKDigitsInput } from "./step-generator";
import { removeKDigitsEducational } from "./educational";

import typescriptSource from "./sources/remove-k-digits.ts?raw";
import pythonSource from "./sources/remove-k-digits.py?raw";
import javaSource from "./sources/RemoveKDigits.java?raw";
import rustSource from "./sources/remove-k-digits.rs?raw";
import cppSource from "./sources/RemoveKDigits.cpp?raw";
import goSource from "./sources/remove-k-digits.go?raw";

function executeRemoveKDigits(input: RemoveKDigitsInput): string {
  return removeKDigits(input.num, input.removalCount) as string;
}

const removeKDigitsDefinition: AlgorithmDefinition<RemoveKDigitsInput> = {
  meta: {
    id: ALGORITHM_ID.REMOVE_K_DIGITS!,
    name: "Remove K Digits",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "monotonic-stack",
    description:
      "Remove k digits from a number string to produce the smallest possible number using a greedy monotonic increasing stack",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { num: "1432219", removalCount: 3 },
  },
  execute: executeRemoveKDigits,
  generateSteps: generateRemoveKDigitsSteps,
  educational: removeKDigitsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(removeKDigitsDefinition);
