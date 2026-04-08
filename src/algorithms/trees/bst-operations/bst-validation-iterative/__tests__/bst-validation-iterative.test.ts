import { describe, it, expect } from "vitest";
import { bstValidationIterative } from "../sources/bst-validation-iterative.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("bstValidationIterative", () => {
  it("validates a correct BST", () => {
    const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(bstValidationIterative(tree)).toBe(true);
  });
  it("rejects an invalid BST", () => {
    const invalid = node(5, node(6), node(7));
    expect(bstValidationIterative(invalid)).toBe(false);
  });
  it("accepts null", () => {
    expect(bstValidationIterative(null)).toBe(true);
  });
  it("accepts single node", () => {
    expect(bstValidationIterative(node(10))).toBe(true);
  });
});
