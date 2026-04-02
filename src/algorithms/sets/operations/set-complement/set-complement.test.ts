import { describe, it, expect } from "vitest";
import { setComplement } from "./sources/set-complement.ts?fn";

describe("setComplement", () => {
  it("returns elements in universalSet not in arrayA for the default input", () => {
    const result = setComplement([2, 4, 6], [1, 2, 3, 4, 5, 6, 7, 8]) as number[];
    expect(result).toEqual([1, 3, 5, 7, 8]);
  });

  it("returns the full universalSet when arrayA is empty", () => {
    const result = setComplement([], [1, 2, 3]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });

  it("returns empty array when arrayA contains all universal elements", () => {
    const result = setComplement([1, 2, 3], [1, 2, 3]) as number[];
    expect(result).toEqual([]);
  });

  it("returns empty array when universalSet is empty", () => {
    const result = setComplement([1, 2, 3], []) as number[];
    expect(result).toEqual([]);
  });

  it("returns elements in universalSet not present in arrayA", () => {
    const result = setComplement([10, 20], [5, 10, 15, 20, 25]) as number[];
    expect(result).toEqual([5, 15, 25]);
  });

  it("handles single-element arrayA that matches one universal element", () => {
    const result = setComplement([3], [1, 2, 3, 4, 5]) as number[];
    expect(result).toEqual([1, 2, 4, 5]);
  });

  it("handles arrayA elements not in universalSet (extra elements in A)", () => {
    // Elements in A that are outside U are irrelevant; only U drives output
    const result = setComplement([99, 100], [1, 2, 3]) as number[];
    expect(result).toEqual([1, 2, 3]);
  });

  it("preserves insertion order of universalSet in output", () => {
    const result = setComplement([2], [4, 3, 1, 5]) as number[];
    expect(result).toEqual([4, 3, 1, 5]);
  });

  it("handles single-element universalSet that is in arrayA", () => {
    const result = setComplement([7], [7]) as number[];
    expect(result).toEqual([]);
  });

  it("handles single-element universalSet that is not in arrayA", () => {
    const result = setComplement([7], [8]) as number[];
    expect(result).toEqual([8]);
  });
});
