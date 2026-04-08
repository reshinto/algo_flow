import { describe, it, expect } from "vitest";
import { flattenToLinkedListIterative } from "../sources/flatten-to-linked-list-iterative.ts?fn";

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

function collectRightChain(root: BinaryNode | null): number[] {
  const result: number[] = [];
  let current = root;
  while (current) {
    result.push(current.value);
    current = current.right;
  }
  return result;
}

describe("flattenToLinkedListIterative", () => {
  it("does nothing for a null root", () => {
    expect(() => flattenToLinkedListIterative(null)).not.toThrow();
  });

  it("handles a single-node tree without change", () => {
    const root = makeNode(1);
    flattenToLinkedListIterative(root);
    expect(root.left).toBeNull();
    expect(root.right).toBeNull();
  });

  it("flattens a two-node tree with left child", () => {
    const root = makeNode(1, makeNode(2));
    flattenToLinkedListIterative(root);
    expect(root.left).toBeNull();
    expect(collectRightChain(root)).toEqual([1, 2]);
  });

  it("flattens a 7-node BST in preorder", () => {
    const root = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    flattenToLinkedListIterative(root);
    expect(collectRightChain(root)).toEqual([4, 2, 1, 3, 6, 5, 7]);
  });

  it("sets all left pointers to null after flattening", () => {
    const root = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    flattenToLinkedListIterative(root);
    let current: BinaryNode | null = root;
    while (current) {
      expect(current.left).toBeNull();
      current = current.right;
    }
  });

  it("flattens a right-skewed tree unchanged", () => {
    const root = makeNode(1, null, makeNode(2, null, makeNode(3)));
    flattenToLinkedListIterative(root);
    expect(collectRightChain(root)).toEqual([1, 2, 3]);
  });
});
