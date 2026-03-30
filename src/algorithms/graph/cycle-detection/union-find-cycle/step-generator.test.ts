import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateUnionFindCycleSteps } from "./step-generator";
import type { UnionFindCycleInput } from "./step-generator";

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

function makeGraphEdges(pairs: [string, string][]): GraphEdge[] {
  return pairs.map(([source, target]) => ({ source, target, state: "default" as const }));
}

describe("generateUnionFindCycleSteps", () => {
  it("produces an initialize step first and complete step last", () => {
    const input: UnionFindCycleInput = {
      edges: [
        { source: "A", target: "B" },
        { source: "B", target: "C" },
      ],
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      graphEdges: makeGraphEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
      ]),
    };
    const steps = generateUnionFindCycleSteps(input);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes visit steps for edges", () => {
    const input: UnionFindCycleInput = {
      edges: [
        { source: "A", target: "B" },
        { source: "B", target: "C" },
      ],
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      graphEdges: makeGraphEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
      ]),
    };
    const steps = generateUnionFindCycleSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("includes merge-components steps when no cycle yet", () => {
    const input: UnionFindCycleInput = {
      edges: [
        { source: "A", target: "B" },
        { source: "B", target: "C" },
      ],
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      graphEdges: makeGraphEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
      ]),
    };
    const steps = generateUnionFindCycleSteps(input);
    const mergeSteps = steps.filter((step) => step.type === "merge-components");
    expect(mergeSteps.length).toBeGreaterThan(0);
  });

  it("produces correct final visual state with graph kind", () => {
    const input: UnionFindCycleInput = {
      edges: [{ source: "A", target: "B" }],
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      graphEdges: makeGraphEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };
    const steps = generateUnionFindCycleSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.kind).toBe("graph");
  });

  it("includes highlighted lines for each step", () => {
    const input: UnionFindCycleInput = {
      edges: [{ source: "A", target: "B" }],
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      graphEdges: makeGraphEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };
    const steps = generateUnionFindCycleSteps(input);
    const stepsWithHighlights = steps.filter((step) => step.highlightedLines.length > 0);
    expect(stepsWithHighlights.length).toBeGreaterThan(0);
  });

  it("does not emit merge-components for the cycle-forming edge", () => {
    const input: UnionFindCycleInput = {
      edges: [
        { source: "A", target: "B" },
        { source: "B", target: "C" },
        { source: "C", target: "A" },
      ],
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      graphEdges: makeGraphEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
        ["C", "A"],
        ["A", "C"],
      ]),
    };
    const steps = generateUnionFindCycleSteps(input);
    // Two merge steps for A-B and B-C; none for C-A (cycle detected and halted)
    const mergeSteps = steps.filter((step) => step.type === "merge-components");
    expect(mergeSteps).toHaveLength(2);
  });

  it("accumulates metrics correctly", () => {
    const input: UnionFindCycleInput = {
      edges: [
        { source: "A", target: "B" },
        { source: "B", target: "C" },
      ],
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      graphEdges: makeGraphEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
      ]),
    };
    const steps = generateUnionFindCycleSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });
});
