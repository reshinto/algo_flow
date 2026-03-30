/* Dijkstra's algorithm registration — assembles the definition (meta, execute, steps,
   educational, sources) and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { CATEGORY } from "@/utils/constants";

import { dijkstraShortestPath } from "./sources/dijkstra.ts?fn";

import { generateDijkstraSteps } from "./step-generator";
import type { DijkstraInput } from "./step-generator";
import { dijkstraEducational } from "./educational";

import typescriptSource from "./sources/dijkstra.ts?raw";
import pythonSource from "./sources/dijkstra.py?raw";
import javaSource from "./sources/Dijkstra.java?raw";

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

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 4, state: "default" },
  { source: "A", target: "C", weight: 2, state: "default" },
  { source: "B", target: "D", weight: 5, state: "default" },
  { source: "C", target: "B", weight: 1, state: "default" },
  { source: "C", target: "D", weight: 8, state: "default" },
  { source: "C", target: "E", weight: 10, state: "default" },
  { source: "D", target: "F", weight: 2, state: "default" },
  { source: "E", target: "F", weight: 3, state: "default" },
];

const defaultInput: DijkstraInput = {
  adjacencyList: {
    A: [
      ["B", 4],
      ["C", 2],
    ],
    B: [["D", 5]],
    C: [
      ["B", 1],
      ["D", 8],
      ["E", 10],
    ],
    D: [["F", 2]],
    E: [["F", 3]],
    F: [],
  },
  startNodeId: "A",
  nodes: defaultNodes,
  edges: defaultEdges,
};

const dijkstraDefinition: AlgorithmDefinition<DijkstraInput> = {
  meta: {
    id: "dijkstra-graph",
    name: "Dijkstra's Algorithm (Graph)",
    category: CATEGORY.GRAPH!,
    technique: "shortest-path",
    description:
      "Finds shortest paths from a source node to all other nodes in a weighted graph with non-negative edge weights using a min-priority queue",
    timeComplexity: {
      best: "O((V+E)logV)",
      average: "O((V+E)logV)",
      worst: "O((V+E)logV)",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: DijkstraInput) => dijkstraShortestPath(input.adjacencyList, input.startNodeId),
  generateSteps: generateDijkstraSteps,
  educational: dijkstraEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(dijkstraDefinition);
