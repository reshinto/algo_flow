/**
 * Lomuto Partition registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { lomutoPartition } from "./sources/lomuto-partition.ts?fn";
import { generateLomutoPartitionSteps } from "./step-generator";
import { lomutoPartitionEducational } from "./educational";

import typescriptSource from "./sources/lomuto-partition.ts?raw";
import pythonSource from "./sources/lomuto-partition.py?raw";
import javaSource from "./sources/LomutoPartition.java?raw";

interface LomutoPartitionInput {
  inputArray: number[];
}

const lomutoPartitionDefinition: AlgorithmDefinition<LomutoPartitionInput> = {
  meta: {
    id: ALGORITHM_ID.LOMUTO_PARTITION!,
    name: "Lomuto Partition",
    category: CATEGORY.ARRAYS!,
    description:
      "An O(n) partition scheme that selects the last element as pivot and uses a boundary pointer to place all smaller elements on the left, forming the core of QuickSort",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      inputArray: [8, 3, 6, 1, 5, 9, 2, 7],
    },
  },
  execute: (input: LomutoPartitionInput) => lomutoPartition(input.inputArray),
  generateSteps: generateLomutoPartitionSteps,
  educational: lomutoPartitionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(lomutoPartitionDefinition);
