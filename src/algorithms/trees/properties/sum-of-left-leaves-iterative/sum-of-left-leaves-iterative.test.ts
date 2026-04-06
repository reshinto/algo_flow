import { describe, it, expect } from "vitest";
import { sumOfLeftLeavesIterative } from "./sources/sum-of-left-leaves-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("sumOfLeftLeavesIterative", () => {
  it("returns 6 (1+5) for a 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(sumOfLeftLeavesIterative(root)).toBe(6);
  });

  it("returns 0 for null root", () => {
    expect(sumOfLeftLeavesIterative(null)).toBe(0);
  });

  it("returns 0 for a single node", () => {
    expect(sumOfLeftLeavesIterative(node(1))).toBe(0);
  });

  it("returns the value of a left leaf", () => {
    expect(sumOfLeftLeavesIterative(node(1, node(5)))).toBe(5);
  });
});
