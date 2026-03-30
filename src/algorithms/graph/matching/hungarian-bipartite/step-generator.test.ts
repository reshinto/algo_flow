import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateHungarianBipartiteSteps } from "./step-generator";
import type { HungarianBipartiteInput } from "./step-generator";

function makeNodes(leftIds: string[], rightIds: string[]): GraphNode[] {
  const leftNodes: GraphNode[] = leftIds.map((nodeId, index) => ({
    id: nodeId,
    label: nodeId,
    state: "default" as const,
    position: { x: 100, y: 100 + index * 100 },
  }));
  const rightNodes: GraphNode[] = rightIds.map((nodeId, index) => ({
    id: nodeId,
    label: nodeId,
    state: "default" as const,
    position: { x: 300, y: 100 + index * 100 },
  }));
  return [...leftNodes, ...rightNodes];
}

function makeEdges(pairs: [string, string][]): GraphEdge[] {
  const edges: GraphEdge[] = [];
  for (const [source, target] of pairs) {
    edges.push({ source, target, state: "default" as const });
    edges.push({ source: target, target: source, state: "default" as const });
  }
  return edges;
}

function makeInput(
  leftIds: string[],
  rightIds: string[],
  edgePairs: [string, string][],
  adjacencyList: Record<string, string[]>,
): HungarianBipartiteInput {
  return {
    adjacencyList,
    leftNodes: leftIds,
    rightNodes: rightIds,
    nodes: makeNodes(leftIds, rightIds),
    edges: makeEdges(edgePairs),
  };
}

describe("generateHungarianBipartiteSteps", () => {
  it("generates steps for the default 3+3 bipartite graph", () => {
    const input = makeInput(
      ["L1", "L2", "L3"],
      ["R1", "R2", "R3"],
      [
        ["L1", "R1"],
        ["L1", "R2"],
        ["L2", "R2"],
        ["L2", "R3"],
        ["L3", "R1"],
        ["L3", "R3"],
      ],
      {
        L1: ["R1", "R2"],
        L2: ["R2", "R3"],
        L3: ["R1", "R3"],
        R1: ["L1", "L3"],
        R2: ["L1", "L2"],
        R3: ["L2", "L3"],
      },
    );

    const steps = generateHungarianBipartiteSteps(input);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("first step has kind graph in visual state", () => {
    const input = makeInput(
      ["L1", "L2"],
      ["R1", "R2"],
      [
        ["L1", "R1"],
        ["L2", "R2"],
      ],
      { L1: ["R1"], L2: ["R2"], R1: ["L1"], R2: ["L2"] },
    );

    const steps = generateHungarianBipartiteSteps(input);
    const firstStep = steps[0]!;
    const visualState = firstStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.nodes.length).toBeGreaterThan(0);
  });

  it("includes visit steps for left nodes", () => {
    const input = makeInput(
      ["L1", "L2"],
      ["R1", "R2"],
      [
        ["L1", "R1"],
        ["L2", "R2"],
      ],
      { L1: ["R1"], L2: ["R2"], R1: ["L1"], R2: ["L2"] },
    );

    const steps = generateHungarianBipartiteSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("includes matched edges in the final visual state for a perfect-matchable graph", () => {
    const input = makeInput(["L1"], ["R1"], [["L1", "R1"]], { L1: ["R1"], R1: ["L1"] });

    const steps = generateHungarianBipartiteSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    const matchedEdges = visualState.edges.filter((edge) => edge.state === "matched");
    expect(matchedEdges.length).toBeGreaterThan(0);
  });

  it("final visual state marks matched nodes correctly", () => {
    const input = makeInput(["L1"], ["R1"], [["L1", "R1"]], { L1: ["R1"], R1: ["L1"] });

    const steps = generateHungarianBipartiteSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    const matchedNodes = visualState.nodes.filter((node) => node.state === "matched");
    expect(matchedNodes.length).toBe(2); // Both L1 and R1 should be matched
  });

  it("produces steps for a graph with no edges (no matches possible)", () => {
    const input = makeInput(["L1", "L2"], ["R1", "R2"], [], {
      L1: [],
      L2: [],
      R1: [],
      R2: [],
    });

    const steps = generateHungarianBipartiteSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");

    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { matchingSize: number };
    expect(variables.matchingSize).toBe(0);
  });

  it("includes highlighted lines for typescript in each step", () => {
    const input = makeInput(["L1"], ["R1"], [["L1", "R1"]], { L1: ["R1"], R1: ["L1"] });

    const steps = generateHungarianBipartiteSteps(input);
    const stepsWithHighlights = steps.filter((step) => step.highlightedLines.length > 0);
    expect(stepsWithHighlights.length).toBeGreaterThan(0);
  });

  it("accumulates metrics correctly throughout matching", () => {
    const input = makeInput(
      ["L1", "L2", "L3"],
      ["R1", "R2", "R3"],
      [
        ["L1", "R1"],
        ["L1", "R2"],
        ["L2", "R2"],
        ["L2", "R3"],
        ["L3", "R1"],
        ["L3", "R3"],
      ],
      {
        L1: ["R1", "R2"],
        L2: ["R2", "R3"],
        L3: ["R1", "R3"],
        R1: ["L1", "L3"],
        R2: ["L1", "L2"],
        R3: ["L2", "L3"],
      },
    );

    const steps = generateHungarianBipartiteSteps(input);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("reports correct matching size in final step variables", () => {
    const input = makeInput(
      ["L1", "L2", "L3"],
      ["R1", "R2", "R3"],
      [
        ["L1", "R1"],
        ["L2", "R2"],
        ["L3", "R3"],
      ],
      {
        L1: ["R1"],
        L2: ["R2"],
        L3: ["R3"],
        R1: ["L1"],
        R2: ["L2"],
        R3: ["L3"],
      },
    );

    const steps = generateHungarianBipartiteSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const variables = lastStep.variables as { matchingSize: number };

    expect(variables.matchingSize).toBe(3);
  });
});
