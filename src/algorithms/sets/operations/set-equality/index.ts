import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setEquality } from "./sources/set-equality.ts?fn";
import { generateSetEqualitySteps } from "./step-generator";
import type { SetEqualityInput } from "./step-generator";
import { setEqualityEducational } from "./educational";

import typescriptSource from "./sources/set-equality.ts?raw";
import pythonSource from "./sources/set-equality.py?raw";
import javaSource from "./sources/SetEquality.java?raw";
import rustSource from "./sources/set-equality.rs?raw";
import cppSource from "./sources/SetEquality.cpp?raw";
import goSource from "./sources/set-equality.go?raw";

function executeSetEquality(input: SetEqualityInput): { isEqual: boolean } {
  return setEquality(input.arrayA, input.arrayB) as { isEqual: boolean };
}

const setEqualityDefinition: AlgorithmDefinition<SetEqualityInput> = {
  meta: {
    id: ALGORITHM_ID.SET_EQUALITY!,
    name: "Set Equality",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Determine whether two arrays represent the same set (A = B) in O(n + m) by building a hash set from A, verifying all B elements are present, and comparing unique element counts",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { arrayA: [3, 1, 2], arrayB: [2, 3, 1] },
  },
  execute: executeSetEquality,
  generateSteps: generateSetEqualitySteps,
  educational: setEqualityEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(setEqualityDefinition);
