import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateGreedyColoringSteps } from "./step-generator";
import type { GreedyColoringInput } from "./step-generator";

function makeNodes(ids: string[]): GraphNode[] {
  return ids.map((nodeId, index) => ({
    id: nodeId,
    label: nodeId,
    state: "default" as const,
    position: { x: index * 80, y: 100 },
  }));
}

function makeUndirectedEdges(pairs: [string, string][]): GraphEdge[] {
  const edgeList: GraphEdge[] = [];
  for (const [source, target] of pairs) {
    edgeList.push({ source, target, state: "default" as const });
    edgeList.push({ source: target, target: source, state: "default" as const });
  }
  return edgeList;
}

describe("generateGreedyColoringSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: GreedyColoringInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeUndirectedEdges([["A", "B"]]),
    };

    const steps = generateGreedyColoringSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes visit and assign-color steps", () => {
    const input: GreedyColoringInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeUndirectedEdges([["A", "B"]]),
    };

    const steps = generateGreedyColoringSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("visit");
    expect(stepTypes).toContain("assign-color");
  });

  it("produces a visual state with colorAssignment after completion", () => {
    const input: GreedyColoringInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["A", "B"],
      },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeUndirectedEdges([
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
      ]),
    };

    const steps = generateGreedyColoringSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.kind).toBe("graph");
    expect(visualState.colorAssignment).toBeDefined();
    expect(Object.keys(visualState.colorAssignment!)).toContain("A");
  });

  it("generates highlighted lines for the initialize step", () => {
    const input: GreedyColoringInput = {
      adjacencyList: { A: [] },
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateGreedyColoringSteps(input);
    const initStep = steps[0]!;
    expect(initStep.highlightedLines.length).toBeGreaterThan(0);
    const tsHighlight = initStep.highlightedLines.find((hl) => hl.language === "typescript");
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("accumulates visit metrics across all nodes", () => {
    const input: GreedyColoringInput = {
      adjacencyList: {
        A: ["B"],
        B: ["A", "C"],
        C: ["B"],
      },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeUndirectedEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateGreedyColoringSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles a single node graph", () => {
    const input: GreedyColoringInput = {
      adjacencyList: { A: [] },
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateGreedyColoringSteps(input);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
