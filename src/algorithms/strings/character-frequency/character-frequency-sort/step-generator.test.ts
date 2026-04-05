/** Step generation tests for Character Frequency Sort — verifies step types and visual state. */

import { describe, it, expect } from "vitest";
import { generateCharacterFrequencySortSteps } from "./step-generator";

describe("generateCharacterFrequencySortSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "tree" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "tree" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "tree" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-frequency visual states throughout", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "tree" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-frequency");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "tree" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits update-frequency steps equal to text.length for the counting phase", () => {
    const inputText = "tree";
    const steps = generateCharacterFrequencySortSteps({ text: inputText });
    const frequencySteps = steps.filter((step) => step.type === "update-frequency");
    expect(frequencySteps.length).toBe(inputText.length);
  });

  it("emits add-to-result steps equal to the number of distinct characters", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "aabbcc" });
    // 3 distinct chars: 'a', 'b', 'c'
    const resultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(resultSteps.length).toBe(3);
  });

  it("emits only initialize and complete for empty input", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "" });
    expect(steps).toHaveLength(2);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[1]?.type).toBe("complete");
  });

  it("emits a single add-to-result step when all characters are the same", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "aaaa" });
    const resultSteps = steps.filter((step) => step.type === "add-to-result");
    expect(resultSteps.length).toBe(1);
  });

  it("emits a compare step for the sort-by-frequency phase", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "tree" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("produces string-frequency kind for single-character input", () => {
    const steps = generateCharacterFrequencySortSteps({ text: "z" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-frequency");
    }
  });

  it("emits update-frequency steps equal to text.length for a longer string", () => {
    const inputText = "programming";
    const steps = generateCharacterFrequencySortSteps({ text: inputText });
    const frequencySteps = steps.filter((step) => step.type === "update-frequency");
    expect(frequencySteps.length).toBe(inputText.length);
  });
});
