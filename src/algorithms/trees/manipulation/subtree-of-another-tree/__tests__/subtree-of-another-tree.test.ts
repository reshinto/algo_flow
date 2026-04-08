import { describe, it, expect } from "vitest";
import { subtreeOfAnotherTree } from "../sources/subtree-of-another-tree.ts?fn";

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

describe("subtreeOfAnotherTree", () => {
  it("returns true when subTree is null", () => {
    expect(subtreeOfAnotherTree(makeNode(1), null)).toBe(true);
  });

  it("returns false when mainTree is null but subTree is not", () => {
    expect(subtreeOfAnotherTree(null, makeNode(1))).toBe(false);
  });

  it("returns true when mainTree equals subTree exactly", () => {
    const mainTree = makeNode(1, makeNode(2), makeNode(3));
    const subTree = makeNode(1, makeNode(2), makeNode(3));
    expect(subtreeOfAnotherTree(mainTree, subTree)).toBe(true);
  });

  it("returns true when subTree is the left subtree of mainTree", () => {
    const mainTree = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const subTree = makeNode(2, makeNode(1), makeNode(3));
    expect(subtreeOfAnotherTree(mainTree, subTree)).toBe(true);
  });

  it("returns false when subTree is not in mainTree", () => {
    const mainTree = makeNode(4, makeNode(2), makeNode(6));
    const subTree = makeNode(9);
    expect(subtreeOfAnotherTree(mainTree, subTree)).toBe(false);
  });

  it("returns false when value matches but structure differs", () => {
    const mainTree = makeNode(4, makeNode(2, makeNode(1)), null);
    const subTree = makeNode(2, null, makeNode(1));
    expect(subtreeOfAnotherTree(mainTree, subTree)).toBe(false);
  });
});
