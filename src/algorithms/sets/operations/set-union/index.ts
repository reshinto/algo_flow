import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setUnion } from "./sources/set-union.ts?fn";
import { generateSetUnionSteps } from "./step-generator";
import type { SetUnionInput } from "./step-generator";
import { setUnionEducational } from "./educational";

import typescriptSource from "./sources/set-union.ts?raw";
import pythonSource from "./sources/set-union.py?raw";
import javaSource from "./sources/SetUnion.java?raw";
import rustSource from "./sources/set-union.rs?raw";
import cppSource from "./sources/SetUnion.cpp?raw";
import goSource from "./sources/set-union.go?raw";

function executeSetUnion(input: SetUnionInput): number[] {
  return setUnion(input.arrayA, input.arrayB) as number[];
}

const setUnionDefinition: AlgorithmDefinition<SetUnionInput> = {
  meta: {
    id: ALGORITHM_ID.SET_UNION!,
    name: "Set Union",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Combine all unique elements from two arrays in O(n + m) by building a hash set from the first array and checking membership for each element of the second",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(n + m)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { arrayA: [1, 2, 3, 4, 5], arrayB: [3, 4, 5, 6, 7] },
  },
  execute: executeSetUnion,
  generateSteps: generateSetUnionSteps,
  educational: setUnionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(setUnionDefinition);
