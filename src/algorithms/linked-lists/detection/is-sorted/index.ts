import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { isSorted } from "./sources/is-sorted.ts?fn";
import { generateIsSortedSteps } from "./step-generator";
import type { IsSortedInput } from "./step-generator";
import { isSortedEducational } from "./educational";

import typescriptSource from "./sources/is-sorted.ts?raw";
import pythonSource from "./sources/is-sorted.py?raw";
import javaSource from "./sources/IsSorted.java?raw";
import rustSource from "./sources/is-sorted.rs?raw";
import cppSource from "./sources/IsSorted.cpp?raw";
import goSource from "./sources/is-sorted.go?raw";

/** Convert an array of values to a linked list and check if sorted. */
function executeIsSorted(input: IsSortedInput): boolean {
  interface ListNode {
    value: number;
    next: ListNode | null;
  }

  const { values } = input;
  if (values.length === 0) return isSorted(null) as boolean;

  let head: ListNode | null = null;
  for (let idx = values.length - 1; idx >= 0; idx--) {
    head = { value: values[idx]!, next: head };
  }

  return isSorted(head) as boolean;
}

const isSortedDefinition: AlgorithmDefinition<IsSortedInput> = {
  meta: {
    id: ALGORITHM_ID.IS_SORTED!,
    name: "Check if Sorted",
    category: CATEGORY.LINKED_LISTS!,
    technique: "detection",
    description: "Verify each node's value is ≤ the next node's value in a single pass",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { values: [1, 3, 5, 7, 9] },
  },
  execute: executeIsSorted,
  generateSteps: generateIsSortedSteps,
  educational: isSortedEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(isSortedDefinition);
