import { describe, it, expect } from "vitest";

import { dfsCycleDirected } from "../sources/dfs-cycle-directed.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("dfsCycleDirected", () => {
  it("detects a simple back edge cycle A→B→C→A", () => {
    const adjacencyList: AdjacencyList = { A: ["B"], B: ["C"], C: ["A"] };
    expect(dfsCycleDirected(adjacencyList, ["A", "B", "C"])).toBe(true);
  });

  it("returns false for a simple directed acyclic graph", () => {
    const adjacencyList: AdjacencyList = { A: ["B", "C"], B: ["D"], C: ["D"], D: [] };
    expect(dfsCycleDirected(adjacencyList, ["A", "B", "C", "D"])).toBe(false);
  });

  it("detects a self-loop", () => {
    const adjacencyList: AdjacencyList = { A: ["A"], B: [] };
    expect(dfsCycleDirected(adjacencyList, ["A", "B"])).toBe(true);
  });

  it("returns false for a single node with no edges", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    expect(dfsCycleDirected(adjacencyList, ["A"])).toBe(false);
  });

  it("detects a cycle in the default 5-node graph D→B back edge", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["D"],
      D: ["B"],
      E: ["A"],
    };
    expect(dfsCycleDirected(adjacencyList, ["A", "B", "C", "D", "E"])).toBe(true);
  });

  it("returns false for a linear directed chain", () => {
    const adjacencyList: AdjacencyList = { A: ["B"], B: ["C"], C: ["D"], D: [] };
    expect(dfsCycleDirected(adjacencyList, ["A", "B", "C", "D"])).toBe(false);
  });

  it("returns false for a disconnected acyclic graph", () => {
    const adjacencyList: AdjacencyList = { A: ["B"], B: [], C: ["D"], D: [] };
    expect(dfsCycleDirected(adjacencyList, ["A", "B", "C", "D"])).toBe(false);
  });

  it("detects a cycle in a disconnected graph where only one component has a cycle", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: [],
      C: ["D"],
      D: ["C"],
    };
    expect(dfsCycleDirected(adjacencyList, ["A", "B", "C", "D"])).toBe(true);
  });

  it("handles a cross-edge (non-cycle) correctly — no false positive", () => {
    // A→B, A→C, B→D, C→D — D is reachable from two paths but no cycle
    const adjacencyList: AdjacencyList = { A: ["B", "C"], B: ["D"], C: ["D"], D: [] };
    expect(dfsCycleDirected(adjacencyList, ["A", "B", "C", "D"])).toBe(false);
  });
});
