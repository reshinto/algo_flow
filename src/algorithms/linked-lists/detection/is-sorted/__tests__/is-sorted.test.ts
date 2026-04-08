import { describe, it, expect } from "vitest";
import { isSorted } from "../sources/is-sorted.ts?fn";

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

describe("isSorted", () => {
  it("returns true for a sorted list [1, 3, 5, 7, 9]", () => {
    expect(isSorted(buildList([1, 3, 5, 7, 9]))).toBe(true);
  });

  it("returns true for an empty list", () => {
    expect(isSorted(null)).toBe(true);
  });

  it("returns true for a single-node list", () => {
    expect(isSorted(buildList([42]))).toBe(true);
  });

  it("returns false for an unsorted list [1, 5, 3, 7]", () => {
    expect(isSorted(buildList([1, 5, 3, 7]))).toBe(false);
  });

  it("returns true for a list with duplicates [2, 2, 3, 3, 5]", () => {
    expect(isSorted(buildList([2, 2, 3, 3, 5]))).toBe(true);
  });

  it("returns true for a two-node sorted list [1, 2]", () => {
    expect(isSorted(buildList([1, 2]))).toBe(true);
  });

  it("returns false for a two-node unsorted list [5, 2]", () => {
    expect(isSorted(buildList([5, 2]))).toBe(false);
  });

  it("returns false when first pair is unsorted [5, 1, 2, 3]", () => {
    expect(isSorted(buildList([5, 1, 2, 3]))).toBe(false);
  });

  it("returns true for a long sorted list", () => {
    expect(isSorted(buildList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))).toBe(true);
  });

  it("returns false when last pair is unsorted [1, 2, 3, 2]", () => {
    expect(isSorted(buildList([1, 2, 3, 2]))).toBe(false);
  });
});
