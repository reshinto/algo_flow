import { describe, it, expect } from "vitest";

import { tarjanSCC } from "../sources/tarjan-scc.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("tarjanSCC", () => {
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
    const result = tarjanSCC(adjacencyList, ["A", "B", "C", "D", "E", "F", "G", "H"]);
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
    const result = tarjanSCC(adjacencyList, ["A", "B", "C"]);
    expect(result).toHaveLength(1);
    expect(new Set(result[0])).toEqual(new Set(["A", "B", "C"]));
  });

  it("returns each node as its own SCC for a DAG", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: [],
    };
    const result = tarjanSCC(adjacencyList, ["A", "B", "C"]);
    expect(result).toHaveLength(3);
    for (const component of result) {
      expect(component).toHaveLength(1);
    }
  });

  it("handles a single node with no edges", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    const result = tarjanSCC(adjacencyList, ["A"]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(["A"]);
  });

  it("handles disconnected directed graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A"],
      C: ["D"],
      D: ["C"],
    };
    const result = tarjanSCC(adjacencyList, ["A", "B", "C", "D"]);
    expect(result).toHaveLength(2);
    const componentSets = result.map((component: string[]) => new Set(component));
    expect(componentSets).toContainEqual(new Set(["A", "B"]));
    expect(componentSets).toContainEqual(new Set(["C", "D"]));
  });

  it("assigns every node to exactly one SCC", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["C"],
      C: ["A", "D"],
      D: ["E"],
      E: ["D"],
    };
    const nodeIds = ["A", "B", "C", "D", "E"];
    const result = tarjanSCC(adjacencyList, nodeIds);
    const allNodes = result.flat();
    expect(allNodes).toHaveLength(nodeIds.length);
    expect(new Set(allNodes)).toEqual(new Set(nodeIds));
  });

  it("correctly handles self-loops as single-node SCCs", () => {
    const adjacencyList: AdjacencyList = {
      A: ["A"],
      B: [],
    };
    const result = tarjanSCC(adjacencyList, ["A", "B"]);
    expect(result).toHaveLength(2);
    const componentSets = result.map((component: string[]) => new Set(component));
    expect(componentSets).toContainEqual(new Set(["A"]));
    expect(componentSets).toContainEqual(new Set(["B"]));
  });
});
