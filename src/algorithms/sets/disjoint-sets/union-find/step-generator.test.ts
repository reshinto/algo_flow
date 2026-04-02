import { describe, it, expect } from "vitest";
import { generateUnionFindSteps } from "./step-generator";

const DEFAULT_INPUT = {
  elementCount: 8,
  operations: [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [0, 2],
    [4, 6],
    [0, 4],
  ] as [number, number][],
};

describe("generateUnionFindSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits find-root steps", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    const findSteps = steps.filter((step) => step.type === "find-root");
    expect(findSteps.length).toBeGreaterThan(0);
  });

  it("emits union-sets steps equal to the number of unique merges", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    const unionSteps = steps.filter((step) => step.type === "union-sets");
    // 7 operations, all produce unique merges — expect 7 union-sets steps
    expect(unionSteps.length).toBe(7);
  });

  it("emits visit steps for path compression and component updates", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("final complete step visualState has one component", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.visualState.kind).toBe("set");
    if (lastStep.visualState.kind === "set") {
      expect(lastStep.visualState.components!.length).toBe(1);
    }
  });

  it("handles no operations — each element stays in its own component", () => {
    const steps = generateUnionFindSteps({ elementCount: 4, operations: [] });
    const lastStep = steps[steps.length - 1]!;
    if (lastStep.visualState.kind === "set") {
      expect(lastStep.visualState.components!.length).toBe(4);
    }
  });

  it("handles a single union operation", () => {
    const steps = generateUnionFindSteps({ elementCount: 4, operations: [[0, 1]] });
    const unionSteps = steps.filter((step) => step.type === "union-sets");
    expect(unionSteps.length).toBe(1);
  });

  it("skips union-sets step when elements already share a root", () => {
    // union(0,1) then union(0,1) again — second is a no-op
    const steps = generateUnionFindSteps({
      elementCount: 4,
      operations: [
        [0, 1],
        [0, 1],
      ],
    });
    const unionSteps = steps.filter((step) => step.type === "union-sets");
    expect(unionSteps.length).toBe(1);
  });

  it("component count decreases correctly in visual states after each union", () => {
    const steps = generateUnionFindSteps({
      elementCount: 4,
      operations: [
        [0, 1],
        [2, 3],
        [0, 2],
      ],
    });
    // Gather all update-components steps via lineMapKey on visit steps
    const componentStates = steps
      .filter(
        (step) =>
          step.type === "union-sets" || (step.type === "visit" && step.visualState.kind === "set"),
      )
      .map((step) => (step.visualState.kind === "set" ? step.visualState.components!.length : -1));
    // Component count should never increase
    for (let stateIdx = 1; stateIdx < componentStates.length; stateIdx++) {
      expect(componentStates[stateIdx]!).toBeLessThanOrEqual(componentStates[stateIdx - 1]!);
    }
  });

  it("parentArray length equals elementCount in all steps", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    for (const step of steps) {
      if (step.visualState.kind === "set") {
        expect(step.visualState.parentArray!.length).toBe(DEFAULT_INPUT.elementCount);
      }
    }
  });

  it("rankArray length equals elementCount in all steps", () => {
    const steps = generateUnionFindSteps(DEFAULT_INPUT);
    for (const step of steps) {
      if (step.visualState.kind === "set") {
        expect(step.visualState.rankArray!.length).toBe(DEFAULT_INPUT.elementCount);
      }
    }
  });
});
