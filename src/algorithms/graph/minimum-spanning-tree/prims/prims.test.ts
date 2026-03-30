import { describe, it, expect } from "vitest";

import { primsAlgorithm } from "./sources/prims.ts?fn";

type AdjacencyEntry = [string, number];

interface MSTEdge {
  source: string;
  target: string;
  weight: number;
}

describe("primsAlgorithm", () => {
  it("finds the correct MST for the default 6-node weighted graph", () => {
    const adjacencyList: Record<string, AdjacencyEntry[]> = {
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
    };

    const mstEdges = primsAlgorithm(adjacencyList, "A") as MSTEdge[];

    expect(mstEdges).toHaveLength(5); // V - 1 edges
    const totalWeight = mstEdges.reduce((total: number, edge: MSTEdge) => total + edge.weight, 0);
    expect(totalWeight).toBe(13); // B-C(1) + A-C(2) + D-E(2) + E-F(3) + B-D(5)
  });

  it("returns V-1 edges for a fully connected graph", () => {
    const adjacencyList: Record<string, AdjacencyEntry[]> = {
      A: [
        ["B", 3],
        ["C", 1],
      ],
      B: [
        ["A", 3],
        ["C", 2],
      ],
      C: [
        ["A", 1],
        ["B", 2],
      ],
    };

    const mstEdges = primsAlgorithm(adjacencyList, "A") as MSTEdge[];

    expect(mstEdges).toHaveLength(2);
  });

  it("selects the minimum weight edge at each step", () => {
    const adjacencyList: Record<string, AdjacencyEntry[]> = {
      A: [
        ["B", 10],
        ["C", 1],
      ],
      B: [
        ["A", 10],
        ["C", 2],
      ],
      C: [
        ["A", 1],
        ["B", 2],
      ],
    };

    const mstEdges = primsAlgorithm(adjacencyList, "A") as MSTEdge[];

    expect(mstEdges).toHaveLength(2);
    const totalWeight = mstEdges.reduce((total: number, edge: MSTEdge) => total + edge.weight, 0);
    expect(totalWeight).toBe(3); // A-C(1) + B-C(2)
  });

  it("does not revisit already-included nodes", () => {
    const adjacencyList: Record<string, AdjacencyEntry[]> = {
      A: [
        ["B", 1],
        ["C", 2],
      ],
      B: [
        ["A", 1],
        ["C", 3],
      ],
      C: [
        ["A", 2],
        ["B", 3],
      ],
    };

    const mstEdges = primsAlgorithm(adjacencyList, "A") as MSTEdge[];

    // All nodes visited exactly once, no duplicates
    const targetNodes = mstEdges.map((edge: MSTEdge) => edge.target);
    const uniqueTargets = new Set(targetNodes);
    expect(uniqueTargets.size).toBe(targetNodes.length);
  });

  it("handles a linear chain graph from start to end", () => {
    const adjacencyList: Record<string, AdjacencyEntry[]> = {
      A: [["B", 5]],
      B: [
        ["A", 5],
        ["C", 3],
      ],
      C: [
        ["B", 3],
        ["D", 7],
      ],
      D: [["C", 7]],
    };

    const mstEdges = primsAlgorithm(adjacencyList, "A") as MSTEdge[];

    expect(mstEdges).toHaveLength(3);
    const totalWeight = mstEdges.reduce((total: number, edge: MSTEdge) => total + edge.weight, 0);
    expect(totalWeight).toBe(15);
  });

  it("produces correct MST starting from a non-first node", () => {
    const adjacencyList: Record<string, AdjacencyEntry[]> = {
      A: [
        ["B", 1],
        ["C", 4],
      ],
      B: [
        ["A", 1],
        ["C", 2],
      ],
      C: [
        ["A", 4],
        ["B", 2],
      ],
    };

    const mstEdgesFromB = primsAlgorithm(adjacencyList, "B") as MSTEdge[];
    const mstEdgesFromA = primsAlgorithm(adjacencyList, "A") as MSTEdge[];

    // MST is unique — total weight must be identical regardless of start
    const weightFromB = mstEdgesFromB.reduce(
      (total: number, edge: MSTEdge) => total + edge.weight,
      0,
    );
    const weightFromA = mstEdgesFromA.reduce(
      (total: number, edge: MSTEdge) => total + edge.weight,
      0,
    );
    expect(weightFromB).toBe(weightFromA);
  });

  it("handles a two-node graph", () => {
    const adjacencyList: Record<string, AdjacencyEntry[]> = {
      A: [["B", 9]],
      B: [["A", 9]],
    };

    const mstEdges = primsAlgorithm(adjacencyList, "A") as MSTEdge[];

    expect(mstEdges).toHaveLength(1);
    expect(mstEdges[0]!.weight).toBe(9);
  });
});
