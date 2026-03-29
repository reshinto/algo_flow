import { describe, it, expect } from "vitest";
import { lomutoPartition } from "./sources/lomuto-partition.ts?fn";

describe("lomutoPartition", () => {
  it("partitions default input with pivot 7 at correct position", () => {
    const result = lomutoPartition([8, 3, 6, 1, 5, 9, 2, 7]);
    /* pivot is 7; all elements left of pivotIndex must be <= 7, all right must be > 7 */
    expect(result.pivotIndex).toBeGreaterThanOrEqual(0);
    expect(result.result[result.pivotIndex]).toBe(7);
    for (let leftIndex = 0; leftIndex < result.pivotIndex; leftIndex++) {
      expect(result.result[leftIndex]!).toBeLessThanOrEqual(7);
    }
    for (let rightIndex = result.pivotIndex + 1; rightIndex < result.result.length; rightIndex++) {
      expect(result.result[rightIndex]!).toBeGreaterThan(7);
    }
  });

  it("places pivot 5 at last index for already-sorted array [1,2,3,4,5]", () => {
    const result = lomutoPartition([1, 2, 3, 4, 5]);
    /* pivot = 5 (last), all others <= 5, so boundary ends at index 4 */
    expect(result.pivotIndex).toBe(4);
    expect(result.result[4]).toBe(5);
  });

  it("places pivot 1 at index 0 for reverse-sorted array [5,4,3,2,1]", () => {
    const result = lomutoPartition([5, 4, 3, 2, 1]);
    /* pivot = 1 (last), no element <= 1 except itself, so boundary stays at 0 */
    expect(result.pivotIndex).toBe(0);
    expect(result.result[0]).toBe(1);
    for (let rightIndex = 1; rightIndex < result.result.length; rightIndex++) {
      expect(result.result[rightIndex]!).toBeGreaterThan(1);
    }
  });

  it("handles all-same array [3,3,3] — pivot lands at a valid index", () => {
    const result = lomutoPartition([3, 3, 3]);
    /* pivot = 3, all elements <= 3, so boundary advances to index 2 */
    expect(result.result[result.pivotIndex]).toBe(3);
    expect(result.pivotIndex).toBeGreaterThanOrEqual(0);
    expect(result.pivotIndex).toBeLessThan(result.result.length);
  });

  it("handles a single element [42]", () => {
    const result = lomutoPartition([42]);
    expect(result.pivotIndex).toBe(0);
    expect(result.result).toEqual([42]);
  });

  it("returns pivotIndex -1 and empty result for an empty array", () => {
    const result = lomutoPartition([]);
    expect(result.pivotIndex).toBe(-1);
    expect(result.result).toEqual([]);
  });

  it("correctly partitions two-element array [5,2] — pivot 2 goes to index 0", () => {
    const result = lomutoPartition([5, 2]);
    expect(result.pivotIndex).toBe(0);
    expect(result.result[0]).toBe(2);
    expect(result.result[1]).toBe(5);
  });

  it("correctly partitions two-element array [2,5] — pivot 5 stays at index 1", () => {
    const result = lomutoPartition([2, 5]);
    expect(result.pivotIndex).toBe(1);
    expect(result.result[1]).toBe(5);
    expect(result.result[0]).toBe(2);
  });

  it("does not mutate the original array", () => {
    const original = [8, 3, 6, 1, 5, 9, 2, 7];
    lomutoPartition(original);
    expect(original).toEqual([8, 3, 6, 1, 5, 9, 2, 7]);
  });

  it("result array contains exactly the same elements as the input", () => {
    const inputArray = [4, 7, 2, 9, 1, 6, 3, 8, 5];
    const result = lomutoPartition(inputArray);
    expect(result.result.slice().sort((first: number, second: number) => first - second)).toEqual(
      inputArray.slice().sort((first: number, second: number) => first - second),
    );
  });
});
