/* Bidirectional BFS algorithm registration — assembles the definition (meta, execute, steps,
   educational, sources) and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bidirectionalBFS } from "./sources/bidirectional-bfs.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateBidirectionalBfsSteps } from "./step-generator";
import type { BidirectionalBfsInput } from "./step-generator";
import { bidirectionalBfsEducational } from "./educational";

import typescriptSource from "./sources/bidirectional-bfs.ts?raw";
import pythonSource from "./sources/bidirectional-bfs.py?raw";
import javaSource from "./sources/BidirectionalBFS.java?raw";
import rustSource from "./sources/bidirectional-bfs.rs?raw";
import cppSource from "./sources/BidirectionalBFS.cpp?raw";
import goSource from "./sources/bidirectional-bfs.go?raw";

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

const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 6) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 6) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 6) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 6) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 6) },
  { id: "F", label: "F", state: "default", position: circlePosition(5, 6) },
];

/**
 * Edges are stored as directed in both directions to represent the undirected graph visually.
 * The step generator builds an undirected neighbor map at runtime.
 */
const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "B", target: "D", state: "default" },
  { source: "D", target: "B", state: "default" },
  { source: "C", target: "E", state: "default" },
  { source: "E", target: "C", state: "default" },
  { source: "D", target: "F", state: "default" },
  { source: "F", target: "D", state: "default" },
  { source: "E", target: "F", state: "default" },
  { source: "F", target: "E", state: "default" },
];

/** Directed adjacency list — the step generator treats it as undirected internally. */
const defaultAdjacencyList: AdjacencyList = {
  A: ["B", "C"],
  B: ["D"],
  C: ["E"],
  D: ["F"],
  E: ["F"],
  F: [],
};

const defaultInput: BidirectionalBfsInput = {
  adjacencyList: defaultAdjacencyList,
  startNodeId: "A",
  targetNodeId: "F",
  nodes: defaultNodes,
  edges: defaultEdges,
};

const bidirectionalBfsDefinition: AlgorithmDefinition<BidirectionalBfsInput> = {
  meta: {
    id: ALGORITHM_ID.BIDIRECTIONAL_BFS!,
    name: "Bidirectional BFS",
    category: CATEGORY.GRAPH!,
    technique: "traversal",
    description:
      "Runs two simultaneous BFS frontiers — one from the source, one from the target — stopping when they meet, finding the shortest path faster than single-source BFS",
    timeComplexity: {
      best: "O(b^(d/2))",
      average: "O(b^(d/2))",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: BidirectionalBfsInput) =>
    bidirectionalBFS(input.adjacencyList, input.startNodeId, input.targetNodeId),
  generateSteps: generateBidirectionalBfsSteps,
  educational: bidirectionalBfsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bidirectionalBfsDefinition);
