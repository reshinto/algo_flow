import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { supersetCheck } from "./sources/superset-check.ts?fn";
import { generateSupersetCheckSteps } from "./step-generator";
import type { SupersetCheckInput } from "./step-generator";
import { supersetCheckEducational } from "./educational";

import typescriptSource from "./sources/superset-check.ts?raw";
import pythonSource from "./sources/superset-check.py?raw";
import javaSource from "./sources/SupersetCheck.java?raw";

function executeSupersetCheck(input: SupersetCheckInput): { isSuperset: boolean } {
  return supersetCheck(input.arrayA, input.arrayB) as { isSuperset: boolean };
}

const supersetCheckDefinition: AlgorithmDefinition<SupersetCheckInput> = {
  meta: {
    id: ALGORITHM_ID.SUPERSET_CHECK!,
    name: "Superset Check",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Determine whether every element of set B also appears in set A (A ⊇ B) in O(n + m) by building a hash set from A and checking each element of B for membership",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { arrayA: [1, 2, 3, 4, 5], arrayB: [2, 4] },
  },
  execute: executeSupersetCheck,
  generateSteps: generateSupersetCheckSteps,
  educational: supersetCheckEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(supersetCheckDefinition);
