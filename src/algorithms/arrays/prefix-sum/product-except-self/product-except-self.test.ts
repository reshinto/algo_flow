import { describe, it, expect } from "vitest";
import { productExceptSelf } from "./sources/product-except-self.ts?fn";

describe("productExceptSelf", () => {
  it("computes product for a basic four-element array", () => {
    /* [1,2,3,4]: each position = product of all others */
    const result = productExceptSelf([1, 2, 3, 4]);
    expect(result).toEqual([24, 12, 8, 6]);
  });

  it("computes product for the default five-element input", () => {
    /* [1,2,3,4,5]: 2×3×4×5=120, 1×3×4×5=60, 1×2×4×5=40, 1×2×3×5=30, 1×2×3×4=24 */
    const result = productExceptSelf([1, 2, 3, 4, 5]);
    expect(result).toEqual([120, 60, 40, 30, 24]);
  });

  it("handles a single zero — only the zero position gets a non-zero result", () => {
    /* [1,0,3]: only position 1 (the zero) gets product 1×3=3; others get 0 */
    const result = productExceptSelf([1, 0, 3]);
    expect(result).toEqual([0, 3, 0]);
  });

  it("handles two zeros — all output elements are zero", () => {
    /* [0,1,0]: product of any pair containing a zero is zero */
    const result = productExceptSelf([0, 1, 0]);
    expect(result).toEqual([0, 0, 0]);
  });

  it("handles a single-element array", () => {
    /* Only element: product of empty set = 1 */
    const result = productExceptSelf([5]);
    expect(result).toEqual([1]);
  });

  it("returns an empty array for empty input", () => {
    const result = productExceptSelf([]);
    expect(result).toEqual([]);
  });

  it("handles all-ones array", () => {
    const result = productExceptSelf([1, 1, 1]);
    expect(result).toEqual([1, 1, 1]);
  });

  it("handles negative numbers", () => {
    /* [-1,2,-3]: 2×-3=-6, -1×-3=3, -1×2=-2 */
    const result = productExceptSelf([-1, 2, -3]);
    expect(result).toEqual([-6, 3, -2]);
  });

  it("matches expected output for the algorithm default input", () => {
    /* Default input is [1,2,3,4,5] */
    const result = productExceptSelf([1, 2, 3, 4, 5]);
    expect(result).toEqual([120, 60, 40, 30, 24]);
  });
});
