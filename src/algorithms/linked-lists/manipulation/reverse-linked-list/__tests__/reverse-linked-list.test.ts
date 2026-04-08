import { describe, it, expect } from "vitest";
import { reverseLinkedList } from "../sources/reverse-linked-list.ts?fn";

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
  let current: ListNode | null = head as ListNode | null;
  while (current !== null) {
    result.push(current.value);
    current = current.next;
  }
  return result;
}

describe("reverseLinkedList", () => {
  it("reverses a 5-node list", () => {
    const result = reverseLinkedList(buildList([1, 2, 3, 4, 5]));
    expect(listToArray(result as ListNode | null)).toEqual([5, 4, 3, 2, 1]);
  });

  it("returns null for a null input", () => {
    expect(reverseLinkedList(null)).toBeNull();
  });

  it("handles a single-node list", () => {
    const result = reverseLinkedList(buildList([42]));
    expect(listToArray(result as ListNode | null)).toEqual([42]);
  });

  it("handles a two-node list", () => {
    const result = reverseLinkedList(buildList([1, 2]));
    expect(listToArray(result as ListNode | null)).toEqual([2, 1]);
  });

  it("handles a three-node list", () => {
    const result = reverseLinkedList(buildList([3, 1, 4]));
    expect(listToArray(result as ListNode | null)).toEqual([4, 1, 3]);
  });

  it("new head is last element of original list", () => {
    const result = reverseLinkedList(buildList([10, 20, 30])) as ListNode | null;
    expect(result?.value).toBe(30);
  });
});
