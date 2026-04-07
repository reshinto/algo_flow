import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { heapDeleteArbitrary } from "./sources/heap-delete-arbitrary.ts?fn";
import { generateHeapDeleteArbitrarySteps } from "./step-generator";
import type { HeapDeleteArbitraryInput } from "./step-generator";
import { heapDeleteArbitraryEducational } from "./educational";

import typescriptSource from "./sources/heap-delete-arbitrary.ts?raw";
import pythonSource from "./sources/heap-delete-arbitrary.py?raw";
import javaSource from "./sources/HeapDeleteArbitrary.java?raw";
import rustSource from "./sources/heap-delete-arbitrary.rs?raw";
import cppSource from "./sources/HeapDeleteArbitrary.cpp?raw";
import goSource from "./sources/heap-delete-arbitrary.go?raw";

function executeHeapDeleteArbitrary(input: HeapDeleteArbitraryInput): number[] {
  return heapDeleteArbitrary(input.array, input.targetIndex) as number[];
}

const heapDeleteArbitraryDefinition: AlgorithmDefinition<HeapDeleteArbitraryInput> = {
  meta: {
    id: ALGORITHM_ID.HEAP_DELETE_ARBITRARY!,
    name: "Heap Delete Arbitrary",
    category: CATEGORY.HEAPS!,
    technique: "operations",
    description:
      "Remove a node at any index from a min-heap in O(log n) by replacing it with the last element and sifting up or down",
    timeComplexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { array: [1, 3, 5, 7, 9, 8, 6], targetIndex: 2 },
  },
  execute: executeHeapDeleteArbitrary,
  generateSteps: generateHeapDeleteArbitrarySteps,
  educational: heapDeleteArbitraryEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(heapDeleteArbitraryDefinition);
