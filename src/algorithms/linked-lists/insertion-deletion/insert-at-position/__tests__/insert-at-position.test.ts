import { describe, it, expect } from "vitest";
import { insertAtPosition } from "../sources/insert-at-position.ts?fn";

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

describe("insertAtPosition", () => {
  it("inserts at position 2 in a 4-node list", () => {
    const result = insertAtPosition(buildList([1, 3, 5, 7]), 4, 2);
    expect(listToArray(result as ListNode | null)).toEqual([1, 3, 4, 5, 7]);
  });

  it("inserts at position 0 (head) prepends the node", () => {
    const result = insertAtPosition(buildList([2, 3, 4]), 1, 0);
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 3, 4]);
  });

  it("inserts at the end of a 3-node list", () => {
    const result = insertAtPosition(buildList([1, 2, 3]), 4, 3);
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 3, 4]);
  });

  it("inserts into an empty list at position 0", () => {
    const result = insertAtPosition(null, 5, 0);
    expect(listToArray(result as ListNode | null)).toEqual([5]);
  });

  it("inserts into a single-node list at position 1", () => {
    const result = insertAtPosition(buildList([10]), 20, 1);
    expect(listToArray(result as ListNode | null)).toEqual([10, 20]);
  });

  it("handles insertion at position beyond list length gracefully", () => {
    const result = insertAtPosition(buildList([1, 2]), 3, 10);
    // Position exceeds list length, so insertion fails silently
    expect(listToArray(result as ListNode | null)).toEqual([1, 2]);
  });

  it("inserts value 0 at position 1", () => {
    const result = insertAtPosition(buildList([1, 2]), 0, 1);
    expect(listToArray(result as ListNode | null)).toEqual([1, 0, 2]);
  });
});
