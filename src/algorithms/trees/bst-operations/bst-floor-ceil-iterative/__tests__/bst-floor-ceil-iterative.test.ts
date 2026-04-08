import { describe, it, expect } from "vitest";
import { bstFloorCeilIterative } from "../sources/bst-floor-ceil-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstFloorCeilIterative", () => {
  it("returns exact match for existing value", () => {
    const result = bstFloorCeilIterative(tree, 3) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBe(3);
    expect(result.ceil).toBe(3);
  });
  it("finds floor and ceil for non-existing value between nodes", () => {
    const result = bstFloorCeilIterative(tree, 4) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBe(4);
    expect(result.ceil).toBe(4);
  });
  it("returns null for value below all nodes", () => {
    const result = bstFloorCeilIterative(tree, 0) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBeNull();
    expect(result.ceil).toBe(1);
  });
  it("handles null tree", () => {
    const result = bstFloorCeilIterative(null, 5) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBeNull();
    expect(result.ceil).toBeNull();
  });
});
