import { describe, it, expect } from "vitest";
import type { TreeNode } from "@/types";
import { generateBstValidationSteps } from "../step-generator";

const defaultNodes: TreeNode[] = [
  {
    id: "n4",
    value: 4,
    parentId: null,
    leftChildId: "n2",
    rightChildId: "n6",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "n2",
    value: 2,
    parentId: "n4",
    leftChildId: "n1",
    rightChildId: "n3",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "n6",
    value: 6,
    parentId: "n4",
    leftChildId: "n5",
    rightChildId: "n7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "n1",
    value: 1,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "n3",
    value: 3,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "n5",
    value: 5,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "n7",
    value: 7,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

describe("generateBstValidationSteps", () => {
  it("produces steps", () => {
    const steps = generateBstValidationSteps({ nodes: defaultNodes, rootId: "n4" });
    expect(steps.length).toBeGreaterThan(0);
  });
  it("starts with initialize", () => {
    const steps = generateBstValidationSteps({ nodes: defaultNodes, rootId: "n4" });
    expect(steps[0]?.type).toBe("initialize");
  });
  it("ends with complete", () => {
    const steps = generateBstValidationSteps({ nodes: defaultNodes, rootId: "n4" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });
  it("produces tree visual states", () => {
    const steps = generateBstValidationSteps({ nodes: defaultNodes, rootId: "n4" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });
  it("has incrementing indices", () => {
    const steps = generateBstValidationSteps({ nodes: defaultNodes, rootId: "n4" });
    for (let idx = 0; idx < steps.length; idx++) {
      expect(steps[idx]?.index).toBe(idx);
    }
  });
});
