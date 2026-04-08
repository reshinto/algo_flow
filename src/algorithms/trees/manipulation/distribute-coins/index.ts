import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { distributeCoins } from "./sources/distribute-coins.ts?fn";
import { generateDistributeCoinsSteps } from "./step-generator";
import type { DistributeCoinsInput } from "./step-generator";
import { distributeCoinsEducational } from "./educational";

import typescriptSource from "./sources/distribute-coins.ts?raw";
import pythonSource from "./sources/distribute-coins.py?raw";
import javaSource from "./sources/DistributeCoins.java?raw";
import rustSource from "./sources/distribute-coins.rs?raw";
import cppSource from "./sources/DistributeCoins.cpp?raw";
import goSource from "./sources/distribute-coins.go?raw";

/**
 * 7-node tree where node values represent coin counts.
 * Total coins = 7 = number of nodes.
 * Distribution: root=4 (excess), left=0, right=0, left.left=3 (excess), etc.
 */
const defaultNodes: TreeNode[] = [
  {
    id: "n1",
    value: 4,
    parentId: null,
    leftChildId: "n2",
    rightChildId: "n3",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "n2",
    value: 0,
    parentId: "n1",
    leftChildId: "n4",
    rightChildId: "n5",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "n3",
    value: 0,
    parentId: "n1",
    leftChildId: "n6",
    rightChildId: "n7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "n4",
    value: 3,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "n5",
    value: 0,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "n6",
    value: 0,
    parentId: "n3",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "n7",
    value: 0,
    parentId: "n3",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function executeDistributeCoins(input: DistributeCoinsInput): number {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBinaryNode(id: string | null): BinaryNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: toBinaryNode(node.leftChildId),
      right: toBinaryNode(node.rightChildId),
    };
  }
  const root = toBinaryNode(input.rootId);
  return distributeCoins(root) as number;
}

const distributeCoinsDefinition: AlgorithmDefinition<DistributeCoinsInput> = {
  meta: {
    id: ALGORITHM_ID.DISTRIBUTE_COINS!,
    name: "Distribute Coins",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "DFS that computes the minimum number of moves to give every node exactly one coin by tracking the excess or deficit flowing through each edge",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n1" },
  },
  execute: executeDistributeCoins,
  generateSteps: generateDistributeCoinsSteps,
  educational: distributeCoinsEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(distributeCoinsDefinition);
