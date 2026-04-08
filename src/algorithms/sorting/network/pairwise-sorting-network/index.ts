/**
 * Pairwise Sorting Network algorithm registration module.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { pairwiseSortingNetwork } from "./sources/pairwise-sorting-network.ts?fn";
import { generatePairwiseSortingNetworkSteps } from "./step-generator";
import { pairwiseSortingNetworkEducational } from "./educational";

import typescriptSource from "./sources/pairwise-sorting-network.ts?raw";
import pythonSource from "./sources/pairwise-sorting-network.py?raw";
import javaSource from "./sources/PairwiseSortingNetwork.java?raw";
import rustSource from "./sources/pairwise-sorting-network.rs?raw";
import cppSource from "./sources/PairwiseSortingNetwork.cpp?raw";
import goSource from "./sources/pairwise-sorting-network.go?raw";

const pairwiseSortingNetworkDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.PAIRWISE_SORTING_NETWORK!,
    name: "Pairwise Sorting Network",
    category: CATEGORY.SORTING!,
    technique: "network",
    description:
      "Sorts adjacent pairs first, then merges using pairwise comparisons with doubling strides",
    timeComplexity: {
      best: "O(n log²n)",
      average: "O(n log²n)",
      worst: "O(n log²n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [5, 3, 8, 1, 4, 2, 7, 6],
  },
  execute: pairwiseSortingNetwork,
  generateSteps: generatePairwiseSortingNetworkSteps,
  educational: pairwiseSortingNetworkEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(pairwiseSortingNetworkDefinition);
