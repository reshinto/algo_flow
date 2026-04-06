import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sameTree } from "./sources/same-tree.ts?fn";
import { generateSameTreeSteps } from "./step-generator";
import type { SameTreeInput } from "./step-generator";
import { sameTreeEducational } from "./educational";

import typescriptSource from "./sources/same-tree.ts?raw";
import pythonSource from "./sources/same-tree.py?raw";
import javaSource from "./sources/SameTree.java?raw";

/** Standard 7-node balanced BST: root=4, left subtree [2,1,3], right subtree [6,5,7] */
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

/** Identical second tree — same structure and values */
const secondaryNodes: TreeNode[] = [
  {
    id: "m4",
    value: 4,
    parentId: null,
    leftChildId: "m2",
    rightChildId: "m6",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "m2",
    value: 2,
    parentId: "m4",
    leftChildId: "m1",
    rightChildId: "m3",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "m6",
    value: 6,
    parentId: "m4",
    leftChildId: "m5",
    rightChildId: "m7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "m1",
    value: 1,
    parentId: "m2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "m3",
    value: 3,
    parentId: "m2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "m5",
    value: 5,
    parentId: "m6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "m7",
    value: 7,
    parentId: "m6",
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

function executeSameTree(input: SameTreeInput): boolean {
  function buildNode(nodeMap: Map<string, TreeNode>, id: string | null): BinaryNode | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return {
      value: node.value,
      left: buildNode(nodeMap, node.leftChildId),
      right: buildNode(nodeMap, node.rightChildId),
    };
  }
  const mapA = new Map(input.nodes.map((node) => [node.id, node]));
  const mapB = new Map(input.secondaryNodes.map((node) => [node.id, node]));
  const rootA = buildNode(mapA, input.rootId);
  const rootB = buildNode(mapB, input.secondaryRootId);
  return sameTree(rootA, rootB) as boolean;
}

const sameTreeDefinition: AlgorithmDefinition<SameTreeInput> = {
  meta: {
    id: ALGORITHM_ID.SAME_TREE!,
    name: "Same Tree",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Recursively checks whether two binary trees are structurally identical and have the same node values at every position",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      nodes: defaultNodes,
      rootId: "n4",
      secondaryNodes,
      secondaryRootId: "m4",
    },
  },
  execute: executeSameTree,
  generateSteps: generateSameTreeSteps,
  educational: sameTreeEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(sameTreeDefinition);
