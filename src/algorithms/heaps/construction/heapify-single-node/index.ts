import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapifySingleNode } from "./sources/heapify-single-node.ts?fn";
import { generateHeapifySingleNodeSteps } from "./step-generator";
import type { HeapifySingleNodeInput } from "./step-generator";
import { heapifySingleNodeEducational } from "./educational";

import typescriptSource from "./sources/heapify-single-node.ts?raw";
import pythonSource from "./sources/heapify-single-node.py?raw";
import javaSource from "./sources/HeapifySingleNode.java?raw";
import rustSource from "./sources/heapify-single-node.rs?raw";
import cppSource from "./sources/HeapifySingleNode.cpp?raw";
import goSource from "./sources/heapify-single-node.go?raw";

function executeHeapifySingleNode(input: HeapifySingleNodeInput): number[] {
  return heapifySingleNode(input.array, input.targetIndex) as number[];
}

const heapifySingleNodeDefinition: AlgorithmDefinition<HeapifySingleNodeInput> = {
  meta: {
    id: ALGORITHM_ID.HEAPIFY_SINGLE_NODE!,
    name: "Heapify Single Node",
    category: CATEGORY.HEAPS!,
    technique: "construction",
    description:
      "Demonstrate sift-down on a single subtree root, showing how one out-of-place node is pushed down to its correct position in O(log n) time",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [9, 1, 7, 2, 3, 8, 5, 6, 4], targetIndex: 0 },
  },
  execute: executeHeapifySingleNode,
  generateSteps: generateHeapifySingleNodeSteps,
  educational: heapifySingleNodeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(heapifySingleNodeDefinition);
