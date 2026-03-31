import { describe, it, expect } from "vitest";
import { findNodeByValue } from "./sources/find-node-by-value.ts?fn";

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

describe("findNodeByValue", () => {
  it("returns the node when target is found at head", () => {
    const result = findNodeByValue(buildList([5, 2, 3, 4]), 5);
    expect(result).not.toBeNull();
    expect((result as ListNode).value).toBe(5);
  });

  it("returns the node when target is found in the middle", () => {
    const result = findNodeByValue(buildList([1, 2, 7, 4, 5]), 7);
    expect(result).not.toBeNull();
    expect((result as ListNode).value).toBe(7);
  });

  it("returns the node when target is found at the end", () => {
    const result = findNodeByValue(buildList([1, 2, 3, 9]), 9);
    expect(result).not.toBeNull();
    expect((result as ListNode).value).toBe(9);
  });

  it("returns null when target is not found", () => {
    const result = findNodeByValue(buildList([1, 2, 3, 4]), 42);
    expect(result).toBeNull();
  });

  it("returns null for an empty list", () => {
    const result = findNodeByValue(null, 5);
    expect(result).toBeNull();
  });

  it("returns the node for single-node list when target matches", () => {
    const result = findNodeByValue(buildList([42]), 42);
    expect(result).not.toBeNull();
    expect((result as ListNode).value).toBe(42);
  });

  it("returns null for single-node list when target does not match", () => {
    const result = findNodeByValue(buildList([42]), 7);
    expect(result).toBeNull();
  });
});
