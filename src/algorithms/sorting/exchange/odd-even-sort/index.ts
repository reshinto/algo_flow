/**
 * Odd-Even Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { oddEvenSort } from "./sources/odd-even-sort.ts?fn";
import { generateOddEvenSortSteps } from "./step-generator";
import { oddEvenSortEducational } from "./educational";

import typescriptSource from "./sources/odd-even-sort.ts?raw";
import pythonSource from "./sources/odd-even-sort.py?raw";
import javaSource from "./sources/OddEvenSort.java?raw";
import rustSource from "./sources/odd-even-sort.rs?raw";
import cppSource from "./sources/OddEvenSort.cpp?raw";
import goSource from "./sources/odd-even-sort.go?raw";

const oddEvenSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.ODD_EVEN_SORT!,
    name: "Odd-Even Sort",
    category: CATEGORY.SORTING!,
    technique: "exchange",
    description:
      "Alternates between odd-indexed and even-indexed adjacent pair comparisons — parallelizable sorting network foundation",
    timeComplexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: oddEvenSort,
  generateSteps: generateOddEvenSortSteps,
  educational: oddEvenSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(oddEvenSortDefinition);
