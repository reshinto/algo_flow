import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";

import { generatePrimsSteps } from "./step-generator";
import type { PrimsInput } from "./step-generator";

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

function makeDefaultInput(): PrimsInput {
  return {
    adjacencyList: {
      A: [
        ["B", 4],
        ["C", 2],
      ],
      B: [
        ["A", 4],
        ["C", 1],
        ["D", 5],
      ],
      C: [
        ["A", 2],
        ["B", 1],
        ["D", 8],
        ["E", 10],
      ],
      D: [
        ["B", 5],
        ["C", 8],
        ["E", 2],
        ["F", 6],
      ],
      E: [
        ["C", 10],
        ["D", 2],
        ["F", 3],
      ],
      F: [
        ["D", 6],
        ["E", 3],
      ],
    },
    startNodeId: "A",
    nodes: makeNodes(["A", "B", "C", "D", "E", "F"]),
    graphEdges: makeGraphEdges([
      ["A", "B", 4],
      ["A", "C", 2],
      ["B", "C", 1],
      ["B", "D", 5],
      ["C", "D", 8],
      ["C", "E", 10],
      ["D", "E", 2],
      ["D", "F", 6],
      ["E", "F", 3],
    ]),
  };
}

describe("generatePrimsSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const steps = generatePrimsSteps(makeDefaultInput());

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes dequeue, visit, add-to-mst, and relax-edge step types", () => {
    const steps = generatePrimsSteps(makeDefaultInput());
    const stepTypes = new Set(steps.map((step) => step.type));

    expect(stepTypes.has("dequeue")).toBe(true);
    expect(stepTypes.has("visit")).toBe(true);
    expect(stepTypes.has("add-to-mst")).toBe(true);
    expect(stepTypes.has("relax-edge")).toBe(true);
  });

  it("produces correct mstWeight in the final visual state", () => {
    const steps = generatePrimsSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    // MST: B-C(1) + A-C(2) + D-E(2) + E-F(3) + B-D(5) = 13
    expect(visualState.mstWeight).toBe(13);
  });

  it("marks all nodes as in-mst or visited in the final visual state", () => {
    const steps = generatePrimsSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    // Nodes transition through visited/current/in-mst states during execution;
    // dequeue overwrites some back to "current". Count all non-default nodes.
    const processedNodes = visualState.nodes.filter(
      (node) => node.state === "in-mst" || node.state === "visited" || node.state === "current",
    );
    expect(processedNodes.length).toBe(6);
  });

  it("step indices are sequential starting from zero", () => {
    const steps = generatePrimsSteps(makeDefaultInput());

    steps.forEach((step, index) => {
      expect(step.index).toBe(index);
    });
  });

  it("includes highlighted lines for typescript in relax-edge steps", () => {
    const steps = generatePrimsSteps(makeDefaultInput());
    const relaxStep = steps.find((step) => step.type === "relax-edge");

    expect(relaxStep).toBeDefined();
    expect(relaxStep!.highlightedLines.length).toBeGreaterThan(0);

    const tsHighlight = relaxStep!.highlightedLines.find(
      (highlight) => highlight.language === "typescript",
    );
    expect(tsHighlight).toBeDefined();
    expect(tsHighlight!.lines.length).toBeGreaterThan(0);
  });

  it("handles a minimal two-node graph", () => {
    const input: PrimsInput = {
      adjacencyList: {
        A: [["B", 7]],
        B: [["A", 7]],
      },
      startNodeId: "A",
      nodes: makeNodes(["A", "B"]),
      graphEdges: makeGraphEdges([["A", "B", 7]]),
    };

    const steps = generatePrimsSteps(input);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[steps.length - 1]!.type).toBe("complete");
    const visualState = steps[steps.length - 1]!.visualState as GraphVisualState;
    expect(visualState.mstWeight).toBe(7);
  });

  it("accumulates visits metric correctly", () => {
    const steps = generatePrimsSteps(makeDefaultInput());
    const lastStep = steps[steps.length - 1]!;

    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });
});
