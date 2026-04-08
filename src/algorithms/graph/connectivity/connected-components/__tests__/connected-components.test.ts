import { describe, it, expect } from "vitest";

import { connectedComponents } from "../sources/connected-components.ts?fn";

type AdjacencyList = Record<string, string[]>;

describe("connectedComponents", () => {
  it("finds three disconnected components", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A", "C"],
      C: ["B"],
      D: ["E"],
      E: ["D"],
      F: [],
    };
    const result = connectedComponents(adjacencyList, ["A", "B", "C", "D", "E", "F"]);
    expect(result).toHaveLength(3);
    expect(result.map((component: string[]) => new Set(component))).toContainEqual(
      new Set(["A", "B", "C"]),
    );
    expect(result.map((component: string[]) => new Set(component))).toContainEqual(
      new Set(["D", "E"]),
    );
    expect(result.map((component: string[]) => new Set(component))).toContainEqual(new Set(["F"]));
  });

  it("returns a single component for a fully connected graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["A", "B"],
    };
    const result = connectedComponents(adjacencyList, ["A", "B", "C"]);
    expect(result).toHaveLength(1);
    expect(new Set(result[0])).toEqual(new Set(["A", "B", "C"]));
  });

  it("returns each node as its own component when there are no edges", () => {
    const adjacencyList: AdjacencyList = { A: [], B: [], C: [] };
    const result = connectedComponents(adjacencyList, ["A", "B", "C"]);
    expect(result).toHaveLength(3);
    for (const component of result) {
      expect(component).toHaveLength(1);
    }
  });

  it("handles a single node graph", () => {
    const adjacencyList: AdjacencyList = { A: [] };
    const result = connectedComponents(adjacencyList, ["A"]);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(["A"]);
  });

  it("handles a linear chain as a single component", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C"],
    };
    const result = connectedComponents(adjacencyList, ["A", "B", "C", "D"]);
    expect(result).toHaveLength(1);
    expect(new Set(result[0])).toEqual(new Set(["A", "B", "C", "D"]));
  });

  it("assigns all nodes to components with no node repeated", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A"],
      C: ["D"],
      D: ["C"],
      E: [],
    };
    const nodeIds = ["A", "B", "C", "D", "E"];
    const result = connectedComponents(adjacencyList, nodeIds);
    const allAssigned = result.flat();
    expect(allAssigned).toHaveLength(nodeIds.length);
    expect(new Set(allAssigned)).toEqual(new Set(nodeIds));
  });

  it("correctly identifies 3-component graph matching default input", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B"],
      B: ["A", "C"],
      C: ["B"],
      D: ["E"],
      E: ["D"],
      F: ["G"],
      G: ["F", "H"],
      H: ["G"],
    };
    const result = connectedComponents(adjacencyList, ["A", "B", "C", "D", "E", "F", "G", "H"]);
    expect(result).toHaveLength(3);
    const componentSets = result.map((component: string[]) => new Set(component));
    expect(componentSets).toContainEqual(new Set(["A", "B", "C"]));
    expect(componentSets).toContainEqual(new Set(["D", "E"]));
    expect(componentSets).toContainEqual(new Set(["F", "G", "H"]));
  });
});
