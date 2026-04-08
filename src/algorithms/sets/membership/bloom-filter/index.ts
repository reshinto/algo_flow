import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bloomFilter } from "./sources/bloom-filter.ts?fn";
import { generateBloomFilterSteps } from "./step-generator";
import type { BloomFilterInput } from "./step-generator";
import { bloomFilterEducational } from "./educational";

import typescriptSource from "./sources/bloom-filter.ts?raw";
import pythonSource from "./sources/bloom-filter.py?raw";
import javaSource from "./sources/BloomFilter.java?raw";
import rustSource from "./sources/bloom-filter.rs?raw";
import cppSource from "./sources/BloomFilter.cpp?raw";
import goSource from "./sources/bloom-filter.go?raw";

function executeBloomFilter(input: BloomFilterInput): {
  results: { value: number; found: boolean }[];
} {
  return bloomFilter(input.elements, input.queries, input.size, input.hashCount) as {
    results: { value: number; found: boolean }[];
  };
}

const bloomFilterDefinition: AlgorithmDefinition<BloomFilterInput> = {
  meta: {
    id: ALGORITHM_ID.BLOOM_FILTER!,
    name: "Bloom Filter",
    category: CATEGORY.SETS!,
    technique: "membership",
    description:
      "A space-efficient probabilistic data structure using k hash functions and an m-bit array. " +
      "Inserts set k bit positions per element; queries check if all k positions are 1. " +
      "False positives are possible; false negatives are impossible. O(k) per operation, O(m) space.",
    timeComplexity: {
      best: "O(k)",
      average: "O(k)",
      worst: "O(k)",
    },
    spaceComplexity: "O(m)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      elements: [3, 7, 11, 15],
      queries: [3, 5, 7, 9, 11],
      size: 16,
      hashCount: 3,
    },
  },
  execute: executeBloomFilter,
  generateSteps: generateBloomFilterSteps,
  educational: bloomFilterEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bloomFilterDefinition);
