import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateArticulationPointsSteps } from "../step-generator";
import type { ArticulationPointsInput } from "../step-generator";

function makeNodes(ids: string[]): GraphNode[] {
  const totalNodes = ids.length;
  return ids.map((nodeId, index) => ({
    id: nodeId,
    label: nodeId,
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

describe("generateArticulationPointsSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: ArticulationPointsInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateArticulationPointsSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes visit steps during DFS traversal", () => {
    const input: ArticulationPointsInput = {
      adjacencyList: { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["A", "C"],
        ["C", "A"],
        ["B", "C"],
        ["C", "B"],
      ]),
    };

    const steps = generateArticulationPointsSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("includes mark-articulation steps when articulation points exist", () => {
    const input: ArticulationPointsInput = {
      adjacencyList: { A: ["B"], B: ["A", "C"], C: ["B"] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
      ]),
    };

    const steps = generateArticulationPointsSteps(input);
    const apSteps = steps.filter((step) => step.type === "mark-articulation");
    expect(apSteps.length).toBeGreaterThan(0);
  });

  it("produces no mark-articulation steps for a graph with no articulation points", () => {
    const input: ArticulationPointsInput = {
      adjacencyList: { A: ["B", "C"], B: ["A", "C"], C: ["A", "B"] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["A", "C"],
        ["C", "A"],
        ["B", "C"],
        ["C", "B"],
      ]),
    };

    const steps = generateArticulationPointsSteps(input);
    const apSteps = steps.filter((step) => step.type === "mark-articulation");
    expect(apSteps.length).toBe(0);
  });

  it("produces a final visual state as a graph", () => {
    const input: ArticulationPointsInput = {
      adjacencyList: { A: ["B"], B: ["A", "C"], C: ["B"] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
      ]),
    };

    const steps = generateArticulationPointsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.kind).toBe("graph");
  });

  it("finds both articulation points in the default 7-node graph", () => {
    const input: ArticulationPointsInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["A", "B", "D"],
        D: ["C", "E", "F"],
        E: ["D", "G"],
        F: ["D", "G"],
        G: ["E", "F"],
      },
      nodeIds: ["A", "B", "C", "D", "E", "F", "G"],
      nodes: makeNodes(["A", "B", "C", "D", "E", "F", "G"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["A", "C"],
        ["C", "A"],
        ["B", "C"],
        ["C", "B"],
        ["C", "D"],
        ["D", "C"],
        ["D", "E"],
        ["E", "D"],
        ["D", "F"],
        ["F", "D"],
        ["E", "G"],
        ["G", "E"],
        ["F", "G"],
        ["G", "F"],
      ]),
    };

    const steps = generateArticulationPointsSteps(input);
    const apSteps = steps.filter((step) => step.type === "mark-articulation");
    expect(apSteps.length).toBe(2);
  });

  it("includes highlighted lines for visit steps", () => {
    const input: ArticulationPointsInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateArticulationPointsSteps(input);
    const visitStep = steps.find((step) => step.type === "visit");
    expect(visitStep).toBeDefined();
    expect(visitStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = visitStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });
});
