import { describe, it, expect } from "vitest";
import { bstFloorCeil } from "../sources/bst-floor-ceil.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}
const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));

describe("bstFloorCeil", () => {
  it("returns exact match for existing value", () => {
    const result = bstFloorCeil(tree, 5) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBe(5);
    expect(result.ceil).toBe(5);
  });
  it("returns floor and ceil for non-existing value", () => {
    const result = bstFloorCeil(tree, 4) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBe(4);
    expect(result.ceil).toBe(4);
  });
  it("returns null floor for value less than all nodes", () => {
    const result = bstFloorCeil(tree, 0) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBeNull();
    expect(result.ceil).toBe(1);
  });
  it("returns null ceil for value greater than all nodes", () => {
    const result = bstFloorCeil(tree, 8) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBe(7);
    expect(result.ceil).toBeNull();
  });
  it("handles null tree", () => {
    const result = bstFloorCeil(null, 5) as { floor: number | null; ceil: number | null };
    expect(result.floor).toBeNull();
    expect(result.ceil).toBeNull();
  });
});
