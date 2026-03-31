import type { AlgorithmDefinition } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { mergeTwoSorted } from "./sources/merge-two-sorted.ts?fn";
import { generateMergeTwoSortedSteps } from "./step-generator";
import type { MergeTwoSortedInput } from "./step-generator";
import { mergeTwoSortedEducational } from "./educational";

import typescriptSource from "./sources/merge-two-sorted.ts?raw";
import pythonSource from "./sources/merge-two-sorted.py?raw";
import javaSource from "./sources/MergeTwoSorted.java?raw";

/** Convert arrays to linked lists and merge them using the algorithm. */
function executeMergeTwoSorted(input: MergeTwoSortedInput): number[] {
  interface ListNode {
    value: number;
    next: ListNode | null;
  }

  const { listA, listB } = input;

  const buildList = (values: number[]): ListNode | null => {
    let head: ListNode | null = null;
    for (let idx = values.length - 1; idx >= 0; idx--) {
      head = { value: values[idx]!, next: head };
    }
    return head;
  };

  const headA = buildList(listA);
  const headB = buildList(listB);
  const mergedHead = mergeTwoSorted(headA, headB) as ListNode | null;

  const result: number[] = [];
  let current = mergedHead;
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}

const mergeTwoSortedDefinition: AlgorithmDefinition<MergeTwoSortedInput> = {
  meta: {
    id: ALGORITHM_ID.MERGE_TWO_SORTED!,
    name: "Merge Two Sorted Lists",
    category: CATEGORY.LINKED_LISTS!,
    technique: "merge",
    description: "Combine two sorted lists into one sorted list by comparing heads",
    timeComplexity: {
      best: "O(n + m)",
      average: "O(n + m)",
      worst: "O(n + m)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { listA: [1, 3, 5, 7], listB: [2, 4, 6, 8] },
  },
  execute: executeMergeTwoSorted,
  generateSteps: generateMergeTwoSortedSteps,
  educational: mergeTwoSortedEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(mergeTwoSortedDefinition);
