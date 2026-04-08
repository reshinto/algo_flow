/**
 * Cartesian Tree Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { cartesianTreeSort } from "./sources/cartesian-tree-sort.ts?fn";
import { generateCartesianTreeSortSteps } from "./step-generator";
import { cartesianTreeSortEducational } from "./educational";

import typescriptSource from "./sources/cartesian-tree-sort.ts?raw";
import pythonSource from "./sources/cartesian-tree-sort.py?raw";
import javaSource from "./sources/CartesianTreeSort.java?raw";
import rustSource from "./sources/cartesian-tree-sort.rs?raw";
import cppSource from "./sources/CartesianTreeSort.cpp?raw";
import goSource from "./sources/cartesian-tree-sort.go?raw";

const cartesianTreeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.CARTESIAN_TREE_SORT!,
    name: "Cartesian Tree Sort",
    category: CATEGORY.SORTING!,
    technique: "selection",
    description:
      "Builds a min-heap Cartesian tree from the array in O(n) using a monotone stack, then extracts sorted elements via inorder traversal",
    timeComplexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: cartesianTreeSort,
  generateSteps: generateCartesianTreeSortSteps,
  educational: cartesianTreeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(cartesianTreeSortDefinition);
