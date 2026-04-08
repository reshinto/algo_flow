import { describe, it, expect } from "vitest";
import { generateMeetingRoomsIISteps } from "../step-generator";

describe("generateMeetingRoomsIISteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 30],
        [5, 10],
        [15, 20],
        [2, 7],
      ],
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 30],
        [5, 10],
      ],
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 30],
        [5, 10],
      ],
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 30],
        [5, 10],
        [15, 20],
      ],
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 30],
        [5, 10],
      ],
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("handles empty intervals — produces initialize and complete steps only", () => {
    const steps = generateMeetingRoomsIISteps({ intervals: [] });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("contains heap-insert steps when meetings are added", () => {
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 30],
        [5, 10],
      ],
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-insert");
  });

  it("contains heap-extract step when a room is reused", () => {
    // [0,10] ends before [15,20] starts — room should be freed
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 10],
        [15, 20],
      ],
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("final heap size equals the minimum number of rooms for 3-room scenario", () => {
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 30],
        [5, 10],
        [15, 20],
        [2, 7],
      ],
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(3);
  });

  it("final heap size equals 1 for non-overlapping meetings", () => {
    const steps = generateMeetingRoomsIISteps({
      intervals: [
        [0, 5],
        [5, 10],
      ],
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: { index: number; value: number }[] }).nodes;
    expect(heapNodes.length).toBe(1);
  });
});
