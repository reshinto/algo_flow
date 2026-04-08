import { describe, it, expect } from "vitest";
import { generateTriePrefixCountSteps } from "../step-generator";

describe("generateTriePrefixCountSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateTriePrefixCountSteps({
      words: ["apple", "app", "apricot", "ape"],
      prefix: "ap",
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTriePrefixCountSteps({ words: ["apple", "app"], prefix: "ap" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTriePrefixCountSteps({ words: ["apple", "app"], prefix: "ap" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-trie visual states throughout", () => {
    const steps = generateTriePrefixCountSteps({ words: ["apple", "app"], prefix: "ap" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-trie");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTriePrefixCountSteps({ words: ["app"], prefix: "ap" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits insert-trie steps during the insert phase", () => {
    const steps = generateTriePrefixCountSteps({ words: ["apple"], prefix: "ap" });
    const insertSteps = steps.filter((step) => step.type === "insert-trie");
    expect(insertSteps.length).toBeGreaterThan(0);
  });

  it("emits traverse-trie steps during both phases", () => {
    const steps = generateTriePrefixCountSteps({ words: ["apple", "app"], prefix: "ap" });
    const traverseSteps = steps.filter((step) => step.type === "traverse-trie");
    expect(traverseSteps.length).toBeGreaterThan(0);
  });

  it("emits mark-end-word steps after each word is inserted", () => {
    const steps = generateTriePrefixCountSteps({ words: ["apple", "app"], prefix: "ap" });
    const endWordSteps = steps.filter((step) => step.type === "mark-end-word");
    expect(endWordSteps.length).toBe(2);
  });

  it("emits a found step when the prefix exists in the trie", () => {
    const steps = generateTriePrefixCountSteps({
      words: ["apple", "app", "apricot", "ape"],
      prefix: "ap",
    });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(1);
  });

  it("does not emit a found step when the prefix does not exist", () => {
    const steps = generateTriePrefixCountSteps({ words: ["apple"], prefix: "z" });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(0);
  });

  it("final node count equals unique prefix nodes inserted", () => {
    // "apple" and "app" share a-p-p prefix (3 shared) + l-e (2 unique) = 5 nodes + root
    const steps = generateTriePrefixCountSteps({ words: ["apple", "app"], prefix: "ap" });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("string-trie");
    if (lastStep.visualState.kind === "string-trie") {
      // root (id=0) + a + p + p + l + e = 6 nodes
      expect(lastStep.visualState.nodes.length).toBe(6);
    }
  });

  it("produces steps when the word list is empty", () => {
    const steps = generateTriePrefixCountSteps({ words: [], prefix: "ap" });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("emits traverse-trie steps for a missing prefix character", () => {
    const steps = generateTriePrefixCountSteps({ words: ["apple"], prefix: "z" });
    const traverseSteps = steps.filter((step) => step.type === "traverse-trie");
    expect(traverseSteps.length).toBeGreaterThan(0);
  });
});
