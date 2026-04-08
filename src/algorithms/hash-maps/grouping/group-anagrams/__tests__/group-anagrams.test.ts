import { describe, it, expect } from "vitest";
import { groupAnagrams } from "../sources/group-anagrams.ts?fn";

describe("groupAnagrams", () => {
  it("groups the default example into three anagram buckets", () => {
    const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]) as string[][];
    expect(result).toHaveLength(3);
  });

  it("places eat, tea, and ate in the same group", () => {
    const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]) as string[][];
    const eatGroup = result.find((group) => group.includes("eat"));
    expect(eatGroup).toBeDefined();
    expect(eatGroup).toContain("tea");
    expect(eatGroup).toContain("ate");
  });

  it("places tan and nat in the same group", () => {
    const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]) as string[][];
    const tanGroup = result.find((group) => group.includes("tan"));
    expect(tanGroup).toBeDefined();
    expect(tanGroup).toContain("nat");
  });

  it("places bat alone in its own group", () => {
    const result = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]) as string[][];
    const batGroup = result.find((group) => group.includes("bat"));
    expect(batGroup).toBeDefined();
    expect(batGroup).toHaveLength(1);
  });

  it("handles a single word returning one group", () => {
    const result = groupAnagrams(["hello"]) as string[][];
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(["hello"]);
  });

  it("handles all words being the same anagram", () => {
    const result = groupAnagrams(["abc", "bca", "cab"]) as string[][];
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(3);
  });

  it("handles words with no shared anagrams — each in its own group", () => {
    const result = groupAnagrams(["abc", "def", "ghi"]) as string[][];
    expect(result).toHaveLength(3);
    for (const group of result) {
      expect(group).toHaveLength(1);
    }
  });

  it("handles empty strings as a valid anagram group", () => {
    const result = groupAnagrams(["", ""]) as string[][];
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveLength(2);
  });

  it("returns all original words across all groups", () => {
    const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
    const result = groupAnagrams(words) as string[][];
    const allWords = result.flat().sort();
    expect(allWords).toEqual([...words].sort());
  });
});
