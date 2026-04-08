import { describe, it, expect } from "vitest";
import { generateRemoveKDigitsSteps } from "../step-generator";

describe("generateRemoveKDigitsSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateRemoveKDigitsSteps({ num: "1432219", removalCount: 3 });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateRemoveKDigitsSteps({ num: "1432219", removalCount: 3 });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateRemoveKDigitsSteps({ num: "1432219", removalCount: 3 });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateRemoveKDigitsSteps({ num: "1432219", removalCount: 3 });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateRemoveKDigitsSteps({ num: "1432219", removalCount: 3 });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits a visit step for each digit in the input", () => {
    const inputNum = "1432219";
    const steps = generateRemoveKDigitsSteps({ num: inputNum, removalCount: 3 });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(inputNum.length);
  });

  it("emits push steps for digits added to the stack", () => {
    const steps = generateRemoveKDigitsSteps({ num: "1432219", removalCount: 3 });
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("emits match steps for each pop triggered by a smaller incoming digit", () => {
    // "43" with k=1: digit '3' triggers pop of '4'
    const steps = generateRemoveKDigitsSteps({ num: "43", removalCount: 1 });
    const matchSteps = steps.filter((step) => step.type === "match");
    expect(matchSteps.length).toBe(1);
  });

  it('final complete step variables contain the result string "1219"', () => {
    const steps = generateRemoveKDigitsSteps({ num: "1432219", removalCount: 3 });
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as Record<string, unknown>)["result"]).toBe("1219");
  });

  it('handles "10200" with k=1 — result is "200"', () => {
    const steps = generateRemoveKDigitsSteps({ num: "10200", removalCount: 1 });
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as Record<string, unknown>)["result"]).toBe("200");
  });

  it('handles "10" with k=2 — result is "0"', () => {
    const steps = generateRemoveKDigitsSteps({ num: "10", removalCount: 2 });
    const lastStep = steps[steps.length - 1]!;
    expect((lastStep.variables as Record<string, unknown>)["result"]).toBe("0");
  });

  it("handles an empty num string gracefully", () => {
    const steps = generateRemoveKDigitsSteps({ num: "", removalCount: 0 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
});
