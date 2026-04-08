import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateBipartiteCheckSteps } from "../step-generator";
import type { BipartiteCheckInput } from "../step-generator";

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

describe("generateBipartiteCheckSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: BipartiteCheckInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeUndirectedEdges([["A", "B"]]),
    };

    const steps = generateBipartiteCheckSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes enqueue, dequeue, and assign-color steps", () => {
    const input: BipartiteCheckInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeUndirectedEdges([["A", "B"]]),
    };

    const steps = generateBipartiteCheckSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("enqueue");
    expect(stepTypes).toContain("dequeue");
    expect(stepTypes).toContain("assign-color");
  });

  it("produces a colorAssignment in the final visual state for a bipartite graph", () => {
    const input: BipartiteCheckInput = {
      adjacencyList: {
        A: ["D", "E"],
        B: ["D", "F"],
        C: ["E", "F"],
        D: ["A", "B"],
        E: ["A", "C"],
        F: ["B", "C"],
      },
      nodeIds: ["A", "B", "C", "D", "E", "F"],
      nodes: makeNodes(["A", "B", "C", "D", "E", "F"]),
      edges: makeUndirectedEdges([
        ["A", "D"],
        ["A", "E"],
        ["B", "D"],
        ["B", "F"],
        ["C", "E"],
        ["C", "F"],
      ]),
    };

    const steps = generateBipartiteCheckSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.kind).toBe("graph");
    expect(visualState.colorAssignment).toBeDefined();
  });

  it("includes a check-bipartite step for a non-bipartite graph", () => {
    const input: BipartiteCheckInput = {
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

    const steps = generateBipartiteCheckSteps(input);
    const conflictStep = steps.find((step) => step.type === "check-bipartite");
    expect(conflictStep).toBeDefined();
  });

  it("generates highlighted lines for the initialize step", () => {
    const input: BipartiteCheckInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeUndirectedEdges([["A", "B"]]),
    };

    const steps = generateBipartiteCheckSteps(input);
    const initStep = steps[0]!;
    expect(initStep.highlightedLines.length).toBeGreaterThan(0);
    const tsHighlight = initStep.highlightedLines.find((hl) => hl.language === "typescript");
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("accumulates queue operation metrics", () => {
    const input: BipartiteCheckInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A"],
        C: ["A"],
      },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeUndirectedEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateBipartiteCheckSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.queueOperations).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles a single isolated node", () => {
    const input: BipartiteCheckInput = {
      adjacencyList: { A: [] },
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateBipartiteCheckSteps(input);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
