import { describe, it, expect } from "vitest";
import { sumOfLeftLeaves } from "../sources/sum-of-left-leaves.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("sumOfLeftLeaves", () => {
  it("returns 6 (1+5) for a 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(sumOfLeftLeaves(root)).toBe(6);
  });

  it("returns 0 for null root", () => {
    expect(sumOfLeftLeaves(null)).toBe(0);
  });

  it("returns 0 for single node (root is not a left leaf)", () => {
    expect(sumOfLeftLeaves(node(1))).toBe(0);
  });

  it("returns the value of a left leaf in a two-node tree", () => {
    expect(sumOfLeftLeaves(node(1, node(5)))).toBe(5);
  });

  it("returns 0 when there are no left leaves", () => {
    expect(sumOfLeftLeaves(node(1, null, node(2)))).toBe(0);
  });
});
