import { describe, it, expect } from "vitest";
import { linkedListLength } from "../sources/linked-list-length.ts?fn";

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

describe("linkedListLength", () => {
  it("returns 5 for a 5-node list", () => {
    expect(linkedListLength(buildList([1, 2, 3, 4, 5]))).toBe(5);
  });

  it("returns 0 for null input", () => {
    expect(linkedListLength(null)).toBe(0);
  });

  it("returns 1 for a single-node list", () => {
    expect(linkedListLength(buildList([42]))).toBe(1);
  });

  it("returns 3 for a 3-node list", () => {
    expect(linkedListLength(buildList([10, 20, 30]))).toBe(3);
  });

  it("returns 10 for a 10-node list", () => {
    expect(linkedListLength(buildList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toBe(10);
  });
});
