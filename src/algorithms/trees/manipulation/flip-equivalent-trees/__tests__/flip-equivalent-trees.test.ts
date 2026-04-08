import { describe, it, expect } from "vitest";
import { flipEquivalentTrees } from "../sources/flip-equivalent-trees.ts?fn";

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

describe("flipEquivalentTrees", () => {
  it("returns true for two null trees", () => {
    expect(flipEquivalentTrees(null, null)).toBe(true);
  });

  it("returns false when one tree is null", () => {
    expect(flipEquivalentTrees(makeNode(1), null)).toBe(false);
    expect(flipEquivalentTrees(null, makeNode(1))).toBe(false);
  });

  it("returns true for two identical trees", () => {
    const treeA = makeNode(1, makeNode(2), makeNode(3));
    const treeB = makeNode(1, makeNode(2), makeNode(3));
    expect(flipEquivalentTrees(treeA, treeB)).toBe(true);
  });

  it("returns true for two trees that are flip-equivalent at root", () => {
    const treeA = makeNode(1, makeNode(2), makeNode(3));
    const treeB = makeNode(1, makeNode(3), makeNode(2));
    expect(flipEquivalentTrees(treeA, treeB)).toBe(true);
  });

  it("returns true for 7-node BST where root children are swapped", () => {
    const treeA = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const treeB = makeNode(
      4,
      makeNode(6, makeNode(5), makeNode(7)),
      makeNode(2, makeNode(1), makeNode(3)),
    );
    expect(flipEquivalentTrees(treeA, treeB)).toBe(true);
  });

  it("returns false for trees with different root values", () => {
    expect(flipEquivalentTrees(makeNode(1), makeNode(2))).toBe(false);
  });

  it("returns false for trees with same structure but different leaf values", () => {
    const treeA = makeNode(1, makeNode(2), makeNode(3));
    const treeB = makeNode(1, makeNode(9), makeNode(3));
    expect(flipEquivalentTrees(treeA, treeB)).toBe(false);
  });
});
