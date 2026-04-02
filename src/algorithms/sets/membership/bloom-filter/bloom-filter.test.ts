import { describe, it, expect } from "vitest";
import { bloomFilter } from "./sources/bloom-filter.ts?fn";

describe("bloomFilter", () => {
  it("returns results for default input", () => {
    const output = bloomFilter([3, 7, 11, 15], [3, 5, 7, 9, 11], 16, 3) as {
      results: { value: number; found: boolean }[];
    };
    expect(output.results).toBeDefined();
    expect(output.results.length).toBe(5);
  });

  it("reports inserted elements as found (no false negatives)", () => {
    const insertedElements = [3, 7, 11, 15];
    const output = bloomFilter(insertedElements, insertedElements, 16, 3) as {
      results: { value: number; found: boolean }[];
    };
    for (const result of output.results) {
      expect(result.found).toBe(true);
    }
  });

  it("reports definitely-absent elements as not found when bit array is empty", () => {
    // With no elements inserted, all queries must be not-found
    const output = bloomFilter([], [1, 2, 3, 4, 5], 16, 3) as {
      results: { value: number; found: boolean }[];
    };
    for (const result of output.results) {
      expect(result.found).toBe(false);
    }
  });

  it("returns correct query result values", () => {
    const output = bloomFilter([3, 7, 11, 15], [3, 5, 7, 9, 11], 16, 3) as {
      results: { value: number; found: boolean }[];
    };
    const resultMap = new Map(output.results.map((result) => [result.value, result.found]));
    // Inserted and queried elements must be found
    expect(resultMap.get(3)).toBe(true);
    expect(resultMap.get(7)).toBe(true);
    expect(resultMap.get(11)).toBe(true);
  });

  it("preserves query order in results", () => {
    const queries = [3, 5, 7, 9, 11];
    const output = bloomFilter([3, 7, 11, 15], queries, 16, 3) as {
      results: { value: number; found: boolean }[];
    };
    for (let queryIdx = 0; queryIdx < queries.length; queryIdx++) {
      expect(output.results[queryIdx]?.value).toBe(queries[queryIdx]);
    }
  });

  it("handles single inserted element queried directly", () => {
    const output = bloomFilter([42], [42], 16, 3) as {
      results: { value: number; found: boolean }[];
    };
    expect(output.results[0]?.found).toBe(true);
  });

  it("handles single uninserted element query on full bit array", () => {
    // Only one element, querying a very different value — should be not-found
    const output = bloomFilter([1], [999], 16, 3) as {
      results: { value: number; found: boolean }[];
    };
    // Result depends on hash collisions — found means false positive, not-found means correct
    // Either is acceptable. Just ensure a result is returned.
    expect(output.results[0]).toBeDefined();
    expect(typeof output.results[0]?.found).toBe("boolean");
  });

  it("returns empty results for empty queries", () => {
    const output = bloomFilter([3, 7, 11], [], 16, 3) as {
      results: { value: number; found: boolean }[];
    };
    expect(output.results.length).toBe(0);
  });

  it("works with hashCount of 1", () => {
    const output = bloomFilter([5, 10], [5, 10, 15], 16, 1) as {
      results: { value: number; found: boolean }[];
    };
    expect(output.results[0]?.found).toBe(true);
    expect(output.results[1]?.found).toBe(true);
  });

  it("works with larger bit array size", () => {
    const elements = [100, 200, 300];
    const output = bloomFilter(elements, elements, 512, 5) as {
      results: { value: number; found: boolean }[];
    };
    // No false negatives — all inserted elements must be reported found
    for (const result of output.results) {
      expect(result.found).toBe(true);
    }
  });
});
