import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";
import { generateIntersectionOfTwoArraysSteps } from "./step-generator";
import type { IntersectionOfTwoArraysInput } from "./step-generator";
import { intersectionOfTwoArraysEducational } from "./educational";

import typescriptSource from "./sources/intersection-of-two-arrays.ts?raw";
import pythonSource from "./sources/intersection-of-two-arrays.py?raw";
import javaSource from "./sources/IntersectionOfTwoArrays.java?raw";

function executeIntersection(input: IntersectionOfTwoArraysInput): number[] {
  const setA = new Set(input.numbersA);
  const result: number[] = [];
  for (const currentNum of input.numbersB) {
    if (setA.has(currentNum)) {
      result.push(currentNum);
      setA.delete(currentNum);
    }
  }
  return result;
}

const definition: AlgorithmDefinition<IntersectionOfTwoArraysInput> = {
  meta: {
    id: ALGORITHM_ID.INTERSECTION_OF_TWO_ARRAYS!,
    name: "Intersection of Two Arrays",
    category: CATEGORY.HASH_MAPS!,
    technique: "tracking",
    description: "Find common elements between two arrays using a hash set",
    timeComplexity: { best: "O(n+m)", average: "O(n+m)", worst: "O(n+m)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbersA: [1, 2, 2, 1], numbersB: [2, 2] },
  },
  execute: executeIntersection,
  generateSteps: generateIntersectionOfTwoArraysSteps,
  educational: intersectionOfTwoArraysEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(definition);
