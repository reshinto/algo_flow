/**
 * Bitonic Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bitonicSort } from "./sources/bitonic-sort.ts?fn";
import { generateBitonicSortSteps } from "./step-generator";
import { bitonicSortEducational } from "./educational";

import typescriptSource from "./sources/bitonic-sort.ts?raw";
import pythonSource from "./sources/bitonic-sort.py?raw";
import javaSource from "./sources/BitonicSort.java?raw";
import rustSource from "./sources/bitonic-sort.rs?raw";
import cppSource from "./sources/BitonicSort.cpp?raw";
import goSource from "./sources/bitonic-sort.go?raw";

const bitonicSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.BITONIC_SORT!,
    name: "Bitonic Sort",
    category: CATEGORY.SORTING!,
    technique: "hybrid",
    description:
      "Builds a bitonic sequence via a fixed XOR-based compare-and-swap network, enabling O(log²n) parallel time — ideal for GPU and FPGA implementations",
    timeComplexity: {
      best: "O(n log²n)",
      average: "O(n log²n)",
      worst: "O(n log²n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: bitonicSort,
  generateSteps: generateBitonicSortSteps,
  educational: bitonicSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bitonicSortDefinition);
