import { describe, it, expect } from "vitest";
import { sumRootToLeafNumbers } from "./sources/sum-root-to-leaf-numbers.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("sumRootToLeafNumbers", () => {
  it("returns correct sum for a 7-node BST (421+423+465+467=1776)", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(sumRootToLeafNumbers(root)).toBe(1776);
  });

  it("returns 0 for null root", () => {
    expect(sumRootToLeafNumbers(null)).toBe(0);
  });

  it("returns node value for single node", () => {
    expect(sumRootToLeafNumbers(node(5))).toBe(5);
  });

  it("returns correct value for simple 3-node tree (12+13=25)", () => {
    expect(sumRootToLeafNumbers(node(1, node(2), node(3)))).toBe(25);
  });
});
