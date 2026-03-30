import { describe, it, expect } from "vitest";

import { dfsCycleUndirected } from "./sources/dfs-cycle-undirected.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("dfsCycleUndirected", () => {
  it("detects a triangle cycle A—B—C—A", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["B", "A"],
    };
    expect(dfsCycleUndirected(adjacencyList, ["A", "B", "C"])).toBe(true);
  });

  it("returns false for a tree (no cycle)", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "D"],
      C: ["A"],
      D: ["B"],
    };
    expect(dfsCycleUndirected(adjacencyList, ["A", "B", "C", "D"])).toBe(false);
  });

  it("returns false for a single node", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    expect(dfsCycleUndirected(adjacencyList, ["A"])).toBe(false);
  });

  it("returns false for two disconnected nodes with no edges", () => {
    const adjacencyList: AdjacencyList = { A: [], B: [] };
    expect(dfsCycleUndirected(adjacencyList, ["A", "B"])).toBe(false);
  });

  it("detects a cycle in the default 5-node graph A—B—C—D—A", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "D"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C", "A", "E"],
      E: ["D"],
    };
    expect(dfsCycleUndirected(adjacencyList, ["A", "B", "C", "D", "E"])).toBe(true);
  });

  it("returns false for a linear undirected chain", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C"],
    };
    expect(dfsCycleUndirected(adjacencyList, ["A", "B", "C", "D"])).toBe(false);
  });

  it("detects a cycle in a disconnected graph where one component has a cycle", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A"],
      C: ["D", "E"],
      D: ["C", "E"],
      E: ["C", "D"],
    };
    expect(dfsCycleUndirected(adjacencyList, ["A", "B", "C", "D", "E"])).toBe(true);
  });

  it("does not treat the direct parent edge as a back edge", () => {
    // A—B is a single edge; B sees A as neighbor but A is the parent — no cycle
    const adjacencyList: AdjacencyList = { A: ["B"], B: ["A"] };
    expect(dfsCycleUndirected(adjacencyList, ["A", "B"])).toBe(false);
  });
});
