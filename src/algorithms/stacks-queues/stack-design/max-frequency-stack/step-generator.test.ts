import { describe, it, expect } from "vitest";
import { generateMaxFrequencyStackSteps } from "./step-generator";

describe("generateMaxFrequencyStackSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMaxFrequencyStackSteps({ values: [5, 7, 5, 7, 4, 5] });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMaxFrequencyStackSteps({ values: [5, 7, 5, 7, 4, 5] });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMaxFrequencyStackSteps({ values: [5, 7, 5, 7, 4, 5] });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateMaxFrequencyStackSteps({ values: [5, 7, 5, 7, 4, 5] });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMaxFrequencyStackSteps({ values: [5, 7, 5, 7, 4, 5] });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a visit step for each input element during push phase", () => {
    const input = [5, 7, 5, 7, 4, 5];
    const steps = generateMaxFrequencyStackSteps({ values: input });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(input.length);
  });

  it("emits a push step for each input element during push phase", () => {
    const input = [5, 7, 5, 7, 4, 5];
    const steps = generateMaxFrequencyStackSteps({ values: input });
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBe(input.length);
  });

  it("emits a resolve step for each element during pop phase", () => {
    const input = [5, 7, 5, 7, 4, 5];
    const steps = generateMaxFrequencyStackSteps({ values: input });
    const resolveSteps = steps.filter((step) => step.type === "resolve");
    expect(resolveSteps.length).toBe(input.length);
  });

  it("handles a single element input", () => {
    const steps = generateMaxFrequencyStackSteps({ values: [42] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles empty input", () => {
    const steps = generateMaxFrequencyStackSteps({ values: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("complete step variables contain the pop results array", () => {
    const steps = generateMaxFrequencyStackSteps({ values: [5, 7, 5, 7, 4, 5] });
    const completeStep = steps[steps.length - 1]!;
    const popResults = completeStep.variables["popResults"] as number[];
    expect(popResults).toEqual([5, 7, 5, 4, 7, 5]);
  });
});
