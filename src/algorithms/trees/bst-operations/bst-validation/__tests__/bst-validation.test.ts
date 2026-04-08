import { describe, it, expect } from "vitest";
import { bstValidation } from "../sources/bst-validation.ts?fn";

interface BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
}
function node(value: number, left: BSTNode | null = null, right: BSTNode | null = null): BSTNode {
  return { value, left, right };
}

describe("bstValidation", () => {
  it("validates a correct BST", () => {
    const tree = node(4, node(2, node(1), node(3)), node(6, node(5), node(7)));
    expect(bstValidation(tree)).toBe(true);
  });
  it("rejects an invalid BST", () => {
    const invalid = node(5, node(6), node(7));
    expect(bstValidation(invalid)).toBe(false);
  });
  it("accepts a null tree", () => {
    expect(bstValidation(null)).toBe(true);
  });
  it("accepts a single node", () => {
    expect(bstValidation(node(42))).toBe(true);
  });
  it("rejects a non-local violation", () => {
    // Child-only checks would miss this: 3 is in right subtree of 5 but < 5
    const invalid = node(5, null, node(10, node(3), null));
    expect(bstValidation(invalid)).toBe(false);
  });
});
