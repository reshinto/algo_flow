import { describe, it, expect } from "vitest";

import { hierholzersAlgorithm } from "./sources/hierholzers.ts?fn";

type AdjacencyList = Record<string, string[]>;

/** Verify that a circuit is valid: starts and ends at the same node, uses every edge exactly once. */
function isValidEulerianCircuit(
  circuit: string[],
  adjacencyList: AdjacencyList,
  startNodeId: string,
): boolean {
  if (circuit.length === 0) return false;
  if (circuit[0] !== startNodeId) return false;
  if (circuit[circuit.length - 1] !== startNodeId) return false;

  // Count expected edges (undirected, so each pair counts once)
  const expectedEdgeCount = Object.values(adjacencyList).reduce(
    (total, neighbors) => total + neighbors.length,
    0,
  );
  // Each undirected edge appears in both directions in the adjacency list
  const undirectedEdgeCount = expectedEdgeCount / 2;

  // The circuit visits each edge once, so circuit.length - 1 should equal total undirected edges
  return circuit.length - 1 === undirectedEdgeCount;
}

describe("hierholzersAlgorithm", () => {
  it("finds an Eulerian circuit on a simple triangle graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["B", "A"],
    };
    const circuit = hierholzersAlgorithm(adjacencyList, "A");

    expect(circuit[0]).toBe("A");
    expect(circuit[circuit.length - 1]).toBe("A");
    expect(isValidEulerianCircuit(circuit, adjacencyList, "A")).toBe(true);
  });

  it("finds an Eulerian circuit on the default 5-node even-degree graph", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C", "D", "E"],
      B: ["A", "C"],
      C: ["B", "A"],
      D: ["A", "E"],
      E: ["D", "A"],
    };
    const circuit = hierholzersAlgorithm(adjacencyList, "A");

    expect(circuit[0]).toBe("A");
    expect(circuit[circuit.length - 1]).toBe("A");
    expect(isValidEulerianCircuit(circuit, adjacencyList, "A")).toBe(true);
  });

  it("returns a single-node circuit for a graph with no edges", () => {
    const adjacencyList: AdjacencyList = {
      A: [],
    };
    const circuit = hierholzersAlgorithm(adjacencyList, "A");

    expect(circuit).toEqual(["A"]);
  });

  it("finds an Eulerian circuit on a square (4-cycle)", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "D"],
      B: ["A", "C"],
      C: ["B", "D"],
      D: ["C", "A"],
    };
    const circuit = hierholzersAlgorithm(adjacencyList, "A");

    expect(circuit[0]).toBe("A");
    expect(circuit[circuit.length - 1]).toBe("A");
    expect(isValidEulerianCircuit(circuit, adjacencyList, "A")).toBe(true);
  });

  it("finds an Eulerian circuit on two triangles sharing a node", () => {
    // A-B-C-A and A-D-E-A share node A, total degree of A = 4
    const adjacencyList: AdjacencyList = {
      A: ["B", "C", "D", "E"],
      B: ["A", "C"],
      C: ["B", "A"],
      D: ["A", "E"],
      E: ["D", "A"],
    };
    const circuit = hierholzersAlgorithm(adjacencyList, "A");

    expect(circuit[0]).toBe("A");
    expect(circuit[circuit.length - 1]).toBe("A");
    // 6 undirected edges → circuit length 7
    expect(circuit.length).toBe(7);
  });

  it("finds an Eulerian circuit starting from a non-hub node", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["B", "A"],
    };
    // Start from B instead of A
    const circuit = hierholzersAlgorithm(adjacencyList, "B");

    expect(circuit[0]).toBe("B");
    expect(circuit[circuit.length - 1]).toBe("B");
    expect(circuit.length).toBe(4); // 3 edges + 1
  });

  it("produces a circuit that only includes nodes with edges", () => {
    const adjacencyList: AdjacencyList = {
      A: ["B", "C"],
      B: ["A", "C"],
      C: ["B", "A"],
    };
    const circuit = hierholzersAlgorithm(adjacencyList, "A");

    // All nodes in the circuit should be from {A, B, C}
    const validNodes = new Set(["A", "B", "C"]);
    for (const nodeId of circuit) {
      expect(validNodes.has(nodeId)).toBe(true);
    }
  });
});
