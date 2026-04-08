import { describe, it, expect } from "vitest";
import { distributeCoins } from "../sources/distribute-coins.ts?fn";

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

describe("distributeCoins", () => {
  it("returns 0 for a null root", () => {
    expect(distributeCoins(null)).toBe(0);
  });

  it("returns 0 for a single-node tree with exactly 1 coin", () => {
    expect(distributeCoins(makeNode(1))).toBe(0);
  });

  it("returns 1 for a two-node tree where root has 2 coins and child has 0", () => {
    const root = makeNode(2, makeNode(0));
    expect(distributeCoins(root)).toBe(1);
  });

  it("returns 3 for a tree with root=3 coins and two children with 0", () => {
    const root = makeNode(3, makeNode(0), makeNode(0));
    expect(distributeCoins(root)).toBe(2);
  });

  it("correctly counts moves for all coins concentrated at one leaf", () => {
    // Tree: root=0, left=0, right=0, left.left=3 (3 extra coins at deepest node)
    // Coins must travel: left.left→left(2 moves), left→root(1 move), root→right(1 move), 3 moves total
    const root = makeNode(0, makeNode(0, makeNode(3), null), makeNode(0));
    expect(distributeCoins(root)).toBe(4);
  });
});
