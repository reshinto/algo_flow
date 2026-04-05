/** Step generation tests for Levenshtein Distance. */

import { describe, it, expect } from "vitest";
import { generateLevenshteinDistanceSteps } from "./step-generator";

describe("generateLevenshteinDistanceSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-distance visual states throughout", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-distance");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits fill-table steps for base cases", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    const fillTableSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillTableSteps.length).toBeGreaterThan(0);
  });

  it("emits compute-distance steps for interior cells", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    const computeSteps = steps.filter((step) => step.type === "compute-distance");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("emits a trace-edit-path step", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    const traceSteps = steps.filter((step) => step.type === "trace-edit-path");
    expect(traceSteps.length).toBeGreaterThan(0);
  });

  it("emits a found step with the correct edit distance", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "kitten", target: "sitting" });
    const foundStep = steps.find((step) => step.type === "found");
    expect(foundStep).toBeDefined();
    expect(foundStep?.visualState.kind).toBe("string-distance");
    if (foundStep?.visualState.kind === "string-distance") {
      expect(foundStep.visualState.result).toBe(3);
    }
  });

  it("returns distance 3 for empty source and 3-char target", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "", target: "abc" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(3);
    }
  });

  it("returns distance 0 for identical strings", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "abc", target: "abc" });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(0);
    }
  });

  it("emits compare steps when processing interior cells", () => {
    const steps = generateLevenshteinDistanceSteps({ source: "ab", target: "ac" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("matrix dimensions match source and target lengths", () => {
    const source = "abc";
    const target = "de";
    const steps = generateLevenshteinDistanceSteps({ source, target });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "string-distance") {
      expect(firstStep.visualState.matrix.length).toBe(source.length + 1);
      expect(firstStep.visualState.matrix[0]?.length).toBe(target.length + 1);
    }
  });
});
