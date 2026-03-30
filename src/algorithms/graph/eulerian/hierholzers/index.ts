/* Hierholzer's Algorithm registration — assembles the definition (meta, execute, steps,
   educational, sources) and self-registers with the algorithm registry. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { hierholzersAlgorithm } from "./sources/hierholzers.ts?fn";

type AdjacencyList = Record<string, string[]>;
import { generateHierholzersSteps } from "./step-generator";
import type { HierholzersInput } from "./step-generator";
import { hierholzersEducational } from "./educational";

import typescriptSource from "./sources/hierholzers.ts?raw";
import pythonSource from "./sources/hierholzers.py?raw";
import javaSource from "./sources/Hierholzers.java?raw";

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

/**
 * Default graph: 6 nodes (A–F) with all even degrees, forming an Eulerian circuit.
 * Edges: A-B, B-C, C-A, A-D, D-E, E-A (6 edges total)
 * Degrees: A=4, B=2, C=2, D=2, E=2 — all even.
 * Node F is included in the layout but is isolated (not part of the Eulerian graph).
 */
const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 5) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 5) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 5) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 5) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 5) },
];

const defaultEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "C", target: "A", state: "default" },
  { source: "A", target: "C", state: "default" },
  { source: "A", target: "D", state: "default" },
  { source: "D", target: "A", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
  { source: "E", target: "A", state: "default" },
  { source: "A", target: "E", state: "default" },
];

const defaultAdjacencyList: AdjacencyList = {
  A: ["B", "C", "D", "E"],
  B: ["A", "C"],
  C: ["B", "A"],
  D: ["A", "E"],
  E: ["D", "A"],
};

const defaultInput: HierholzersInput = {
  adjacencyList: defaultAdjacencyList,
  startNodeId: "A",
  nodes: defaultNodes,
  edges: defaultEdges,
};

const hierholzersDefinition: AlgorithmDefinition<HierholzersInput> = {
  meta: {
    id: ALGORITHM_ID.HIERHOLZERS!,
    name: "Hierholzer's Algorithm",
    category: CATEGORY.GRAPH!,
    technique: "eulerian",
    description:
      "An efficient algorithm that finds an Eulerian circuit in an undirected graph by building and splicing subcircuits using a stack",
    timeComplexity: {
      best: "O(V+E)",
      average: "O(V+E)",
      worst: "O(V+E)",
    },
    spaceComplexity: "O(E)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput,
  },
  execute: (input: HierholzersInput) =>
    hierholzersAlgorithm(input.adjacencyList, input.startNodeId),
  generateSteps: generateHierholzersSteps,
  educational: hierholzersEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
  },
};

registry.register(hierholzersDefinition);
