import { describe, it, expect } from "vitest";
import { maximumDepth } from "./sources/maximum-depth.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}

function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("maximumDepth", () => {
  it("returns 3 for a balanced 7-node BST", () => {
    const root = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(maximumDepth(root)).toBe(3);
  });

  it("returns 0 for a null root", () => {
    expect(maximumDepth(null)).toBe(0);
  });

  it("returns 1 for a single node", () => {
    expect(maximumDepth(node(42))).toBe(1);
  });

  it("returns correct depth for a left-skewed tree", () => {
    const root = node(5, node(4, node(3, node(2, node(1)))));
    expect(maximumDepth(root)).toBe(5);
  });

  it("returns correct depth for a right-skewed tree", () => {
    const root = node(1, null, node(2, null, node(3)));
    expect(maximumDepth(root)).toBe(3);
  });

  it("returns 2 for a two-level tree", () => {
    expect(maximumDepth(node(1, node(2)))).toBe(2);
  });
});
