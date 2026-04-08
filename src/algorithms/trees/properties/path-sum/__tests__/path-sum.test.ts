import { describe, it, expect } from "vitest";
import { pathSum } from "../sources/path-sum.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("pathSum", () => {
  it("returns true when path sum exists (4+2+1=7)", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(pathSum(root, 7)).toBe(true);
  });

  it("returns false when path sum does not exist", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(pathSum(root, 100)).toBe(false);
  });

  it("returns false for null root", () => {
    expect(pathSum(null, 5)).toBe(false);
  });

  it("returns true for single node matching target", () => {
    expect(pathSum(node(5), 5)).toBe(true);
  });

  it("returns false for single node not matching target", () => {
    expect(pathSum(node(5), 3)).toBe(false);
  });
});
