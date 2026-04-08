/* Prim's algorithm registration — assembles the definition and self-registers with the registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { primsAlgorithm } from "./sources/prims.ts?fn";

import { generatePrimsSteps } from "./step-generator";
import type { PrimsInput } from "./step-generator";
import { primsEducational } from "./educational";

import typescriptSource from "./sources/prims.ts?raw";
import pythonSource from "./sources/prims.py?raw";
import javaSource from "./sources/Prims.java?raw";
import rustSource from "./sources/prims.rs?raw";
import cppSource from "./sources/Prims.cpp?raw";
import goSource from "./sources/prims.go?raw";

const CIRCLE_RADIUS = 150;
const CENTER_X = 200;
const CENTER_Y = 200;

function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(CENTER_X + CIRCLE_RADIUS * Math.cos(angle)),
    y: Math.round(CENTER_Y + CIRCLE_RADIUS * Math.sin(angle)),
  };
}

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 6) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 6) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 6) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 6) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 6) },
  { id: "F", label: "F", state: "default", position: circlePosition(5, 6) },
];

/** Both directions required for undirected graph rendering */
const defaultGraphEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 4, state: "default" },
  { source: "B", target: "A", weight: 4, state: "default" },
  { source: "A", target: "C", weight: 2, state: "default" },
  { source: "C", target: "A", weight: 2, state: "default" },
  { source: "B", target: "C", weight: 1, state: "default" },
  { source: "C", target: "B", weight: 1, state: "default" },
  { source: "B", target: "D", weight: 5, state: "default" },
  { source: "D", target: "B", weight: 5, state: "default" },
  { source: "C", target: "D", weight: 8, state: "default" },
  { source: "D", target: "C", weight: 8, state: "default" },
  { source: "C", target: "E", weight: 10, state: "default" },
  { source: "E", target: "C", weight: 10, state: "default" },
  { source: "D", target: "E", weight: 2, state: "default" },
  { source: "E", target: "D", weight: 2, state: "default" },
  { source: "D", target: "F", weight: 6, state: "default" },
  { source: "F", target: "D", weight: 6, state: "default" },
  { source: "E", target: "F", weight: 3, state: "default" },
  { source: "F", target: "E", weight: 3, state: "default" },
];

/** Adjacency list with [neighborId, weight] pairs for Prim's priority-queue traversal */
const defaultAdjacencyList: Record<string, [string, number][]> = {
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

const defaultInput: PrimsInput = {
  adjacencyList: defaultAdjacencyList,
  startNodeId: "A",
  nodes: defaultNodes,
  graphEdges: defaultGraphEdges,
};

const primsDefinition: AlgorithmDefinition<PrimsInput> = {
  meta: {
    id: ALGORITHM_ID.PRIMS!,
    name: "Prim's Algorithm",
    category: CATEGORY.GRAPH!,
    technique: "minimum-spanning-tree",
    description:
      "A greedy algorithm that grows a minimum spanning tree from a start node by always adding the cheapest edge connecting the tree to an unvisited node",
    timeComplexity: {
      best: "O((V+E) log V)",
      average: "O((V+E) log V)",
      worst: "O((V+E) log V)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: PrimsInput) => primsAlgorithm(input.adjacencyList, input.startNodeId),
  generateSteps: generatePrimsSteps,
  educational: primsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(primsDefinition);
