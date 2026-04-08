/* Bipartite Check algorithm registration */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bipartiteCheck } from "./sources/bipartite-check.ts?fn";

import { generateBipartiteCheckSteps } from "./step-generator";
import type { BipartiteCheckInput } from "./step-generator";
import { bipartiteCheckEducational } from "./educational";

import typescriptSource from "./sources/bipartite-check.ts?raw";
import pythonSource from "./sources/bipartite-check.py?raw";
import javaSource from "./sources/BipartiteCheck.java?raw";
import rustSource from "./sources/bipartite-check.rs?raw";
import cppSource from "./sources/BipartiteCheck.cpp?raw";
import goSource from "./sources/bipartite-check.go?raw";

const LEFT_X = 100;
const RIGHT_X = 320;
const TOP_Y = 80;
const ROW_SPACING = 120;

// 6-node bipartite graph: {A, B, C} on left, {D, E, F} on right
const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: { x: LEFT_X, y: TOP_Y } },
  { id: "B", label: "B", state: "default", position: { x: LEFT_X, y: TOP_Y + ROW_SPACING } },
  { id: "C", label: "C", state: "default", position: { x: LEFT_X, y: TOP_Y + 2 * ROW_SPACING } },
  { id: "D", label: "D", state: "default", position: { x: RIGHT_X, y: TOP_Y } },
  { id: "E", label: "E", state: "default", position: { x: RIGHT_X, y: TOP_Y + ROW_SPACING } },
  { id: "F", label: "F", state: "default", position: { x: RIGHT_X, y: TOP_Y + 2 * ROW_SPACING } },
];

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "D", state: "default" },
  { source: "D", target: "A", state: "default" },
  { source: "A", target: "E", state: "default" },
  { source: "E", target: "A", state: "default" },
  { source: "B", target: "D", state: "default" },
  { source: "D", target: "B", state: "default" },
  { source: "B", target: "F", state: "default" },
  { source: "F", target: "B", state: "default" },
  { source: "C", target: "E", state: "default" },
  { source: "E", target: "C", state: "default" },
  { source: "C", target: "F", state: "default" },
  { source: "F", target: "C", state: "default" },
];

const defaultAdjacencyList: BipartiteCheckInput["adjacencyList"] = {
  A: ["D", "E"],
  B: ["D", "F"],
  C: ["E", "F"],
  D: ["A", "B"],
  E: ["A", "C"],
  F: ["B", "C"],
};

const defaultInput: BipartiteCheckInput = {
  adjacencyList: defaultAdjacencyList,
  nodeIds: ["A", "B", "C", "D", "E", "F"],
  nodes: defaultNodes,
  edges: defaultEdges,
};

const bipartiteCheckDefinition: AlgorithmDefinition<BipartiteCheckInput> = {
  meta: {
    id: ALGORITHM_ID.BIPARTITE_CHECK!,
    name: "Bipartite Check",
    category: CATEGORY.GRAPH!,
    technique: "graph-coloring",
    description:
      "Determines if a graph is bipartite using BFS 2-coloring; a conflict means an odd cycle exists",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: BipartiteCheckInput) => bipartiteCheck(input.adjacencyList, input.nodeIds),
  generateSteps: generateBipartiteCheckSteps,
  educational: bipartiteCheckEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bipartiteCheckDefinition);
