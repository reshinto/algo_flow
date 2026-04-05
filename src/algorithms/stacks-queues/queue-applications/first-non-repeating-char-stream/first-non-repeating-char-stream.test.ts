import { describe, it, expect } from "vitest";
import { firstNonRepeatingCharStream } from "./sources/first-non-repeating-char-stream.ts?fn";

describe("firstNonRepeatingCharStream", () => {
  it("returns correct results for the default input 'aabcbcd'", () => {
    expect(firstNonRepeatingCharStream("aabcbcd")).toEqual(["a", "#", "b", "b", "c", "#", "d"]);
  });

  it("returns the only character for a single-character input", () => {
    expect(firstNonRepeatingCharStream("z")).toEqual(["z"]);
  });

  it("returns '#' for a string where all characters repeat", () => {
    // 'a': freq={a:1}, queue=['a'] → 'a'
    // 'a': freq={a:2}, queue=['a','a'] → drain 'a' (freq>1) twice → '#'
    // 'b': freq={a:2,b:1}, queue=['b'] → 'b'
    // 'b': freq={a:2,b:2}, queue=['b','b'] → drain 'b' (freq>1) twice → '#'
    expect(firstNonRepeatingCharStream("aabb")).toEqual(["a", "#", "b", "#"]);
  });

  it("returns every character when all are distinct", () => {
    expect(firstNonRepeatingCharStream("abcd")).toEqual(["a", "a", "a", "a"]);
  });

  it("handles two identical characters", () => {
    expect(firstNonRepeatingCharStream("aa")).toEqual(["a", "#"]);
  });

  it("returns '#' for an input that starts with a repeated pair", () => {
    const result = firstNonRepeatingCharStream("aab");
    expect(result[0]).toBe("a");
    expect(result[1]).toBe("#");
    expect(result[2]).toBe("b");
  });

  it("tracks the first non-repeating correctly when a later repeat evicts the queue front", () => {
    // 'a' is unique until the second 'a' arrives; 'b' then becomes the answer
    const result = firstNonRepeatingCharStream("aba");
    expect(result).toEqual(["a", "a", "b"]);
  });

  it("returns an empty array for an empty string", () => {
    expect(firstNonRepeatingCharStream("")).toEqual([]);
  });

  it("handles longer repeated sequences correctly", () => {
    const result = firstNonRepeatingCharStream("aaaabc");
    expect(result[0]).toBe("a");
    expect(result[1]).toBe("#");
    expect(result[2]).toBe("#");
    expect(result[3]).toBe("#");
    expect(result[4]).toBe("b");
    expect(result[5]).toBe("b");
  });
});
