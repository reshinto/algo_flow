import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { removeDuplicatesSorted } from "./sources/remove-duplicates-sorted.ts?fn";
import { generateRemoveDuplicatesSortedSteps } from "./step-generator";
import type { RemoveDuplicatesSortedInput } from "./step-generator";
import { removeDuplicatesSortedEducational } from "./educational";

import typescriptSource from "./sources/remove-duplicates-sorted.ts?raw";
import pythonSource from "./sources/remove-duplicates-sorted.py?raw";
import javaSource from "./sources/RemoveDuplicatesSorted.java?raw";
import rustSource from "./sources/remove-duplicates-sorted.rs?raw";
import cppSource from "./sources/RemoveDuplicatesSorted.cpp?raw";
import goSource from "./sources/remove-duplicates-sorted.go?raw";

function executeRemoveDuplicatesSorted(input: RemoveDuplicatesSortedInput): number[] {
  interface ListNode {
    value: number;
    next: ListNode | null;
  }

  const { values } = input;

  let head: ListNode | null = null;
  for (let idx = values.length - 1; idx >= 0; idx--) {
    head = { value: values[idx]!, next: head };
  }

  let node = removeDuplicatesSorted(head) as ListNode | null;
  const result: number[] = [];
  while (node !== null) {
    result.push(node.value);
    node = node.next;
  }
  return result;
}

const removeDuplicatesSortedDefinition: AlgorithmDefinition<RemoveDuplicatesSortedInput> = {
  meta: {
    id: ALGORITHM_ID.REMOVE_DUPLICATES_SORTED!,
    name: "Remove Duplicates from Sorted List",
    category: CATEGORY.LINKED_LISTS!,
    technique: "insertion-deletion",
    description:
      "Walk a sorted linked list and remove consecutive duplicate nodes by skipping to the next unique value",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { values: [1, 1, 2, 3, 3, 3, 4, 5, 5] },
  },
  execute: executeRemoveDuplicatesSorted,
  generateSteps: generateRemoveDuplicatesSortedSteps,
  educational: removeDuplicatesSortedEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(removeDuplicatesSortedDefinition);
