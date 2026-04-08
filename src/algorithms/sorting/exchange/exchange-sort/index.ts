/**
 * Exchange Sort algorithm registration module.
 * Assembles the definition (meta, execute, steps, educational, sources)
 * and self-registers with the algorithm registry so the UI picks it up.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { exchangeSort } from "./sources/exchange-sort.ts?fn";
import { generateExchangeSortSteps } from "./step-generator";
import { exchangeSortEducational } from "./educational";

import typescriptSource from "./sources/exchange-sort.ts?raw";
import pythonSource from "./sources/exchange-sort.py?raw";
import javaSource from "./sources/ExchangeSort.java?raw";
import rustSource from "./sources/exchange-sort.rs?raw";
import cppSource from "./sources/ExchangeSort.cpp?raw";
import goSource from "./sources/exchange-sort.go?raw";

const exchangeSortDefinition: AlgorithmDefinition<number[]> = {
  meta: {
    id: ALGORITHM_ID.EXCHANGE_SORT!,
    name: "Exchange Sort",
    category: CATEGORY.SORTING!,
    technique: "exchange",
    description:
      "For each element, compares with all subsequent elements and swaps immediately if out of order",
    timeComplexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: [64, 34, 25, 12, 22, 11, 90],
  },
  execute: exchangeSort,
  generateSteps: generateExchangeSortSteps,
  educational: exchangeSortEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(exchangeSortDefinition);
