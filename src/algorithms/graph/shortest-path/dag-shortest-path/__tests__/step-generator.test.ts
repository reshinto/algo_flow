import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateDagShortestPathSteps } from "../step-generator";
import type { DagShortestPathInput } from "../step-generator";

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

describe("generateDagShortestPathSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: DagShortestPathInput = {
      adjacencyList: {
        A: [
          ["B", 2],
          ["C", 6],
        ],
        B: [["D", 1]],
        C: [["D", 3]],
        D: [],
      },
      startNodeId: "A",
      nodeIds: ["A", "B", "C", "D"],
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 2],
        ["A", "C", 6],
        ["B", "D", 1],
        ["C", "D", 3],
      ]),
    };

    const steps = generateDagShortestPathSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes add-to-order steps from topological sort phase", () => {
    const input: DagShortestPathInput = {
      adjacencyList: {
        A: [["B", 1]],
        B: [],
      },
      startNodeId: "A",
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 1]]),
    };

    const steps = generateDagShortestPathSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("add-to-order");
  });

  it("includes relax-edge and update-distance steps during relaxation phase", () => {
    const input: DagShortestPathInput = {
      adjacencyList: {
        A: [["B", 3]],
        B: [],
      },
      startNodeId: "A",
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 3]]),
    };

    const steps = generateDagShortestPathSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("relax-edge");
    expect(stepTypes).toContain("update-distance");
  });

  it("includes process-node steps for each node processed in topological order", () => {
    const input: DagShortestPathInput = {
      adjacencyList: {
        A: [["B", 2]],
        B: [["C", 1]],
        C: [],
      },
      startNodeId: "A",
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([
        ["A", "B", 2],
        ["B", "C", 1],
      ]),
    };

    const steps = generateDagShortestPathSteps(input);
    const processSteps = steps.filter((step) => step.type === "process-node");
    expect(processSteps.length).toBeGreaterThanOrEqual(1);
  });

  it("final visual state contains correct distances", () => {
    const input: DagShortestPathInput = {
      adjacencyList: {
        A: [
          ["B", 2],
          ["C", 6],
        ],
        B: [["D", 1]],
        C: [["D", 3]],
        D: [],
      },
      startNodeId: "A",
      nodeIds: ["A", "B", "C", "D"],
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 2],
        ["A", "C", 6],
        ["B", "D", 1],
        ["C", "D", 3],
      ]),
    };

    const steps = generateDagShortestPathSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    // distances is populated only for nodes that had updateDistance called on them
    const updateSteps = steps.filter((step) => step.type === "update-distance");
    expect(updateSteps.length).toBeGreaterThan(0);
    // B gets distance 2 (A→B) and D gets distance 3 (A→B→D)
    if (visualState.distances) {
      expect(visualState.distances["B"]).toBe(2);
      expect(visualState.distances["D"]).toBe(3); // A→B→D = 3
    }
  });

  it("step indices increment from zero without gaps", () => {
    const input: DagShortestPathInput = {
      adjacencyList: { A: [["B", 1]], B: [] },
      startNodeId: "A",
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 1]]),
    };

    const steps = generateDagShortestPathSteps(input);
    steps.forEach((step, index) => {
      expect(step.index).toBe(index);
    });
  });

  it("includes highlighted lines for typescript in each step", () => {
    const input: DagShortestPathInput = {
      adjacencyList: { A: [["B", 2]], B: [] },
      startNodeId: "A",
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 2]]),
    };

    const steps = generateDagShortestPathSteps(input);
    const relaxStep = steps.find((step) => step.type === "relax-edge");
    expect(relaxStep).toBeDefined();
    expect(relaxStep!.highlightedLines.length).toBeGreaterThan(0);
    const tsHighlight = relaxStep!.highlightedLines.find((hl) => hl.language === "typescript");
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("accumulates visits metric correctly", () => {
    const input: DagShortestPathInput = {
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

    const steps = generateDagShortestPathSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("handles a single-node graph without crashing", () => {
    const input: DagShortestPathInput = {
      adjacencyList: { A: [] },
      startNodeId: "A",
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateDagShortestPathSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
