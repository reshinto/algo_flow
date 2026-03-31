import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { deleteByValue } from "./sources/delete-by-value.ts?fn";
import { generateDeleteByValueSteps } from "./step-generator";
import type { DeleteByValueInput } from "./step-generator";
import { deleteByValueEducational } from "./educational";

import typescriptSource from "./sources/delete-by-value.ts?raw";
import pythonSource from "./sources/delete-by-value.py?raw";
import javaSource from "./sources/DeleteByValue.java?raw";

function executeDeleteByValue(input: DeleteByValueInput): number[] {
  interface ListNode {
    value: number;
    next: ListNode | null;
  }

  const { values, target } = input;

  let head: ListNode | null = null;
  for (let idx = values.length - 1; idx >= 0; idx--) {
    head = { value: values[idx]!, next: head };
  }

  let node = deleteByValue(head, target) as ListNode | null;
  const result: number[] = [];
  while (node !== null) {
    result.push(node.value);
    node = node.next;
  }
  return result;
}

const deleteByValueDefinition: AlgorithmDefinition<DeleteByValueInput> = {
  meta: {
    id: ALGORITHM_ID.DELETE_BY_VALUE!,
    name: "Delete by Value",
    category: CATEGORY.LINKED_LISTS!,
    technique: "insertion-deletion",
    description:
      "Find and remove the first node matching a target value by searching the list and rewiring pointers",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [1, 2, 3, 4, 5], target: 3 },
  },
  execute: executeDeleteByValue,
  generateSteps: generateDeleteByValueSteps,
  educational: deleteByValueEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(deleteByValueDefinition);
