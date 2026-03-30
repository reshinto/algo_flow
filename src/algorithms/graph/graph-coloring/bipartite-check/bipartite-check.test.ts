import { describe, it, expect } from "vitest";

import { bipartiteCheck } from "./sources/bipartite-check.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("bipartiteCheck", () => {
  it("identifies a simple two-node graph as bipartite", () => {
    const adjacencyList: AdjacencyList = { A: ["B"], B: ["A"] };
    const result = bipartiteCheck(adjacencyList, ["A", "B"]);
    expect(result.isBipartite).toBe(true);
  });

  it("identifies an even cycle as bipartite", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "D"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C", "A"],
    };
    const result = bipartiteCheck(adjacencyList, ["A", "B", "C", "D"]);
    expect(result.isBipartite).toBe(true);
  });

  it("identifies an odd cycle (triangle) as not bipartite", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["A", "B"],
    };
    const result = bipartiteCheck(adjacencyList, ["A", "B", "C"]);
    expect(result.isBipartite).toBe(false);
  });

  it("identifies the default 6-node bipartite graph correctly", () => {
    const adjacencyList: AdjacencyList = {
      A: ["D", "E"],
      B: ["D", "F"],
      C: ["E", "F"],
      D: ["A", "B"],
      E: ["A", "C"],
      F: ["B", "C"],
    };
    const result = bipartiteCheck(adjacencyList, ["A", "B", "C", "D", "E", "F"]);
    expect(result.isBipartite).toBe(true);
    expect(result.coloring["A"]).not.toBe(result.coloring["D"]);
    expect(result.coloring["A"]).not.toBe(result.coloring["E"]);
  });

  it("produces a valid 2-coloring for a bipartite graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["C", "D"],
      B: ["C", "D"],
      C: ["A", "B"],
      D: ["A", "B"],
    };
    const result = bipartiteCheck(adjacencyList, ["A", "B", "C", "D"]);
    expect(result.isBipartite).toBe(true);

    const nodeIds = ["A", "B", "C", "D"];
    for (const nodeId of nodeIds) {
      const neighbors = adjacencyList[nodeId] ?? [];
      for (const neighborId of neighbors) {
        expect(result.coloring[nodeId]).not.toBe(result.coloring[neighborId]);
      }
    }
  });

  it("handles a disconnected graph where all components are bipartite", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A"],
      C: ["D"],
      D: ["C"],
    };
    const result = bipartiteCheck(adjacencyList, ["A", "B", "C", "D"]);
    expect(result.isBipartite).toBe(true);
  });

  it("handles a single isolated node as bipartite", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    const result = bipartiteCheck(adjacencyList, ["A"]);
    expect(result.isBipartite).toBe(true);
    expect(result.coloring["A"]).toBe(0);
  });

  it("identifies a 5-cycle as not bipartite", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "E"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C", "E"],
      E: ["D", "A"],
    };
    const result = bipartiteCheck(adjacencyList, ["A", "B", "C", "D", "E"]);
    expect(result.isBipartite).toBe(false);
  });
});
