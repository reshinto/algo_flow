import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { binaryIndexedTree } from "./sources/binary-indexed-tree.ts?fn";
import { generateBinaryIndexedTreeSteps } from "./step-generator";
import type { BinaryIndexedTreeInput } from "./step-generator";
import { binaryIndexedTreeEducational } from "./educational";

import typescriptSource from "./sources/binary-indexed-tree.ts?raw";
import pythonSource from "./sources/binary-indexed-tree.py?raw";
import javaSource from "./sources/BinaryIndexedTree.java?raw";

function executeBinaryIndexedTree(input: BinaryIndexedTreeInput): number[] {
  return binaryIndexedTree(input.array, input.queries) as number[];
}

const binaryIndexedTreeDefinition: AlgorithmDefinition<BinaryIndexedTreeInput> = {
  meta: {
    id: ALGORITHM_ID.BINARY_INDEXED_TREE!,
    name: "Binary Indexed Tree (Fenwick)",
    category: CATEGORY.TREES!,
    technique: "advanced",
    description:
      "Build a Fenwick Tree for O(log n) prefix sum queries and point updates using the LSB bit trick",
    timeComplexity: { best: "O(n + q log n)", average: "O(n + q log n)", worst: "O(n + q log n)" },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      array: [3, 2, 4, 5, 1, 1, 5, 3],
      queries: [
        [0, 4],
        [2, 6],
      ],
    },
  },
  execute: executeBinaryIndexedTree,
  generateSteps: generateBinaryIndexedTreeSteps,
  educational: binaryIndexedTreeEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(binaryIndexedTreeDefinition);
