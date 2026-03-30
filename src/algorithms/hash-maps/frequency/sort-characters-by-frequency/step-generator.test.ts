import { describe, it, expect } from "vitest";
import { generateSortCharactersByFrequencySteps } from "./step-generator";

describe("generateSortCharactersByFrequencySteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces hash-map visual states throughout", () => {
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits one increment-count step per character in the input", () => {
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    const incrementSteps = steps.filter((step) => step.type === "increment-count");
    expect(incrementSteps.length).toBe(4);
  });

  it("emits key-found steps equal to the number of unique characters", () => {
    // "tree" has 3 unique chars: t, r, e
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    const keyFoundSteps = steps.filter((step) => step.type === "key-found");
    expect(keyFoundSteps.length).toBe(3);
  });

  it("sets the result string in the final complete step", () => {
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.visualState.kind).toBe("hash-map");
    if (completeStep.visualState.kind === "hash-map") {
      const result = completeStep.visualState.result as string;
      expect(result).toHaveLength(4);
      expect(result.substring(0, 2)).toBe("ee");
    }
  });

  it("transitions through the building and sorting phases", () => {
    const steps = generateSortCharactersByFrequencySteps({ text: "tree" });
    const phases = steps
      .map((step) => (step.visualState.kind === "hash-map" ? step.visualState.phase : undefined))
      .filter(Boolean);
    expect(phases).toContain("building");
    expect(phases).toContain("sorting");
  });
});
