import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { multisetUnion } from "./sources/multiset-union.ts?fn";
import { generateMultisetUnionSteps } from "./step-generator";
import type { MultisetUnionInput } from "./step-generator";
import { multisetUnionEducational } from "./educational";

import typescriptSource from "./sources/multiset-union.ts?raw";
import pythonSource from "./sources/multiset-union.py?raw";
import javaSource from "./sources/MultisetUnion.java?raw";

function executeMultisetUnion(input: MultisetUnionInput): number[] {
  return multisetUnion(input.arrayA, input.arrayB) as number[];
}

const multisetUnionDefinition: AlgorithmDefinition<MultisetUnionInput> = {
  meta: {
    id: ALGORITHM_ID.MULTISET_UNION!,
    name: "Multiset Union",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Bag union of two multisets in O(n + m) — for each element, take the maximum frequency from either array to build the result",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(n + m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { arrayA: [1, 1, 2, 3, 3, 3], arrayB: [1, 1, 1, 2, 2, 3] },
  },
  execute: executeMultisetUnion,
  generateSteps: generateMultisetUnionSteps,
  educational: multisetUnionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(multisetUnionDefinition);
