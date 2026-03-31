import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kthSmallestElement } from "./sources/kth-smallest-element.ts?fn";
import { generateKthSmallestElementSteps } from "./step-generator";
import type { KthSmallestElementInput } from "./step-generator";
import { kthSmallestElementEducational } from "./educational";

import typescriptSource from "./sources/kth-smallest-element.ts?raw";
import pythonSource from "./sources/kth-smallest-element.py?raw";
import javaSource from "./sources/KthSmallestElement.java?raw";

function executeKthSmallestElement(input: KthSmallestElementInput): number {
  return kthSmallestElement(input.array, input.kValue) as number;
}

const kthSmallestElementDefinition: AlgorithmDefinition<KthSmallestElementInput> = {
  meta: {
    id: ALGORITHM_ID.KTH_SMALLEST_ELEMENT!,
    name: "Kth Smallest Element",
    category: CATEGORY.HEAPS!,
    technique: "applications",
    description:
      "Find the kth smallest element in an unsorted array using a max-heap of size k in O(n log k) time",
    timeComplexity: {
      best: "O(n)",
      average: "O(n log k)",
      worst: "O(n log k)",
    },
    spaceComplexity: "O(k)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { array: [7, 10, 4, 3, 20, 15, 8], kValue: 3 },
  },
  execute: executeKthSmallestElement,
  generateSteps: generateKthSmallestElementSteps,
  educational: kthSmallestElementEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(kthSmallestElementDefinition);
