/** Step generation tests for Longest Common Prefix. */

import { describe, it, expect } from "vitest";
import { generateLongestCommonPrefixSteps } from "../step-generator";

describe("generateLongestCommonPrefixSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["flower", "flow", "flight"] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["flower", "flow", "flight"] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["flower", "flow", "flight"] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-transform visual states throughout", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["flower", "flow", "flight"] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-transform");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["flower", "flow", "flight"] });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("produces write-char steps for each matched column", () => {
    // ["flower","flow","flight"] → prefix "fl" → 2 write-char steps
    const steps = generateLongestCommonPrefixSteps({ words: ["flower", "flow", "flight"] });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    expect(writeSteps.length).toBe(2);
  });

  it("produces no write-char steps when there is no common prefix", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["dog", "racecar", "car"] });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    expect(writeSteps.length).toBe(0);
  });

  it("produces only initialize and complete steps for an empty array", () => {
    const steps = generateLongestCommonPrefixSteps({ words: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("produces read-char steps during column comparison", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["flower", "flow", "flight"] });
    const readSteps = steps.filter((step) => step.type === "read-char");
    expect(readSteps.length).toBeGreaterThan(0);
  });

  it("complete step variables carry the correct result for default input", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["flower", "flow", "flight"] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe("fl");
  });

  it("complete step result is empty string when no prefix exists", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["dog", "racecar", "car"] });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["result"]).toBe("");
  });

  it("write-char count equals prefix length for identical strings", () => {
    const steps = generateLongestCommonPrefixSteps({ words: ["abc", "abc"] });
    const writeSteps = steps.filter((step) => step.type === "write-char");
    expect(writeSteps.length).toBe(3);
  });
});
