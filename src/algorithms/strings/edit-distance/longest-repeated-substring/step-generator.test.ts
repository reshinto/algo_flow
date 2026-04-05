/** Step generation tests for Longest Repeated Substring. */

import { describe, it, expect } from "vitest";
import { generateLongestRepeatedSubstringSteps } from "./step-generator";

describe("generateLongestRepeatedSubstringSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-distance visual states throughout", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-distance");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits compare steps when processing cells", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("emits compute-distance steps for interior cells", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    const computeSteps = steps.filter((step) => step.type === "compute-distance");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("emits a trace-edit-path step", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    const traceSteps = steps.filter((step) => step.type === "trace-edit-path");
    expect(traceSteps.length).toBeGreaterThan(0);
  });

  it("emits a found step", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    const foundStep = steps.find((step) => step.type === "found");
    expect(foundStep).toBeDefined();
    expect(foundStep?.visualState.kind).toBe("string-distance");
  });

  it('reports result "ana" for "banana" in the complete step variables', () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "banana" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    expect(completeStep.variables["result"]).toBe("ana");
  });

  it("returns empty result for a string with no repeated characters", () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "abcd" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    expect(completeStep.variables["result"]).toBe("");
  });

  it('returns "a" for "aab"', () => {
    const steps = generateLongestRepeatedSubstringSteps({ text: "aab" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    expect(completeStep.variables["result"]).toBe("a");
  });

  it("matrix dimensions match text length (source = target = text)", () => {
    const text = "banana";
    const steps = generateLongestRepeatedSubstringSteps({ text });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "string-distance") {
      expect(firstStep.visualState.matrix.length).toBe(text.length + 1);
      expect(firstStep.visualState.matrix[0]?.length).toBe(text.length + 1);
    }
  });

  it("handles empty string input without throwing", () => {
    expect(() => generateLongestRepeatedSubstringSteps({ text: "" })).not.toThrow();
  });

  it("handles single-character input without throwing", () => {
    expect(() => generateLongestRepeatedSubstringSteps({ text: "a" })).not.toThrow();
  });
});
