import { describe, it, expect } from "vitest";
import { countCompleteTreeNodes } from "./sources/count-complete-tree-nodes.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("countCompleteTreeNodes", () => {
  it("returns 7 for a perfect 7-node tree", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(countCompleteTreeNodes(root)).toBe(7);
  });

  it("returns 0 for a null root", () => {
    expect(countCompleteTreeNodes(null)).toBe(0);
  });

  it("returns 1 for a single node", () => {
    expect(countCompleteTreeNodes(node(1))).toBe(1);
  });

  it("returns 3 for a 3-node perfect tree", () => {
    expect(countCompleteTreeNodes(node(1, node(2), node(3)))).toBe(3);
  });
});
