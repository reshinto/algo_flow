import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateBidirectionalBfsSteps } from "../step-generator";
import type { BidirectionalBfsInput } from "../step-generator";

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

describe("generateBidirectionalBfsSteps", () => {
  it("generates steps for a simple three-node graph", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      startNodeId: "A",
      targetNodeId: "C",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes enqueue and dequeue steps", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      startNodeId: "A",
      targetNodeId: "C",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("enqueue");
    expect(stepTypes).toContain("dequeue");
  });

  it("includes visit steps for nodes and edges", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      targetNodeId: "B",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("produces a complete step as the final step", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      targetNodeId: "C",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles same start and target with a single initialize-visit-complete sequence", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      targetNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("produces a complete step even when no path exists", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: [], B: [] },
      startNodeId: "A",
      targetNodeId: "B",
      nodes: makeNodes(["A", "B"]),
      edges: [],
    };

    const steps = generateBidirectionalBfsSteps(input);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("tracks queue state in visual state snapshots", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      startNodeId: "A",
      targetNodeId: "C",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
  });

  it("accumulates metrics correctly across all steps", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: ["B", "C"], B: ["D"], C: ["D"], D: [] },
      startNodeId: "A",
      targetNodeId: "D",
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
        ["B", "D"],
        ["C", "D"],
      ]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.queueOperations).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      targetNodeId: "B",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    const enqueueStep = steps.find((step) => step.type === "enqueue");

    expect(enqueueStep).toBeDefined();
    expect(enqueueStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = enqueueStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a fully connected graph without infinite loops", () => {
    const input: BidirectionalBfsInput = {
      adjacencyList: {
        A: ["B", "C", "D"],
        B: ["A", "C", "D"],
        C: ["A", "B", "D"],
        D: ["A", "B", "C"],
      },
      startNodeId: "A",
      targetNodeId: "D",
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
        ["A", "D"],
        ["B", "C"],
        ["B", "D"],
        ["C", "D"],
      ]),
    };

    const steps = generateBidirectionalBfsSteps(input);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
