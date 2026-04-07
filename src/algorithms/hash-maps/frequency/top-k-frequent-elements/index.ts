import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { topKFrequentElements } from "./sources/top-k-frequent-elements.ts?fn";
import { generateTopKFrequentElementsSteps } from "./step-generator";
import type { TopKFrequentElementsInput } from "./step-generator";
import { topKFrequentElementsEducational } from "./educational";

import typescriptSource from "./sources/top-k-frequent-elements.ts?raw";
import pythonSource from "./sources/top-k-frequent-elements.py?raw";
import javaSource from "./sources/TopKFrequentElements.java?raw";
import rustSource from "./sources/top-k-frequent-elements.rs?raw";
import cppSource from "./sources/TopKFrequentElements.cpp?raw";
import goSource from "./sources/top-k-frequent-elements.go?raw";

function executeTopKFrequentElements(input: TopKFrequentElementsInput): number[] {
  return topKFrequentElements(input.numbers, input.topK) as number[];
}

const topKFrequentElementsDefinition: AlgorithmDefinition<TopKFrequentElementsInput> = {
  meta: {
    id: ALGORITHM_ID.TOP_K_FREQUENT_ELEMENTS!,
    name: "Top K Frequent Elements",
    category: CATEGORY.HASH_MAPS!,
    technique: "frequency",
    description:
      "Find the k most frequent elements in O(n) time using a frequency map and bucket sort",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { numbers: [1, 1, 1, 2, 2, 3], topK: 2 },
  },
  execute: executeTopKFrequentElements,
  generateSteps: generateTopKFrequentElementsSteps,
  educational: topKFrequentElementsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(topKFrequentElementsDefinition);
