import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { isBalancedTree } from "./sources/is-balanced-tree.ts?fn";
import { generateIsBalancedTreeSteps } from "./step-generator";
import type { IsBalancedTreeInput } from "./step-generator";
import { isBalancedTreeEducational } from "./educational";

import typescriptSource from "./sources/is-balanced-tree.ts?raw";
import pythonSource from "./sources/is-balanced-tree.py?raw";
import javaSource from "./sources/IsBalancedTree.java?raw";
import rustSource from "./sources/is-balanced-tree.rs?raw";
import cppSource from "./sources/IsBalancedTree.cpp?raw";
import goSource from "./sources/is-balanced-tree.go?raw";

/** Balanced 7-node BST: root=4, left subtree [2,1,3], right subtree [6,5,7] */
const defaultNodes: TreeNode[] = [
  {
    id: "n4",
    value: 4,
    parentId: null,
    leftChildId: "n2",
    rightChildId: "n6",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "n2",
    value: 2,
    parentId: "n4",
    leftChildId: "n1",
    rightChildId: "n3",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "n6",
    value: 6,
    parentId: "n4",
    leftChildId: "n5",
    rightChildId: "n7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "n1",
    value: 1,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "n3",
    value: 3,
    parentId: "n2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "n5",
    value: 5,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "n7",
    value: 7,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

function executeIsBalancedTree(input: IsBalancedTreeInput): boolean {
  interface BSTNode {
    value: number;
    left: BSTNode | null;
    right: BSTNode | null;
  }
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBSTNode(id: string | null): BSTNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: toBSTNode(node.leftChildId),
      right: toBSTNode(node.rightChildId),
    };
  }
  return isBalancedTree(toBSTNode(input.rootId)) as boolean;
}

const isBalancedTreeDefinition: AlgorithmDefinition<IsBalancedTreeInput> = {
  meta: {
    id: ALGORITHM_ID.IS_BALANCED_TREE!,
    name: "Is Balanced Tree",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Checks if a binary tree is height-balanced — every node must have left and right subtrees differing in height by at most 1",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeIsBalancedTree,
  generateSteps: generateIsBalancedTreeSteps,
  educational: isBalancedTreeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(isBalancedTreeDefinition);
