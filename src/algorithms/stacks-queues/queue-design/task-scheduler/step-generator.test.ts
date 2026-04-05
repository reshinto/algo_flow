import { describe, it, expect } from "vitest";
import { generateTaskSchedulerSteps } from "./step-generator";
import type { StackQueueVisualState } from "@/types";

const DEFAULT_INPUT = {
  tasks: ["A", "A", "A", "B", "B", "B"],
  cooldown: 2,
};

describe("generateTaskSchedulerSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });

  it("records totalTime in the complete step variables", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["totalTime"]).toBe(8);
  });

  it("records formulaResult in the complete step variables", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["formulaResult"]).toBe(8);
  });

  it("records maxFreq and maxFreqCount in initialize step variables", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    const initStep = steps[0]!;
    expect(initStep.variables["maxFreq"]).toBe(3);
    expect(initStep.variables["maxFreqCount"]).toBe(2);
  });

  it("emits enqueue steps as tasks enter the cooldown waiting area", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    const enqueueSteps = steps.filter((step) => step.type === "enqueue");
    expect(enqueueSteps.length).toBeGreaterThan(0);
  });

  it("emits dequeue steps as tasks are released from cooldown", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    const dequeueSteps = steps.filter((step) => step.type === "dequeue");
    expect(dequeueSteps.length).toBeGreaterThan(0);
  });

  it("produces visit steps during the frequency counting phase", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("handles cooldown 0 — no enqueue steps into the cooldown queue", () => {
    const noCooldownInput = { tasks: ["A", "A", "A", "B", "B", "B"], cooldown: 0 };
    const steps = generateTaskSchedulerSteps(noCooldownInput);
    const completeStep = steps[steps.length - 1]!;
    expect(completeStep.variables["totalTime"]).toBe(6);
  });

  it("handles a single task type", () => {
    const singleTaskInput = { tasks: ["A", "A", "A"], cooldown: 2 };
    const steps = generateTaskSchedulerSteps(singleTaskInput);
    const completeStep = steps[steps.length - 1]!;
    // maxFreq=3, maxFreqCount=1: formula=(3-1)*(2+1)+1=7; totalTime=max(3,7)=7
    expect(completeStep.variables["totalTime"]).toBe(7);
  });

  it("records cooldown parameter in initialize step variables", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    const initStep = steps[0]!;
    expect(initStep.variables["cooldown"]).toBe(DEFAULT_INPUT.cooldown);
  });

  it("all visual states have defined queue elements", () => {
    const steps = generateTaskSchedulerSteps(DEFAULT_INPUT);
    for (const step of steps) {
      const visualState = step.visualState as StackQueueVisualState;
      expect(visualState.queueElements).toBeDefined();
    }
  });
});
