import { describe, it, expect } from "vitest";
import { deleteLeavesWithValue } from "../sources/delete-leaves-with-value.ts?fn";

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

describe("deleteLeavesWithValue", () => {
  it("returns null for a single-node tree that is the target", () => {
    const root = makeNode(1);
    expect(deleteLeavesWithValue(root, 1)).toBeNull();
  });

  it("returns the root unchanged if no leaf matches the target", () => {
    const root = makeNode(1, makeNode(2), makeNode(3));
    const result = deleteLeavesWithValue(root, 9) as BinaryNode;
    expect(collectLevelOrder(result)).toEqual([1, 2, 3]);
  });

  it("deletes a leaf with the target value", () => {
    const root = makeNode(1, makeNode(2), makeNode(3));
    const result = deleteLeavesWithValue(root, 2) as BinaryNode;
    expect(result.left).toBeNull();
    expect(result.right?.value).toBe(3);
  });

  it("cascades deletion when parent becomes leaf after child removal", () => {
    // Tree: 1 → left=2(leaf,target) → left only. After removing 2, 1 has no children, but 1≠target so stays.
    const root = makeNode(1, makeNode(2));
    const result = deleteLeavesWithValue(root, 2) as BinaryNode;
    expect(result.value).toBe(1);
    expect(result.left).toBeNull();
  });

  it("deletes all matching leaves in a 7-node tree", () => {
    const root = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const result = deleteLeavesWithValue(root, 1) as BinaryNode;
    // Node 1 (leaf, value=1) is deleted
    expect(collectLevelOrder(result)).toEqual([4, 2, 6, 3, 5, 7]);
  });
});
