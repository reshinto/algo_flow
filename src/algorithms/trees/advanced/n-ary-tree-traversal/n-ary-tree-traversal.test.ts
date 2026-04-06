import { describe, it, expect } from "vitest";
import { nAryTreeTraversal } from "./sources/n-ary-tree-traversal.ts?fn";

interface NAryNode {
  value: number;
  children: NAryNode[];
}
function node(value: number, ...children: NAryNode[]): NAryNode {
  return { value, children };
}

describe("nAryTreeTraversal", () => {
  it("returns empty for null root", () => {
    expect(nAryTreeTraversal(null)).toEqual([]);
  });

  it("handles single node", () => {
    expect(nAryTreeTraversal(node(5))).toEqual([5]);
  });

  it("preorder: root before all children", () => {
    const root = node(
      1,
      node(3, node(5), node(6)),
      node(2, node(7), node(8)),
      node(4, node(9), node(10)),
    );
    const result = nAryTreeTraversal(root) as number[];
    expect(result[0]).toBe(1); // root first
    expect(result[1]).toBe(3); // first child
    expect(result).toHaveLength(10);
  });

  it("produces correct preorder for 3-level 3-ary tree", () => {
    const root = node(
      1,
      node(3, node(5), node(6)),
      node(2, node(7), node(8)),
      node(4, node(9), node(10)),
    );
    const result = nAryTreeTraversal(root) as number[];
    expect(result).toEqual([1, 3, 5, 6, 2, 7, 8, 4, 9, 10]);
  });

  it("handles flat tree (no children)", () => {
    expect(nAryTreeTraversal(node(42))).toEqual([42]);
  });
});
