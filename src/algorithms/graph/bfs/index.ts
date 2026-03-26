import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID } from "@/utils/constants";

import { breadthFirstSearch } from "./bfs";
import type { AdjacencyList } from "./bfs";
import { generateBfsSteps } from "./step-generator";
import type { BfsInput } from "./step-generator";
import { bfsEducational } from "./educational";

import typescriptSource from "./sources/bfs.ts?raw";
import pythonSource from "./sources/bfs.py?raw";
import javaSource from "./sources/BFS.java?raw";

/** Pre-computed positions for 6 nodes arranged in a circle layout */
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

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "B", target: "D", state: "default" },
  { source: "C", target: "E", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "D", target: "F", state: "default" },
  { source: "E", target: "F", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E"],
  D: ["E", "F"],
  E: ["F"],
  F: [],
};

const defaultInput: BfsInput = {
  adjacencyList: defaultAdjacencyList,
  startNodeId: "A",
  nodes: defaultNodes,
  edges: defaultEdges,
};

const bfsDefinition: AlgorithmDefinition<BfsInput> = {
  meta: {
    id: ALGORITHM_ID.BFS,
    name: "Breadth-First Search",
    category: "graph",
    description:
      "A graph traversal algorithm that explores all neighbors at the current depth before moving to the next level",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: BfsInput) => breadthFirstSearch(input.adjacencyList, input.startNodeId),
  generateSteps: generateBfsSteps,
  educational: bfsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(bfsDefinition);
