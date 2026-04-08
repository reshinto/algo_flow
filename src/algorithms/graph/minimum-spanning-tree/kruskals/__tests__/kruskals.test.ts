import { describe, it, expect } from "vitest";

import { kruskalsAlgorithm } from "../sources/kruskals.ts?fn";

interface WeightedEdge {
  source: string;
  target: string;
  weight: number;
}

describe("kruskalsAlgorithm", () => {
  it("finds the correct MST for the default 6-node weighted graph", () => {
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 4 },
      { source: "A", target: "C", weight: 2 },
      { source: "B", target: "C", weight: 1 },
      { source: "B", target: "D", weight: 5 },
      { source: "C", target: "D", weight: 8 },
      { source: "C", target: "E", weight: 10 },
      { source: "D", target: "E", weight: 2 },
      { source: "D", target: "F", weight: 6 },
      { source: "E", target: "F", weight: 3 },
    ];
    const nodeIds = ["A", "B", "C", "D", "E", "F"];

    const mstEdges = kruskalsAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(5); // V - 1 edges
    const totalWeight = mstEdges.reduce(
      (total: number, edge: WeightedEdge) => total + edge.weight,
      0,
    );
    // B-C(1) + A-C(2) + D-E(2) + E-F(3) + B-D(5) = 13
    expect(totalWeight).toBe(13);
  });

  it("returns V-1 edges for a connected graph", () => {
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 3 },
      { source: "A", target: "C", weight: 1 },
      { source: "B", target: "C", weight: 2 },
    ];
    const nodeIds = ["A", "B", "C"];

    const mstEdges = kruskalsAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(2);
  });

  it("selects edges in ascending weight order", () => {
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 10 },
      { source: "B", target: "C", weight: 1 },
      { source: "A", target: "C", weight: 5 },
    ];
    const nodeIds = ["A", "B", "C"];

    const mstEdges = kruskalsAlgorithm(edges, nodeIds) as WeightedEdge[];

    // Cheapest two edges that span all 3 nodes: B-C(1) and A-C(5)
    expect(mstEdges).toHaveLength(2);
    const weights = mstEdges
      .map((edge: WeightedEdge) => edge.weight)
      .sort((weightA: number, weightB: number) => weightA - weightB);
    expect(weights[0]).toBe(1);
    expect(weights[1]).toBe(5);
  });

  it("rejects edges that would form a cycle", () => {
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 1 },
      { source: "B", target: "C", weight: 2 },
      { source: "A", target: "C", weight: 3 }, // would form cycle A-B-C-A
    ];
    const nodeIds = ["A", "B", "C"];

    const mstEdges = kruskalsAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(2);
    const totalWeight = mstEdges.reduce(
      (total: number, edge: WeightedEdge) => total + edge.weight,
      0,
    );
    expect(totalWeight).toBe(3); // A-B(1) + B-C(2)
  });

  it("handles a two-node graph with a single edge", () => {
    const edges: WeightedEdge[] = [{ source: "A", target: "B", weight: 7 }];
    const nodeIds = ["A", "B"];

    const mstEdges = kruskalsAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(1);
    expect(mstEdges[0]!.weight).toBe(7);
  });

  it("handles a linear chain graph correctly", () => {
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 2 },
      { source: "B", target: "C", weight: 4 },
      { source: "C", target: "D", weight: 1 },
    ];
    const nodeIds = ["A", "B", "C", "D"];

    const mstEdges = kruskalsAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(3);
    const totalWeight = mstEdges.reduce(
      (total: number, edge: WeightedEdge) => total + edge.weight,
      0,
    );
    expect(totalWeight).toBe(7);
  });

  it("produces MST with minimum total weight among all spanning trees", () => {
    // Square graph with diagonal — MST should avoid the heavy diagonal
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 1 },
      { source: "B", target: "C", weight: 1 },
      { source: "C", target: "D", weight: 1 },
      { source: "D", target: "A", weight: 1 },
      { source: "A", target: "C", weight: 10 }, // heavy diagonal
    ];
    const nodeIds = ["A", "B", "C", "D"];

    const mstEdges = kruskalsAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(3);
    const totalWeight = mstEdges.reduce(
      (total: number, edge: WeightedEdge) => total + edge.weight,
      0,
    );
    expect(totalWeight).toBe(3); // three unit-weight edges
  });
});
