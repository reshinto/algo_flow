import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setDifference } from "./sources/set-difference.ts?fn";
import { generateSetDifferenceSteps } from "./step-generator";
import type { SetDifferenceInput } from "./step-generator";
import { setDifferenceEducational } from "./educational";

import typescriptSource from "./sources/set-difference.ts?raw";
import pythonSource from "./sources/set-difference.py?raw";
import javaSource from "./sources/SetDifference.java?raw";
import rustSource from "./sources/set-difference.rs?raw";
import cppSource from "./sources/SetDifference.cpp?raw";
import goSource from "./sources/set-difference.go?raw";

function executeSetDifference(input: SetDifferenceInput): number[] {
  return setDifference(input.arrayA, input.arrayB) as number[];
}

const setDifferenceDefinition: AlgorithmDefinition<SetDifferenceInput> = {
  meta: {
    id: ALGORITHM_ID.SET_DIFFERENCE!,
    name: "Set Difference",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Find elements in A but not in B (A \\ B) in O(n + m) by building a hash set from B and filtering elements of A for absence",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(m)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { arrayA: [1, 2, 3, 4, 5], arrayB: [3, 4, 5, 6, 7] },
  },
  execute: executeSetDifference,
  generateSteps: generateSetDifferenceSteps,
  educational: setDifferenceEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(setDifferenceDefinition);
