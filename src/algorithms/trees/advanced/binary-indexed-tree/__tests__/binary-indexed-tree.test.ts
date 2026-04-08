import { describe, it, expect } from "vitest";
import { binaryIndexedTree } from "../sources/binary-indexed-tree.ts?fn";

describe("binaryIndexedTree", () => {
  it("computes range sums for default input", () => {
    const result = binaryIndexedTree(
      [3, 2, 4, 5, 1, 1, 5, 3],
      [
        [0, 4],
        [2, 6],
      ],
    ) as number[];
    expect(result[0]).toBe(15); // 3+2+4+5+1
    expect(result[1]).toBe(16); // 4+5+1+1+5
  });

  it("handles single element query", () => {
    const result = binaryIndexedTree([10, 20, 30], [[1, 1]]) as number[];
    expect(result[0]).toBe(20);
  });

  it("handles full range query", () => {
    const arr = [1, 2, 3, 4, 5];
    const result = binaryIndexedTree(arr, [[0, 4]]) as number[];
    expect(result[0]).toBe(15);
  });

  it("handles multiple queries", () => {
    const result = binaryIndexedTree(
      [5, 3, 2, 8, 1],
      [
        [0, 2],
        [1, 4],
        [2, 3],
      ],
    ) as number[];
    expect(result[0]).toBe(10); // 5+3+2
    expect(result[1]).toBe(14); // 3+2+8+1
    expect(result[2]).toBe(10); // 2+8
  });
});
