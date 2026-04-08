/* Union-Find Cycle Detection registration — assembles the definition and self-registers. */

import type { AlgorithmDefinition, GraphNode, GraphEdge } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { unionFindCycle } from "./sources/union-find-cycle.ts?fn";

import { generateUnionFindCycleSteps } from "./step-generator";
import type { UnionFindCycleInput } from "./step-generator";
import { unionFindCycleEducational } from "./educational";

import typescriptSource from "./sources/union-find-cycle.ts?raw";
import pythonSource from "./sources/union-find-cycle.py?raw";
import javaSource from "./sources/UnionFindCycle.java?raw";
import rustSource from "./sources/union-find-cycle.rs?raw";
import cppSource from "./sources/UnionFindCycle.cpp?raw";
import goSource from "./sources/union-find-cycle.go?raw";

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

/** 5-node undirected graph with a cycle: A—B, B—C, C—D, D—A (cycle), D—E */
const defaultNodes: GraphNode[] = [
  { id: "A", label: "A", state: "default", position: circlePosition(0, 5) },
  { id: "B", label: "B", state: "default", position: circlePosition(1, 5) },
  { id: "C", label: "C", state: "default", position: circlePosition(2, 5) },
  { id: "D", label: "D", state: "default", position: circlePosition(3, 5) },
  { id: "E", label: "E", state: "default", position: circlePosition(4, 5) },
];

/** Both directions for undirected graph rendering */
const defaultGraphEdges: GraphEdge[] = [
  { source: "A", target: "B", state: "default" },
  { source: "B", target: "A", state: "default" },
  { source: "B", target: "C", state: "default" },
  { source: "C", target: "B", state: "default" },
  { source: "C", target: "D", state: "default" },
  { source: "D", target: "C", state: "default" },
  { source: "D", target: "A", state: "default" },
  { source: "A", target: "D", state: "default" },
  { source: "D", target: "E", state: "default" },
  { source: "E", target: "D", state: "default" },
];

/** Deduplicated edge list for algorithm input (one direction per undirected edge) */
const defaultEdges = [
  { source: "A", target: "B" },
  { source: "B", target: "C" },
  { source: "C", target: "D" },
  { source: "D", target: "A" },
  { source: "D", target: "E" },
];

const defaultNodeIds = ["A", "B", "C", "D", "E"];

const defaultInput: UnionFindCycleInput = {
  edges: defaultEdges,
  nodeIds: defaultNodeIds,
  nodes: defaultNodes,
  graphEdges: defaultGraphEdges,
};

const unionFindCycleDefinition: AlgorithmDefinition<UnionFindCycleInput> = {
  meta: {
    id: ALGORITHM_ID.UNION_FIND_CYCLE!,
    name: "Union-Find Cycle Detection",
    category: CATEGORY.GRAPH!,
    technique: "cycle-detection",
    description:
      "Detects cycles in an undirected graph by processing edges one at a time — if both endpoints already share a component, adding the edge would form a cycle",
    timeComplexity: {
      best: "O(E·α(V))",
      average: "O(E·α(V))",
      worst: "O(E·α(V))",
    },
    spaceComplexity: "O(V)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput,
  },
  execute: (input: UnionFindCycleInput) => unionFindCycle(input.edges, input.nodeIds) as boolean,
  generateSteps: generateUnionFindCycleSteps,
  educational: unionFindCycleEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(unionFindCycleDefinition);
