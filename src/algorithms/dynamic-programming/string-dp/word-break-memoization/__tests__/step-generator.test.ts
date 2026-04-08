import { describe, it, expect } from "vitest";
import { generateWordBreakMemoizationSteps } from "../step-generator";

describe("generateWordBreakMemoizationSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces dp-table visual states for every step", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("dp-table");
    }
  });

  it("includes a fill-table step for the base case W(n)", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    const fillSteps = steps.filter((step) => step.type === "fill-table");
    expect(fillSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("includes compute-cell steps for non-base-case positions", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    const computeSteps = steps.filter((step) => step.type === "compute-cell");
    expect(computeSteps.length).toBeGreaterThan(0);
  });

  it("includes push-call steps for recursive frames", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    const pushSteps = steps.filter((step) => step.type === "push-call");
    expect(pushSteps.length).toBeGreaterThan(0);
  });

  it("includes pop-call steps matching each push-call", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    const pushCount = steps.filter((step) => step.type === "push-call").length;
    const popCount = steps.filter((step) => step.type === "pop-call").length;
    expect(popCount).toBe(pushCount);
  });

  it("includes read-cache steps when subproblems are reused", () => {
    // "abc" with ["a","b","ab","abc"]: W(2) is computed false via W(1), then hit again from W(0) via "ab"
    const steps = generateWordBreakMemoizationSteps({
      text: "abc",
      dictionary: ["a", "b", "ab", "abc"],
    });
    const cacheSteps = steps.filter((step) => step.type === "read-cache");
    expect(cacheSteps.length).toBeGreaterThan(0);
  });

  it("call stack is empty at the complete step", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    const completeStep = steps[steps.length - 1]!;
    if (completeStep.visualState.kind === "dp-table") {
      expect(completeStep.visualState.callStack).toHaveLength(0);
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("handles an empty string with just initialize and complete steps", () => {
    const steps = generateWordBreakMemoizationSteps({ text: "", dictionary: ["leet"] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps.length).toBe(2);
  });

  it("dp-table cells use W(i) labels", () => {
    const steps = generateWordBreakMemoizationSteps({ text: "leet", dictionary: ["leet"] });
    const firstStep = steps[0]!;
    if (firstStep.visualState.kind === "dp-table") {
      expect(firstStep.visualState.table[0]?.label).toBe("W(0)");
      expect(firstStep.visualState.table[1]?.label).toBe("W(1)");
    }
  });

  it("complete step result is true for a segmentable input", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "leetcode",
      dictionary: ["leet", "code"],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables?.["result"]).toBe(true);
  });

  it("complete step result is false for a non-segmentable input", () => {
    const steps = generateWordBreakMemoizationSteps({
      text: "catsandog",
      dictionary: ["cats", "dog", "sand", "and", "cat"],
    });
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables?.["result"]).toBe(false);
  });
});
