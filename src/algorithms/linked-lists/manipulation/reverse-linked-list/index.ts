import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { reverseLinkedList } from "./sources/reverse-linked-list.ts?fn";
import { generateReverseLinkedListSteps } from "./step-generator";
import type { ReverseLinkedListInput } from "./step-generator";
import { reverseLinkedListEducational } from "./educational";

import typescriptSource from "./sources/reverse-linked-list.ts?raw";
import pythonSource from "./sources/reverse-linked-list.py?raw";
import javaSource from "./sources/ReverseLinkedList.java?raw";

/** Convert an array of values to a ?fn-compatible linked list and back. */
function executeReverseLinkedList(input: ReverseLinkedListInput): number[] {
  interface ListNode {
    value: number;
    next: ListNode | null;
  }

  const { values } = input;
  if (values.length === 0) return [];

  let head: ListNode | null = null;
  for (let idx = values.length - 1; idx >= 0; idx--) {
    head = { value: values[idx]!, next: head };
  }

  let node = reverseLinkedList(head) as ListNode | null;
  const result: number[] = [];
  while (node !== null) {
    result.push(node.value);
    node = node.next;
  }
  return result;
}

const reverseLinkedListDefinition: AlgorithmDefinition<ReverseLinkedListInput> = {
  meta: {
    id: ALGORITHM_ID.REVERSE_LINKED_LIST!,
    name: "Reverse Linked List",
    category: CATEGORY.LINKED_LISTS!,
    technique: "manipulation",
    description:
      "Iteratively reverse a singly linked list by redirecting each node's next pointer to its predecessor using three moving pointers",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [1, 2, 3, 4, 5] },
  },
  execute: executeReverseLinkedList,
  generateSteps: generateReverseLinkedListSteps,
  educational: reverseLinkedListEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(reverseLinkedListDefinition);
