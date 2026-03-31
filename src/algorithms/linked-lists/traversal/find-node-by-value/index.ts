import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { findNodeByValue } from "./sources/find-node-by-value.ts?fn";
import { generateFindNodeByValueSteps } from "./step-generator";
import type { FindNodeByValueInput } from "./step-generator";
import { findNodeByValueEducational } from "./educational";

import typescriptSource from "./sources/find-node-by-value.ts?raw";
import pythonSource from "./sources/find-node-by-value.py?raw";
import javaSource from "./sources/FindNodeByValue.java?raw";

/** Convert an array of values to a ?fn-compatible linked list and call the algorithm. */
function executeFindNodeByValue(input: FindNodeByValueInput): number | null {
  interface ListNode {
    value: number;
    next: ListNode | null;
  }

  const { values, target } = input;
  if (values.length === 0) return null;

  let head: ListNode | null = null;
  for (let idx = values.length - 1; idx >= 0; idx--) {
    head = { value: values[idx]!, next: head };
  }

  const result = findNodeByValue(head, target) as ListNode | null;
  return result !== null ? result.value : null;
}

const findNodeByValueDefinition: AlgorithmDefinition<FindNodeByValueInput> = {
  meta: {
    id: ALGORITHM_ID.FIND_NODE_BY_VALUE!,
    name: "Find Node by Value",
    category: CATEGORY.LINKED_LISTS!,
    technique: "traversal",
    description:
      "Walk the list comparing each node's value to a target, returning the node or null",
    timeComplexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { values: [4, 2, 7, 1, 9], target: 7 },
  },
  execute: executeFindNodeByValue,
  generateSteps: generateFindNodeByValueSteps,
  educational: findNodeByValueEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(findNodeByValueDefinition);
