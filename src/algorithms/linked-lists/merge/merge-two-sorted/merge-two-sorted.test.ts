import { describe, it, expect } from "vitest";
import { mergeTwoSorted } from "./sources/merge-two-sorted.ts?fn";

interface ListNode {
  value: number;
  next: ListNode | null;
}

function buildList(values: number[]): ListNode | null {
  let head: ListNode | null = null;
  for (let idx = values.length - 1; idx >= 0; idx--) {
    head = { value: values[idx]!, next: head };
  }
  return head;
}

function listToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}

describe("mergeTwoSorted", () => {
  it("merges [1, 3, 5, 7] and [2, 4, 6, 8] to [1, 2, 3, 4, 5, 6, 7, 8]", () => {
    const listA = buildList([1, 3, 5, 7]);
    const listB = buildList([2, 4, 6, 8]);
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("merges two empty lists to empty list", () => {
    const merged = mergeTwoSorted(null, null) as ListNode | null;
    expect(listToArray(merged)).toEqual([]);
  });

  it("merges empty list with [1, 2, 3] to [1, 2, 3]", () => {
    const listA = null;
    const listB = buildList([1, 2, 3]);
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([1, 2, 3]);
  });

  it("merges [1, 2, 3] with empty list to [1, 2, 3]", () => {
    const listA = buildList([1, 2, 3]);
    const listB = null;
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([1, 2, 3]);
  });

  it("merges [1] and [2] to [1, 2]", () => {
    const listA = buildList([1]);
    const listB = buildList([2]);
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([1, 2]);
  });

  it("merges [1, 2, 3] and [4, 5, 6] to [1, 2, 3, 4, 5, 6]", () => {
    const listA = buildList([1, 2, 3]);
    const listB = buildList([4, 5, 6]);
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("merges [4, 5, 6] and [1, 2, 3] to [1, 2, 3, 4, 5, 6]", () => {
    const listA = buildList([4, 5, 6]);
    const listB = buildList([1, 2, 3]);
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("merges lists with duplicate values [1, 3, 5] and [1, 4, 5]", () => {
    const listA = buildList([1, 3, 5]);
    const listB = buildList([1, 4, 5]);
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([1, 1, 3, 4, 5, 5]);
  });

  it("merges single-node list [5] with [3] to [3, 5]", () => {
    const listA = buildList([5]);
    const listB = buildList([3]);
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([3, 5]);
  });

  it("merges [10, 20, 30] and [15, 25] to [10, 15, 20, 25, 30]", () => {
    const listA = buildList([10, 20, 30]);
    const listB = buildList([15, 25]);
    const merged = mergeTwoSorted(listA, listB) as ListNode | null;
    expect(listToArray(merged)).toEqual([10, 15, 20, 25, 30]);
  });
});
