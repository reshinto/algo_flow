/* DFS Topological Sort registration — assembles the definition and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { dfsTopologicalSort } from "./sources/dfs-topological.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateDfsTopologicalSteps } from "./step-generator";
import type { DfsTopologicalInput } from "./step-generator";
import { dfsTopologicalEducational } from "./educational";

import typescriptSource from "./sources/dfs-topological.ts?raw";
import pythonSource from "./sources/dfs-topological.py?raw";
import javaSource from "./sources/DfsTopological.java?raw";
import rustSource from "./sources/dfs-topological.rs?raw";
import cppSource from "./sources/DfsTopological.cpp?raw";
import goSource from "./sources/dfs-topological.go?raw";

/** Layered left-to-right positions for a DAG with 6 nodes */
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  A: { x: 50, y: 200 },
  B: { x: 175, y: 100 },
  C: { x: 175, y: 300 },
  D: { x: 300, y: 100 },
  E: { x: 300, y: 300 },
  F: { x: 425, y: 200 },
};

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: NODE_POSITIONS.A! },
  { id: "B", label: "B", state: "default", position: NODE_POSITIONS.B! },
  { id: "C", label: "C", state: "default", position: NODE_POSITIONS.C! },
  { id: "D", label: "D", state: "default", position: NODE_POSITIONS.D! },
  { id: "E", label: "E", state: "default", position: NODE_POSITIONS.E! },
  { id: "F", label: "F", state: "default", position: NODE_POSITIONS.F! },
];

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "B", target: "D", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "C", target: "E", state: "default" },
  { source: "D", target: "F", state: "default" },
  { source: "E", target: "F", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  A: ["B", "C"],
  B: ["D"],
  C: ["D", "E"],
  D: ["F"],
  E: ["F"],
  F: [],
};

const defaultNodeIds = ["A", "B", "C", "D", "E", "F"];

const defaultInput: DfsTopologicalInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: defaultNodeIds,
  nodes: defaultNodes,
  edges: defaultEdges,
};

const dfsTopologicalDefinition: AlgorithmDefinition<DfsTopologicalInput> = {
  meta: {
    id: ALGORITHM_ID.DFS_TOPOLOGICAL!,
    name: "DFS Topological Sort",
    category: CATEGORY.GRAPH!,
    technique: "topological-sort",
    description:
      "A recursive DFS-based topological sort that prepends each vertex to the result after all its descendants finish, producing a valid ordering for directed acyclic graphs",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: DfsTopologicalInput) => dfsTopologicalSort(input.adjacencyList, input.nodeIds),
  generateSteps: generateDfsTopologicalSteps,
  educational: dfsTopologicalEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(dfsTopologicalDefinition);
