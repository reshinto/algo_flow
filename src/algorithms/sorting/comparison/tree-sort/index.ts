/**
 * Tree Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { treeSort } from "./sources/tree-sort.ts?fn";
import { generateTreeSortSteps } from "./step-generator";
import { treeSortEducational } from "./educational";

import typescriptSource from "./sources/tree-sort.ts?raw";
import pythonSource from "./sources/tree-sort.py?raw";
import javaSource from "./sources/TreeSort.java?raw";
import rustSource from "./sources/tree-sort.rs?raw";
import cppSource from "./sources/TreeSort.cpp?raw";
import goSource from "./sources/tree-sort.go?raw";

const treeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.TREE_SORT!,
    name: "Tree Sort",
    category: CATEGORY.SORTING!,
    technique: "comparison",
    description:
      "Inserts all elements into a Binary Search Tree, then extracts them via inorder traversal to produce sorted output",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [5, 3, 7, 1, 4, 6, 2],
  },
  execute: treeSort,
  generateSteps: generateTreeSortSteps,
  educational: treeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(treeSortDefinition);
