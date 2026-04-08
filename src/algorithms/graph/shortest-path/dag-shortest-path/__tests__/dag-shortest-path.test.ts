import { describe, it, expect } from "vitest";

import { dagShortestPath } from "../sources/dag-shortest-path.ts?fn";

type WeightedAdjacencyList = Record<string, [string, number][]>;

describe("dagShortestPath", () => {
  it("computes shortest distances in a simple DAG", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 2],
        ["C", 6],
      ],
      B: [
        ["D", 1],
        ["E", 4],
      ],
      C: [["E", 2]],
      D: [["F", 5]],
      E: [["F", 1]],
      F: [],
    };
    const distances = dagShortestPath(adjacencyList, "A", ["A", "B", "C", "D", "E", "F"]);
    expect(distances["A"]).toBe(0);
    expect(distances["B"]).toBe(2); // A→B
    expect(distances["C"]).toBe(6); // A→C
    expect(distances["D"]).toBe(3); // A→B→D
    expect(distances["E"]).toBe(6); // A→B→E = 6, A→C→E = 8, so A→B→E
    expect(distances["F"]).toBe(7); // A→B→E→F = 7
  });

  it("returns zero distance for the start node", () => {
    const adjacencyList: WeightedAdjacencyList = {
      Start: [["End", 5]],
      End: [],
    };
    const distances = dagShortestPath(adjacencyList, "Start", ["Start", "End"]);
    expect(distances["Start"]).toBe(0);
  });

  it("returns Infinity for unreachable nodes", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 3]],
      B: [],
      C: [["D", 2]],
      D: [],
    };
    const distances = dagShortestPath(adjacencyList, "A", ["A", "B", "C", "D"]);
    expect(distances["A"]).toBe(0);
    expect(distances["B"]).toBe(3);
    expect(distances["C"]).toBe(Infinity);
    expect(distances["D"]).toBe(Infinity);
  });

  it("handles a single-node graph", () => {
    const adjacencyList: WeightedAdjacencyList = { A: [] };
    const distances = dagShortestPath(adjacencyList, "A", ["A"]);
    expect(distances["A"]).toBe(0);
  });

  it("handles a linear chain correctly", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 3]],
      B: [["C", 4]],
      C: [["D", 2]],
      D: [],
    };
    const distances = dagShortestPath(adjacencyList, "A", ["A", "B", "C", "D"]);
    expect(distances["B"]).toBe(3);
    expect(distances["C"]).toBe(7);
    expect(distances["D"]).toBe(9);
  });

  it("handles negative edge weights correctly", () => {
    // DAG Shortest Path correctly handles negative weights, unlike Dijkstra
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 2],
        ["C", 4],
      ],
      B: [["C", -3]],
      C: [],
    };
    const distances = dagShortestPath(adjacencyList, "A", ["A", "B", "C"]);
    expect(distances["A"]).toBe(0);
    expect(distances["B"]).toBe(2);
    // A→B→C = 2 + (-3) = -1, A→C = 4, so -1 is shorter
    expect(distances["C"]).toBe(-1);
  });

  it("selects the shorter of two converging paths", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 1],
        ["C", 10],
      ],
      B: [["D", 2]],
      C: [["D", 1]],
      D: [],
    };
    const distances = dagShortestPath(adjacencyList, "A", ["A", "B", "C", "D"]);
    // A→B→D = 3, A→C→D = 11
    expect(distances["D"]).toBe(3);
  });

  it("handles multiple source-adjacent nodes correctly", () => {
    const adjacencyList: WeightedAdjacencyList = {
      S: [
        ["X", 1],
        ["Y", 4],
        ["Z", 2],
      ],
      X: [["T", 5]],
      Y: [["T", 1]],
      Z: [["T", 3]],
      T: [],
    };
    const distances = dagShortestPath(adjacencyList, "S", ["S", "X", "Y", "Z", "T"]);
    // S→X→T = 6, S→Y→T = 5, S→Z→T = 5 — tie, so 5
    expect(distances["T"]).toBe(5);
  });
});
