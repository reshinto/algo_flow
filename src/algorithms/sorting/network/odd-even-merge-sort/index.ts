/**
 * Odd-Even Merge Sort algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { oddEvenMergeSort } from "./sources/odd-even-merge-sort.ts?fn";
import { generateOddEvenMergeSortSteps } from "./step-generator";
import { oddEvenMergeSortEducational } from "./educational";

import typescriptSource from "./sources/odd-even-merge-sort.ts?raw";
import pythonSource from "./sources/odd-even-merge-sort.py?raw";
import javaSource from "./sources/OddEvenMergeSort.java?raw";
import rustSource from "./sources/odd-even-merge-sort.rs?raw";
import cppSource from "./sources/OddEvenMergeSort.cpp?raw";
import goSource from "./sources/odd-even-merge-sort.go?raw";

const oddEvenMergeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.ODD_EVEN_MERGE_SORT!,
    name: "Odd-Even Merge Sort",
    category: CATEGORY.SORTING!,
    technique: "network",
    description:
      "Batcher's odd-even merge network: recursively merges odd-indexed and even-indexed sub-sequences using a fixed compare-swap circuit",
    timeComplexity: {
      best: "O(n log²n)",
      average: "O(n log²n)",
      worst: "O(n log²n)",
    },
    spaceComplexity: "O(log²n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [6, 3, 8, 1, 7, 2, 5, 4],
  },
  execute: oddEvenMergeSort,
  generateSteps: generateOddEvenMergeSortSteps,
  educational: oddEvenMergeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(oddEvenMergeSortDefinition);
