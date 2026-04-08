import { describe, it, expect } from "vitest";

import type { GraphVisualState, GraphNode, GraphEdge } from "@/types";
import { generateTarjanSccSteps } from "../step-generator";
import type { TarjanSccInput } from "../step-generator";

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

describe("generateTarjanSccSteps", () => {
  it("generates steps starting with initialize and ending with complete", () => {
    const input: TarjanSccInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: ["A"] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
        ["C", "A"],
      ]),
    };

    const steps = generateTarjanSccSteps(input);
    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0]!.type).toBe("initialize");
    expect(steps[steps.length - 1]!.type).toBe("complete");
  });

  it("includes push-stack and pop-stack steps", () => {
    const input: TarjanSccInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateTarjanSccSteps(input);
    const stepTypes = steps.map((step) => step.type);
    expect(stepTypes).toContain("push-stack");
    expect(stepTypes).toContain("pop-stack");
  });

  it("includes assign-component steps", () => {
    const input: TarjanSccInput = {
      adjacencyList: { A: ["B"], B: ["C"], C: ["A"] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
        ["C", "A"],
      ]),
    };

    const steps = generateTarjanSccSteps(input);
    const assignSteps = steps.filter((step) => step.type === "assign-component");
    expect(assignSteps.length).toBeGreaterThan(0);
  });

  it("produces final visual state with components defined", () => {
    const input: TarjanSccInput = {
      adjacencyList: { A: ["B"], B: ["A"], C: [] },
      nodeIds: ["A", "B", "C"],
      nodes: makeNodes(["A", "B", "C"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateTarjanSccSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.kind).toBe("graph");
    expect(visualState.components).toBeDefined();
    expect(visualState.components!.length).toBeGreaterThan(0);
  });

  it("produces correct number of components for default graph", () => {
    const input: TarjanSccInput = {
      adjacencyList: {
        A: ["B"],
        B: ["C"],
        C: ["A", "D"],
        D: ["E"],
        E: ["D", "F"],
        F: ["G"],
        G: ["H"],
        H: ["F"],
      },
      nodeIds: ["A", "B", "C", "D", "E", "F", "G", "H"],
      nodes: makeNodes(["A", "B", "C", "D", "E", "F", "G", "H"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "C"],
        ["C", "A"],
        ["C", "D"],
        ["D", "E"],
        ["E", "D"],
        ["E", "F"],
        ["F", "G"],
        ["G", "H"],
        ["H", "F"],
      ]),
    };

    const steps = generateTarjanSccSteps(input);
    const lastStep = steps[steps.length - 1]!;
    const visualState = lastStep.visualState as GraphVisualState;

    expect(visualState.components).toBeDefined();
    expect(visualState.components!.length).toBe(3);
  });

  it("accumulates metrics correctly", () => {
    const input: TarjanSccInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateTarjanSccSteps(input);
    const lastStep = steps[steps.length - 1]!;
    expect(lastStep.metrics.visits).toBeGreaterThan(0);
    expect(lastStep.metrics.elapsedSteps).toBe(steps.length);
  });

  it("includes highlighted lines for visit steps", () => {
    const input: TarjanSccInput = {
      adjacencyList: { A: ["B"], B: ["A"] },
      nodeIds: ["A", "B"],
      nodes: makeNodes(["A", "B"]),
      edges: makeEdges([
        ["A", "B"],
        ["B", "A"],
      ]),
    };

    const steps = generateTarjanSccSteps(input);
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
