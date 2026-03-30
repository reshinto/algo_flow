import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateDfsCycleUndirectedSteps } from "./step-generator";
import type { DfsCycleUndirectedInput } from "./step-generator";

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

function makeEdges(pairs: [string, string][]): GraphEdge[] {
  return pairs.map(([source, target]) => ({ source, target, state: "default" as const }));
}

describe("generateDfsCycleUndirectedSteps", () => {
  it("produces an initialize step first and complete step last", () => {
    const input: DfsCycleUndirectedInput = {
      adjacencyList: { A: ["B", "C"], B: ["A", "C"], C: ["B", "A"] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
        ["C", "A"],
        ["A", "C"],
      ]),
    };
    const steps = generateDfsCycleUndirectedSteps(input);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes classify-edge steps", () => {
    const input: DfsCycleUndirectedInput = {
      adjacencyList: { A: ["B", "C"], B: ["A", "C"], C: ["B", "A"] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["B", "C"],
        ["C", "B"],
        ["A", "C"],
        ["C", "A"],
      ]),
    };
    const steps = generateDfsCycleUndirectedSteps(input);
    const classifySteps = steps.filter((step) => step.type === "classify-edge");
    expect(classifySteps.length).toBeGreaterThan(0);
  });

  it("includes push-stack and pop-stack steps", () => {
    const input: DfsCycleUndirectedInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };
    const steps = generateDfsCycleUndirectedSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("push-stack");
    expect(stepTypes).toContain("pop-stack");
  });

  it("produces correct final visual state with graph kind", () => {
    const input: DfsCycleUndirectedInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };
    const steps = generateDfsCycleUndirectedSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.kind).toBe("graph");
  });

  it("includes highlighted lines for each step", () => {
    const input: DfsCycleUndirectedInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };
    const steps = generateDfsCycleUndirectedSteps(input);
    const stepsWithHighlights = steps.filter((step) => step.highlightedLines.length > 0);
    expect(stepsWithHighlights.length).toBeGreaterThan(0);
  });

  it("does not emit a back-edge classify step for a tree graph", () => {
    const input: DfsCycleUndirectedInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "D"],
        C: ["A"],
        D: ["B"],
      },
      nodeIds: ["A", "B", "C", "D"],
      nodes: makeNodes(["A", "B", "C", "D"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
        ["A", "C"],
        ["C", "A"],
        ["B", "D"],
        ["D", "B"],
      ]),
    };
    const steps = generateDfsCycleUndirectedSteps(input);
    const backEdgeSteps = steps.filter(
      (step) =>
        step.type === "classify-edge" &&
        typeof step.variables["edgeType"] === "string" &&
        step.variables["edgeType"] === "back-edge",
    );
    expect(backEdgeSteps).toHaveLength(0);
  });

  it("accumulates metrics visits correctly", () => {
    const input: DfsCycleUndirectedInput = {
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
    const steps = generateDfsCycleUndirectedSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });
});
