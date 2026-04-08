import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { subtreeOfAnotherTree } from "./sources/subtree-of-another-tree.ts?fn";
import { generateSubtreeOfAnotherTreeSteps } from "./step-generator";
import type { SubtreeOfAnotherTreeInput } from "./step-generator";
import { subtreeOfAnotherTreeEducational } from "./educational";

import typescriptSource from "./sources/subtree-of-another-tree.ts?raw";
import pythonSource from "./sources/subtree-of-another-tree.py?raw";
import javaSource from "./sources/SubtreeOfAnotherTree.java?raw";
import rustSource from "./sources/subtree-of-another-tree.rs?raw";
import cppSource from "./sources/SubtreeOfAnotherTree.cpp?raw";
import goSource from "./sources/subtree-of-another-tree.go?raw";

/** Main tree: standard 7-node balanced BST */
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

/** Subtree: left subtree of main tree (rooted at node with value 2) */
const secondaryNodes: TreeNode[] = [
  {
    id: "s2",
    value: 2,
    parentId: null,
    leftChildId: "s1",
    rightChildId: "s3",
    state: "default",
    position: { x: 100, y: 60 },
  },
  {
    id: "s1",
    value: 1,
    parentId: "s2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 160 },
  },
  {
    id: "s3",
    value: 3,
    parentId: "s2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 160 },
  },
];

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function executeSubtreeOfAnotherTree(input: SubtreeOfAnotherTreeInput): boolean {
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
  return subtreeOfAnotherTree(
    buildNode(mapA, input.rootId),
    buildNode(mapB, input.secondaryRootId),
  ) as boolean;
}

const subtreeOfAnotherTreeDefinition: AlgorithmDefinition<SubtreeOfAnotherTreeInput> = {
  meta: {
    id: ALGORITHM_ID.SUBTREE_OF_ANOTHER_TREE!,
    name: "Subtree of Another Tree",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Recursively checks whether a smaller binary tree appears as an exact structural match anywhere within a larger binary tree",
    timeComplexity: { best: "O(m)", average: "O(n×m)", worst: "O(n×m)" },
    spaceComplexity: "O(h1+h2)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4", secondaryNodes, secondaryRootId: "s2" },
  },
  execute: executeSubtreeOfAnotherTree,
  generateSteps: generateSubtreeOfAnotherTreeSteps,
  educational: subtreeOfAnotherTreeEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(subtreeOfAnotherTreeDefinition);
