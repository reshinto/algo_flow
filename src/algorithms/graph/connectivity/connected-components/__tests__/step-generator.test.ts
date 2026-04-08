import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateConnectedComponentsSteps } from "../step-generator";
import type { ConnectedComponentsInput } from "../step-generator";

function makeNodes(ids: string[]): GraphNode[] {
  const totalNodes = ids.length;
  return ids.map((nodeId, index) => ({
    id: nodeId,
    label: nodeId,
    state: "default" as const,
    position: {
      x: Math.round(200 + 150 * Math.cos((2 * Math.PI * index) / totalNodes - Math.PI / 2)),
      y: Math.round(200 + 150 * Math.sin((2 * Math.PI * index) / totalNodes - Math.PI / 2)),
    },
  }));
}

function makeEdges(pairs: [string, string][]): GraphEdge[] {
  return pairs.map(([source, target]) => ({
    source,
    target,
    state: "default" as const,
  }));
}

describe("generateConnectedComponentsSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: ConnectedComponentsInput = {
      adjacencyList: { A: ["B"], B: ["A"], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateConnectedComponentsSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes enqueue, dequeue, and visit steps", () => {
    const input: ConnectedComponentsInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateConnectedComponentsSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("enqueue");
    expect(stepTypes).toContain("dequeue");
    expect(stepTypes).toContain("visit");
  });

  it("includes assign-component steps", () => {
    const input: ConnectedComponentsInput = {
      adjacencyList: { A: ["B"], B: ["A"], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateConnectedComponentsSteps(input);
    const assignSteps = steps.filter((step) => step.type === "assign-component");
    expect(assignSteps.length).toBeGreaterThan(0);
  });

  it("produces a final visual state with all nodes visited", () => {
    const input: ConnectedComponentsInput = {
      adjacencyList: { A: ["B"], B: ["A"], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateConnectedComponentsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.visited).toContain("A");
    expect(visualState.visited).toContain("B");
    expect(visualState.visited).toContain("C");
  });

  it("produces components in the visual state", () => {
    const input: ConnectedComponentsInput = {
      adjacencyList: { A: ["B"], B: ["A"], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateConnectedComponentsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.components).toBeDefined();
    expect(visualState.components!.length).toBe(2);
  });

  it("handles a single-node graph", () => {
    const input: ConnectedComponentsInput = {
      adjacencyList: { A: [] },
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateConnectedComponentsSteps(input);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("accumulates metrics with visit counts", () => {
    const input: ConnectedComponentsInput = {
      adjacencyList: { A: ["B"], B: ["A"], C: ["D"], D: ["C"] },
      nodeIds: ["A", "B", "C", "D"],
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["C", "D"],
        ["D", "C"],
      ]),
    };

    const steps = generateConnectedComponentsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const input: ConnectedComponentsInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateConnectedComponentsSteps(input);
    const enqueueStep = steps.find((step) => step.type === "enqueue");
    expect(enqueueStep).toBeDefined();
    expect(enqueueStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = enqueueStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });
});
