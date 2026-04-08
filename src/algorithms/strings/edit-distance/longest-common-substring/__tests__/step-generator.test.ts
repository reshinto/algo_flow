/** Step generation tests for Longest Common Substring. */

import { describe, it, expect } from "vitest";
import { generateLongestCommonSubstringSteps } from "../step-generator";

describe("generateLongestCommonSubstringSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ABABC", target: "BABCBA" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ABABC", target: "BABCBA" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ABABC", target: "BABCBA" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-distance visual states throughout", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ABABC", target: "BABCBA" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-distance");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ABABC", target: "BABCBA" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits compute-distance steps for interior cells", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ABABC", target: "BABCBA" });
    const computeSteps = steps.filter((step) => step.type === "compute-distance");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("emits compare steps for character comparisons", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ab", target: "ab" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("emits a trace-edit-path step", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ABABC", target: "BABCBA" });
    const traceSteps = steps.filter((step) => step.type === "trace-edit-path");
    expect(traceSteps.length).toBeGreaterThan(0);
  });

  it("reports the correct max substring length in the found step", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "ABABC", target: "BABCBA" });
    const foundStep = steps.find((step) => step.type === "found");
    expect(foundStep).toBeDefined();
    if (foundStep?.visualState.kind === "string-distance") {
      expect(foundStep.visualState.result).toBe(4);
    }
  });

  it("returns 0 for no common substring", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "abc", target: "xyz" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(0);
    }
  });

  it("matrix dimensions match source and target lengths", () => {
    const source = "abc";
    const target = "de";
    const steps = generateLongestCommonSubstringSteps({ source, target });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "string-distance") {
      expect(firstStep.visualState.matrix.length).toBe(source.length + 1);
      expect(firstStep.visualState.matrix[0]?.length).toBe(target.length + 1);
    }
  });

  it("handles empty strings with minimal steps", () => {
    const steps = generateLongestCommonSubstringSteps({ source: "", target: "" });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
