/** Step generation tests for Aho-Corasick Search. */

import { describe, it, expect } from "vitest";
import { generateAhoCorasickSearchSteps } from "./step-generator";

describe("generateAhoCorasickSearchSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "ahishers",
      patterns: ["he", "she", "his", "hers"],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "ahishers",
      patterns: ["he", "she", "his", "hers"],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "ahishers",
      patterns: ["he", "she", "his", "hers"],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-trie visual states throughout", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "ahishers",
      patterns: ["he", "she", "his", "hers"],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-trie");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "ahishers",
      patterns: ["he", "she", "his", "hers"],
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-trie steps during the insert phase", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "abc",
      patterns: ["ab", "bc"],
    });
    const insertSteps = steps.filter((step) => step.type === "insert-trie");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits mark-end-word steps — one per unique pattern inserted", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "abc",
      patterns: ["ab", "bc"],
    });
    const endWordSteps = steps.filter((step) => step.type === "mark-end-word");
    expect(endWordSteps.length).toBe(2);
  });

  it("emits build-failure steps after the insert phase", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "ahishers",
      patterns: ["he", "she", "his", "hers"],
    });
    const failureSteps = steps.filter((step) => step.type === "build-failure");
    expect(failureSteps.length).toBeGreaterThan(0);
  });

  it("emits found steps when patterns are matched", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "ahishers",
      patterns: ["he", "she", "his", "hers"],
    });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBeGreaterThan(0);
  });

  it("does not emit found steps when no patterns match", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "xyz",
      patterns: ["abc", "def"],
    });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(0);
  });

  it("emits traverse-trie steps during the search phase", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "ahishers",
      patterns: ["he", "she", "his", "hers"],
    });
    const traverseSteps = steps.filter((step) => step.type === "traverse-trie");
    expect(traverseSteps.length).toBeGreaterThan(0);
  });

  it("trie nodes in final state include root plus all inserted pattern characters", () => {
    // patterns "ab" and "cd" share no prefix — 4 unique chars + root = 5 nodes
    const steps = generateAhoCorasickSearchSteps({
      text: "abcd",
      patterns: ["ab", "cd"],
    });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("string-trie");
    if (lastStep.visualState.kind === "string-trie") {
      expect(lastStep.visualState.nodes.length).toBe(5);
    }
  });

  it("produces correct number of found steps for single pattern match", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "hello",
      patterns: ["hell", "world"],
    });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(1);
  });

  it("handles empty patterns list with minimal steps", () => {
    const steps = generateAhoCorasickSearchSteps({
      text: "hello",
      patterns: [],
    });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
