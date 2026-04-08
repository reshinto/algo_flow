/* A* Search registration — assembles the definition (meta, execute, steps,
   educational, sources) and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { aStarSearch } from "./sources/a-star.ts?fn";

type WeightedAdjacencyList = Record<string, [string, number][]>;
import { generateAStarSteps } from "./step-generator";
import type { AStarInput } from "./step-generator";
import { aStarEducational } from "./educational";

import typescriptSource from "./sources/a-star.ts?raw";
import pythonSource from "./sources/a-star.py?raw";
import javaSource from "./sources/AStar.java?raw";
import rustSource from "./sources/a-star.rs?raw";
import cppSource from "./sources/AStar.cpp?raw";
import goSource from "./sources/a-star.go?raw";

/** Pre-computed positions for 6 nodes arranged in a circle layout */
const CIRCLE_RADIUS = 150;
const CENTER_X = 200;
const CENTER_Y = 200;

/** Distributes nodes evenly around a circle for the default graph layout. */
function circlePosition(index: number, totalNodes: number): { x: number; y: number } {
  const angle = (2 * Math.PI * index) / totalNodes - Math.PI / 2;
  return {
    x: Math.round(CENTER_X + CIRCLE_RADIUS * Math.cos(angle)),
    y: Math.round(CENTER_Y + CIRCLE_RADIUS * Math.sin(angle)),
  };
}

/** Compute Euclidean distance between two 2D positions. */
function euclideanDistance(posA: { x: number; y: number }, posB: { x: number; y: number }): number {
  return Math.round(Math.sqrt(Math.pow(posA.x - posB.x, 2) + Math.pow(posA.y - posB.y, 2)));
}

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 6) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 6) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 6) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 6) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 6) },
  { id: "F", label: "F", state: "default", position: circlePosition(5, 6) },
];

/** Target node for the default search */
const DEFAULT_TARGET_NODE_ID = "F";
const targetPosition = defaultNodes.find((node) => node.id === DEFAULT_TARGET_NODE_ID)!.position;

/** Heuristic values: Euclidean distance from each node to the target node F */
const defaultHeuristic: Record<string, number> = Object.fromEntries(
  defaultNodes.map((node) => [node.id, euclideanDistance(node.position, targetPosition)]),
);

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 4, state: "default" },
  { source: "A", target: "C", weight: 2, state: "default" },
  { source: "B", target: "D", weight: 5, state: "default" },
  { source: "C", target: "B", weight: 1, state: "default" },
  { source: "C", target: "E", weight: 10, state: "default" },
  { source: "D", target: "F", weight: 2, state: "default" },
  { source: "E", target: "F", weight: 3, state: "default" },
];

const defaultAdjacencyList: WeightedAdjacencyList = {
  A: [
    ["B", 4],
    ["C", 2],
  ],
  B: [["D", 5]],
  C: [
    ["B", 1],
    ["E", 10],
  ],
  D: [["F", 2]],
  E: [["F", 3]],
  F: [],
};

const defaultInput: AStarInput = {
  adjacencyList: defaultAdjacencyList,
  startNodeId: "A",
  targetNodeId: DEFAULT_TARGET_NODE_ID,
  heuristic: defaultHeuristic,
  nodes: defaultNodes,
  edges: defaultEdges,
};

const aStarDefinition: AlgorithmDefinition<AStarInput> = {
  meta: {
    id: ALGORITHM_ID.A_STAR!,
    name: "A* Search",
    category: CATEGORY.GRAPH!,
    technique: "shortest-path",
    description:
      "Finds the shortest path from a start node to a target node using a heuristic function to guide the search, combining actual cost with an estimated remaining cost",
    timeComplexity: {
      best: "O((V+E)logV)",
      average: "O((V+E)logV)",
      worst: "O((V+E)logV)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: AStarInput) =>
    aStarSearch(input.adjacencyList, input.startNodeId, input.targetNodeId, input.heuristic),
  generateSteps: generateAStarSteps,
  educational: aStarEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(aStarDefinition);
