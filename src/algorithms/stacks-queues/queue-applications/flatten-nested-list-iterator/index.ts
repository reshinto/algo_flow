import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { flattenNestedListIterator } from "./sources/flatten-nested-list-iterator.ts?fn";
import { generateFlattenNestedListIteratorSteps } from "./step-generator";
import type { FlattenNestedListIteratorInput } from "./step-generator";
import { flattenNestedListIteratorEducational } from "./educational";

import typescriptSource from "./sources/flatten-nested-list-iterator.ts?raw";
import pythonSource from "./sources/flatten-nested-list-iterator.py?raw";
import javaSource from "./sources/FlattenNestedListIterator.java?raw";
import rustSource from "./sources/flatten-nested-list-iterator.rs?raw";
import cppSource from "./sources/FlattenNestedListIterator.cpp?raw";
import goSource from "./sources/flatten-nested-list-iterator.go?raw";

function executeFlattenNestedListIterator(input: FlattenNestedListIteratorInput): number[] {
  return flattenNestedListIterator(input.nestedList) as number[];
}

const flattenNestedListIteratorDefinition: AlgorithmDefinition<FlattenNestedListIteratorInput> = {
  meta: {
    id: ALGORITHM_ID.FLATTEN_NESTED_LIST_ITERATOR!,
    name: "Flatten Nested List Iterator",
    category: CATEGORY.STACKS_QUEUES!,
    technique: "queue-applications",
    description:
      "Use a stack to flatten an arbitrarily nested list into a sequence of integers — pop the top item, collect it if it is a number, or push its elements in reverse order if it is an array",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(d)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nestedList: [[1, [2]], 3, [4, [5, 6]]] },
  },
  execute: executeFlattenNestedListIterator,
  generateSteps: generateFlattenNestedListIteratorSteps,
  educational: flattenNestedListIteratorEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(flattenNestedListIteratorDefinition);
