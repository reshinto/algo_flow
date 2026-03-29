import { describe, it, expect } from "vitest";
import { generateXorRangeQuerySteps } from "./step-generator";

describe("generateXorRangeQuerySteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateXorRangeQuerySteps({
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [[0, 2]],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateXorRangeQuerySteps({
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [[0, 2]],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateXorRangeQuerySteps({
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [[0, 2]],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("all steps have array visual state kind", () => {
    const steps = generateXorRangeQuerySteps({
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [[0, 2]],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateXorRangeQuerySteps({
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [[0, 2]],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes secondary elements for the prefix XOR array visualization", () => {
    const steps = generateXorRangeQuerySteps({
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [[0, 2]],
    });
    const buildStep = steps.find(
      (step) =>
        step.type === "visit" &&
        (step.visualState as { kind: string; secondaryElements?: unknown[] }).secondaryElements !==
          undefined,
    );
    expect(buildStep).toBeDefined();
  });

  it("includes visit steps for each element during build phase", () => {
    const inputArray = [3, 5, 2, 7];
    const steps = generateXorRangeQuerySteps({ inputArray, queries: [[0, 3]] });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThanOrEqual(inputArray.length);
  });

  it("includes compare steps during query phase", () => {
    const steps = generateXorRangeQuerySteps({
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [
        [0, 2],
        [1, 4],
      ],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateXorRangeQuerySteps({ inputArray: [], queries: [] });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("complete step variables contain correct query results", () => {
    const steps = generateXorRangeQuerySteps({
      inputArray: [3, 5, 2, 7, 1, 4],
      queries: [
        [0, 2],
        [1, 4],
        [2, 5],
      ],
    });
    const lastStep = steps[steps.length - 1]!;
    const vars = lastStep.variables as { queryResults: number[] };
    expect(vars.queryResults).toEqual([4, 1, 0]);
  });
});
