/** Step generation tests for Jaro-Winkler Similarity. */

import { describe, it, expect } from "vitest";
import { generateJaroWinklerSimilaritySteps } from "./step-generator";

describe("generateJaroWinklerSimilaritySteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces string-distance visual states throughout", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("string-distance");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits fill-table steps for base cases", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    const fillTableSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillTableSteps.length).toBeGreaterThan(0);
  });

  it("emits compare steps during match-window scanning", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("emits compute-distance steps for match results", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    const computeSteps = steps.filter((step) => step.type === "compute-distance");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("emits a trace-edit-path step for the matched pairs", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    const traceSteps = steps.filter((step) => step.type === "trace-edit-path");
    expect(traceSteps.length).toBeGreaterThan(0);
  });

  it("emits a found step with the correct similarity score", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "martha", target: "marhta" });
    const foundStep = steps.find((step) => step.type === "found");
    expect(foundStep).toBeDefined();
    expect(foundStep?.visualState.kind).toBe("string-distance");
    if (foundStep?.visualState.kind === "string-distance") {
      expect(foundStep.visualState.result).toBeCloseTo(0.9611, 4);
    }
  });

  it("returns similarity 1.0 for identical strings", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "abc", target: "abc" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(1.0);
    }
  });

  it("returns similarity 0.0 for empty source", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "", target: "abc" });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.type).toBe("complete");
    if (completeStep.visualState.kind === "string-distance") {
      expect(completeStep.visualState.result).toBe(0.0);
    }
  });

  it("matrix dimensions match source and target lengths", () => {
    const source = "ab";
    const target = "cd";
    const steps = generateJaroWinklerSimilaritySteps({ source, target });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "string-distance") {
      expect(firstStep.visualState.matrix.length).toBe(source.length + 1);
      expect(firstStep.visualState.matrix[0]?.length).toBe(target.length + 1);
    }
  });

  it("produces a found step with result between 0 and 1", () => {
    const steps = generateJaroWinklerSimilaritySteps({ source: "algorithm", target: "logarithm" });
    const foundStep = steps.find((step) => step.type === "found");
    expect(foundStep).toBeDefined();
    if (foundStep?.visualState.kind === "string-distance") {
      expect(foundStep.visualState.result).toBeGreaterThanOrEqual(0);
      expect(foundStep.visualState.result).toBeLessThanOrEqual(1);
    }
  });
});
