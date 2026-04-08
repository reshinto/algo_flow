/* DAG Shortest Path registration — assembles the definition (meta, execute, steps,
   educational, sources) and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { dagShortestPath } from "./sources/dag-shortest-path.ts?fn";

import { generateDagShortestPathSteps } from "./step-generator";
import type { DagShortestPathInput } from "./step-generator";
import { dagShortestPathEducational } from "./educational";

import typescriptSource from "./sources/dag-shortest-path.ts?raw";
import pythonSource from "./sources/dag-shortest-path.py?raw";
import javaSource from "./sources/DagShortestPath.java?raw";
import rustSource from "./sources/dag-shortest-path.rs?raw";
import cppSource from "./sources/DagShortestPath.cpp?raw";
import goSource from "./sources/dag-shortest-path.go?raw";

/** Pre-computed positions for 6 nodes arranged in a left-to-right DAG layout */
const NODE_POSITIONS: Record<string, { x: number; y: number }> = {
  A: { x: 50, y: 200 },
  B: { x: 150, y: 100 },
  C: { x: 150, y: 300 },
  D: { x: 250, y: 100 },
  E: { x: 250, y: 300 },
  F: { x: 350, y: 200 },
};

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: NODE_POSITIONS["A"]! },
  { id: "B", label: "B", state: "default", position: NODE_POSITIONS["B"]! },
  { id: "C", label: "C", state: "default", position: NODE_POSITIONS["C"]! },
  { id: "D", label: "D", state: "default", position: NODE_POSITIONS["D"]! },
  { id: "E", label: "E", state: "default", position: NODE_POSITIONS["E"]! },
  { id: "F", label: "F", state: "default", position: NODE_POSITIONS["F"]! },
];

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 2, state: "default" },
  { source: "A", target: "C", weight: 6, state: "default" },
  { source: "B", target: "D", weight: 1, state: "default" },
  { source: "B", target: "E", weight: 4, state: "default" },
  { source: "C", target: "E", weight: 2, state: "default" },
  { source: "D", target: "F", weight: 5, state: "default" },
  { source: "E", target: "F", weight: 1, state: "default" },
];

const defaultNodeIds = ["A", "B", "C", "D", "E", "F"];

const defaultInput: DagShortestPathInput = {
  adjacencyList: {
    A: [
      ["B", 2],
      ["C", 6],
    ],
    B: [
      ["D", 1],
      ["E", 4],
    ],
    C: [["E", 2]],
    D: [["F", 5]],
    E: [["F", 1]],
    F: [],
  },
  startNodeId: "A",
  nodeIds: defaultNodeIds,
  nodes: defaultNodes,
  edges: defaultEdges,
};

const dagShortestPathDefinition: AlgorithmDefinition<DagShortestPathInput> = {
  meta: {
    id: ALGORITHM_ID.DAG_SHORTEST_PATH!,
    name: "DAG Shortest Path",
    category: CATEGORY.GRAPH!,
    technique: "shortest-path",
    description:
      "Finds shortest paths from a source node in a directed acyclic graph by first computing a topological ordering via DFS, then relaxing edges in that order in a single linear pass",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: DagShortestPathInput) =>
    dagShortestPath(input.adjacencyList, input.startNodeId, input.nodeIds),
  generateSteps: generateDagShortestPathSteps,
  educational: dagShortestPathEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(dagShortestPathDefinition);
