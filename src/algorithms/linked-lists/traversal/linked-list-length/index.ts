import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { linkedListLength } from "./sources/linked-list-length.ts?fn";
import { generateLinkedListLengthSteps } from "./step-generator";
import type { LinkedListLengthInput } from "./step-generator";
import { linkedListLengthEducational } from "./educational";

import typescriptSource from "./sources/linked-list-length.ts?raw";
import pythonSource from "./sources/linked-list-length.py?raw";
import javaSource from "./sources/LinkedListLength.java?raw";

/** Convert an array of values to a ?fn-compatible linked list and call the algorithm. */
function executeLinkedListLength(input: LinkedListLengthInput): number {
  interface ListNode {
    value: number;
    next: ListNode | null;
  }

  const { values } = input;
  if (values.length === 0) return linkedListLength(null) as number;

  let head: ListNode | null = null;
  for (let idx = values.length - 1; idx >= 0; idx--) {
    head = { value: values[idx]!, next: head };
  }

  return linkedListLength(head) as number;
}

const linkedListLengthDefinition: AlgorithmDefinition<LinkedListLengthInput> = {
  meta: {
    id: ALGORITHM_ID.LINKED_LIST_LENGTH!,
    name: "Linked List Length",
    category: CATEGORY.LINKED_LISTS!,
    technique: "traversal",
    description: "Count the number of nodes by traversing the list from head to null",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [1, 2, 3, 4, 5] },
  },
  execute: executeLinkedListLength,
  generateSteps: generateLinkedListLengthSteps,
  educational: linkedListLengthEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(linkedListLengthDefinition);
