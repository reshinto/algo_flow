import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { kthSmallestSortedMatrix } from "./sources/kth-smallest-sorted-matrix.ts?fn";
import { generateKthSmallestSortedMatrixSteps } from "./step-generator";
import type { KthSmallestSortedMatrixInput } from "./step-generator";
import { kthSmallestSortedMatrixEducational } from "./educational";

import typescriptSource from "./sources/kth-smallest-sorted-matrix.ts?raw";
import pythonSource from "./sources/kth-smallest-sorted-matrix.py?raw";
import javaSource from "./sources/KthSmallestSortedMatrix.java?raw";
import rustSource from "./sources/kth-smallest-sorted-matrix.rs?raw";
import cppSource from "./sources/KthSmallestSortedMatrix.cpp?raw";
import goSource from "./sources/kth-smallest-sorted-matrix.go?raw";

function executeKthSmallestSortedMatrix(input: KthSmallestSortedMatrixInput): number {
  return kthSmallestSortedMatrix(input.matrix, input.targetK) as number;
}

const kthSmallestSortedMatrixDefinition: AlgorithmDefinition<KthSmallestSortedMatrixInput> = {
  meta: {
    id: ALGORITHM_ID.KTH_SMALLEST_SORTED_MATRIX!,
    name: "Kth Smallest in Sorted Matrix",
    category: CATEGORY.MATRICES!,
    technique: "search",
    description:
      "Find the kth smallest element in a row-and-column sorted matrix using binary search on value range — O(n × log(max − min)) time, O(1) space",
    timeComplexity: {
      best: "O(n × log(max − min))",
      average: "O(n × log(max − min))",
      worst: "O(n × log(max − min))",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      matrix: [
        [1, 5, 9],
        [10, 11, 13],
        [12, 13, 15],
      ],
      targetK: 8,
    },
  },
  execute: executeKthSmallestSortedMatrix,
  generateSteps: generateKthSmallestSortedMatrixSteps,
  educational: kthSmallestSortedMatrixEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(kthSmallestSortedMatrixDefinition);
