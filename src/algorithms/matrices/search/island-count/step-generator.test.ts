import { describe, it, expect } from "vitest";
import { generateIslandCountSteps } from "./step-generator";

const DEFAULT_GRID = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1],
];

describe("generateIslandCountSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateIslandCountSteps({ grid: DEFAULT_GRID });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateIslandCountSteps({ grid: DEFAULT_GRID });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateIslandCountSteps({ grid: DEFAULT_GRID });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces matrix visual states throughout", () => {
    const steps = generateIslandCountSteps({ grid: DEFAULT_GRID });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("matrix");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateIslandCountSteps({ grid: DEFAULT_GRID });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("result in complete step matches expected island count", () => {
    const steps = generateIslandCountSteps({ grid: DEFAULT_GRID });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables.result).toBe(3);
  });

  it("emits visit steps when scanning cells", () => {
    const steps = generateIslandCountSteps({ grid: DEFAULT_GRID });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("emits mark-found steps for island cells", () => {
    const steps = generateIslandCountSteps({ grid: DEFAULT_GRID });
    const markSteps = steps.filter((step) => step.type === "mark-found");
    expect(markSteps.length).toBeGreaterThan(0);
  });

  it("does not mutate the input grid", () => {
    const grid = [
      [1, 1, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    const gridSnapshot = grid.map((row) => [...row]);
    generateIslandCountSteps({ grid });
    expect(grid).toEqual(gridSnapshot);
  });

  it("handles an all-zeros grid (no islands)", () => {
    const steps = generateIslandCountSteps({
      grid: [
        [0, 0],
        [0, 0],
      ],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables.result).toBe(0);
  });
});
