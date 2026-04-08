import { describe, it, expect } from "vitest";
import { generateLongestWordInTrieSteps } from "../step-generator";

describe("generateLongestWordInTrieSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLongestWordInTrieSteps({
      words: ["w", "wo", "wor", "worl", "world"],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo", "wor"] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo", "wor"] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-trie visual states throughout", () => {
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo", "wor"] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-trie");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo"] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-trie steps during the insert phase", () => {
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo", "wor"] });
    const insertSteps = steps.filter((step) => step.type === "insert-trie");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits mark-end-word steps after each word is inserted", () => {
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo", "wor"] });
    const endWordSteps = steps.filter((step) => step.type === "mark-end-word");
    expect(endWordSteps.length).toBe(3);
  });

  it("emits traverse-trie steps during the DFS search phase", () => {
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo", "wor"] });
    const traverseSteps = steps.filter((step) => step.type === "traverse-trie");
    expect(traverseSteps.length).toBeGreaterThan(0);
  });

  it("emits at least one found step when a valid longest word exists", () => {
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo", "world"] });
    // "world" is NOT valid (missing "wor", "worl") but "wo" is valid (prefix "w" exists)
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("does not emit found steps when no valid word exists", () => {
    // "world" alone has no prefixes in the set
    const steps = generateLongestWordInTrieSteps({ words: ["world"] });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(0);
  });

  it("final trie node count reflects unique prefix nodes inserted", () => {
    // "w","wo","wor" share the w-o-r prefix chain — 3 nodes + root = 4 total
    const steps = generateLongestWordInTrieSteps({ words: ["w", "wo", "wor"] });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("string-trie");
    if (lastStep.visualState.kind === "string-trie") {
      expect(lastStep.visualState.nodes.length).toBe(4);
    }
  });

  it("produces correct node count for default input with 5 words in a chain", () => {
    // "w","wo","wor","worl","world" — root + w + o + r + l + d = 6 nodes
    const steps = generateLongestWordInTrieSteps({
      words: ["w", "wo", "wor", "worl", "world"],
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("string-trie");
    if (lastStep.visualState.kind === "string-trie") {
      expect(lastStep.visualState.nodes.length).toBe(6);
    }
  });

  it("produces steps for an empty word list", () => {
    const steps = generateLongestWordInTrieSteps({ words: [] });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
