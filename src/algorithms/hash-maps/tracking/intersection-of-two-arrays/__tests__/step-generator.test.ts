import { describe, it, expect } from "vitest";
import { generateIntersectionOfTwoArraysSteps } from "../step-generator";

describe("generateIntersectionOfTwoArraysSteps", () => {
  it("produces steps", () => {
    expect(
      generateIntersectionOfTwoArraysSteps({ numbersA: [1, 2, 2, 1], numbersB: [2, 2] }).length,
    ).toBeGreaterThan(0);
  });
  it("starts with initialize", () => {
    expect(
      generateIntersectionOfTwoArraysSteps({ numbersA: [1, 2, 2, 1], numbersB: [2, 2] })[0]?.type,
    ).toBe("initialize");
  });
  it("ends with complete", () => {
    const steps = generateIntersectionOfTwoArraysSteps({
      numbersA: [1, 2, 2, 1],
      numbersB: [2, 2],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
  it("has hash-map visual states", () => {
    for (const step of generateIntersectionOfTwoArraysSteps({
      numbersA: [1, 2, 2, 1],
      numbersB: [2, 2],
    })) {
      expect(step.visualState.kind).toBe("hash-map");
    }
  });
  it("has incrementing indices", () => {
    const steps = generateIntersectionOfTwoArraysSteps({
      numbersA: [1, 2, 2, 1],
      numbersB: [2, 2],
    });
    for (let idx = 0; idx < steps.length; idx++) {
      expect(steps[idx]?.index).toBe(idx);
    }
  });
  it("emits insert-key steps", () => {
    expect(
      generateIntersectionOfTwoArraysSteps({ numbersA: [1, 2, 2, 1], numbersB: [2, 2] }).filter(
        (s) => s.type === "insert-key",
      ).length,
    ).toBeGreaterThan(0);
  });
  it("emits lookup-key steps", () => {
    expect(
      generateIntersectionOfTwoArraysSteps({ numbersA: [1, 2, 2, 1], numbersB: [2, 2] }).filter(
        (s) => s.type === "lookup-key",
      ).length,
    ).toBe(2);
  });
  it("sets result to [2]", () => {
    const steps = generateIntersectionOfTwoArraysSteps({
      numbersA: [1, 2, 2, 1],
      numbersB: [2, 2],
    });
    const last = steps[steps.length - 1]!;
    if (last.visualState.kind === "hash-map") {
      expect(last.visualState.result).toEqual([2]);
    }
  });
});
