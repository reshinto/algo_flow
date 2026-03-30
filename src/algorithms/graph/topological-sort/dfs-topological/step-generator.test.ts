import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generateDfsTopologicalSteps } from "./step-generator";
import type { DfsTopologicalInput } from "./step-generator";

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

describe("generateDfsTopologicalSteps", () => {
  it("generates steps for the default 6-node DAG", () => {
    const input: DfsTopologicalInput = {
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

    const steps = generateDfsTopologicalSteps(input);
    expect(steps.length).toBeGreaterThan(0);

    const firstStep = steps[0]!;
    expect(firstStep.type).toBe("initialize");
    expect(firstStep.index).toBe(0);

    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.type).toBe("complete");
  });

  it("includes push-stack and pop-stack steps", () => {
    const input: DfsTopologicalInput = {
      adjacencyList: { A: ["B"], B: [] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateDfsTopologicalSteps(input);
    const stepTypes = steps.map((step) => step.type);

    expect(stepTypes).toContain("push-stack");
    expect(stepTypes).toContain("pop-stack");
  });

  it("includes process-node and add-to-order steps for all nodes", () => {
    const input: DfsTopologicalInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
      ]),
    };

    const steps = generateDfsTopologicalSteps(input);
    const addToOrderSteps = steps.filter((step) => step.type === "add-to-order");
    const processNodeSteps = steps.filter((step) => step.type === "process-node");

    expect(addToOrderSteps).toHaveLength(3);
    expect(processNodeSteps).toHaveLength(3);
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
    const input: DfsTopologicalInput = {
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

    const steps = generateDfsTopologicalSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.topologicalOrder).toBeDefined();
    expect(visualState.topologicalOrder).toHaveLength(6);

    // The tracker records nodes in DFS finish order (post-order).
    // The complete step variables hold the final prepended topological order.
    const completeVariables = lastStep.variables as { topologicalOrder: string[] };
    const finalOrder = completeVariables.topologicalOrder;
    expect(finalOrder).toHaveLength(6);
    // A must appear before B, C; F must be last
    expect(finalOrder.indexOf("A")).toBeLessThan(finalOrder.indexOf("B"));
    expect(finalOrder.indexOf("A")).toBeLessThan(finalOrder.indexOf("C"));
    expect(finalOrder[finalOrder.length - 1]).toBe("F");
  });

  it("accumulates metrics correctly", () => {
    const input: DfsTopologicalInput = {
      adjacencyList: { A: ["B", "C"], B: [], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["A", "C"],
      ]),
    };

    const steps = generateDfsTopologicalSteps(input);
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.queueOperations).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for each step", () => {
    const input: DfsTopologicalInput = {
      adjacencyList: { A: ["B"], B: [] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateDfsTopologicalSteps(input);
    const visitStep = steps.find((step) => step.type === "visit");

    expect(visitStep).toBeDefined();
    expect(visitStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = visitStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a single node with no edges", () => {
    const input: DfsTopologicalInput = {
      adjacencyList: { A: [] },
      nodeIds: ["A"],
      nodes: makeNodes(["A"]),
      edges: [],
    };

    const steps = generateDfsTopologicalSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");

    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.topologicalOrder).toContain("A");
  });

  it("tracks stack state through push and pop operations", () => {
    const input: DfsTopologicalInput = {
      adjacencyList: { A: ["B"], B: [] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([["A", "B"]]),
    };

    const steps = generateDfsTopologicalSteps(input);
    const pushStep = steps.find((step) => step.type === "push-stack");

    expect(pushStep).toBeDefined();
    const visualState = pushStep!.visualState as GraphVisualState;
    expect(visualState.stack).toBeDefined();
    expect(visualState.stack!.length).toBeGreaterThan(0);
  });
});
