/**
 * Bitonic Sort Network algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bitonicSortNetwork } from "./sources/bitonic-sort-network.ts?fn";
import { generateBitonicSortNetworkSteps } from "./step-generator";
import { bitonicSortNetworkEducational } from "./educational";

import typescriptSource from "./sources/bitonic-sort-network.ts?raw";
import pythonSource from "./sources/bitonic-sort-network.py?raw";
import javaSource from "./sources/BitonicSortNetwork.java?raw";
import rustSource from "./sources/bitonic-sort-network.rs?raw";
import cppSource from "./sources/BitonicSortNetwork.cpp?raw";
import goSource from "./sources/bitonic-sort-network.go?raw";

const bitonicSortNetworkDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BITONIC_SORT_NETWORK!,
    name: "Bitonic Sort Network",
    category: CATEGORY.SORTING!,
    technique: "network",
    description:
      "A parallel sorting network that constructs bitonic sequences and merges them using a fixed compare-swap circuit",
    timeComplexity: {
      best: "O(n log²n)",
      average: "O(n log²n)",
      worst: "O(n log²n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [6, 3, 8, 1, 7, 2, 5, 4],
  },
  execute: bitonicSortNetwork,
  generateSteps: generateBitonicSortNetworkSteps,
  educational: bitonicSortNetworkEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bitonicSortNetworkDefinition);
