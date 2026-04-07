import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { cuckooFilter } from "./sources/cuckoo-filter.ts?fn";
import { generateCuckooFilterSteps } from "./step-generator";
import type { CuckooFilterInput } from "./step-generator";
import { cuckooFilterEducational } from "./educational";

import typescriptSource from "./sources/cuckoo-filter.ts?raw";
import pythonSource from "./sources/cuckoo-filter.py?raw";
import javaSource from "./sources/CuckooFilter.java?raw";
import rustSource from "./sources/cuckoo-filter.rs?raw";
import cppSource from "./sources/CuckooFilter.cpp?raw";
import goSource from "./sources/cuckoo-filter.go?raw";

function executeCuckooFilter(input: CuckooFilterInput): {
  results: { value: number; found: boolean }[];
} {
  return cuckooFilter(input.elements, input.queries, input.bucketCount) as {
    results: { value: number; found: boolean }[];
  };
}

const cuckooFilterDefinition: AlgorithmDefinition<CuckooFilterInput> = {
  meta: {
    id: ALGORITHM_ID.CUCKOO_FILTER!,
    name: "Cuckoo Filter",
    category: CATEGORY.SETS!,
    technique: "membership",
    description:
      "A space-efficient probabilistic data structure that stores fingerprints in a bucket array. " +
      "Each element maps to 2 candidate buckets via its fingerprint. " +
      "Insertion uses cuckoo displacement — evicting fingerprints to alternate buckets when both slots are full. " +
      "Query checks both candidate buckets in O(1). Supports deletion, unlike Bloom filters.",
    timeComplexity: {
      best: "O(1)",
      average: "O(1)",
      worst: "O(n)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      elements: [3, 7, 11, 15],
      queries: [3, 5, 7, 9],
      bucketCount: 8,
    },
  },
  execute: executeCuckooFilter,
  generateSteps: generateCuckooFilterSteps,
  educational: cuckooFilterEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(cuckooFilterDefinition);
