import { describe, it, expect } from "vitest";
import { bstDelete } from "./sources/bst-delete.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("bstDelete", () => {
  it("deletes a leaf node", () => {
    const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const result = bstDelete(tree, 1) as BSTNode | null;
    expect(result?.left?.left).toBeNull();
  });
  it("deletes a node with one child", () => {
    const tree = node(4, node(2, node(1)), node(6));
    const result = bstDelete(tree, 2) as BSTNode | null;
    expect(result?.left?.value).toBe(1);
  });
  it("deletes a node with two children", () => {
    const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const result = bstDelete(tree, 4) as BSTNode | null;
    expect(result).not.toBeNull();
  });
  it("returns null when deleting the only node", () => {
    expect(bstDelete(node(5), 5)).toBeNull();
  });
  it("returns tree unchanged when value not found", () => {
    const tree = node(4, node(2), node(6));
    const result = bstDelete(tree, 99) as BSTNode | null;
    expect(result?.value).toBe(4);
  });
});
