import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateBellmanFordSteps } from "../step-generator";
import type { BellmanFordInput } from "../step-generator";

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

describe("generateBellmanFordSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: BellmanFordInput = {
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
      nodeIds: ["A", "B", "C", "D"],
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 4],
        ["A", "C", 2],
        ["B", "D", 5],
        ["C", "B", 1],
      ]),
    };

    const steps = generateBellmanFordSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes relax-edge and update-distance steps", () => {
    const input: BellmanFordInput = {
      adjacencyList: {
        A: [["B", 3]],
        B: [],
      },
      startNodeId: "A",
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 3]]),
    };

    const steps = generateBellmanFordSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("relax-edge");
    expect(stepTypes).toContain("update-distance");
  });

  it("final visual state distances reflect correct shortest paths", () => {
    const input: BellmanFordInput = {
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
      nodeIds: ["A", "B", "C", "D"],
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 4],
        ["A", "C", 2],
        ["B", "D", 5],
        ["C", "B", 1],
      ]),
    };

    const steps = generateBellmanFordSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.distances).toBeDefined();
    expect(visualState.distances!["A"]).toBe(0);
    expect(visualState.distances!["C"]).toBe(2);
    expect(visualState.distances!["B"]).toBe(3);
    expect(visualState.distances!["D"]).toBe(8);
  });

  it("accumulates visits metric across passes", () => {
    const input: BellmanFordInput = {
      adjacencyList: {
        A: [
          ["B", 1],
          ["C", 2],
        ],
        B: [],
        C: [],
      },
      startNodeId: "A",
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([
        ["A", "B", 1],
        ["A", "C", 2],
      ]),
    };

    const steps = generateBellmanFordSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("step indices increment from zero sequentially", () => {
    const input: BellmanFordInput = {
      adjacencyList: { A: [["B", 2]], B: [] },
      startNodeId: "A",
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 2]]),
    };

    const steps = generateBellmanFordSteps(input);
    steps.forEach((step, index) => {
      expect(step.index).toBe(index);
    });
  });

  it("includes highlighted lines for typescript in relaxation steps", () => {
    const input: BellmanFordInput = {
      adjacencyList: { A: [["B", 5]], B: [] },
      startNodeId: "A",
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 5]]),
    };

    const steps = generateBellmanFordSteps(input);
    const relaxStep = steps.find((step) => step.type === "relax-edge");
    expect(relaxStep).toBeDefined();
    expect(relaxStep!.highlightedLines.length).toBeGreaterThan(0);
    const tsHighlight = relaxStep!.highlightedLines.find((hl) => hl.language === "typescript");
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single-node graph without crashing", () => {
    const input: BellmanFordInput = {
      adjacencyList: { A: [] },
      startNodeId: "A",
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateBellmanFordSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
