/** Step generation tests for Longest Common Subsequence. */

import { describe, it, expect } from "vitest";
import { generateLongestCommonSubsequenceSteps } from "../step-generator";

describe("generateLongestCommonSubsequenceSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-distance visual states throughout", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-distance");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits fill-table steps for base cases", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    const fillTableSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillTableSteps.length).toBeGreaterThan(0);
  });

  it("emits compute-distance steps for interior cells", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    const computeSteps = steps.filter((step) => step.type === "compute-distance");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("emits a trace-edit-path step", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    const traceSteps = steps.filter((step) => step.type === "trace-edit-path");
    expect(traceSteps.length).toBeGreaterThan(0);
  });

  it("emits a found step with the correct LCS length", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "ABCBDAB", target: "BDCAB" });
    const foundStep = steps.find((step) => step.type === "found");
    expect(foundStep).toBeDefined();
    expect(foundStep?.visualState.kind).toBe("string-distance");
    if (foundStep?.visualState.kind === "string-distance") {
      expect(foundStep.visualState.result).toBe(4);
    }
  });

  it("returns LCS 0 for empty source", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "", target: "abc" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(0);
    }
  });

  it("returns full length for identical strings", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "abc", target: "abc" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(3);
    }
  });

  it("emits compare steps when processing interior cells", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "AB", target: "AC" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("matrix dimensions match source and target lengths", () => {
    const source = "ABC";
    const target = "DE";
    const steps = generateLongestCommonSubsequenceSteps({ source, target });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "string-distance") {
      expect(firstStep.visualState.matrix.length).toBe(source.length + 1);
      expect(firstStep.visualState.matrix[0]?.length).toBe(target.length + 1);
    }
  });

  it("returns LCS 0 when no characters are shared", () => {
    const steps = generateLongestCommonSubsequenceSteps({ source: "abc", target: "xyz" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(0);
    }
  });
});
