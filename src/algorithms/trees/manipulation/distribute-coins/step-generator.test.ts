import { describe, it, expect } from "vitest";
import type { TreeNode } from "@/types";
import { generateDistributeCoinsSteps } from "./step-generator";

const defaultNodes: TreeNode[] = [
  {
    id: "n1",
    value: 4,
    parentId: null,
    leftChildId: "n2",
    rightChildId: "n3",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "n2",
    value: 0,
    parentId: "n1",
    leftChildId: "n4",
    rightChildId: "n5",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "n3",
    value: 0,
    parentId: "n1",
    leftChildId: "n6",
    rightChildId: "n7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "n4",
    value: 3,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "n5",
    value: 0,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "n6",
    value: 0,
    parentId: "n3",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "n7",
    value: 0,
    parentId: "n3",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

describe("generateDistributeCoinsSteps", () => {
  it("produces steps for a 7-node tree", () => {
    const steps = generateDistributeCoinsSteps({ nodes: defaultNodes, rootId: "n1" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateDistributeCoinsSteps({ nodes: defaultNodes, rootId: "n1" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateDistributeCoinsSteps({ nodes: defaultNodes, rootId: "n1" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states", () => {
    const steps = generateDistributeCoinsSteps({ nodes: defaultNodes, rootId: "n1" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateDistributeCoinsSteps({ nodes: defaultNodes, rootId: "n1" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
