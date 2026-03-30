import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateKahnsSteps } from "./step-generator";
import type { KahnsInput } from "./step-generator";

function makeNodes(ids: string[]): GraphNode[] {
  const totalNodes = ids.length;
  return ids.map((nodeId, nodeIndex) => ({
    id: nodeId,
    label: nodeId,
    state: "default" as const,
    position: {
      x: Math.round(200 + 150 * Math.cos((2 * Math.PI * nodeIndex) / totalNodes - Math.PI / 2)),
      y: Math.round(200 + 150 * Math.sin((2 * Math.PI * nodeIndex) / totalNodes - Math.PI / 2)),
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

describe("generateKahnsSteps", () => {
  it("generates steps for the default 6-node DAG", () => {
    const input: KahnsInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["D"],
        C: ["D", "E"],
        D: ["F"],
        E: ["F"],
        F: [],
      },
      nodeIds: ["A", "B", "C", "D", "E", "F"],
      nodes: makeNodes(["A", "B", "C", "D", "E", "F"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
        ["B", "D"],
        ["C", "D"],
        ["C", "E"],
        ["D", "F"],
        ["E", "F"],
      ]),
    };

    const steps = generateKahnsSteps(input);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes enqueue and dequeue steps", () => {
    const input: KahnsInput = {
      adjacencyList: { A: ["B"], B: [] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateKahnsSteps(input);
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("enqueue");
    expect(stepTypes).toContain("dequeue");
  });

  it("includes add-to-order steps for all nodes", () => {
    const input: KahnsInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateKahnsSteps(input);
    const addToOrderSteps = steps.filter((step) => step.type === "add-to-order");

    expect(addToOrderSteps).toHaveLength(3);
  });

  it("produces a valid topological order in the final visual state", () => {
    const adjacencyList = {
      A: ["B", "C"],
      B: ["D"],
      C: ["D", "E"],
      D: ["F"],
      E: ["F"],
      F: [],
    };
    const input: KahnsInput = {
      adjacencyList,
      nodeIds: ["A", "B", "C", "D", "E", "F"],
      nodes: makeNodes(["A", "B", "C", "D", "E", "F"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
        ["B", "D"],
        ["C", "D"],
        ["C", "E"],
        ["D", "F"],
        ["E", "F"],
      ]),
    };

    const steps = generateKahnsSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.topologicalOrder).toBeDefined();
    expect(visualState.topologicalOrder).toHaveLength(6);

    const order = visualState.topologicalOrder!;
    // Verify A comes before B and C
    expect(order.indexOf("A")).toBeLessThan(order.indexOf("B"));
    expect(order.indexOf("A")).toBeLessThan(order.indexOf("C"));
    // Verify F comes last
    expect(order.indexOf("F")).toBe(5);
  });

  it("exposes in-degree map in visual state", () => {
    const input: KahnsInput = {
      adjacencyList: { A: ["B"], B: [] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateKahnsSteps(input);
    const initStep = steps[0]!;
    const visualState = initStep.visualState as GraphVisualState;

    expect(visualState.inDegree).toBeDefined();
    expect(visualState.inDegree!["A"]).toBe(0);
    expect(visualState.inDegree!["B"]).toBe(1);
  });

  it("accumulates metrics correctly", () => {
    const input: KahnsInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateKahnsSteps(input);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.queueOperations).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const input: KahnsInput = {
      adjacencyList: { A: ["B"], B: [] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateKahnsSteps(input);
    const enqueueStep = steps.find((step) => step.type === "enqueue");

    expect(enqueueStep).toBeDefined();
    expect(enqueueStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = enqueueStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single node with no edges", () => {
    const input: KahnsInput = {
      adjacencyList: { A: [] },
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateKahnsSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");

    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.topologicalOrder).toContain("A");
  });
});
