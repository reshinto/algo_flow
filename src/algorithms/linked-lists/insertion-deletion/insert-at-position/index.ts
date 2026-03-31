import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { insertAtPosition } from "./sources/insert-at-position.ts?fn";
import { generateInsertAtPositionSteps } from "./step-generator";
import type { InsertAtPositionInput } from "./step-generator";
import { insertAtPositionEducational } from "./educational";

import typescriptSource from "./sources/insert-at-position.ts?raw";
import pythonSource from "./sources/insert-at-position.py?raw";
import javaSource from "./sources/InsertAtPosition.java?raw";

function executeInsertAtPosition(input: InsertAtPositionInput): number[] {
  interface ListNode {
    value: number;
    next: ListNode | null;
  }

  const { values, insertValue, position } = input;

  let head: ListNode | null = null;
  for (let idx = values.length - 1; idx >= 0; idx--) {
    head = { value: values[idx]!, next: head };
  }

  let node = insertAtPosition(head, insertValue, position) as ListNode | null;
  const result: number[] = [];
  while (node !== null) {
    result.push(node.value);
    node = node.next;
  }
  return result;
}

const insertAtPositionDefinition: AlgorithmDefinition<InsertAtPositionInput> = {
  meta: {
    id: ALGORITHM_ID.INSERT_AT_POSITION!,
    name: "Insert at Position",
    category: CATEGORY.LINKED_LISTS!,
    technique: "insertion-deletion",
    description:
      "Insert a new node at a specified position by traversing to the predecessor and rewiring pointers",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [1, 3, 5, 7], insertValue: 4, position: 2 },
  },
  execute: executeInsertAtPosition,
  generateSteps: generateInsertAtPositionSteps,
  educational: insertAtPositionEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(insertAtPositionDefinition);
