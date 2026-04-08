import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateIddfsSteps } from "../step-generator";
import type { IddfsInput } from "../step-generator";

function makeNodes(ids: string[]): GraphNode[] {
  const totalNodes = ids.length;
  return ids.map((id, index) => ({
    id,
    label: id,
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

describe("generateIddfsSteps", () => {
  it("generates steps for a simple graph with first and last step types", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateIddfsSteps(input);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes push-stack and pop-stack steps", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateIddfsSteps(input);
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("push-stack");
    expect(stepTypes).toContain("pop-stack");
  });

  it("includes visit steps for nodes and edges", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateIddfsSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("includes backtrack steps when a node is pushed twice before being popped", () => {
    // C is pushed twice: once by A (depth 1) and once by B (depth 2).
    // When the depthLimit=2 iteration runs, B pushes C(2) onto the stack before C(1) is popped.
    // After C(2) is visited, C(1) is popped and triggers backtrack because C is already visited.
    const input: IddfsInput = {
      adjacencyList: { A: ["B", "C"], B: ["C", "D"], C: ["D"], D: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
        ["B", "D"],
        ["C", "D"],
      ]),
    };

    const steps = generateIddfsSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("backtrack");
  });

  it("produces correct final visual state with all reachable nodes visited", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateIddfsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.visited).toContain("A");
    expect(visualState.visited).toContain("B");
    expect(visualState.visited).toContain("C");
  });

  it("accumulates metrics across all depth iterations", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B", "C"], B: ["C"], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
      ]),
    };

    const steps = generateIddfsSteps(input);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.queueOperations).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateIddfsSteps(input);
    const pushStep = steps.find((step) => step.type === "push-stack");

    expect(pushStep).toBeDefined();
    expect(pushStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = pushStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single node graph", () => {
    const input: IddfsInput = {
      adjacencyList: { A: [] },
      startNodeId: "A",
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateIddfsSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a linear graph and ends with a complete step", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateIddfsSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("stack is empty in the final visual state", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateIddfsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.stack ?? []).toHaveLength(0);
  });

  it("respects an explicit maxDepth in the input", () => {
    const input: IddfsInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
      maxDepth: 1,
    };

    const steps = generateIddfsSteps(input);
    // With maxDepth=1, node C should never be visited
    const visitedNodes = steps
      .filter((step) => step.type === "visit")
      .map((step) => (step.variables as Record<string, unknown>)["currentNodeId"]);

    expect(visitedNodes).not.toContain("C");
  });
});
