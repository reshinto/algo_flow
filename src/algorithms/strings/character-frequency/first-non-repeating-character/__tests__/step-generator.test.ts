/** Step generation tests for First Non-Repeating Character — verifies step types and visual state. */

import { describe, it, expect } from "vitest";
import { generateFirstNonRepeatingCharacterSteps } from "../step-generator";

describe("generateFirstNonRepeatingCharacterSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-frequency visual states throughout", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-frequency");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits update-frequency steps when building the frequency map", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    const frequencySteps = steps.filter((step) => step.type === "update-frequency");
    expect(frequencySteps.length).toBeGreaterThan(0);
  });

  it("emits one update-frequency step per character in the input", () => {
    const textInput = "abc";
    const steps = generateFirstNonRepeatingCharacterSteps({ text: textInput });
    const frequencySteps = steps.filter((step) => step.type === "update-frequency");
    expect(frequencySteps.length).toBe(textInput.length);
  });

  it("emits compare steps when scanning for the first unique character", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("emits a found step when a non-repeating character is identified", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(1);
  });

  it("does not emit a found step when all characters repeat", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "aabb" });
    const foundSteps = steps.filter((step) => step.type === "found");
    expect(foundSteps.length).toBe(0);
  });

  it("complete step variables contain result -1 when no unique character exists", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "aabb" });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
    expect((lastStep.variables as Record<string, unknown>).result).toBe(-1);
  });

  it("complete step variables contain result 0 for leetcode", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "leetcode" });
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
    expect((lastStep.variables as Record<string, unknown>).result).toBe(0);
  });

  it("returns steps for a single-character string", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "a" });
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-frequency kind for all-repeating input", () => {
    const steps = generateFirstNonRepeatingCharacterSteps({ text: "aabb" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-frequency");
    }
  });
});
