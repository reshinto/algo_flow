import { describe, it, expect } from "vitest";
import { generateFindTheDifferenceSteps } from "./step-generator";

describe("generateFindTheDifferenceSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateFindTheDifferenceSteps({ original: "abcd", modified: "abcde" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateFindTheDifferenceSteps({ original: "abcd", modified: "abcde" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateFindTheDifferenceSteps({ original: "abcd", modified: "abcde" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateFindTheDifferenceSteps({ original: "abcd", modified: "abcde" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateFindTheDifferenceSteps({ original: "abcd", modified: "abcde" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits increment-count and decrement-count steps", () => {
    const steps = generateFindTheDifferenceSteps({ original: "abcd", modified: "abcde" });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    const decrementSteps = steps.filter((step) => step.type === "decrement-count");
    expect(incrementSteps.length).toBe(4);
    expect(decrementSteps.length).toBeGreaterThan(0);
  });

  it("sets result to 'e' for default input", () => {
    const steps = generateFindTheDifferenceSteps({ original: "abcd", modified: "abcde" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "hash-map") {
      expect(completeStep.visualState.result).toBe("e");
    }
  });

  it("includes secondary input elements for the modified string", () => {
    const steps = generateFindTheDifferenceSteps({ original: "abcd", modified: "abcde" });
    const lastStep = steps[steps.length - 1]!;
    if (lastStep.visualState.kind === "hash-map") {
      expect(lastStep.visualState.secondaryInputElements).toBeDefined();
    }
  });
});
