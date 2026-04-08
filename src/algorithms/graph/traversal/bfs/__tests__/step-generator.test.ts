import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateBfsSteps } from "../step-generator";
import type { BfsInput } from "../step-generator";

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

describe("generateBfsSteps", () => {
  it("generates steps for a simple graph", () => {
    const input: BfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateBfsSteps(input);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes enqueue and dequeue steps", () => {
    const input: BfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateBfsSteps(input);
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("enqueue");
    expect(stepTypes).toContain("dequeue");
  });

  it("includes visit steps for nodes and edges", () => {
    const input: BfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateBfsSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("produces correct final visual state with all reachable nodes visited", () => {
    const input: BfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateBfsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.visited).toContain("A");
    expect(visualState.visited).toContain("B");
    expect(visualState.visited).toContain("C");
  });

  it("accumulates metrics correctly", () => {
    const input: BfsInput = {
      adjacencyList: { A: ["B", "C"], B: ["C"], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
      ]),
    };

    const steps = generateBfsSteps(input);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.queueOperations).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const input: BfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateBfsSteps(input);
    const enqueueStep = steps.find((step) => step.type === "enqueue");

    expect(enqueueStep).toBeDefined();
    expect(enqueueStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = enqueueStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single node graph", () => {
    const input: BfsInput = {
      adjacencyList: { A: [] },
      startNodeId: "A",
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateBfsSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a linear graph", () => {
    const input: BfsInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateBfsSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("tracks queue state correctly throughout traversal", () => {
    const input: BfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateBfsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.queue).toHaveLength(0);
  });
});
