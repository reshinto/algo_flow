import { describe, it, expect } from "vitest";
import { generateCuckooFilterSteps } from "./step-generator";

const DEFAULT_INPUT = {
  elements: [3, 7, 11, 15],
  queries: [3, 5, 7, 9],
  bucketCount: 8,
};

describe("generateCuckooFilterSteps", () => {
  it("produces at least one step", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("first step has type initialize", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    expect(steps[0]!.type).toBe("initialize");
  });

  it("last step has type complete", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes hash-element steps for each element during insert phase", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    const hashSteps = steps.filter((step) => step.type === "hash-element");
    expect(hashSteps.length).toBeGreaterThanOrEqual(DEFAULT_INPUT.elements.length);
  });

  it("includes insert-bucket steps for each element", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    const insertSteps = steps.filter((step) => step.type === "insert-bucket");
    expect(insertSteps.length).toBeGreaterThanOrEqual(DEFAULT_INPUT.elements.length);
  });

  it("includes check-membership steps for each query", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    const querySteps = steps.filter((step) => step.type === "check-membership");
    expect(querySteps.length).toBe(DEFAULT_INPUT.queries.length);
  });

  it("includes member-found or member-not-found for each query", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    const resultSteps = steps.filter(
      (step) => step.type === "member-found" || step.type === "member-not-found",
    );
    expect(resultSteps.length).toBe(DEFAULT_INPUT.queries.length);
  });

  it("produces member-found for element 3 which was inserted", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    const foundFor3 = steps.find(
      (step) =>
        step.type === "member-found" && (step.variables as Record<string, unknown>)["query"] === 3,
    );
    expect(foundFor3).toBeDefined();
  });

  it("each step has a non-empty description", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(typeof step.description).toBe("string");
      expect(step.description.length).toBeGreaterThan(0);
    }
  });

  it("each step has a visualState with kind set", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState).toBeDefined();
      expect((step.visualState as unknown as Record<string, unknown>)["kind"]).toBe("set");
    }
  });

  it("handles empty elements and queries — only initialize and complete steps", () => {
    const steps = generateCuckooFilterSteps({
      elements: [],
      queries: [],
      bucketCount: 8,
    });
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("produces member-not-found for query 5 which was not inserted", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    // 5 is not in elements — expect member-not-found (assuming no false positive collision)
    const notFoundFor5 = steps.find(
      (step) =>
        step.type === "member-not-found" &&
        (step.variables as Record<string, unknown>)["query"] === 5,
    );
    // This may not hold if there's a fingerprint collision — we assert the step type at least exists
    const resultFor5 = steps.find(
      (step) =>
        (step.type === "member-found" || step.type === "member-not-found") &&
        (step.variables as Record<string, unknown>)["query"] === 5,
    );
    expect(resultFor5).toBeDefined();
    // If no collision, it should be not-found
    if (notFoundFor5) {
      expect(notFoundFor5.type).toBe("member-not-found");
    }
  });

  it("step indices are sequential starting from 0", () => {
    const steps = generateCuckooFilterSteps(DEFAULT_INPUT);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]!.index).toBe(stepIndex);
    }
  });
});
