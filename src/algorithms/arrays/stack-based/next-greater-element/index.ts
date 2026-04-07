/**
 * Next Greater Element algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { nextGreaterElement } from "./sources/next-greater-element.ts?fn";
import { generateNextGreaterElementSteps } from "./step-generator";
import { nextGreaterElementEducational } from "./educational";

import typescriptSource from "./sources/next-greater-element.ts?raw";
import pythonSource from "./sources/next-greater-element.py?raw";
import javaSource from "./sources/NextGreaterElement.java?raw";
import rustSource from "./sources/next-greater-element.rs?raw";
import cppSource from "./sources/NextGreaterElement.cpp?raw";
import goSource from "./sources/next-greater-element.go?raw";

interface NextGreaterElementInput {
  inputArray: number[];
}

const nextGreaterElementDefinition: AlgorithmDefinition<NextGreaterElementInput> = {
  meta: {
    id: ALGORITHM_ID.NEXT_GREATER_ELEMENT!,
    name: "Next Greater Element",
    category: CATEGORY.ARRAYS!,
    technique: "stack-based",
    description:
      "Monotonic stack algorithm that finds, for each element, the first strictly greater element to its right — resolving pending indices in O(n) using a single left-to-right pass",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      inputArray: [4, 5, 2, 10, 8, 1, 3],
    },
  },
  execute: (input: NextGreaterElementInput) => nextGreaterElement(input.inputArray),
  generateSteps: generateNextGreaterElementSteps,
  educational: nextGreaterElementEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(nextGreaterElementDefinition);
