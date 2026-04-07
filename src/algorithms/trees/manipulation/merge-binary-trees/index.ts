import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { mergeBinaryTrees } from "./sources/merge-binary-trees.ts?fn";
import { generateMergeBinaryTreesSteps } from "./step-generator";
import type { MergeBinaryTreesInput } from "./step-generator";
import { mergeBinaryTreesEducational } from "./educational";

import typescriptSource from "./sources/merge-binary-trees.ts?raw";
import pythonSource from "./sources/merge-binary-trees.py?raw";
import javaSource from "./sources/MergeBinaryTrees.java?raw";
import rustSource from "./sources/merge-binary-trees.rs?raw";
import cppSource from "./sources/MergeBinaryTrees.cpp?raw";
import goSource from "./sources/merge-binary-trees.go?raw";

/** Tree A: standard 7-node balanced BST with values 1–7 */
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

/** Tree B: same structure but values 40, 20, 60, 10, 30, 50, 70 */
const secondaryNodes: TreeNode[] = [
  {
    id: "m4",
    value: 40,
    parentId: null,
    leftChildId: "m2",
    rightChildId: "m6",
    state: "default",
    position: { x: 200, y: 60 },
  },
  {
    id: "m2",
    value: 20,
    parentId: "m4",
    leftChildId: "m1",
    rightChildId: "m3",
    state: "default",
    position: { x: 100, y: 160 },
  },
  {
    id: "m6",
    value: 60,
    parentId: "m4",
    leftChildId: "m5",
    rightChildId: "m7",
    state: "default",
    position: { x: 300, y: 160 },
  },
  {
    id: "m1",
    value: 10,
    parentId: "m2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 50, y: 260 },
  },
  {
    id: "m3",
    value: 30,
    parentId: "m2",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 150, y: 260 },
  },
  {
    id: "m5",
    value: 50,
    parentId: "m6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 250, y: 260 },
  },
  {
    id: "m7",
    value: 70,
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

function executeMergeBinaryTrees(input: MergeBinaryTreesInput): number[] {
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
  const merged = mergeBinaryTrees(
    buildNode(mapA, input.rootId),
    buildNode(mapB, input.secondaryRootId),
  ) as BinaryNode | null;
  const result: number[] = [];
  const bfsQueue: (BinaryNode | null)[] = [merged];
  while (bfsQueue.length > 0) {
    const current = bfsQueue.shift();
    if (current != null) {
      result.push(current.value);
      bfsQueue.push(current.left, current.right);
    }
  }
  return result;
}

const mergeBinaryTreesDefinition: AlgorithmDefinition<MergeBinaryTreesInput> = {
  meta: {
    id: ALGORITHM_ID.MERGE_BINARY_TREES!,
    name: "Merge Binary Trees",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Recursively overlays two binary trees by summing values at overlapping positions and keeping non-overlapping nodes as-is",
    timeComplexity: { best: "O(1)", average: "O(min(n,m))", worst: "O(min(n,m))" },
    spaceComplexity: "O(min(h1,h2))",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4", secondaryNodes, secondaryRootId: "m4" },
  },
  execute: executeMergeBinaryTrees,
  generateSteps: generateMergeBinaryTreesSteps,
  educational: mergeBinaryTreesEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(mergeBinaryTreesDefinition);
