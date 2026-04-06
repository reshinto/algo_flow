import { describe, it, expect } from "vitest";
import { invertBinaryTreeIterative } from "./sources/invert-binary-tree-iterative.ts?fn";

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

function collectLevelOrder(root: BinaryNode | null): number[] {
  if (!root) return [];
  const result: number[] = [];
  const queue: BinaryNode[] = [root];
  while (queue.length > 0) {
    const current = queue.shift()!;
    result.push(current.value);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
  return result;
}

describe("invertBinaryTreeIterative", () => {
  it("returns null for a null root", () => {
    expect(invertBinaryTreeIterative(null)).toBeNull();
  });

  it("returns the same single node for a single-node tree", () => {
    const root = makeNode(1);
    const result = invertBinaryTreeIterative(root) as BinaryNode;
    expect(result.value).toBe(1);
    expect(result.left).toBeNull();
    expect(result.right).toBeNull();
  });

  it("swaps children of a two-node tree", () => {
    const root = makeNode(1, makeNode(2));
    const result = invertBinaryTreeIterative(root) as BinaryNode;
    expect(result.left).toBeNull();
    expect(result.right?.value).toBe(2);
  });

  it("inverts a balanced 7-node BST in level-order", () => {
    const root = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const result = invertBinaryTreeIterative(root) as BinaryNode;
    expect(collectLevelOrder(result)).toEqual([4, 6, 2, 7, 5, 3, 1]);
  });

  it("inverts a right-skewed tree to left-skewed", () => {
    const root = makeNode(1, null, makeNode(2, null, makeNode(3)));
    const result = invertBinaryTreeIterative(root) as BinaryNode;
    expect(result.left?.value).toBe(2);
    expect(result.left?.left?.value).toBe(3);
    expect(result.right).toBeNull();
  });

  it("double inversion restores the original tree level-order", () => {
    const root = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const originalOrder = collectLevelOrder(root);
    invertBinaryTreeIterative(root);
    invertBinaryTreeIterative(root);
    expect(collectLevelOrder(root)).toEqual(originalOrder);
  });
});
