import { describe, it, expect } from "vitest";

import { dijkstraShortestPath } from "../sources/dijkstra.ts?fn";

type WeightedAdjacencyList = Record<string, [string, number][]>;

describe("dijkstraShortestPath", () => {
  it("computes shortest distances in a simple weighted graph", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 4],
        ["C", 2],
      ],
      B: [["D", 5]],
      C: [
        ["B", 1],
        ["D", 8],
      ],
      D: [],
    };
    const distances = dijkstraShortestPath(adjacencyList, "A");
    expect(distances["A"]).toBe(0);
    expect(distances["B"]).toBe(3); // A→C(2) + C→B(1)
    expect(distances["C"]).toBe(2);
    expect(distances["D"]).toBe(8); // A→C(2) + C→B(1) + B→D(5)
  });

  it("returns zero distance for the start node", () => {
    const adjacencyList: WeightedAdjacencyList = {
      X: [["Y", 10]],
      Y: [],
    };
    const distances = dijkstraShortestPath(adjacencyList, "X");
    expect(distances["X"]).toBe(0);
  });

  it("returns Infinity for unreachable nodes", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 1]],
      B: [],
      C: [],
    };
    const distances = dijkstraShortestPath(adjacencyList, "A");
    expect(distances["C"]).toBe(Infinity);
  });

  it("handles a single-node graph", () => {
    const adjacencyList: WeightedAdjacencyList = { A: [] };
    const distances = dijkstraShortestPath(adjacencyList, "A");
    expect(distances["A"]).toBe(0);
  });

  it("finds shortest path through multiple hops correctly", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 4],
        ["C", 2],
      ],
      B: [["D", 5]],
      C: [
        ["B", 1],
        ["D", 8],
        ["E", 10],
      ],
      D: [["F", 2]],
      E: [["F", 3]],
      F: [],
    };
    const distances = dijkstraShortestPath(adjacencyList, "A");
    expect(distances["A"]).toBe(0);
    expect(distances["C"]).toBe(2);
    expect(distances["B"]).toBe(3);
    expect(distances["D"]).toBe(8);
    expect(distances["F"]).toBe(10);
    expect(distances["E"]).toBe(12);
  });

  it("correctly uses lower-weight path over direct path", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 10],
        ["C", 1],
      ],
      B: [["D", 1]],
      C: [
        ["B", 1],
        ["D", 5],
      ],
      D: [],
    };
    const distances = dijkstraShortestPath(adjacencyList, "A");
    // A→C(1)→B(1)→D(1) = 3, cheaper than A→B(10)→D(1) = 11
    expect(distances["D"]).toBe(3);
  });

  it("handles a linear chain correctly", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 2]],
      B: [["C", 3]],
      C: [["D", 4]],
      D: [],
    };
    const distances = dijkstraShortestPath(adjacencyList, "A");
    expect(distances["B"]).toBe(2);
    expect(distances["C"]).toBe(5);
    expect(distances["D"]).toBe(9);
  });

  it("handles equal-weight edges producing correct distances", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 1],
        ["C", 1],
      ],
      B: [["D", 1]],
      C: [["D", 1]],
      D: [],
    };
    const distances = dijkstraShortestPath(adjacencyList, "A");
    expect(distances["D"]).toBe(2);
  });
});
