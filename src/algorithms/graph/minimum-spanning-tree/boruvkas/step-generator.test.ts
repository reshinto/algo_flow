import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateBoruvkasSteps } from "./step-generator";
import type { BoruvkasInput } from "./step-generator";

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

function makeDefaultInput(): BoruvkasInput {
  const nodeIds = ["A", "B", "C", "D", "E", "F"];
  return {
    edges: defaultEdgePairs.map(([source, target, weight]) => ({ source, target, weight })),
    nodeIds,
    nodes: makeNodes(nodeIds),
    graphEdges: makeGraphEdges(defaultEdgePairs),
  };
}

describe("generateBoruvkasSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const steps = generateBoruvkasSteps(makeDefaultInput());

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes visit, add-to-mst, and merge-components step types", () => {
    const steps = generateBoruvkasSteps(makeDefaultInput());
    const stepTypes = new Set(steps.map((step) => step.type));

    expect(stepTypes.has("visit")).toBe(true);
    expect(stepTypes.has("add-to-mst")).toBe(true);
    expect(stepTypes.has("merge-components")).toBe(true);
  });

  it("produces correct mstWeight in the final visual state", () => {
    const steps = generateBoruvkasSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    // MST: B-C(1) + A-C(2) + D-E(2) + E-F(3) + B-D(5) = 13
    expect(visualState.mstWeight).toBe(13);
  });

  it("marks all nodes as in-mst in the final visual state", () => {
    const steps = generateBoruvkasSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    const mstNodes = visualState.nodes.filter((node) => node.state === "in-mst");
    expect(mstNodes.length).toBe(6);
  });

  it("step indices are sequential starting from zero", () => {
    const steps = generateBoruvkasSteps(makeDefaultInput());

    steps.forEach((step, index) => {
      expect(step.index).toBe(index);
    });
  });

  it("includes highlighted lines for typescript in visit steps", () => {
    const steps = generateBoruvkasSteps(makeDefaultInput());
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
    const input: BoruvkasInput = {
      edges: [{ source: "A", target: "B", weight: 4 }],
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      graphEdges: makeGraphEdges([["A", "B", 4]]),
    };

    const steps = generateBoruvkasSteps(input);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
    const visualState = steps[steps.length - 1]!.visualState as GraphVisualState;
    expect(visualState.mstWeight).toBe(4);
  });

  it("accumulates metrics across all steps", () => {
    const steps = generateBoruvkasSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });
});
