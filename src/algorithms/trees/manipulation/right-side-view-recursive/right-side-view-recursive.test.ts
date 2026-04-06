import { describe, it, expect } from "vitest";
import { rightSideViewRecursive } from "./sources/right-side-view-recursive.ts?fn";

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

describe("rightSideViewRecursive", () => {
  it("returns empty array for a null root", () => {
    expect(rightSideViewRecursive(null)).toEqual([]);
  });

  it("returns the root value for a single-node tree", () => {
    const root = makeNode(1);
    expect(rightSideViewRecursive(root)).toEqual([1]);
  });

  it("returns right-side values for a 7-node BST", () => {
    const root = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    expect(rightSideViewRecursive(root)).toEqual([4, 6, 7]);
  });

  it("returns only left nodes for a left-skewed tree", () => {
    const root = makeNode(1, makeNode(2, makeNode(3)));
    expect(rightSideViewRecursive(root)).toEqual([1, 2, 3]);
  });

  it("returns right nodes for a right-skewed tree", () => {
    const root = makeNode(1, null, makeNode(2, null, makeNode(3)));
    expect(rightSideViewRecursive(root)).toEqual([1, 2, 3]);
  });

  it("returns deepest right-side node when left branch is deeper", () => {
    const root = makeNode(1, makeNode(2, makeNode(5), null), makeNode(3, null, makeNode(4)));
    expect(rightSideViewRecursive(root)).toEqual([1, 3, 4]);
  });
});
