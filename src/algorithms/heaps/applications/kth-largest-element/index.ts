import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kthLargestElement } from "./sources/kth-largest-element.ts?fn";
import { generateKthLargestElementSteps } from "./step-generator";
import type { KthLargestElementInput } from "./step-generator";
import { kthLargestElementEducational } from "./educational";

import typescriptSource from "./sources/kth-largest-element.ts?raw";
import pythonSource from "./sources/kth-largest-element.py?raw";
import javaSource from "./sources/KthLargestElement.java?raw";

function executeKthLargestElement(input: KthLargestElementInput): number {
  return kthLargestElement(input.array, input.kValue) as number;
}

const kthLargestElementDefinition: AlgorithmDefinition<KthLargestElementInput> = {
  meta: {
    id: ALGORITHM_ID.KTH_LARGEST_ELEMENT!,
    name: "Kth Largest Element",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Find the kth largest element in an unsorted array using a min-heap of size k in O(n log k) time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log k)",
      worst: "O(n log k)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [3, 1, 5, 12, 2, 11, 7, 9], kValue: 3 },
  },
  execute: executeKthLargestElement,
  generateSteps: generateKthLargestElementSteps,
  educational: kthLargestElementEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(kthLargestElementDefinition);
