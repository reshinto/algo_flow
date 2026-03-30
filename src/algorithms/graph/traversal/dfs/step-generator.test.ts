import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateDfsSteps } from "./step-generator";
import type { DfsInput } from "./step-generator";

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
  return pairs.map(([source, target]) => ({
    source,
    target,
    state: "default" as const,
  }));
}

describe("generateDfsSteps", () => {
  it("generates steps for a simple graph", () => {
    const input: DfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateDfsSteps(input);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes push-stack and pop-stack steps", () => {
    const input: DfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateDfsSteps(input);
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("push-stack");
    expect(stepTypes).toContain("pop-stack");
  });

  it("includes visit steps for nodes and edges", () => {
    const input: DfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateDfsSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("produces correct final visual state with all reachable nodes visited", () => {
    const input: DfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateDfsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.visited).toContain("A");
    expect(visualState.visited).toContain("B");
    expect(visualState.visited).toContain("C");
  });

  it("accumulates metrics correctly", () => {
    const input: DfsInput = {
      adjacencyList: { A: ["B", "C"], B: ["C"], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
        ["B", "C"],
      ]),
    };

    const steps = generateDfsSteps(input);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.queueOperations).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const input: DfsInput = {
      adjacencyList: { A: ["B"], B: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateDfsSteps(input);
    const pushStackStep = steps.find((step) => step.type === "push-stack");

    expect(pushStackStep).toBeDefined();
    expect(pushStackStep!.highlightedLines.length).toBeGreaterThan(0);

    const typescriptHighlight = pushStackStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(typescriptHighlight).toBeDefined();
    expect(typescriptHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single node graph", () => {
    const input: DfsInput = {
      adjacencyList: { A: [] },
      startNodeId: "A",
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateDfsSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("handles a linear graph", () => {
    const input: DfsInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateDfsSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");

    expect(visitSteps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("tracks stack state correctly — stack is empty at completion", () => {
    const input: DfsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      startNodeId: "A",
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateDfsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.stack ?? []).toHaveLength(0);
  });
});
