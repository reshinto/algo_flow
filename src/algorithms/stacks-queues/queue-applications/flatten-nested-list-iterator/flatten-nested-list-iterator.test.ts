import { describe, it, expect } from "vitest";
import { flattenNestedListIterator } from "./sources/flatten-nested-list-iterator.ts?fn";

describe("flattenNestedListIterator", () => {
  it("flattens [[1,[2]],3,[4,[5,6]]] to [1,2,3,4,5,6]", () => {
    expect(flattenNestedListIterator([[1, [2]], 3, [4, [5, 6]]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("flattens a flat list with no nesting", () => {
    expect(flattenNestedListIterator([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("flattens a single deeply nested value [[[7]]] to [7]", () => {
    expect(flattenNestedListIterator([[[7]]])).toEqual([7]);
  });

  it("flattens an empty input to an empty array", () => {
    expect(flattenNestedListIterator([])).toEqual([]);
  });

  it("flattens [[[]]] (nested empty arrays) to []", () => {
    expect(flattenNestedListIterator([[[]]])).toEqual([]);
  });

  it("flattens [[1,2],[3,4],[5,6]] two levels deep", () => {
    expect(
      flattenNestedListIterator([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("flattens a single integer wrapped at depth 4", () => {
    expect(flattenNestedListIterator([[[[42]]]])).toEqual([42]);
  });

  it("preserves left-to-right order for mixed depth input", () => {
    expect(flattenNestedListIterator([1, [2, [3, [4]]]])).toEqual([1, 2, 3, 4]);
  });

  it("handles a list with only arrays that contain single integers", () => {
    expect(flattenNestedListIterator([[1], [2], [3]])).toEqual([1, 2, 3]);
  });

  it("flattens the LeetCode example [[1,1],2,[1,1]] to [1,1,2,1,1]", () => {
    expect(flattenNestedListIterator([[1, 1], 2, [1, 1]])).toEqual([1, 1, 2, 1, 1]);
  });
});
