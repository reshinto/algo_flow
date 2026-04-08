import { describe, it, expect } from "vitest";
import { mergeBinaryTrees } from "../sources/merge-binary-trees.ts?fn";

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

describe("mergeBinaryTrees", () => {
  it("returns tree B when tree A is null", () => {
    const treeB = makeNode(1);
    expect(mergeBinaryTrees(null, treeB)).toBe(treeB);
  });

  it("returns tree A when tree B is null", () => {
    const treeA = makeNode(1);
    expect(mergeBinaryTrees(treeA, null)).toBe(treeA);
  });

  it("sums values at the root for two single-node trees", () => {
    const treeA = makeNode(3);
    const treeB = makeNode(5);
    const result = mergeBinaryTrees(treeA, treeB) as BinaryNode;
    expect(result.value).toBe(8);
  });

  it("merges two identical-shape 7-node trees by summing all values", () => {
    const treeA = makeNode(
      4,
      makeNode(2, makeNode(1), makeNode(3)),
      makeNode(6, makeNode(5), makeNode(7)),
    );
    const treeB = makeNode(
      40,
      makeNode(20, makeNode(10), makeNode(30)),
      makeNode(60, makeNode(50), makeNode(70)),
    );
    const result = mergeBinaryTrees(treeA, treeB) as BinaryNode;
    expect(collectLevelOrder(result)).toEqual([44, 22, 66, 11, 33, 55, 77]);
  });

  it("keeps tree A nodes when tree B has no corresponding node", () => {
    const treeA = makeNode(1, makeNode(2), null);
    const treeB = makeNode(3);
    const result = mergeBinaryTrees(treeA, treeB) as BinaryNode;
    expect(result.value).toBe(4);
    expect(result.left?.value).toBe(2);
  });
});
