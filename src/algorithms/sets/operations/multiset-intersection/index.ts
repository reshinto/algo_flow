import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { multisetIntersection } from "./sources/multiset-intersection.ts?fn";
import { generateMultisetIntersectionSteps } from "./step-generator";
import type { MultisetIntersectionInput } from "./step-generator";
import { multisetIntersectionEducational } from "./educational";

import typescriptSource from "./sources/multiset-intersection.ts?raw";
import pythonSource from "./sources/multiset-intersection.py?raw";
import javaSource from "./sources/MultisetIntersection.java?raw";

function executeMultisetIntersection(input: MultisetIntersectionInput): number[] {
  return multisetIntersection(input.arrayA, input.arrayB) as number[];
}

const multisetIntersectionDefinition: AlgorithmDefinition<MultisetIntersectionInput> = {
  meta: {
    id: ALGORITHM_ID.MULTISET_INTERSECTION!,
    name: "Multiset Intersection",
    category: CATEGORY.SETS!,
    technique: "operations",
    description:
      "Bag intersection of two multisets in O(n + m) — for each element, take the minimum frequency from either array to build the result",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(n + m)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { arrayA: [1, 1, 2, 3, 3, 3], arrayB: [1, 1, 1, 2, 2, 3] },
  },
  execute: executeMultisetIntersection,
  generateSteps: generateMultisetIntersectionSteps,
  educational: multisetIntersectionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(multisetIntersectionDefinition);
