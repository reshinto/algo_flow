import { describe, it, expect } from "vitest";
import { quickselect } from "../sources/quickselect.ts?fn";

describe("quickselect", () => {
  it("finds the 4th smallest element in the default input", () => {
    /* [7,2,1,6,8,5,3,4] sorted is [1,2,3,4,5,6,7,8] → 4th smallest = 4 */
    const result = quickselect([7, 2, 1, 6, 8, 5, 3, 4], 4);
    expect(result.kthElement).toBe(4);
  });

  it("finds the minimum (k=1)", () => {
    const result = quickselect([7, 2, 1, 6, 8, 5, 3, 4], 1);
    expect(result.kthElement).toBe(1);
  });

  it("finds the maximum (k=n)", () => {
    const result = quickselect([7, 2, 1, 6, 8, 5, 3, 4], 8);
    expect(result.kthElement).toBe(8);
  });

  it("handles a single element array", () => {
    const result = quickselect([42], 1);
    expect(result.kthElement).toBe(42);
    expect(result.pivotIndex).toBe(0);
  });

  it("handles an already-sorted array", () => {
    const result = quickselect([1, 2, 3, 4, 5], 3);
    expect(result.kthElement).toBe(3);
  });

  it("handles a reverse-sorted array", () => {
    const result = quickselect([5, 4, 3, 2, 1], 2);
    expect(result.kthElement).toBe(2);
  });

  it("handles duplicate elements", () => {
    /* [3,3,1,2], k=2 → sorted [1,2,3,3] → 2nd smallest = 2 */
    const result = quickselect([3, 3, 1, 2], 2);
    expect(result.kthElement).toBe(2);
  });

  it("returns -1 for k=0 (invalid)", () => {
    const result = quickselect([1, 2, 3], 0);
    expect(result.kthElement).toBe(-1);
  });

  it("returns -1 for k larger than array length (invalid)", () => {
    const result = quickselect([1, 2, 3], 5);
    expect(result.kthElement).toBe(-1);
  });

  it("returns -1 for empty array", () => {
    const result = quickselect([], 1);
    expect(result.kthElement).toBe(-1);
  });

  it("finds the median of an odd-length array", () => {
    /* [3,1,4,1,5,9,2,6,5], sorted=[1,1,2,3,4,5,5,6,9], k=5 → 4 */
    const result = quickselect([3, 1, 4, 1, 5, 9, 2, 6, 5], 5);
    expect(result.kthElement).toBe(4);
  });
});
