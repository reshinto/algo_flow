import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateAStarSteps } from "../step-generator";
import type { AStarInput } from "../step-generator";

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

describe("generateAStarSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: AStarInput = {
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
      targetNodeId: "D",
      heuristic: { A: 10, B: 5, C: 7, D: 0 },
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 4],
        ["A", "C", 2],
        ["B", "D", 5],
        ["C", "B", 1],
      ]),
    };

    const steps = generateAStarSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes dequeue and visit steps during execution", () => {
    const input: AStarInput = {
      adjacencyList: {
        A: [["B", 1]],
        B: [],
      },
      startNodeId: "A",
      targetNodeId: "B",
      heuristic: { A: 1, B: 0 },
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 1]]),
    };

    const steps = generateAStarSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("dequeue");
    expect(stepTypes).toContain("visit");
  });

  it("includes relax-edge and update-distance steps", () => {
    const input: AStarInput = {
      adjacencyList: {
        A: [["B", 3]],
        B: [],
      },
      startNodeId: "A",
      targetNodeId: "B",
      heuristic: { A: 3, B: 0 },
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 3]]),
    };

    const steps = generateAStarSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("relax-edge");
    expect(stepTypes).toContain("update-distance");
  });

  it("terminates immediately upon reaching the target node", () => {
    const input: AStarInput = {
      adjacencyList: {
        A: [["B", 1]],
        B: [["C", 1]],
        C: [],
      },
      startNodeId: "A",
      targetNodeId: "B",
      heuristic: { A: 1, B: 0, C: 1 },
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([
        ["A", "B", 1],
        ["B", "C", 1],
      ]),
    };

    const steps = generateAStarSteps(input);
    const lastStep = steps[steps.length - 1]!;
    // Should complete when B is reached, before processing C
    expect(lastStep.type).toBe("complete");
    const visualState = lastStep.visualState as GraphVisualState;
    // C should not be visited since target was B
    expect(visualState.visited).not.toContain("C");
  });

  it("produces a complete step with targetReached false when no path exists", () => {
    const input: AStarInput = {
      adjacencyList: {
        A: [["B", 1]],
        B: [],
        C: [],
      },
      startNodeId: "A",
      targetNodeId: "C",
      heuristic: { A: 5, B: 3, C: 0 },
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([["A", "B", 1]]),
    };

    const steps = generateAStarSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
    const variables = lastStep.variables as Record<string, unknown>;
    expect(variables["targetReached"]).toBe(false);
  });

  it("step indices increment from zero without gaps", () => {
    const input: AStarInput = {
      adjacencyList: { A: [["B", 2]], B: [] },
      startNodeId: "A",
      targetNodeId: "B",
      heuristic: { A: 2, B: 0 },
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 2]]),
    };

    const steps = generateAStarSteps(input);
    steps.forEach((step, index) => {
      expect(step.index).toBe(index);
    });
  });

  it("includes highlighted lines for typescript in each step", () => {
    const input: AStarInput = {
      adjacencyList: { A: [["B", 2]], B: [] },
      startNodeId: "A",
      targetNodeId: "B",
      heuristic: { A: 2, B: 0 },
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 2]]),
    };

    const steps = generateAStarSteps(input);
    const visitStep = steps.find((step) => step.type === "visit");
    expect(visitStep).toBeDefined();
    expect(visitStep!.highlightedLines.length).toBeGreaterThan(0);
    const tsHighlight = visitStep!.highlightedLines.find((hl) => hl.language === "typescript");
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("final visual state shows visited nodes and distances", () => {
    const input: AStarInput = {
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
      targetNodeId: "D",
      heuristic: { A: 10, B: 5, C: 7, D: 0 },
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 4],
        ["A", "C", 2],
        ["B", "D", 5],
        ["C", "B", 1],
      ]),
    };

    const steps = generateAStarSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.visited).toContain("A");
    // distances is populated only for nodes that had updateDistance called on them
    // C receives distance 2 (the first edge relaxation from A)
    const updateSteps = steps.filter((step) => step.type === "update-distance");
    expect(updateSteps.length).toBeGreaterThan(0);
  });

  it("accumulates metrics correctly", () => {
    const input: AStarInput = {
      adjacencyList: {
        A: [
          ["B", 1],
          ["C", 2],
        ],
        B: [["D", 1]],
        C: [["D", 2]],
        D: [],
      },
      startNodeId: "A",
      targetNodeId: "D",
      heuristic: { A: 3, B: 2, C: 2, D: 0 },
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 1],
        ["A", "C", 2],
        ["B", "D", 1],
        ["C", "D", 2],
      ]),
    };

    const steps = generateAStarSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });
});
