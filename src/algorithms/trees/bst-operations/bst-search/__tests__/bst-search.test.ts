import { describe, it, expect } from "vitest";
import { bstSearch } from "../sources/bst-search.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

const balancedTree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstSearch", () => {
  it("finds a value that exists in the tree", () => {
    const result = bstSearch(balancedTree, 5) as BSTNode | null;
    expect(result?.value).toBe(5);
  });

  it("returns null for a value that does not exist", () => {
    expect(bstSearch(balancedTree, 9)).toBeNull();
  });

  it("finds the root value", () => {
    const result = bstSearch(balancedTree, 4) as BSTNode | null;
    expect(result?.value).toBe(4);
  });

  it("finds a leaf node", () => {
    const result = bstSearch(balancedTree, 1) as BSTNode | null;
    expect(result?.value).toBe(1);
  });

  it("returns null on an empty tree", () => {
    expect(bstSearch(null, 5)).toBeNull();
  });

  it("finds a value in a single-node tree", () => {
    const result = bstSearch(node(42), 42) as BSTNode | null;
    expect(result?.value).toBe(42);
  });
});
