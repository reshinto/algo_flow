import { describe, it, expect } from "vitest";
import { generateReorganizeStringSteps } from "../step-generator";

describe("generateReorganizeStringSteps", () => {
  it('produces steps for the default input "aabbc"', () => {
    const steps = generateReorganizeStringSteps({ text: "aabbc" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateReorganizeStringSteps({ text: "aabbc" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateReorganizeStringSteps({ text: "aabbc" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateReorganizeStringSteps({ text: "aabbc" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateReorganizeStringSteps({ text: "aabbc" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("contains heap-insert and heap-extract steps", () => {
    const steps = generateReorganizeStringSteps({ text: "aabbc" });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
    expect(stepTypes).toContain("heap-extract");
  });

  it('final complete step variables include non-empty result for "aabbc"', () => {
    const steps = generateReorganizeStringSteps({ text: "aabbc" });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { result: string };
    expect(variables.result.length).toBe(5);
  });

  it('result for "aabbc" has no adjacent duplicate characters', () => {
    const steps = generateReorganizeStringSteps({ text: "aabbc" });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { result: string };
    const result = variables.result;
    for (let charIndex = 1; charIndex < result.length; charIndex++) {
      expect(result[charIndex]).not.toBe(result[charIndex - 1]);
    }
  });

  it('returns empty string for impossible case "aaab"', () => {
    const steps = generateReorganizeStringSteps({ text: "aaab" });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { result: string };
    expect(variables.result).toBe("");
  });

  it('handles single character "a"', () => {
    const steps = generateReorganizeStringSteps({ text: "a" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles two different characters", () => {
    const steps = generateReorganizeStringSteps({ text: "ab" });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { result: string };
    expect(variables.result.length).toBe(2);
  });
});
