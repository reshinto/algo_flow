import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kClosestPoints } from "./sources/k-closest-points.ts?fn";
import { generateKClosestPointsSteps } from "./step-generator";
import type { KClosestPointsInput } from "./step-generator";
import { kClosestPointsEducational } from "./educational";

import typescriptSource from "./sources/k-closest-points.ts?raw";
import pythonSource from "./sources/k-closest-points.py?raw";
import javaSource from "./sources/KClosestPoints.java?raw";

function executeKClosestPoints(input: KClosestPointsInput): [number, number][] {
  return kClosestPoints(input.points, input.kValue) as [number, number][];
}

const kClosestPointsDefinition: AlgorithmDefinition<KClosestPointsInput> = {
  meta: {
    id: ALGORITHM_ID.K_CLOSEST_POINTS!,
    name: "K Closest Points to Origin",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Find the k points nearest to the origin (0, 0) using a max-heap of size k keyed by distance², achieving O(n log k) time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log k)",
      worst: "O(n log k)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      points: [
        [3, 3],
        [5, -1],
        [-2, 4],
        [1, 1],
        [0, 2],
        [-1, -1],
        [4, 0],
      ],
      kValue: 3,
    },
  },
  execute: executeKClosestPoints,
  generateSteps: generateKClosestPointsSteps,
  educational: kClosestPointsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(kClosestPointsDefinition);
