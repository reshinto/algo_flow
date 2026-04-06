import { describe, it, expect } from "vitest";
import { bstInsertIterative } from "./sources/bst-insert-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstInsertIterative", () => {
  it("inserts a value greater than all nodes", () => {
    const result = bstInsertIterative(tree, 8) as BSTNode;
    expect(result.right?.right?.right?.value).toBe(8);
  });
  it("creates root from null tree", () => {
    const result = bstInsertIterative(null, 5) as BSTNode;
    expect(result.value).toBe(5);
  });
  it("inserts left child", () => {
    const freshTree = node(10);
    const result = bstInsertIterative(freshTree, 5) as BSTNode;
    expect(result.left?.value).toBe(5);
  });
  it("ignores duplicates", () => {
    const freshTree = node(4, node(2), node(6));
    const result = bstInsertIterative(freshTree, 2) as BSTNode;
    expect(result.left?.right).toBeNull();
  });
});
