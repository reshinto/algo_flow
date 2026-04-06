import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { sameTreeIterative } from "./sources/same-tree-iterative.ts?fn";
import { generateSameTreeIterativeSteps } from "./step-generator";
import type { SameTreeIterativeInput } from "./step-generator";
import { sameTreeIterativeEducational } from "./educational";

import typescriptSource from "./sources/same-tree-iterative.ts?raw";
import pythonSource from "./sources/same-tree-iterative.py?raw";
import javaSource from "./sources/SameTreeIterative.java?raw";

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

const secondaryNodes: TreeNode[] = defaultNodes.map((node) => ({
  ...node,
  id: node.id.replace("n", "m"),
  parentId: node.parentId ? node.parentId.replace("n", "m") : null,
  leftChildId: node.leftChildId ? node.leftChildId.replace("n", "m") : null,
  rightChildId: node.rightChildId ? node.rightChildId.replace("n", "m") : null,
}));

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function executeSameTreeIterative(input: SameTreeIterativeInput): boolean {
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
  return sameTreeIterative(
    buildNode(mapA, input.rootId),
    buildNode(mapB, input.secondaryRootId),
  ) as boolean;
}

const sameTreeIterativeDefinition: AlgorithmDefinition<SameTreeIterativeInput> = {
  meta: {
    id: ALGORITHM_ID.SAME_TREE_ITERATIVE!,
    name: "Same Tree (Iterative)",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Queue-based iterative comparison that processes node pairs level by level to determine whether two binary trees are structurally identical",
    timeComplexity: { best: "O(1)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(w)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: {
      nodes: defaultNodes,
      rootId: "n4",
      secondaryNodes,
      secondaryRootId: "m4",
    },
  },
  execute: executeSameTreeIterative,
  generateSteps: generateSameTreeIterativeSteps,
  educational: sameTreeIterativeEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(sameTreeIterativeDefinition);
