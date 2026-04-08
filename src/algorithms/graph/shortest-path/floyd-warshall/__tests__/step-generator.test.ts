import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateFloydWarshallSteps } from "../step-generator";
import type { FloydWarshallInput } from "../step-generator";

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

describe("generateFloydWarshallSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: FloydWarshallInput = {
      adjacencyList: {
        A: [
          ["B", 3],
          ["C", 8],
        ],
        B: [["C", 4]],
        C: [],
      },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([
        ["A", "B", 3],
        ["A", "C", 8],
        ["B", "C", 4],
      ]),
    };

    const steps = generateFloydWarshallSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes process-node steps for each intermediate node", () => {
    const input: FloydWarshallInput = {
      adjacencyList: {
        A: [["B", 2]],
        B: [["C", 3]],
        C: [],
      },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([
        ["A", "B", 2],
        ["B", "C", 3],
      ]),
    };

    const steps = generateFloydWarshallSteps(input);
    const processSteps = steps.filter((step) => step.type === "process-node");
    expect(processSteps.length).toBe(3); // one per node
  });

  it("includes relax-edge and update-distance steps", () => {
    const input: FloydWarshallInput = {
      adjacencyList: {
        A: [
          ["B", 1],
          ["C", 10],
        ],
        B: [["C", 2]],
        C: [],
      },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([
        ["A", "B", 1],
        ["A", "C", 10],
        ["B", "C", 2],
      ]),
    };

    const steps = generateFloydWarshallSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("relax-edge");
    expect(stepTypes).toContain("update-distance");
  });

  it("final visual state contains distances field", () => {
    const input: FloydWarshallInput = {
      adjacencyList: {
        A: [["B", 3]],
        B: [["C", 4]],
        C: [],
      },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeWeightedEdges([
        ["A", "B", 3],
        ["B", "C", 4],
      ]),
    };

    const steps = generateFloydWarshallSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.distances).toBeDefined();
  });

  it("step indices increment from zero sequentially", () => {
    const input: FloydWarshallInput = {
      adjacencyList: { A: [["B", 1]], B: [] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 1]]),
    };

    const steps = generateFloydWarshallSteps(input);
    steps.forEach((step, index) => {
      expect(step.index).toBe(index);
    });
  });

  it("produces more steps for larger graphs reflecting cubic complexity", () => {
    const smallInput: FloydWarshallInput = {
      adjacencyList: { A: [["B", 1]], B: [] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeWeightedEdges([["A", "B", 1]]),
    };
    const largerInput: FloydWarshallInput = {
      adjacencyList: {
        A: [
          ["B", 1],
          ["C", 5],
        ],
        B: [
          ["C", 2],
          ["D", 4],
        ],
        C: [["D", 1]],
        D: [],
      },
      nodeIds: ["A", "B", "C", "D"],
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeWeightedEdges([
        ["A", "B", 1],
        ["A", "C", 5],
        ["B", "C", 2],
        ["B", "D", 4],
        ["C", "D", 1],
      ]),
    };

    const smallSteps = generateFloydWarshallSteps(smallInput);
    const largerSteps = generateFloydWarshallSteps(largerInput);
    expect(largerSteps.length).toBeGreaterThan(smallSteps.length);
  });

  it("handles a single-node graph without crashing", () => {
    const input: FloydWarshallInput = {
      adjacencyList: { A: [] },
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateFloydWarshallSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });
});
