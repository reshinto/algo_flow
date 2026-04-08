import { describe, it, expect } from "vitest";

import { bellmanFord } from "../sources/bellman-ford.ts?fn";

type WeightedAdjacencyList = Record<string, [string, number][]>;

describe("bellmanFord", () => {
  it("computes shortest distances in a simple graph with positive weights", () => {
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
    const distances = bellmanFord(adjacencyList, "A", ["A", "B", "C", "D"]);
    expect(distances["A"]).toBe(0);
    expect(distances["C"]).toBe(2);
    expect(distances["B"]).toBe(3);
    expect(distances["D"]).toBe(8);
  });

  it("handles a graph with a negative edge weight", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [
        ["B", 6],
        ["C", 7],
      ],
      B: [
        ["D", 5],
        ["E", -4],
      ],
      C: [["D", -3]],
      D: [["B", -2]],
      E: [["D", 7]],
    };
    const distances = bellmanFord(adjacencyList, "A", ["A", "B", "C", "D", "E"]);
    expect(distances["A"]).toBe(0);
    expect(typeof distances["B"]).toBe("number");
    expect(distances["C"]).toBe(7);
  });

  it("returns zero for the start node", () => {
    const adjacencyList: WeightedAdjacencyList = {
      X: [["Y", 3]],
      Y: [],
    };
    const distances = bellmanFord(adjacencyList, "X", ["X", "Y"]);
    expect(distances["X"]).toBe(0);
  });

  it("returns Infinity for unreachable nodes", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 1]],
      B: [],
      C: [],
    };
    const distances = bellmanFord(adjacencyList, "A", ["A", "B", "C"]);
    expect(distances["C"]).toBe(Infinity);
  });

  it("handles a single-node graph", () => {
    const adjacencyList: WeightedAdjacencyList = { A: [] };
    const distances = bellmanFord(adjacencyList, "A", ["A"]);
    expect(distances["A"]).toBe(0);
  });

  it("handles a linear chain with mixed weights", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 3]],
      B: [["C", -1]],
      C: [["D", 4]],
      D: [],
    };
    const distances = bellmanFord(adjacencyList, "A", ["A", "B", "C", "D"]);
    expect(distances["B"]).toBe(3);
    expect(distances["C"]).toBe(2);
    expect(distances["D"]).toBe(6);
  });

  it("marks nodes reachable via a negative cycle as -Infinity", () => {
    const adjacencyList: WeightedAdjacencyList = {
      A: [["B", 1]],
      B: [["C", -3]],
      C: [["B", 1]], // negative cycle: B→C(-3)→B(1) = net -2
      D: [],
    };
    const distances = bellmanFord(adjacencyList, "A", ["A", "B", "C", "D"]);
    expect(distances["B"]).toBe(-Infinity);
  });
});
