import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { setIntersection } from "./sources/set-intersection.ts?fn";
import { generateSetIntersectionSteps } from "./step-generator";
import type { SetIntersectionInput } from "./step-generator";
import { setIntersectionEducational } from "./educational";

import typescriptSource from "./sources/set-intersection.ts?raw";
import pythonSource from "./sources/set-intersection.py?raw";
import javaSource from "./sources/SetIntersection.java?raw";

function executeSetIntersection(input: SetIntersectionInput): number[] {
  return setIntersection(input.arrayA, input.arrayB) as number[];
}

const setIntersectionDefinition: AlgorithmDefinition<SetIntersectionInput> = {
  meta: {
    id: ALGORITHM_ID.SET_INTERSECTION!,
    name: "Set Intersection",
    category: CATEGORY.SETS!,
    description:
      "Find common elements of two arrays in O(n + m) by building a hash set from the first array and checking membership for each element of the second",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { arrayA: [1, 2, 3, 4, 5, 8], arrayB: [2, 4, 6, 8, 10] },
  },
  execute: executeSetIntersection,
  generateSteps: generateSetIntersectionSteps,
  educational: setIntersectionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(setIntersectionDefinition);
