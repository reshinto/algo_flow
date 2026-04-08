import { describe, it, expect } from "vitest";
import { generateBoyerMooreVotingSteps } from "../step-generator";

describe("generateBoyerMooreVotingSteps", () => {
  it("produces steps for a basic input", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 2, 1, 1, 1, 2, 2],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 2, 1, 1, 1, 2, 2],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 2, 1, 1, 1, 2, 2],
    });
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("produces array visual states for all steps", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 2, 1, 1, 1, 2, 2],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("array");
    }
  });

  it("includes compare steps when vote count reaches zero", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 1, 3],
    });
    const compareSteps = steps.filter((step) => step.type === "compare");
    expect(compareSteps.length).toBeGreaterThan(0);
  });

  it("includes visit steps for matching and non-matching elements", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 2, 1],
    });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("handles empty array gracefully", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [],
    });
    expect(steps.length).toBeGreaterThanOrEqual(2);
    expect(steps[0]?.type).toBe("initialize");
    const lastStep = steps[steps.length - 1];
    expect(lastStep?.type).toBe("complete");
  });

  it("has incrementing step indices", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 2, 1, 1, 1, 2, 2],
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("includes expected variables in compare steps", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 1, 3],
    });
    const compareStep = steps.find((step) => step.type === "compare");
    expect(compareStep?.variables).toHaveProperty("candidate");
    expect(compareStep?.variables).toHaveProperty("voteCount");
    expect(compareStep?.variables).toHaveProperty("action");
  });

  it("includes expected variables in complete step", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 2, 1],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables).toHaveProperty("majorityElement");
    expect(completeStep?.variables).toHaveProperty("count");
  });

  it("complete step reports the correct majority element", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [2, 2, 1, 1, 1, 2, 2],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.majorityElement).toBe(2);
  });

  it("handles a single element array", () => {
    const steps = generateBoyerMooreVotingSteps({
      inputArray: [7],
    });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.majorityElement).toBe(7);
  });
});
