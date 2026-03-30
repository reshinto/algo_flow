/* Floyd-Warshall algorithm registration — assembles the definition (meta, execute, steps,
   educational, sources) and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { floydWarshall } from "./sources/floyd-warshall.ts?fn";

import { generateFloydWarshallSteps } from "./step-generator";
import type { FloydWarshallInput } from "./step-generator";
import { floydWarshallEducational } from "./educational";

import typescriptSource from "./sources/floyd-warshall.ts?raw";
import pythonSource from "./sources/floyd-warshall.py?raw";
import javaSource from "./sources/FloydWarshall.java?raw";

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
  { id: "A", label: "A", state: "default", position: circlePosition(0, 4) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 4) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 4) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 4) },
];

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", weight: 3, state: "default" },
  { source: "A", target: "C", weight: 8, state: "default" },
  { source: "A", target: "D", weight: -4, state: "default" },
  { source: "B", target: "D", weight: 7, state: "default" },
  { source: "B", target: "C", weight: 4, state: "default" },
  { source: "C", target: "B", weight: -5, state: "default" },
  { source: "D", target: "C", weight: 6, state: "default" },
];

const defaultNodeIds = ["A", "B", "C", "D"];

const defaultInput: FloydWarshallInput = {
  adjacencyList: {
    A: [
      ["B", 3],
      ["C", 8],
      ["D", -4],
    ],
    B: [
      ["D", 7],
      ["C", 4],
    ],
    C: [["B", -5]],
    D: [["C", 6]],
  },
  nodeIds: defaultNodeIds,
  nodes: defaultNodes,
  edges: defaultEdges,
};

const floydWarshallDefinition: AlgorithmDefinition<FloydWarshallInput> = {
  meta: {
    id: ALGORITHM_ID.FLOYD_WARSHALL!,
    name: "Floyd-Warshall",
    category: CATEGORY.GRAPH!,
    technique: "shortest-path",
    description:
      "Computes shortest paths between all pairs of nodes in a weighted graph using dynamic programming with O(V³) time complexity",
    timeComplexity: {
      best: "O(V³)",
      average: "O(V³)",
      worst: "O(V³)",
    },
    spaceComplexity: "O(V²)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: FloydWarshallInput) => floydWarshall(input.adjacencyList, input.nodeIds),
  generateSteps: generateFloydWarshallSteps,
  educational: floydWarshallEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(floydWarshallDefinition);
