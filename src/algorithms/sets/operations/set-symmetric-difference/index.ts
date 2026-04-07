import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setSymmetricDifference } from "./sources/set-symmetric-difference.ts?fn";
import { generateSetSymmetricDifferenceSteps } from "./step-generator";
import type { SetSymmetricDifferenceInput } from "./step-generator";
import { setSymmetricDifferenceEducational } from "./educational";

import typescriptSource from "./sources/set-symmetric-difference.ts?raw";
import pythonSource from "./sources/set-symmetric-difference.py?raw";
import javaSource from "./sources/SetSymmetricDifference.java?raw";
import rustSource from "./sources/set-symmetric-difference.rs?raw";
import cppSource from "./sources/SetSymmetricDifference.cpp?raw";
import goSource from "./sources/set-symmetric-difference.go?raw";

function executeSetSymmetricDifference(input: SetSymmetricDifferenceInput): number[] {
  return setSymmetricDifference(input.arrayA, input.arrayB) as number[];
}

const setSymmetricDifferenceDefinition: AlgorithmDefinition<SetSymmetricDifferenceInput> = {
  meta: {
    id: ALGORITHM_ID.SET_SYMMETRIC_DIFFERENCE!,
    name: "Set Symmetric Difference",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Find elements in either A or B but not both (A △ B) in O(n + m) by building a hash set from A, removing common elements when processing B, then collecting A-only remainder",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { arrayA: [1, 2, 3, 4], arrayB: [3, 4, 5, 6] },
  },
  execute: executeSetSymmetricDifference,
  generateSteps: generateSetSymmetricDifferenceSteps,
  educational: setSymmetricDifferenceEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(setSymmetricDifferenceDefinition);
