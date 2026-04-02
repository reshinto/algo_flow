import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { subsetCheck } from "./sources/subset-check.ts?fn";
import { generateSubsetCheckSteps } from "./step-generator";
import type { SubsetCheckInput } from "./step-generator";
import { subsetCheckEducational } from "./educational";

import typescriptSource from "./sources/subset-check.ts?raw";
import pythonSource from "./sources/subset-check.py?raw";
import javaSource from "./sources/SubsetCheck.java?raw";

function executeSubsetCheck(input: SubsetCheckInput): { isSubset: boolean } {
  return subsetCheck(input.arrayA, input.arrayB) as { isSubset: boolean };
}

const subsetCheckDefinition: AlgorithmDefinition<SubsetCheckInput> = {
  meta: {
    id: ALGORITHM_ID.SUBSET_CHECK!,
    name: "Subset Check",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Determine whether every element of set A also appears in set B (A ⊆ B) in O(n + m) by building a hash set from B and checking each element of A for membership",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { arrayA: [2, 4], arrayB: [1, 2, 3, 4, 5] },
  },
  execute: executeSubsetCheck,
  generateSteps: generateSubsetCheckSteps,
  educational: subsetCheckEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(subsetCheckDefinition);
