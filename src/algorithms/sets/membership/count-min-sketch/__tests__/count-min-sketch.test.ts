import { describe, it, expect } from "vitest";
import { countMinSketch } from "../sources/count-min-sketch.ts?fn";

describe("countMinSketch", () => {
  it("returns estimated counts for all queried elements that were inserted", () => {
    const output = countMinSketch([3, 3, 7, 7, 7, 11], [3, 7, 11, 5], 8, 3) as {
      results: { value: number; estimatedCount: number }[];
    };
    const foundValues = output.results.map((resultEntry) => resultEntry.value);
    expect(foundValues).toContain(3);
    expect(foundValues).toContain(7);
    expect(foundValues).toContain(11);
  });

  it("does not return a result for an element that was never inserted", () => {
    const output = countMinSketch([3, 3, 7, 7, 7, 11], [3, 7, 11, 5], 8, 3) as {
      results: { value: number; estimatedCount: number }[];
    };
    const foundValues = output.results.map((resultEntry) => resultEntry.value);
    expect(foundValues).not.toContain(5);
  });

  it("estimated count for element 7 is at least 3 (its true count)", () => {
    const output = countMinSketch([3, 3, 7, 7, 7, 11], [7], 8, 3) as {
      results: { value: number; estimatedCount: number }[];
    };
    const resultEntry = output.results.find((entry) => entry.value === 7);
    expect(resultEntry).toBeDefined();
    expect(resultEntry!.estimatedCount).toBeGreaterThanOrEqual(3);
  });

  it("estimated count for element 3 is at least 2 (its true count)", () => {
    const output = countMinSketch([3, 3, 7, 7, 7, 11], [3], 8, 3) as {
      results: { value: number; estimatedCount: number }[];
    };
    const resultEntry = output.results.find((entry) => entry.value === 3);
    expect(resultEntry).toBeDefined();
    expect(resultEntry!.estimatedCount).toBeGreaterThanOrEqual(2);
  });

  it("returns empty results when querying an empty sketch", () => {
    const output = countMinSketch([], [3, 7], 8, 3) as {
      results: { value: number; estimatedCount: number }[];
    };
    expect(output.results).toHaveLength(0);
  });

  it("returns empty results when queries array is empty", () => {
    const output = countMinSketch([3, 3, 7], [], 8, 3) as {
      results: { value: number; estimatedCount: number }[];
    };
    expect(output.results).toHaveLength(0);
  });

  it("works with depth of 1", () => {
    const output = countMinSketch([5, 5, 5], [5], 16, 1) as {
      results: { value: number; estimatedCount: number }[];
    };
    const resultEntry = output.results.find((entry) => entry.value === 5);
    expect(resultEntry).toBeDefined();
    expect(resultEntry!.estimatedCount).toBeGreaterThanOrEqual(3);
  });

  it("estimated count never undercounts the true frequency", () => {
    const testElements = [1, 1, 1, 2, 2, 3];
    const output = countMinSketch(testElements, [1, 2, 3], 16, 4) as {
      results: { value: number; estimatedCount: number }[];
    };
    const countOf1 = output.results.find((entry) => entry.value === 1)?.estimatedCount ?? 0;
    const countOf2 = output.results.find((entry) => entry.value === 2)?.estimatedCount ?? 0;
    const countOf3 = output.results.find((entry) => entry.value === 3)?.estimatedCount ?? 0;
    expect(countOf1).toBeGreaterThanOrEqual(3);
    expect(countOf2).toBeGreaterThanOrEqual(2);
    expect(countOf3).toBeGreaterThanOrEqual(1);
  });

  it("handles a single element inserted once", () => {
    const output = countMinSketch([42], [42], 8, 3) as {
      results: { value: number; estimatedCount: number }[];
    };
    expect(output.results).toHaveLength(1);
    expect(output.results[0]!.estimatedCount).toBeGreaterThanOrEqual(1);
  });
});
