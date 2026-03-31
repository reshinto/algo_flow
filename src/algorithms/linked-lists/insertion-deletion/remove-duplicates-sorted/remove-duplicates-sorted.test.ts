import { describe, it, expect } from "vitest";
import { removeDuplicatesSorted } from "./sources/remove-duplicates-sorted.ts?fn";

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
  let current: ListNode | null = head;
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}

describe("removeDuplicatesSorted", () => {
  it("removes consecutive duplicates from a sorted list", () => {
    const result = removeDuplicatesSorted(buildList([1, 1, 2, 3, 3, 3, 4, 5, 5]));
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 3, 4, 5]);
  });

  it("leaves a list with no duplicates unchanged", () => {
    const result = removeDuplicatesSorted(buildList([1, 2, 3, 4, 5]));
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 3, 4, 5]);
  });

  it("handles a list of all duplicate values", () => {
    const result = removeDuplicatesSorted(buildList([7, 7, 7, 7]));
    expect(listToArray(result as ListNode | null)).toEqual([7]);
  });

  it("returns null for an empty list", () => {
    const result = removeDuplicatesSorted(null);
    expect(result).toBeNull();
  });

  it("handles a single-element list", () => {
    const result = removeDuplicatesSorted(buildList([5]));
    expect(listToArray(result as ListNode | null)).toEqual([5]);
  });

  it("removes duplicates from a two-element list", () => {
    const result = removeDuplicatesSorted(buildList([3, 3]));
    expect(listToArray(result as ListNode | null)).toEqual([3]);
  });

  it("keeps two different elements unchanged", () => {
    const result = removeDuplicatesSorted(buildList([1, 2]));
    expect(listToArray(result as ListNode | null)).toEqual([1, 2]);
  });

  it("removes duplicates with mixed run lengths", () => {
    const result = removeDuplicatesSorted(buildList([1, 2, 2, 3, 3, 3, 4]));
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 3, 4]);
  });
});
