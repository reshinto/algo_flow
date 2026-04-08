import { describe, it, expect } from "vitest";
import { deleteByValue } from "../sources/delete-by-value.ts?fn";

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

describe("deleteByValue", () => {
  it("deletes a node in the middle of the list", () => {
    const result = deleteByValue(buildList([1, 2, 3, 4, 5]), 3);
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 4, 5]);
  });

  it("deletes the head of the list", () => {
    const result = deleteByValue(buildList([1, 2, 3]), 1);
    expect(listToArray(result as ListNode | null)).toEqual([2, 3]);
  });

  it("deletes the last node in the list", () => {
    const result = deleteByValue(buildList([1, 2, 3, 4]), 4);
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 3]);
  });

  it("returns null for an empty list", () => {
    const result = deleteByValue(null, 5);
    expect(result).toBeNull();
  });

  it("returns the list unchanged when target is not found", () => {
    const result = deleteByValue(buildList([1, 2, 3]), 99);
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 3]);
  });

  it("deletes from a single-node list", () => {
    const result = deleteByValue(buildList([7]), 7);
    expect(listToArray(result as ListNode | null)).toEqual([]);
  });

  it("does not delete when single-node list value differs from target", () => {
    const result = deleteByValue(buildList([7]), 5);
    expect(listToArray(result as ListNode | null)).toEqual([7]);
  });

  it("deletes only the first occurrence", () => {
    const result = deleteByValue(buildList([1, 2, 2, 3]), 2);
    expect(listToArray(result as ListNode | null)).toEqual([1, 2, 3]);
  });
});
