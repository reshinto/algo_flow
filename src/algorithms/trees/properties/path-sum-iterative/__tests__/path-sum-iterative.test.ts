import { describe, it, expect } from "vitest";
import { pathSumIterative } from "../sources/path-sum-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("pathSumIterative", () => {
  it("returns true when path sum exists (4+2+1=7)", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(pathSumIterative(root, 7)).toBe(true);
  });

  it("returns false when path sum does not exist", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(pathSumIterative(root, 100)).toBe(false);
  });

  it("returns false for null root", () => {
    expect(pathSumIterative(null, 5)).toBe(false);
  });

  it("returns true for single node matching target", () => {
    expect(pathSumIterative(node(5), 5)).toBe(true);
  });
});
