import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { buildHeapTopDown } from "./sources/build-heap-top-down.ts?fn";
import { generateBuildHeapTopDownSteps } from "./step-generator";
import type { BuildHeapTopDownInput } from "./step-generator";
import { buildHeapTopDownEducational } from "./educational";

import typescriptSource from "./sources/build-heap-top-down.ts?raw";
import pythonSource from "./sources/build-heap-top-down.py?raw";
import javaSource from "./sources/BuildHeapTopDown.java?raw";
import rustSource from "./sources/build-heap-top-down.rs?raw";
import cppSource from "./sources/BuildHeapTopDown.cpp?raw";
import goSource from "./sources/build-heap-top-down.go?raw";

function executeBuildHeapTopDown(input: BuildHeapTopDownInput): number[] {
  return buildHeapTopDown(input.array) as number[];
}

const buildHeapTopDownDefinition: AlgorithmDefinition<BuildHeapTopDownInput> = {
  meta: {
    id: ALGORITHM_ID.BUILD_HEAP_TOP_DOWN!,
    name: "Build Heap Top-Down",
    category: CATEGORY.HEAPS!,
    technique: "construction",
    description:
      "Build a min-heap by inserting elements one-by-one with sift-up, demonstrating the O(n log n) top-down construction approach",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log n)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [9, 5, 7, 1, 3, 8, 2, 6, 4] },
  },
  execute: executeBuildHeapTopDown,
  generateSteps: generateBuildHeapTopDownSteps,
  educational: buildHeapTopDownEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(buildHeapTopDownDefinition);
