import { describe, it, expect } from "vitest";
import { generateRansomNoteSteps } from "../step-generator";

describe("generateRansomNoteSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("emits increment-count steps for each magazine character", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBe("aab".length);
  });

  it("emits decrement-count steps for each ransom note character", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    const decrementSteps = steps.filter((step) => step.type === "decrement-count");
    expect(decrementSteps.length).toBe("aa".length);
  });

  it("sets result to true when ransom note can be constructed", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(true);
    }
  });

  it("sets result to false when magazine cannot supply a required character", () => {
    const steps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "ab" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe(false);
    }
  });

  it("early-exits when a character count goes negative", () => {
    const fullSteps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "aab" });
    const earlySteps = generateRansomNoteSteps({ ransomNote: "aa", magazine: "ab" });
    expect(earlySteps.length).toBeLessThan(fullSteps.length);
  });
});
