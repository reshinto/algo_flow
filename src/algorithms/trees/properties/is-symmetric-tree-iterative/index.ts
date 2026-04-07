import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { isSymmetricTreeIterative } from "./sources/is-symmetric-tree-iterative.ts?fn";
import { generateIsSymmetricTreeIterativeSteps } from "./step-generator";
import type { IsSymmetricTreeIterativeInput } from "./step-generator";
import { isSymmetricTreeIterativeEducational } from "./educational";

import typescriptSource from "./sources/is-symmetric-tree-iterative.ts?raw";
import pythonSource from "./sources/is-symmetric-tree-iterative.py?raw";
import javaSource from "./sources/IsSymmetricTreeIterative.java?raw";
import rustSource from "./sources/is-symmetric-tree-iterative.rs?raw";
import cppSource from "./sources/IsSymmetricTreeIterative.cpp?raw";
import goSource from "./sources/is-symmetric-tree-iterative.go?raw";

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

function executeIsSymmetricTreeIterative(input: IsSymmetricTreeIterativeInput): boolean {
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
  return isSymmetricTreeIterative(toBSTNode(input.rootId)) as boolean;
}

const isSymmetricTreeIterativeDefinition: AlgorithmDefinition<IsSymmetricTreeIterativeInput> = {
  meta: {
    id: ALGORITHM_ID.IS_SYMMETRIC_TREE_ITERATIVE!,
    name: "Is Symmetric Tree (Iterative)",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Queue-based symmetry check — enqueues mirror pairs and compares them level by level",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(w)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeIsSymmetricTreeIterative,
  generateSteps: generateIsSymmetricTreeIterativeSteps,
  educational: isSymmetricTreeIterativeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(isSymmetricTreeIterativeDefinition);
