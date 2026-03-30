import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateBridgesSteps } from "./step-generator";
import type { BridgesInput } from "./step-generator";

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

describe("generateBridgesSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: BridgesInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateBridgesSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes visit steps during DFS traversal", () => {
    const input: BridgesInput = {
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

    const steps = generateBridgesSteps(input);
    const visitSteps = steps.filter((step) => step.type === "visit");
    expect(visitSteps.length).toBeGreaterThan(0);
  });

  it("includes mark-bridge steps when bridges are found", () => {
    const input: BridgesInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateBridgesSteps(input);
    const bridgeSteps = steps.filter((step) => step.type === "mark-bridge");
    expect(bridgeSteps.length).toBe(1);
  });

  it("produces no mark-bridge steps for a cycle with no bridges", () => {
    const input: BridgesInput = {
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

    const steps = generateBridgesSteps(input);
    const bridgeSteps = steps.filter((step) => step.type === "mark-bridge");
    expect(bridgeSteps.length).toBe(0);
  });

  it("produces final visual state as a graph", () => {
    const input: BridgesInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateBridgesSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;
    expect(visualState.kind).toBe("graph");
  });

  it("finds two bridges in the default 7-node graph", () => {
    const input: BridgesInput = {
      adjacencyList: {
        A: ["B", "C"],
        B: ["A", "C"],
        C: ["B", "A", "D"],
        D: ["C", "E"],
        E: ["D", "F", "G"],
        F: ["E", "G"],
        G: ["F", "E"],
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
        ["E", "F"],
        ["F", "E"],
        ["E", "G"],
        ["G", "E"],
        ["F", "G"],
        ["G", "F"],
      ]),
    };

    const steps = generateBridgesSteps(input);
    const bridgeSteps = steps.filter((step) => step.type === "mark-bridge");
    expect(bridgeSteps.length).toBe(2);
  });

  it("includes highlighted lines for visit steps", () => {
    const input: BridgesInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateBridgesSteps(input);
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
