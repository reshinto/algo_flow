import { describe, it, expect } from "vitest";
import type { TreeNode } from "@/types";
import { generateSubtreeOfAnotherTreeSteps } from "./step-generator";

const mainTreeNodes: TreeNode[] = [
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

const subTreeNodes: TreeNode[] = [
  {
    id: "s2",
    value: 2,
    parentId: null,
    leftChildId: "s1",
    rightChildId: "s3",
    state: "default",
    position: { x: 100, y: 60 },
  },
  {
    id: "s1",
    value: 1,
    parentId: "s2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 160 },
  },
  {
    id: "s3",
    value: 3,
    parentId: "s2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 160 },
  },
];

describe("generateSubtreeOfAnotherTreeSteps", () => {
  it("produces steps for main tree and subtree", () => {
    const steps = generateSubtreeOfAnotherTreeSteps({
      nodes: mainTreeNodes,
      rootId: "n4",
      secondaryNodes: subTreeNodes,
      secondaryRootId: "s2",
    });
    expect(steps.length).toBeGreaterThan(0);
  });

  it("starts with an initialize step", () => {
    const steps = generateSubtreeOfAnotherTreeSteps({
      nodes: mainTreeNodes,
      rootId: "n4",
      secondaryNodes: subTreeNodes,
      secondaryRootId: "s2",
    });
    expect(steps[0]?.type).toBe("initialize");
  });

  it("ends with a complete step", () => {
    const steps = generateSubtreeOfAnotherTreeSteps({
      nodes: mainTreeNodes,
      rootId: "n4",
      secondaryNodes: subTreeNodes,
      secondaryRootId: "s2",
    });
    expect(steps[steps.length - 1]?.type).toBe("complete");
  });

  it("produces tree visual states", () => {
    const steps = generateSubtreeOfAnotherTreeSteps({
      nodes: mainTreeNodes,
      rootId: "n4",
      secondaryNodes: subTreeNodes,
      secondaryRootId: "s2",
    });
    for (const step of steps) {
      expect(step.visualState.kind).toBe("tree");
    }
  });

  it("has incrementing step indices", () => {
    const steps = generateSubtreeOfAnotherTreeSteps({
      nodes: mainTreeNodes,
      rootId: "n4",
      secondaryNodes: subTreeNodes,
      secondaryRootId: "s2",
    });
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      expect(steps[stepIndex]?.index).toBe(stepIndex);
    }
  });
});
