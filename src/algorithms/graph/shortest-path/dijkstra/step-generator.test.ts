import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateDijkstraSteps } from "./step-generator";
import type { DijkstraInput } from "./step-generator";

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

function makeWeightedEdges(triples: [string, string, number][]): GraphEdge[] {
  return triples.map(([source, target, weight]) => ({
    source,
    target,
    weight,
    state: "default" as const,
  }));
}

describe("generateDijkstraSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: DijkstraInput = {
      adjacencyList: {
        A: [
          ["B", 4],
          ["C", 2],
        ],
        B: [["D", 5]],
        C: [["B", 1]],
        D: [],
      },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 4],
        ["A", "C", 2],
        ["B", "D", 5],
        ["C", "B", 1],
      ]),
    };

    const steps = generateDijkstraSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes dequeue and visit steps during execution", () => {
    const input: DijkstraInput = {
      adjacencyList: {
        A: [["B", 1]],
        B: [],
      },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 1]]),
    };

    const steps = generateDijkstraSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("dequeue");
    expect(stepTypes).toContain("visit");
  });

  it("includes relax-edge and update-distance steps", () => {
    const input: DijkstraInput = {
      adjacencyList: {
        A: [["B", 3]],
        B: [],
      },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 3]]),
    };

    const steps = generateDijkstraSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("relax-edge");
    expect(stepTypes).toContain("update-distance");
  });

  it("final visual state distances reflect correct shortest paths", () => {
    const input: DijkstraInput = {
      adjacencyList: {
        A: [
          ["B", 4],
          ["C", 2],
        ],
        B: [["D", 5]],
        C: [["B", 1]],
        D: [],
      },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 4],
        ["A", "C", 2],
        ["B", "D", 5],
        ["C", "B", 1],
      ]),
    };

    const steps = generateDijkstraSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.distances).toBeDefined();
    expect(visualState.distances!["A"]).toBe(0);
    expect(visualState.distances!["C"]).toBe(2);
    expect(visualState.distances!["B"]).toBe(3);
    expect(visualState.distances!["D"]).toBe(8);
  });

  it("accumulates visits metric correctly", () => {
    const input: DijkstraInput = {
      adjacencyList: {
        A: [
          ["B", 1],
          ["C", 2],
        ],
        B: [],
        C: [],
      },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([
        ["A", "B", 1],
        ["A", "C", 2],
      ]),
    };

    const steps = generateDijkstraSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("step index increments from zero", () => {
    const input: DijkstraInput = {
      adjacencyList: { A: [["B", 1]], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 1]]),
    };

    const steps = generateDijkstraSteps(input);
    steps.forEach((step, index) => {
      expect(step.index).toBe(index);
    });
  });

  it("includes highlighted lines for typescript in each step", () => {
    const input: DijkstraInput = {
      adjacencyList: { A: [["B", 2]], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 2]]),
    };

    const steps = generateDijkstraSteps(input);
    const visitStep = steps.find((step) => step.type === "visit");
    expect(visitStep).toBeDefined();
    expect(visitStep!.highlightedLines.length).toBeGreaterThan(0);
    const tsHighlight = visitStep!.highlightedLines.find((hl) => hl.language === "typescript");
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single-node graph without crashing", () => {
    const input: DijkstraInput = {
      adjacencyList: { A: [] },
      startNodeId: "A",
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateDijkstraSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
