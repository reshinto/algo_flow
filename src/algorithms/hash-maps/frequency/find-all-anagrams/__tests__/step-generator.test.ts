import { describe, it, expect } from "vitest";
import { generateFindAllAnagramsSteps } from "../step-generator";

describe("generateFindAllAnagramsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits key-found steps for each anagram match found", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    const keyFoundSteps = steps.filter((step) => step.type === "key-found");
    expect(keyFoundSteps.length).toBe(2);
  });

  it("emits decrement-count steps while sliding the window", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    const decrementSteps = steps.filter((step) => step.type === "decrement-count");
    expect(decrementSteps.length).toBeGreaterThan(0);
  });

  it("sets the result array in the final complete step", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toEqual([0, 6]);
    }
  });

  it("transitions through the building and scanning phases", () => {
    const steps = generateFindAllAnagramsSteps({ text: "cbaebabacd", pattern: "abc" });
    const phases = steps
      .map((step) => (step.visualState.kind === "hash-map" ? step.visualState.phase : undefined))
      .filter(Boolean);
    expect(phases).toContain("building");
    expect(phases).toContain("scanning");
  });

  it("produces an empty result when no anagram matches", () => {
    const steps = generateFindAllAnagramsSteps({ text: "af", pattern: "be" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toEqual([]);
    }
  });
});
