import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { isSymmetricTree } from "./sources/is-symmetric-tree.ts?fn";
import { generateIsSymmetricTreeSteps } from "./step-generator";
import type { IsSymmetricTreeInput } from "./step-generator";
import { isSymmetricTreeEducational } from "./educational";

import typescriptSource from "./sources/is-symmetric-tree.ts?raw";
import pythonSource from "./sources/is-symmetric-tree.py?raw";
import javaSource from "./sources/IsSymmetricTree.java?raw";

/** Symmetric 7-node BST: root=4, mirrors [2,6], [1,3,5,7] */
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

function executeIsSymmetricTree(input: IsSymmetricTreeInput): boolean {
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
  return isSymmetricTree(toBSTNode(input.rootId)) as boolean;
}

const isSymmetricTreeDefinition: AlgorithmDefinition<IsSymmetricTreeInput> = {
  meta: {
    id: ALGORITHM_ID.IS_SYMMETRIC_TREE!,
    name: "Is Symmetric Tree",
    category: CATEGORY.TREES!,
    technique: "properties",
    description:
      "Checks if a binary tree is a mirror of itself around its center. Recursively compares outer and inner pairs.",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeIsSymmetricTree,
  generateSteps: generateIsSymmetricTreeSteps,
  educational: isSymmetricTreeEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(isSymmetricTreeDefinition);
