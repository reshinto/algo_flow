import { describe, it, expect } from "vitest";
import { generateAutoCompleteTrieSteps } from "./step-generator";

describe("generateAutoCompleteTrieSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateAutoCompleteTrieSteps({
      words: ["apple", "app", "apricot", "banana", "bat"],
      prefix: "ap",
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["apple", "app"], prefix: "ap" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["apple", "app"], prefix: "ap" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-trie visual states throughout", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["apple", "app"], prefix: "ap" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-trie");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["app"], prefix: "ap" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-trie steps during the insert phase", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["apple"], prefix: "ap" });
    const insertSteps = steps.filter((step) => step.type === "insert-trie");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits traverse-trie steps during both phases", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["apple", "app"], prefix: "ap" });
    const traverseSteps = steps.filter((step) => step.type === "traverse-trie");
    expect(traverseSteps.length).toBeGreaterThan(0);
  });

  it("emits mark-end-word steps after each word is inserted", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["apple", "app"], prefix: "ap" });
    const endWordSteps = steps.filter((step) => step.type === "mark-end-word");
    expect(endWordSteps.length).toBe(2);
  });

  it("emits add-to-result steps for each matching word found", () => {
    const steps = generateAutoCompleteTrieSteps({
      words: ["apple", "app", "apricot"],
      prefix: "ap",
    });
    const resultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(resultSteps.length).toBe(3);
  });

  it("emits no add-to-result steps when prefix has no matches", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["apple", "app"], prefix: "ba" });
    const resultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(resultSteps.length).toBe(0);
  });

  it("accumulates suggestions in the visual state", () => {
    const steps = generateAutoCompleteTrieSteps({
      words: ["apple", "app"],
      prefix: "ap",
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-trie");
    if (completeStep.visualState.kind === "string-trie") {
      expect(completeStep.visualState.suggestions.length).toBe(2);
    }
  });

  it("has no suggestions in the final step when prefix is not found", () => {
    const steps = generateAutoCompleteTrieSteps({ words: ["apple"], prefix: "xyz" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-trie");
    if (completeStep.visualState.kind === "string-trie") {
      expect(completeStep.visualState.suggestions).toEqual([]);
    }
  });

  it("final trie node count equals unique prefix nodes inserted", () => {
    // "apple" and "app" share a-p-p prefix (3 shared) + l-e (2 unique) = 5 nodes + root
    const steps = generateAutoCompleteTrieSteps({ words: ["apple", "app"], prefix: "ap" });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("string-trie");
    if (lastStep.visualState.kind === "string-trie") {
      // root (id=0) + a + p + p + l + e = 6 nodes
      expect(lastStep.visualState.nodes.length).toBe(6);
    }
  });

  it("handles empty word list without errors", () => {
    const steps = generateAutoCompleteTrieSteps({ words: [], prefix: "ap" });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
