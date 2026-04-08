import { describe, it, expect } from "vitest";
import { generateBackspaceStringCompareSteps } from "../step-generator";

describe("generateBackspaceStringCompareSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "ab#c",
      secondString: "ad#c",
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "ab#c",
      secondString: "ad#c",
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "ab#c",
      secondString: "ad#c",
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "ab#c",
      secondString: "ad#c",
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "ab#c",
      secondString: "ad#c",
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for non-backspace characters", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "ab#c",
      secondString: "ad#c",
    });
    const pushSteps = steps.filter((step) => step.type === "push");
    // "ab#c" → push a, push b, push c (3 pushes); "ad#c" → push a, push d, push c (3 pushes) = 6 total
    expect(pushSteps.length).toBe(6);
  });

  it("emits match steps for backspace characters that pop a character", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "ab#c",
      secondString: "ad#c",
    });
    const matchSteps = steps.filter((step) => step.type === "match");
    // One '#' in each string that has a char to pop = 2 match steps
    expect(matchSteps.length).toBe(2);
  });

  it("marks the complete step as equal for matching strings", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "ab#c",
      secondString: "ad#c",
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toMatchObject({ isEqual: true });
  });

  it("marks the complete step as not equal for non-matching strings", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "a#c",
      secondString: "b",
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toMatchObject({ isEqual: false });
  });

  it("handles empty strings without errors", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "",
      secondString: "",
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles backspace on empty stack without emitting a match step", () => {
    const steps = generateBackspaceStringCompareSteps({
      firstString: "#a",
      secondString: "a",
    });
    // The '#' at the start of firstString hits an empty stack — no match step for it
    const matchSteps = steps.filter((step) => step.type === "match");
    expect(matchSteps.length).toBe(0);
  });
});
