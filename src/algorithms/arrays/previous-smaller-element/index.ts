/**
 * Previous Smaller Element algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { previousSmallerElement } from "./sources/previous-smaller-element.ts?fn";
import { generatePreviousSmallerElementSteps } from "./step-generator";
import { previousSmallerElementEducational } from "./educational";

import typescriptSource from "./sources/previous-smaller-element.ts?raw";
import pythonSource from "./sources/previous-smaller-element.py?raw";
import javaSource from "./sources/PreviousSmallerElement.java?raw";

interface PreviousSmallerElementInput {
  inputArray: number[];
}

const previousSmallerElementDefinition: AlgorithmDefinition<PreviousSmallerElementInput> = {
  meta: {
    id: ALGORITHM_ID.PREVIOUS_SMALLER_ELEMENT!,
    name: "Previous Smaller Element",
    category: CATEGORY.ARRAYS!,
    description:
      "Monotonic stack algorithm that finds, for each element, the nearest strictly smaller element to its left — resolved in O(n) using a single left-to-right pass with an increasing stack",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [4, 10, 5, 8, 20, 15, 3, 12],
    },
  },
  execute: (input: PreviousSmallerElementInput) => previousSmallerElement(input.inputArray),
  generateSteps: generatePreviousSmallerElementSteps,
  educational: previousSmallerElementEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(previousSmallerElementDefinition);
