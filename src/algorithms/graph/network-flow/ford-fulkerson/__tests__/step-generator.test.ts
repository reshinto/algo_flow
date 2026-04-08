import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateFordFulkersonSteps } from "../step-generator";
import type { FordFulkersonInput } from "../step-generator";

function makeFlowNodes(ids: string[]): GraphNode[] {
  return ids.map((nodeId, index) => ({
    id: nodeId,
    label: nodeId,
    state: "default" as const,
    position: { x: index * 80, y: 100 },
  }));
}

function makeFlowEdges(triples: [string, string, number][]): GraphEdge[] {
  return triples.map(([source, target, capacity]) => ({
    source,
    target,
    state: "default" as const,
    capacity,
    flow: 0,
  }));
}

describe("generateFordFulkersonSteps", () => {
  it("generates steps for a simple two-node flow network", () => {
    const input: FordFulkersonInput = {
      adjacencyList: {
        S: [{ target: "T", capacity: 5 }],
        T: [],
      },
      sourceNodeId: "S",
      sinkNodeId: "T",
      nodes: makeFlowNodes(["S", "T"]),
      edges: makeFlowEdges([["S", "T", 5]]),
    };

    const steps = generateFordFulkersonSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("first step is initialize and last step is complete", () => {
    const input: FordFulkersonInput = {
      adjacencyList: {
        S: [{ target: "A", capacity: 10 }],
        A: [{ target: "T", capacity: 5 }],
        T: [],
      },
      sourceNodeId: "S",
      sinkNodeId: "T",
      nodes: makeFlowNodes(["S", "A", "T"]),
      edges: makeFlowEdges([
        ["S", "A", 10],
        ["A", "T", 5],
      ]),
    };

    const steps = generateFordFulkersonSteps(input);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes augment-flow steps when a path exists", () => {
    const input: FordFulkersonInput = {
      adjacencyList: {
        S: [{ target: "T", capacity: 7 }],
        T: [],
      },
      sourceNodeId: "S",
      sinkNodeId: "T",
      nodes: makeFlowNodes(["S", "T"]),
      edges: makeFlowEdges([["S", "T", 7]]),
    };

    const steps = generateFordFulkersonSteps(input);
    const augmentSteps = steps.filter((step) => step.type === "augment-flow");
    expect(augmentSteps.length).toBeGreaterThan(0);
  });

  it("produces correct final visual state kind", () => {
    const input: FordFulkersonInput = {
      adjacencyList: {
        S: [{ target: "T", capacity: 5 }],
        T: [],
      },
      sourceNodeId: "S",
      sinkNodeId: "T",
      nodes: makeFlowNodes(["S", "T"]),
      edges: makeFlowEdges([["S", "T", 5]]),
    };

    const steps = generateFordFulkersonSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.kind).toBe("graph");
  });

  it("generates highlighted lines for each step", () => {
    const input: FordFulkersonInput = {
      adjacencyList: {
        S: [{ target: "T", capacity: 5 }],
        T: [],
      },
      sourceNodeId: "S",
      sinkNodeId: "T",
      nodes: makeFlowNodes(["S", "T"]),
      edges: makeFlowEdges([["S", "T", 5]]),
    };

    const steps = generateFordFulkersonSteps(input);
    const initStep = steps[0]!;
    expect(initStep.highlightedLines.length).toBeGreaterThan(0);
    const tsHighlight = initStep.highlightedLines.find((hl) => hl.language === "typescript");
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("accumulates metrics correctly", () => {
    const input: FordFulkersonInput = {
      adjacencyList: {
        S: [
          { target: "A", capacity: 5 },
          { target: "B", capacity: 5 },
        ],
        A: [{ target: "T", capacity: 5 }],
        B: [{ target: "T", capacity: 5 }],
        T: [],
      },
      sourceNodeId: "S",
      sinkNodeId: "T",
      nodes: makeFlowNodes(["S", "A", "B", "T"]),
      edges: makeFlowEdges([
        ["S", "A", 5],
        ["S", "B", 5],
        ["A", "T", 5],
        ["B", "T", 5],
      ]),
    };

    const steps = generateFordFulkersonSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles a network with no path from source to sink", () => {
    const input: FordFulkersonInput = {
      adjacencyList: {
        S: [{ target: "A", capacity: 10 }],
        A: [],
        T: [],
      },
      sourceNodeId: "S",
      sinkNodeId: "T",
      nodes: makeFlowNodes(["S", "A", "T"]),
      edges: makeFlowEdges([["S", "A", 10]]),
    };

    const steps = generateFordFulkersonSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
