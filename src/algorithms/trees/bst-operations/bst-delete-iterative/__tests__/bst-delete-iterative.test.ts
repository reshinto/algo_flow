import { describe, it, expect } from "vitest";
import { bstDeleteIterative } from "../sources/bst-delete-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("bstDeleteIterative", () => {
  it("deletes a leaf node", () => {
    const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const result = bstDeleteIterative(tree, 7) as BSTNode | null;
    expect(result?.right?.right).toBeNull();
  });
  it("deletes a node with two children", () => {
    const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    const result = bstDeleteIterative(tree, 6) as BSTNode | null;
    expect(result?.right?.value).toBe(7);
  });
  it("returns null when deleting only node", () => {
    expect(bstDeleteIterative(node(5), 5)).toBeNull();
  });
  it("returns unchanged tree when value absent", () => {
    const tree = node(4, node(2), node(6));
    const result = bstDeleteIterative(tree, 99) as BSTNode | null;
    expect(result?.value).toBe(4);
  });
});
