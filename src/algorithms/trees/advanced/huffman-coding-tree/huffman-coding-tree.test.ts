import { describe, it, expect } from "vitest";
import { huffmanCodingTree } from "./sources/huffman-coding-tree.ts?fn";

describe("huffmanCodingTree", () => {
  const defaultFreqs = [
    { char: "a", freq: 5 },
    { char: "b", freq: 9 },
    { char: "c", freq: 12 },
    { char: "d", freq: 13 },
    { char: "e", freq: 16 },
    { char: "f", freq: 45 },
  ];

  it("produces encodings for all characters", () => {
    const result = huffmanCodingTree(defaultFreqs) as Record<string, string>;
    const chars = defaultFreqs.map(({ char }) => char);
    for (const char of chars) {
      expect(result[char]).toBeDefined();
      expect(typeof result[char]).toBe("string");
    }
  });

  it("produces valid binary strings (only 0s and 1s)", () => {
    const result = huffmanCodingTree(defaultFreqs) as Record<string, string>;
    for (const encoding of Object.values(result)) {
      expect(/^[01]+$/.test(encoding)).toBe(true);
    }
  });

  it("most frequent character gets shortest code", () => {
    const result = huffmanCodingTree(defaultFreqs) as Record<string, string>;
    const fEncoding = result["f"]!;
    const otherLengths = Object.entries(result)
      .filter(([char]) => char !== "f")
      .map(([, enc]) => enc.length);
    expect(fEncoding.length).toBeLessThanOrEqual(Math.min(...otherLengths));
  });

  it("all codes are prefix-free", () => {
    const result = huffmanCodingTree(defaultFreqs) as Record<string, string>;
    const codes = Object.values(result);
    for (let codeIdx = 0; codeIdx < codes.length; codeIdx++) {
      for (let otherIdx = 0; otherIdx < codes.length; otherIdx++) {
        if (codeIdx !== otherIdx) {
          const codeA = codes[codeIdx]!;
          const codeB = codes[otherIdx]!;
          expect(codeA.startsWith(codeB) && codeA !== codeB).toBe(false);
        }
      }
    }
  });

  it("handles single character", () => {
    const result = huffmanCodingTree([{ char: "x", freq: 10 }]) as Record<string, string>;
    expect(result["x"]).toBe("0");
  });
});
