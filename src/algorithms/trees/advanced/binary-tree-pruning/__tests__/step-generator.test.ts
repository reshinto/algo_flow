import { describe, it, expect } from "vitest";
import type { TreeNode } from "@/types";
import { generateBinaryTreePruningSteps } from "../step-generator";

const defaultNodes: TreeNode[] = [
  {
    id: "n1",
    value: 1,
    parentId: null,
    leftChildId: "n0a",
    rightChildId: "n1b",
    state: "default",
    position: { x: 200, y: 40 },
  },
  {
    id: "n0a",
    value: 0,
    parentId: "n1",
    leftChildId: "n0c",
    rightChildId: "n0d",
    state: "default",
    position: { x: 100, y: 120 },
  },
  {
    id: "n1b",
    value: 1,
    parentId: "n1",
    leftChildId: "n0e",
    rightChildId: "n1f",
    state: "default",
    position: { x: 300, y: 120 },
  },
  {
    id: "n0c",
    value: 0,
    parentId: "n0a",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 200 },
  },
  {
    id: "n0d",
    value: 0,
    parentId: "n0a",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 200 },
  },
  {
    id: "n0e",
    value: 0,
    parentId: "n1b",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 200 },
  },
  {
    id: "n1f",
    value: 1,
    parentId: "n1b",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 200 },
  },
];

describe("generateBinaryTreePruningSteps", () => {
  it("produces steps for default input", () => {
    const steps = generateBinaryTreePruningSteps({ nodes: defaultNodes, rootId: "n1" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with initialize step", () => {
    const steps = generateBinaryTreePruningSteps({ nodes: defaultNodes, rootId: "n1" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with complete step", () => {
    const steps = generateBinaryTreePruningSteps({ nodes: defaultNodes, rootId: "n1" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states", () => {
    const steps = generateBinaryTreePruningSteps({ nodes: defaultNodes, rootId: "n1" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("produces detach-node steps for pruned nodes", () => {
    const steps = generateBinaryTreePruningSteps({ nodes: defaultNodes, rootId: "n1" });
    const detachSteps = steps.filter((step) => step.type === "detach-node");
    expect(detachSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateBinaryTreePruningSteps({ nodes: defaultNodes, rootId: "n1" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
