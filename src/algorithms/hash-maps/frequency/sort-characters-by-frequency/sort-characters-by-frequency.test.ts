import { describe, it, expect } from "vitest";
import { sortCharactersByFrequency } from "./sources/sort-characters-by-frequency.ts?fn";

describe("sortCharactersByFrequency", () => {
  it("sorts the default example 'tree' so 'e' appears first", () => {
    const result = sortCharactersByFrequency("tree") as string;
    expect(result.substring(0, 2)).toBe("ee");
    expect(result).toHaveLength(4);
    expect(result).toContain("t");
    expect(result).toContain("r");
  });

  it("handles a string where one character dominates", () => {
    const result = sortCharactersByFrequency("aabb") as string;
    expect(result.substring(0, 2)).toMatch(/aa|bb/);
    expect(result).toHaveLength(4);
  });

  it("returns a single-character string unchanged", () => {
    const result = sortCharactersByFrequency("z") as string;
    expect(result).toBe("z");
  });

  it("places the most frequent character first in 'cccaab'", () => {
    const result = sortCharactersByFrequency("cccaab") as string;
    expect(result.substring(0, 3)).toBe("ccc");
    expect(result).toHaveLength(6);
  });

  it("handles all identical characters", () => {
    const result = sortCharactersByFrequency("aaaa") as string;
    expect(result).toBe("aaaa");
  });

  it("handles a two-character string with equal frequency in either order", () => {
    const result = sortCharactersByFrequency("ab") as string;
    expect(result).toHaveLength(2);
    expect(result).toContain("a");
    expect(result).toContain("b");
  });

  it("handles digits as characters", () => {
    const result = sortCharactersByFrequency("2211") as string;
    expect(result.substring(0, 2)).toMatch(/22|11/);
    expect(result).toHaveLength(4);
  });

  it("preserves all characters in the output", () => {
    const input = "mississippi";
    const result = sortCharactersByFrequency(input) as string;
    expect(result).toHaveLength(input.length);
    const sortedInput = input.split("").sort().join("");
    const sortedResult = result.split("").sort().join("");
    expect(sortedResult).toBe(sortedInput);
  });
});
