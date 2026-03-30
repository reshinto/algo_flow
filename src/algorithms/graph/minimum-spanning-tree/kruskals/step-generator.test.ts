import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateKruskalsSteps } from "./step-generator";
import type { KruskalsInput } from "./step-generator";

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

function makeGraphEdges(pairs: [string, string, number][]): GraphEdge[] {
  const result: GraphEdge[] = [];
  for (const [source, target, weight] of pairs) {
    result.push({ source, target, weight, state: "default" });
    result.push({ source: target, target: source, weight, state: "default" });
  }
  return result;
}

const defaultEdgePairs: [string, string, number][] = [
  ["A", "B", 4],
  ["A", "C", 2],
  ["B", "C", 1],
  ["B", "D", 5],
  ["C", "D", 8],
  ["C", "E", 10],
  ["D", "E", 2],
  ["D", "F", 6],
  ["E", "F", 3],
];

function makeDefaultInput(): KruskalsInput {
  const nodeIds = ["A", "B", "C", "D", "E", "F"];
  return {
    edges: defaultEdgePairs.map(([source, target, weight]) => ({ source, target, weight })),
    nodeIds,
    nodes: makeNodes(nodeIds),
    graphEdges: makeGraphEdges(defaultEdgePairs),
  };
}

describe("generateKruskalsSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const steps = generateKruskalsSteps(makeDefaultInput());

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes visit, add-to-mst, and reject-edge step types", () => {
    const steps = generateKruskalsSteps(makeDefaultInput());
    const stepTypes = new Set(steps.map((step) => step.type));

    expect(stepTypes.has("visit")).toBe(true);
    expect(stepTypes.has("add-to-mst")).toBe(true);
    expect(stepTypes.has("reject-edge")).toBe(true);
  });

  it("includes merge-components steps when edges are accepted", () => {
    const steps = generateKruskalsSteps(makeDefaultInput());
    const mergeSteps = steps.filter((step) => step.type === "merge-components");

    expect(mergeSteps.length).toBeGreaterThan(0);
  });

  it("produces correct mstWeight in the final visual state", () => {
    const steps = generateKruskalsSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    // MST total weight: B-C(1) + A-C(2) + D-E(2) + E-F(3) + B-D(5) = 13
    expect(visualState.mstWeight).toBe(13);
  });

  it("marks MST nodes as in-mst in the final visual state", () => {
    const steps = generateKruskalsSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    const mstNodes = visualState.nodes.filter((node) => node.state === "in-mst");
    expect(mstNodes.length).toBe(6); // all nodes in MST
  });

  it("accumulates metrics across all steps", () => {
    const steps = generateKruskalsSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;

    // visitEdge calls don't increment the visits counter — check elapsedSteps instead
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
    expect(steps.length).toBeGreaterThan(0);
  });

  it("includes highlighted lines for typescript in each step", () => {
    const steps = generateKruskalsSteps(makeDefaultInput());
    const visitStep = steps.find((step) => step.type === "visit");

    expect(visitStep).toBeDefined();
    expect(visitStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = visitStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a minimal two-node graph", () => {
    const input: KruskalsInput = {
      edges: [{ source: "A", target: "B", weight: 5 }],
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      graphEdges: makeGraphEdges([["A", "B", 5]]),
    };

    const steps = generateKruskalsSteps(input);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
    const visualState = steps[steps.length - 1]!.visualState as GraphVisualState;
    expect(visualState.mstWeight).toBe(5);
  });
});
