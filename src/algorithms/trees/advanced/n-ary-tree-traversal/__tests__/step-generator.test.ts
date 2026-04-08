import { describe, it, expect } from "vitest";
import type { TreeNode } from "@/types";
import { generateNAryTreeTraversalSteps } from "../step-generator";

const defaultNodes: TreeNode[] = [
  {
    id: "r",
    value: 1,
    parentId: null,
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["c1", "c2", "c3"],
    state: "default",
    position: { x: 240, y: 40 },
  },
  {
    id: "c1",
    value: 3,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g1", "g2"],
    state: "default",
    position: { x: 100, y: 120 },
  },
  {
    id: "c2",
    value: 2,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g3", "g4"],
    state: "default",
    position: { x: 240, y: 120 },
  },
  {
    id: "c3",
    value: 4,
    parentId: "r",
    leftChildId: null,
    rightChildId: null,
    childrenIds: ["g5", "g6"],
    state: "default",
    position: { x: 380, y: 120 },
  },
  {
    id: "g1",
    value: 5,
    parentId: "c1",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 50, y: 200 },
  },
  {
    id: "g2",
    value: 6,
    parentId: "c1",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 130, y: 200 },
  },
  {
    id: "g3",
    value: 7,
    parentId: "c2",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 200, y: 200 },
  },
  {
    id: "g4",
    value: 8,
    parentId: "c2",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 280, y: 200 },
  },
  {
    id: "g5",
    value: 9,
    parentId: "c3",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 340, y: 200 },
  },
  {
    id: "g6",
    value: 10,
    parentId: "c3",
    leftChildId: null,
    rightChildId: null,
    childrenIds: [],
    state: "default",
    position: { x: 420, y: 200 },
  },
];

describe("generateNAryTreeTraversalSteps", () => {
  it("produces steps for default 3-ary tree", () => {
    const steps = generateNAryTreeTraversalSteps({ nodes: defaultNodes, rootId: "r" });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with initialize step", () => {
    const steps = generateNAryTreeTraversalSteps({ nodes: defaultNodes, rootId: "r" });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with complete step", () => {
    const steps = generateNAryTreeTraversalSteps({ nodes: defaultNodes, rootId: "r" });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states", () => {
    const steps = generateNAryTreeTraversalSteps({ nodes: defaultNodes, rootId: "r" });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("visits all 10 nodes", () => {
    const steps = generateNAryTreeTraversalSteps({ nodes: defaultNodes, rootId: "r" });
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBe(10);
  });

  it("produces traverse-next steps for child traversal", () => {
    const steps = generateNAryTreeTraversalSteps({ nodes: defaultNodes, rootId: "r" });
    const traverseSteps = steps.filter((step) => step.type === "traverse-next");
    expect(traverseSteps.length).toBeGreaterThan(0);
  });

  it("has incrementing step indices", () => {
    const steps = generateNAryTreeTraversalSteps({ nodes: defaultNodes, rootId: "r" });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
