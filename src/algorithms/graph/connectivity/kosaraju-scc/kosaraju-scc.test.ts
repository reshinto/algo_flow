import { describe, it, expect } from "vitest";

import { kosarajuSCC } from "./sources/kosaraju-scc.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("kosarajuSCC", () => {
  it("finds three SCCs in the default 8-node graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["A", "D"],
      D: ["E"],
      E: ["D", "F"],
      F: ["G"],
      G: ["H"],
      H: ["F"],
    };
    const result = kosarajuSCC(adjacencyList, ["A", "B", "C", "D", "E", "F", "G", "H"]);
    expect(result).toHaveLength(3);
    const componentSets = result.map((component: string[]) => new Set(component));
    expect(componentSets).toContainEqual(new Set(["A", "B", "C"]));
    expect(componentSets).toContainEqual(new Set(["D", "E"]));
    expect(componentSets).toContainEqual(new Set(["F", "G", "H"]));
  });

  it("finds a single SCC for a fully cyclic graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["A"],
    };
    const result = kosarajuSCC(adjacencyList, ["A", "B", "C"]);
    expect(result).toHaveLength(1);
    expect(new Set(result[0])).toEqual(new Set(["A", "B", "C"]));
  });

  it("returns each node as its own SCC for a DAG", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: [],
    };
    const result = kosarajuSCC(adjacencyList, ["A", "B", "C"]);
    expect(result).toHaveLength(3);
    for (const component of result) {
      expect(component).toHaveLength(1);
    }
  });

  it("handles a single node with no edges", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    const result = kosarajuSCC(adjacencyList, ["A"]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(["A"]);
  });

  it("handles disconnected directed graph with two mutual pairs", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A"],
      C: ["D"],
      D: ["C"],
    };
    const result = kosarajuSCC(adjacencyList, ["A", "B", "C", "D"]);
    expect(result).toHaveLength(2);
    const componentSets = result.map((component: string[]) => new Set(component));
    expect(componentSets).toContainEqual(new Set(["A", "B"]));
    expect(componentSets).toContainEqual(new Set(["C", "D"]));
  });

  it("assigns every node to exactly one SCC with no duplicates", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["A", "D"],
      D: ["E"],
      E: ["D"],
    };
    const nodeIds = ["A", "B", "C", "D", "E"];
    const result = kosarajuSCC(adjacencyList, nodeIds);
    const allNodes = result.flat();
    expect(allNodes).toHaveLength(nodeIds.length);
    expect(new Set(allNodes)).toEqual(new Set(nodeIds));
  });

  it("produces the same SCC groupings as Tarjan for the same graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["A"],
      D: ["E"],
      E: ["D"],
    };
    const result = kosarajuSCC(adjacencyList, ["A", "B", "C", "D", "E"]);
    expect(result).toHaveLength(2);
    const componentSets = result.map((component: string[]) => new Set(component));
    expect(componentSets).toContainEqual(new Set(["A", "B", "C"]));
    expect(componentSets).toContainEqual(new Set(["D", "E"]));
  });
});
