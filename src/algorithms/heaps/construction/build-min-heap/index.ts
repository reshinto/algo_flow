import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { buildMinHeap } from "./sources/build-min-heap.ts?fn";
import { generateBuildMinHeapSteps } from "./step-generator";
import type { BuildMinHeapInput } from "./step-generator";
import { buildMinHeapEducational } from "./educational";

import typescriptSource from "./sources/build-min-heap.ts?raw";
import pythonSource from "./sources/build-min-heap.py?raw";
import javaSource from "./sources/BuildMinHeap.java?raw";

function executeBuildMinHeap(input: BuildMinHeapInput): number[] {
  return buildMinHeap(input.array) as number[];
}

const buildMinHeapDefinition: AlgorithmDefinition<BuildMinHeapInput> = {
  meta: {
    id: ALGORITHM_ID.BUILD_MIN_HEAP!,
    name: "Build Min Heap",
    category: CATEGORY.HEAPS!,
    technique: "construction",
    description:
      "Convert an arbitrary array into a valid min-heap in O(n) time using the bottom-up heapify (sift-down) approach",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [9, 5, 7, 1, 3, 8, 2, 6, 4] },
  },
  execute: executeBuildMinHeap,
  generateSteps: generateBuildMinHeapSteps,
  educational: buildMinHeapEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(buildMinHeapDefinition);
