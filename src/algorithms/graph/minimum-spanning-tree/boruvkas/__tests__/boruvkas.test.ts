import { describe, it, expect } from "vitest";

import { boruvkasAlgorithm } from "../sources/boruvkas.ts?fn";

interface WeightedEdge {
  source: string;
  target: string;
  weight: number;
}

describe("boruvkasAlgorithm", () => {
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

    const mstEdges = boruvkasAlgorithm(edges, nodeIds) as WeightedEdge[];

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

    const mstEdges = boruvkasAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(2);
  });

  it("each component selects its cheapest outgoing edge in the first round", () => {
    // Triangle: all edges distinct weights — cheapest overall edge must appear in MST
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 1 },
      { source: "B", target: "C", weight: 5 },
      { source: "A", target: "C", weight: 3 },
    ];
    const nodeIds = ["A", "B", "C"];

    const mstEdges = boruvkasAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(2);
    const weights = mstEdges
      .map((edge: WeightedEdge) => edge.weight)
      .sort((weightA: number, weightB: number) => weightA - weightB);
    expect(weights[0]).toBe(1); // A-B is cheapest overall
    expect(weights[1]).toBe(3); // A-C cheaper than B-C
  });

  it("produces minimum total weight spanning tree", () => {
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 2 },
      { source: "B", target: "C", weight: 3 },
      { source: "A", target: "C", weight: 10 }, // heavy — should be excluded
    ];
    const nodeIds = ["A", "B", "C"];

    const mstEdges = boruvkasAlgorithm(edges, nodeIds) as WeightedEdge[];

    const totalWeight = mstEdges.reduce(
      (total: number, edge: WeightedEdge) => total + edge.weight,
      0,
    );
    expect(totalWeight).toBe(5); // A-B(2) + B-C(3)
    expect(mstEdges).toHaveLength(2);
  });

  it("handles a two-node graph", () => {
    const edges: WeightedEdge[] = [{ source: "A", target: "B", weight: 6 }];
    const nodeIds = ["A", "B"];

    const mstEdges = boruvkasAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(1);
    expect(mstEdges[0]!.weight).toBe(6);
  });

  it("handles a linear four-node chain", () => {
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 1 },
      { source: "B", target: "C", weight: 2 },
      { source: "C", target: "D", weight: 3 },
    ];
    const nodeIds = ["A", "B", "C", "D"];

    const mstEdges = boruvkasAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(3);
    const totalWeight = mstEdges.reduce(
      (total: number, edge: WeightedEdge) => total + edge.weight,
      0,
    );
    expect(totalWeight).toBe(6);
  });

  it("produces the same total MST weight as Kruskal's on the same graph", () => {
    // Both algorithms must find the globally optimal MST
    const edges: WeightedEdge[] = [
      { source: "A", target: "B", weight: 4 },
      { source: "A", target: "C", weight: 2 },
      { source: "B", target: "C", weight: 1 },
      { source: "B", target: "D", weight: 5 },
      { source: "D", target: "E", weight: 2 },
      { source: "E", target: "F", weight: 3 },
      { source: "D", target: "F", weight: 6 },
    ];
    const nodeIds = ["A", "B", "C", "D", "E", "F"];

    const mstEdges = boruvkasAlgorithm(edges, nodeIds) as WeightedEdge[];

    expect(mstEdges).toHaveLength(5);
    const totalWeight = mstEdges.reduce(
      (total: number, edge: WeightedEdge) => total + edge.weight,
      0,
    );
    expect(totalWeight).toBe(13);
  });
});
