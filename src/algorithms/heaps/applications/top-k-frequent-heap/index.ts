import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { topKFrequentHeap } from "./sources/top-k-frequent-heap.ts?fn";
import { generateTopKFrequentHeapSteps } from "./step-generator";
import type { TopKFrequentHeapInput } from "./step-generator";
import { topKFrequentHeapEducational } from "./educational";

import typescriptSource from "./sources/top-k-frequent-heap.ts?raw";
import pythonSource from "./sources/top-k-frequent-heap.py?raw";
import javaSource from "./sources/TopKFrequentHeap.java?raw";

function executeTopKFrequentHeap(input: TopKFrequentHeapInput): number[] {
  return topKFrequentHeap(input.array, input.kValue) as number[];
}

const topKFrequentHeapDefinition: AlgorithmDefinition<TopKFrequentHeapInput> = {
  meta: {
    id: ALGORITHM_ID.TOP_K_FREQUENT_HEAP!,
    name: "Top-K Frequent Elements (Heap)",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Find the k most frequent elements in an array using a min-heap of size k — O(n log k) time without sorting all elements",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log k)",
      worst: "O(n log n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [1, 1, 1, 2, 2, 3, 3, 3, 3, 4], kValue: 2 },
  },
  execute: executeTopKFrequentHeap,
  generateSteps: generateTopKFrequentHeapSteps,
  educational: topKFrequentHeapEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(topKFrequentHeapDefinition);
