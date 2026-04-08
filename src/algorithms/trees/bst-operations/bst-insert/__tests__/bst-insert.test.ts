import { describe, it, expect } from "vitest";
import { bstInsert } from "../sources/bst-insert.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstInsert", () => {
  it("inserts a value greater than all existing nodes", () => {
    const result = bstInsert(tree, 8) as BSTNode;
    expect(result.right?.right?.right?.value).toBe(8);
  });
  it("inserts a value into the left subtree", () => {
    const freshTree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const result = bstInsert(freshTree, 0) as BSTNode;
    expect(result.left?.left?.left?.value).toBe(0);
  });
  it("creates a new root from null", () => {
    const result = bstInsert(null, 10) as BSTNode;
    expect(result.value).toBe(10);
  });
  it("ignores duplicate values", () => {
    const freshTree = node(4, node(2), node(6));
    const result = bstInsert(freshTree, 4) as BSTNode;
    expect(result.value).toBe(4);
  });
});
