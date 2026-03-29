/**
 * Find All Duplicates algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { findAllDuplicates } from "./sources/find-all-duplicates.ts?fn";
import { generateFindAllDuplicatesSteps } from "./step-generator";
import { findAllDuplicatesEducational } from "./educational";

import typescriptSource from "./sources/find-all-duplicates.ts?raw";
import pythonSource from "./sources/find-all-duplicates.py?raw";
import javaSource from "./sources/FindAllDuplicates.java?raw";

interface FindAllDuplicatesInput {
  inputArray: number[];
}

const findAllDuplicatesDefinition: AlgorithmDefinition<FindAllDuplicatesInput> = {
  meta: {
    id: ALGORITHM_ID.FIND_ALL_DUPLICATES!,
    name: "Find All Duplicates",
    category: CATEGORY.ARRAYS!,
    technique: "cyclic-sort",
    description:
      "Detects all numbers appearing twice in an array of values 1..n using sign-negation as an in-place visited marker, achieving O(n) time and O(1) space",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [4, 3, 2, 7, 8, 2, 3, 1],
    },
  },
  execute: (input: FindAllDuplicatesInput) => findAllDuplicates(input.inputArray),
  generateSteps: generateFindAllDuplicatesSteps,
  educational: findAllDuplicatesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(findAllDuplicatesDefinition);
