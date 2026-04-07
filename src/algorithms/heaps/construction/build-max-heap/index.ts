import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { buildMaxHeap } from "./sources/build-max-heap.ts?fn";
import { generateBuildMaxHeapSteps } from "./step-generator";
import type { BuildMaxHeapInput } from "./step-generator";
import { buildMaxHeapEducational } from "./educational";

import typescriptSource from "./sources/build-max-heap.ts?raw";
import pythonSource from "./sources/build-max-heap.py?raw";
import javaSource from "./sources/BuildMaxHeap.java?raw";
import rustSource from "./sources/build-max-heap.rs?raw";
import cppSource from "./sources/BuildMaxHeap.cpp?raw";
import goSource from "./sources/build-max-heap.go?raw";

function executeBuildMaxHeap(input: BuildMaxHeapInput): number[] {
  return buildMaxHeap(input.array) as number[];
}

const buildMaxHeapDefinition: AlgorithmDefinition<BuildMaxHeapInput> = {
  meta: {
    id: ALGORITHM_ID.BUILD_MAX_HEAP!,
    name: "Build Max Heap",
    category: CATEGORY.HEAPS!,
    technique: "construction",
    description:
      "Convert an arbitrary array into a valid max-heap in O(n) time using the bottom-up heapify (sift-down) approach",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [9, 5, 7, 1, 3, 8, 2, 6, 4] },
  },
  execute: executeBuildMaxHeap,
  generateSteps: generateBuildMaxHeapSteps,
  educational: buildMaxHeapEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(buildMaxHeapDefinition);
