/** Correctness tests for the Character Frequency Sort algorithm. */

import { describe, it, expect } from "vitest";
import { characterFrequencySort } from "./sources/character-frequency-sort.ts?fn";

describe("characterFrequencySort", () => {
  it("returns empty string for empty input", () => {
    expect(characterFrequencySort("")).toBe("");
  });

  it("sorts 'tree' so the most frequent character appears first", () => {
    const result = characterFrequencySort("tree") as string;
    expect(result.startsWith("ee")).toBe(true);
    expect(result).toHaveLength(4);
  });

  it("sorts 'cccaaa' — two characters with equal frequency both appear grouped", () => {
    const result = characterFrequencySort("cccaaa") as string;
    // Both 'c' and 'a' appear 3 times; each must appear as a contiguous block of 3
    expect(result).toHaveLength(6);
    expect(result.slice(0, 3) === "ccc" || result.slice(0, 3) === "aaa").toBe(true);
    expect(result.slice(3, 6) === "ccc" || result.slice(3, 6) === "aaa").toBe(true);
    expect(result.slice(0, 3)).not.toBe(result.slice(3, 6));
  });

  it("sorts 'aab' — 'a' appears twice so it comes first", () => {
    const result = characterFrequencySort("aab") as string;
    expect(result.startsWith("aa")).toBe(true);
    expect(result).toHaveLength(3);
  });

  it("handles a single character", () => {
    expect(characterFrequencySort("z")).toBe("z");
  });

  it("handles a string where all characters are the same", () => {
    expect(characterFrequencySort("aaaa")).toBe("aaaa");
  });

  it("preserves all characters — output is a rearrangement of input", () => {
    const inputText = "programming";
    const result = characterFrequencySort(inputText) as string;
    expect(result).toHaveLength(inputText.length);
    // Every character in input must appear in output with same count
    for (const char of new Set(inputText)) {
      const inputCount = [...inputText].filter((ch) => ch === char).length;
      const outputCount = [...result].filter((ch) => ch === char).length;
      expect(outputCount).toBe(inputCount);
    }
  });

  it("places the highest-frequency character at the start for 'eeebba'", () => {
    const result = characterFrequencySort("eeebba") as string;
    // 'e' appears 3 times, must come first
    expect(result.startsWith("eee")).toBe(true);
  });

  it("groups each character into a contiguous block in the output", () => {
    const result = characterFrequencySort("aabbcc") as string;
    // Each char appears exactly twice; output must have 3 contiguous blocks of 2
    expect(result).toHaveLength(6);
    for (let blockStart = 0; blockStart < 6; blockStart += 2) {
      expect(result[blockStart]).toBe(result[blockStart + 1]);
    }
  });

  it("sorts 'Aabb' treating uppercase and lowercase as distinct characters", () => {
    const result = characterFrequencySort("Aabb") as string;
    // 'b' appears twice, 'A' and 'a' appear once each
    expect(result.startsWith("bb")).toBe(true);
    expect(result).toHaveLength(4);
  });
});
