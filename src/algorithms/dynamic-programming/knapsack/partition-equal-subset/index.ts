import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { partitionEqualSubset } from "./sources/partition-equal-subset.ts?fn";
import { generatePartitionEqualSubsetSteps } from "./step-generator";
import { partitionEqualSubsetEducational } from "./educational";

import typescriptSource from "./sources/partition-equal-subset.ts?raw";
import pythonSource from "./sources/partition-equal-subset.py?raw";
import javaSource from "./sources/PartitionEqualSubset.java?raw";

export interface PartitionSubsetInput {
  numbers: number[];
}

const partitionEqualSubsetDefinition: AlgorithmDefinition<PartitionSubsetInput> = {
  meta: {
    id: ALGORITHM_ID.PARTITION_EQUAL_SUBSET!,
    name: "Partition Equal Subset Sum (Tabulation)",
    category: CATEGORY.DYNAMIC_PROGRAMMING!,
    technique: "knapsack",
    description:
      "A bottom-up dynamic programming approach that determines whether an array can be split into two subsets with equal sums, using a boolean DP table filled right-to-left to enforce the 0/1 constraint",
    timeComplexity: {
      best: "O(1)",
      average: "O(n × sum)",
      worst: "O(n × sum)",
    },
    spaceComplexity: "O(sum)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { numbers: [1, 5, 11, 5] },
  },
  execute: (input: PartitionSubsetInput) => partitionEqualSubset(input.numbers),
  generateSteps: generatePartitionEqualSubsetSteps,
  educational: partitionEqualSubsetEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(partitionEqualSubsetDefinition);
