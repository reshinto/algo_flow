import { describe, it, expect } from "vitest";
import { generateSimplifyPathSteps } from "../step-generator";

describe("generateSimplifyPathSteps", () => {
  it("produces steps for the default input", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/a/./b/../../c/" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/a/./b/../../c/" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/a/./b/../../c/" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces stack-queue visual states throughout", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/a/./b/../../c/" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("stack-queue");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/a/./b/../../c/" });
    for (let stepIdx = 0; stepIdx < steps.length; stepIdx++) {
      expect(steps[stepIdx]?.index).toBe(stepIdx);
    }
  });

  it("emits push steps for valid directory names", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/a/b/c" });
    const pushSteps = steps.filter((step) => step.type === "push");
    expect(pushSteps.length).toBe(3);
  });

  it("emits match steps for double-dot pops", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/a/b/../c" });
    const matchSteps = steps.filter((step) => step.type === "match");
    expect(matchSteps.length).toBe(1);
  });

  it("resolves the default input to the correct simplified path", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/a/./b/../../c/" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.simplifiedPath).toBe("/c");
  });

  it("handles a root-only path", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/" });
    expect(steps[0]?.type).toBe("initialize");
    expect(steps[steps.length - 1]?.type).toBe("complete");
    expect(steps[steps.length - 1]?.variables?.simplifiedPath).toBe("/");
  });

  it("handles a path navigating above root", () => {
    const steps = generateSimplifyPathSteps({ inputString: "/../" });
    const completeStep = steps[steps.length - 1];
    expect(completeStep?.variables?.simplifiedPath).toBe("/");
  });
});
