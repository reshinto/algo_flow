import { describe, it, expect } from "vitest";
import { bstSearchIterative } from "../sources/bst-search-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

const balancedTree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstSearchIterative", () => {
  it("finds a value in the tree", () => {
    const result = bstSearchIterative(balancedTree, 6) as BSTNode | null;
    expect(result?.value).toBe(6);
  });

  it("returns null for missing value", () => {
    expect(bstSearchIterative(balancedTree, 10)).toBeNull();
  });

  it("finds the root", () => {
    const result = bstSearchIterative(balancedTree, 4) as BSTNode | null;
    expect(result?.value).toBe(4);
  });

  it("returns null on empty tree", () => {
    expect(bstSearchIterative(null, 5)).toBeNull();
  });

  it("finds a left leaf", () => {
    const result = bstSearchIterative(balancedTree, 1) as BSTNode | null;
    expect(result?.value).toBe(1);
  });
});
