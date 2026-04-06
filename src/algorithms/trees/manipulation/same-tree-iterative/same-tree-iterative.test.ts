import { describe, it, expect } from "vitest";
import { sameTreeIterative } from "./sources/same-tree-iterative.ts?fn";

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

describe("sameTreeIterative", () => {
  it("returns true for two null trees", () => {
    expect(sameTreeIterative(null, null)).toBe(true);
  });

  it("returns false when one tree is null", () => {
    expect(sameTreeIterative(makeNode(1), null)).toBe(false);
    expect(sameTreeIterative(null, makeNode(1))).toBe(false);
  });

  it("returns true for two identical single-node trees", () => {
    expect(sameTreeIterative(makeNode(1), makeNode(1))).toBe(true);
  });

  it("returns false for single-node trees with different values", () => {
    expect(sameTreeIterative(makeNode(1), makeNode(2))).toBe(false);
  });

  it("returns true for two identical 7-node BSTs", () => {
    const treeA = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const treeB = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    expect(sameTreeIterative(treeA, treeB)).toBe(true);
  });

  it("returns false for trees with different leaf values", () => {
    const treeA = makeNode(1, makeNode(2), makeNode(3));
    const treeB = makeNode(1, makeNode(2), makeNode(4));
    expect(sameTreeIterative(treeA, treeB)).toBe(false);
  });

  it("returns false for trees with different structures", () => {
    const treeA = makeNode(1, makeNode(2));
    const treeB = makeNode(1, null, makeNode(2));
    expect(sameTreeIterative(treeA, treeB)).toBe(false);
  });
});
