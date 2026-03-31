import { describe, it, expect } from "vitest";
import { generateTaskSchedulerHeapSteps } from "./step-generator";

describe("generateTaskSchedulerHeapSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "A", "B", "B", "B"],
      cooldown: 2,
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "A", "B", "B", "B"],
      cooldown: 2,
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "A", "B", "B", "B"],
      cooldown: 2,
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("all steps have heap visual state", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "A", "B", "B", "B"],
      cooldown: 2,
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("heap");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "A", "B", "B", "B"],
      cooldown: 2,
    });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("contains heap-extract steps", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "A", "B", "B", "B"],
      cooldown: 2,
    });
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("heap-extract");
  });

  it("final complete step has totalIntervals = 8 for default input", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "A", "B", "B", "B"],
      cooldown: 2,
    });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { totalIntervals: number };
    expect(variables.totalIntervals).toBe(8);
  });

  it("final heap is empty after completion", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "A", "B", "B", "B"],
      cooldown: 2,
    });
    const lastStep = steps[steps.length - 1]!;
    const heapNodes = (lastStep.visualState as { nodes: unknown[] }).nodes;
    expect(heapNodes.length).toBe(0);
  });

  it("handles cooldown=0 — no idle slots", () => {
    const steps = generateTaskSchedulerHeapSteps({
      tasks: ["A", "A", "B", "B"],
      cooldown: 0,
    });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { totalIntervals: number };
    expect(variables.totalIntervals).toBe(4);
  });

  it("handles single task type with cooldown", () => {
    const steps = generateTaskSchedulerHeapSteps({ tasks: ["A", "A", "A"], cooldown: 2 });
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { totalIntervals: number };
    expect(variables.totalIntervals).toBe(7);
  });

  it("handles single task", () => {
    const steps = generateTaskSchedulerHeapSteps({ tasks: ["A"], cooldown: 3 });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { totalIntervals: number };
    expect(variables.totalIntervals).toBe(1);
  });
});
