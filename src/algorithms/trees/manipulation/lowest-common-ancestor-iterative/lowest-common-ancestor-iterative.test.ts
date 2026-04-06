import { describe, it, expect } from "vitest";
import { lowestCommonAncestorIterative } from "./sources/lowest-common-ancestor-iterative.ts?fn";

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function makeNode(
  value: number,
  left: BinaryNode | null = null,
  right: BinaryNode | null = null,
): BinaryNode {
  return { value, left, right };
}

describe("lowestCommonAncestorIterative", () => {
  it("returns null for a null root", () => {
    expect(lowestCommonAncestorIterative(null, 1, 2)).toBeNull();
  });

  it("returns root when root matches one of the targets", () => {
    const root = makeNode(4, makeNode(2), makeNode(6));
    const result = lowestCommonAncestorIterative(root, 4, 6) as BinaryNode;
    expect(result.value).toBe(4);
  });

  it("returns node 2 as LCA for targets 1 and 3 in 7-node BST", () => {
    const root = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const result = lowestCommonAncestorIterative(root, 1, 3) as BinaryNode;
    expect(result.value).toBe(2);
  });

  it("returns root as LCA for targets in opposite subtrees", () => {
    const root = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const result = lowestCommonAncestorIterative(root, 3, 5) as BinaryNode;
    expect(result.value).toBe(4);
  });

  it("returns the target node itself when one is ancestor of the other", () => {
    const root = makeNode(4, makeNode(2, makeNode(1)));
    const result = lowestCommonAncestorIterative(root, 2, 1) as BinaryNode;
    expect(result.value).toBe(2);
  });
});
