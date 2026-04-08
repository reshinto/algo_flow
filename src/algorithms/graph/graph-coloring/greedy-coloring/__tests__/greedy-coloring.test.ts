import { describe, it, expect } from "vitest";

import { greedyColoring } from "../sources/greedy-coloring.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("greedyColoring", () => {
  it("colors a single node with color 0", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    const result = greedyColoring(adjacencyList, ["A"]);
    expect(result["A"]).toBe(0);
  });

  it("colors two connected nodes with different colors", () => {
    const adjacencyList: AdjacencyList = { A: ["B"], B: ["A"] };
    const result = greedyColoring(adjacencyList, ["A", "B"]);
    expect(result["A"]).not.toBe(result["B"]);
  });

  it("colors a triangle with 3 distinct colors", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["A", "B"],
    };
    const result = greedyColoring(adjacencyList, ["A", "B", "C"]);
    expect(result["A"]).not.toBe(result["B"]);
    expect(result["A"]).not.toBe(result["C"]);
    expect(result["B"]).not.toBe(result["C"]);
  });

  it("colors a bipartite graph with exactly 2 colors when processed in order", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "D"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C", "A"],
    };
    const result = greedyColoring(adjacencyList, ["A", "B", "C", "D"]);
    const usedColors = new Set(Object.values(result));
    expect(usedColors.size).toBeLessThanOrEqual(2);
  });

  it("assigns the smallest available color to each node", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A", "C"],
      C: ["B"],
    };
    const result = greedyColoring(adjacencyList, ["A", "B", "C"]);
    // A gets 0, B cannot use 0 so gets 1, C cannot use 1 so gets 0
    expect(result["A"]).toBe(0);
    expect(result["B"]).toBe(1);
    expect(result["C"]).toBe(0);
  });

  it("produces a valid coloring — no two adjacent nodes share a color", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["A", "B", "D"],
      D: ["C", "E", "F"],
      E: ["D", "F"],
      F: ["D", "E"],
    };
    const nodeIds = ["A", "B", "C", "D", "E", "F"];
    const result = greedyColoring(adjacencyList, nodeIds);

    for (const nodeId of nodeIds) {
      const neighbors = adjacencyList[nodeId] ?? [];
      for (const neighborId of neighbors) {
        expect(result[nodeId]).not.toBe(result[neighborId]);
      }
    }
  });

  it("colors a disconnected graph — isolated nodes get color 0", () => {
    const adjacencyList: AdjacencyList = {
      A: [],
      B: [],
      C: [],
    };
    const result = greedyColoring(adjacencyList, ["A", "B", "C"]);
    expect(result["A"]).toBe(0);
    expect(result["B"]).toBe(0);
    expect(result["C"]).toBe(0);
  });
});
