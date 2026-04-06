import { describe, it, expect } from "vitest";
import { bstIterator } from "./sources/bst-iterator.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstIterator", () => {
  it("iterates all values in sorted ascending order", () => {
    expect(bstIterator(tree)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  it("returns empty array for null tree", () => {
    expect(bstIterator(null)).toEqual([]);
  });
  it("returns single-element array for single node", () => {
    expect(bstIterator(node(42))).toEqual([42]);
  });
  it("handles right-skewed tree", () => {
    const skewed = node(1, null, node(2, null, node(3)));
    expect(bstIterator(skewed)).toEqual([1, 2, 3]);
  });
});
