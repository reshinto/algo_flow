import { describe, it, expect } from "vitest";
import { generateBloomFilterSteps } from "../step-generator";

const DEFAULT_INPUT = {
  elements: [3, 7, 11, 15],
  queries: [3, 5, 7, 9, 11],
  size: 16,
  hashCount: 3,
};

describe("generateBloomFilterSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces set visual states throughout", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("set");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits hash-element steps for each inserted element", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    const hashSteps = steps.filter((step) => step.type === "hash-element");
    expect(hashSteps.length).toBe(DEFAULT_INPUT.elements.length);
  });

  it("emits set-bit steps equal to elements × hashCount", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    const setBitSteps = steps.filter((step) => step.type === "set-bit");
    expect(setBitSteps.length).toBe(DEFAULT_INPUT.elements.length * DEFAULT_INPUT.hashCount);
  });

  it("emits check-membership steps for each query", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    const querySteps = steps.filter((step) => step.type === "check-membership");
    expect(querySteps.length).toBe(DEFAULT_INPUT.queries.length);
  });

  it("emits check-bit steps equal to queries × hashCount", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    const checkBitSteps = steps.filter((step) => step.type === "check-bit");
    expect(checkBitSteps.length).toBe(DEFAULT_INPUT.queries.length * DEFAULT_INPUT.hashCount);
  });

  it("emits member-found for inserted elements", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    const foundSteps = steps.filter((step) => step.type === "member-found");
    // Elements 3, 7, 11 are inserted and queried — they must appear as found
    expect(foundSteps.length).toBeGreaterThanOrEqual(3);
  });

  it("emits member-not-found for elements with cleared bit positions", () => {
    const steps = generateBloomFilterSteps({
      elements: [1],
      queries: [100],
      size: 16,
      hashCount: 3,
    });
    const notFoundSteps = steps.filter((step) => step.type === "member-not-found");
    expect(notFoundSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("bit array visual state has correct size", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    const initStep = steps[0]!;
    expect(initStep.visualState.kind).toBe("set");
    if (initStep.visualState.kind === "set") {
      expect(initStep.visualState.bitArray!.length).toBe(DEFAULT_INPUT.size);
    }
  });

  it("bit array values are 0 or 1 throughout", () => {
    const steps = generateBloomFilterSteps(DEFAULT_INPUT);
    for (const step of steps) {
      if (step.visualState.kind === "set") {
        for (const bitElement of step.visualState.bitArray!) {
          expect([0, 1]).toContain(bitElement.value);
        }
      }
    }
  });

  it("handles single element and single query", () => {
    const steps = generateBloomFilterSteps({
      elements: [42],
      queries: [42],
      size: 8,
      hashCount: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("handles empty elements array", () => {
    const steps = generateBloomFilterSteps({
      elements: [],
      queries: [5],
      size: 8,
      hashCount: 2,
    });
    const notFoundSteps = steps.filter((step) => step.type === "member-not-found");
    expect(notFoundSteps.length).toBe(1);
  });
});
