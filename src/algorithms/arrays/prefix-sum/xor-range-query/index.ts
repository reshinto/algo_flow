/**
 * XOR Range Query algorithm registration module.
 * Assembles the definition and self-registers with the algorithm registry.
 */
import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { xorRangeQuery } from "./sources/xor-range-query.ts?fn";
import { generateXorRangeQuerySteps } from "./step-generator";
import { xorRangeQueryEducational } from "./educational";

import typescriptSource from "./sources/xor-range-query.ts?raw";
import pythonSource from "./sources/xor-range-query.py?raw";
import javaSource from "./sources/XorRangeQuery.java?raw";
import rustSource from "./sources/xor-range-query.rs?raw";
import cppSource from "./sources/XorRangeQuery.cpp?raw";
import goSource from "./sources/xor-range-query.go?raw";

interface XorRangeQueryInput {
  inputArray: number[];
  queries: number[][];
}

const xorRangeQueryDefinition: AlgorithmDefinition<XorRangeQueryInput> = {
  meta: {
    id: ALGORITHM_ID.XOR_RANGE_QUERY!,
    name: "XOR Range Query",
    category: CATEGORY.ARRAYS!,
    technique: "prefix-sum",
    description:
      "Builds a prefix XOR array in O(n) to answer range XOR queries in O(1), using the self-inverse property of XOR to cancel prefix values outside the queried range",
    timeComplexity: {
      best: "O(n) build + O(1) query",
      average: "O(n) build + O(1) query",
      worst: "O(n) build + O(1) query",
    },
    spaceComplexity: "O(n)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [
        [0, 2],
        [1, 4],
        [2, 5],
      ],
    },
  },
  execute: (input: XorRangeQueryInput) => xorRangeQuery(input.inputArray, input.queries),
  generateSteps: generateXorRangeQuerySteps,
  educational: xorRangeQueryEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(xorRangeQueryDefinition);
