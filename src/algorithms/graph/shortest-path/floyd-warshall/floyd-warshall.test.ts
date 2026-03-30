import { describe, it, expect } from "vitest";

import { floydWarshall } from "./sources/floyd-warshall.ts?fn";

type WeightedAdjacencyList = Record<string, [string, number][]>;

describe("floydWarshall", () => {
  it("computes all-pairs shortest paths in a 4-node graph", () => {
    // Graph: A→B(3), A→D(-4), D→C(6), C→B(-5). No negative cycles.
    // Shortest A→B = min(3, -4+6-5) = -3 via A→D→C→B
    // Shortest A→C = -4+6 = 2 via A→D→C
    // Shortest A→D = -4 (direct)
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 3],
        ["D", -4],
      ],
      B: [],
      C: [["B", -5]],
      D: [["C", 6]],
    };
    const distances = floydWarshall(adjacencyList, ["A", "B", "C", "D"]);
    expect(distances["A"]!["A"]).toBe(0);
    expect(distances["A"]!["B"]).toBe(-3); // A→D(-4)→C(6)→B(-5) = -3
    expect(distances["A"]!["C"]).toBe(2); // A→D(-4)→C(6) = 2
    expect(distances["B"]!["B"]).toBe(0);
  });

  it("sets diagonal entries to zero", () => {
    const adjacencyList: WeightedAdjacencyList = {
      X: [["Y", 2]],
      Y: [["Z", 3]],
      Z: [],
    };
    const distances = floydWarshall(adjacencyList, ["X", "Y", "Z"]);
    expect(distances["X"]!["X"]).toBe(0);
    expect(distances["Y"]!["Y"]).toBe(0);
    expect(distances["Z"]!["Z"]).toBe(0);
  });

  it("returns Infinity for unreachable node pairs", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 1]],
      B: [],
      C: [],
    };
    const distances = floydWarshall(adjacencyList, ["A", "B", "C"]);
    expect(distances["A"]!["C"]).toBe(Infinity);
    expect(distances["C"]!["A"]).toBe(Infinity);
  });

  it("handles a single-node graph", () => {
    const adjacencyList: WeightedAdjacencyList = { A: [] };
    const distances = floydWarshall(adjacencyList, ["A"]);
    expect(distances["A"]!["A"]).toBe(0);
  });

  it("finds shorter indirect paths over direct edges", () => {
    // A→C direct = 10, but A→B(1)→C(2) = 3
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 1],
        ["C", 10],
      ],
      B: [["C", 2]],
      C: [],
    };
    const distances = floydWarshall(adjacencyList, ["A", "B", "C"]);
    expect(distances["A"]!["C"]).toBe(3);
  });

  it("computes correct bidirectional distances in an undirected-style graph", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 4]],
      B: [
        ["A", 4],
        ["C", 3],
      ],
      C: [["B", 3]],
    };
    const distances = floydWarshall(adjacencyList, ["A", "B", "C"]);
    expect(distances["A"]!["C"]).toBe(7);
    expect(distances["C"]!["A"]).toBe(7);
  });

  it("correctly handles negative edge weights without negative cycles", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 5]],
      B: [["C", -2]],
      C: [],
    };
    const distances = floydWarshall(adjacencyList, ["A", "B", "C"]);
    expect(distances["A"]!["C"]).toBe(3);
    expect(distances["A"]!["B"]).toBe(5);
  });
});
