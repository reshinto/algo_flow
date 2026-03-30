import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateHierholzersSteps } from "./step-generator";
import type { HierholzersInput } from "./step-generator";

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

describe("generateHierholzersSteps", () => {
  it("generates steps for a simple triangle graph", () => {
    const input: HierholzersInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["B", "A"],
      },
      startNodeId: "A",
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

    const steps = generateHierholzersSteps(input);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes push-stack and pop-stack steps", () => {
    const input: HierholzersInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["B", "A"],
      },
      startNodeId: "A",
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

    const steps = generateHierholzersSteps(input);
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("push-stack");
    expect(stepTypes).toContain("pop-stack");
  });

  it("includes use-edge steps for each edge traversal", () => {
    const input: HierholzersInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["B", "A"],
      },
      startNodeId: "A",
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

    const steps = generateHierholzersSteps(input);
    const useEdgeSteps = steps.filter((step) => step.type === "use-edge");

    // 3 undirected edges in a triangle
    expect(useEdgeSteps.length).toBe(3);
  });

  it("produces a complete step as the final step", () => {
    const input: HierholzersInput = {
      adjacencyList: { A: [] },
      startNodeId: "A",
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateHierholzersSteps(input);
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("produces correct final visual state with graph kind", () => {
    const input: HierholzersInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["B", "A"],
      },
      startNodeId: "A",
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

    const steps = generateHierholzersSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.nodes).toBeDefined();
    expect(visualState.edges).toBeDefined();
  });

  it("accumulates metrics correctly across steps", () => {
    const input: HierholzersInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["B", "A"],
      },
      startNodeId: "A",
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

    const steps = generateHierholzersSteps(input);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const input: HierholzersInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["B", "A"],
      },
      startNodeId: "A",
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

    const steps = generateHierholzersSteps(input);
    const pushStep = steps.find((step) => step.type === "push-stack");

    expect(pushStep).toBeDefined();
    expect(pushStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = pushStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single node graph with no edges", () => {
    const input: HierholzersInput = {
      adjacencyList: { A: [] },
      startNodeId: "A",
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateHierholzersSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("stack state is empty at the complete step", () => {
    const input: HierholzersInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["B", "A"],
      },
      startNodeId: "A",
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

    const steps = generateHierholzersSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    // Stack should be empty when circuit is complete
    expect(visualState.stack ?? []).toHaveLength(0);
  });
});
