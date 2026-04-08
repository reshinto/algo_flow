import { describe, it, expect } from "vitest";
import { generateTrieInsertSearchSteps } from "../step-generator";

describe("generateTrieInsertSearchSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateTrieInsertSearchSteps({
      words: ["apple", "app", "apricot"],
      search: "app",
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple", "app"], search: "app" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple", "app"], search: "app" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-trie visual states throughout", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple", "app"], search: "app" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-trie");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["app"], search: "app" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-trie steps during the insert phase", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple"], search: "apple" });
    const insertSteps = steps.filter((step) => step.type === "insert-trie");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits traverse-trie steps during both phases", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple", "app"], search: "app" });
    const traverseSteps = steps.filter((step) => step.type === "traverse-trie");
    expect(traverseSteps.length).toBeGreaterThan(0);
  });

  it("emits mark-end-word steps after each word is inserted", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple", "app"], search: "app" });
    const endWordSteps = steps.filter((step) => step.type === "mark-end-word");
    expect(endWordSteps.length).toBe(2);
  });

  it("emits a found step when the search word exists in the trie", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple", "app"], search: "app" });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(1);
  });

  it("does not emit a found step when the search word is only a prefix", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple"], search: "ap" });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(0);
  });

  it("sets matchResult true in final step when word is found", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple", "app"], search: "app" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-trie");
    if (completeStep.visualState.kind === "string-trie") {
      expect(completeStep.visualState.matchResult).toBe(true);
    }
  });

  it("sets matchResult false in final step when word is not found", () => {
    const steps = generateTrieInsertSearchSteps({ words: ["apple"], search: "ap" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("string-trie");
    if (completeStep.visualState.kind === "string-trie") {
      expect(completeStep.visualState.matchResult).toBe(false);
    }
  });

  it("final trie node count equals unique prefix nodes inserted", () => {
    // "apple" and "app" share a-p-p prefix (3 shared) + l-e (2 unique) = 5 total nodes + root
    const steps = generateTrieInsertSearchSteps({ words: ["apple", "app"], search: "app" });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("string-trie");
    if (lastStep.visualState.kind === "string-trie") {
      // root (id=0) + a + p + p + l + e = 6 nodes
      expect(lastStep.visualState.nodes.length).toBe(6);
    }
  });
});
