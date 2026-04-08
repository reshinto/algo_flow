import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { morrisInorderTraversal } from "./sources/morris-inorder-traversal.ts?fn";
import { generateMorrisInorderTraversalSteps } from "./step-generator";
import type { MorrisInorderTraversalInput } from "./step-generator";
import { morrisInorderTraversalEducational } from "./educational";

import typescriptSource from "./sources/morris-inorder-traversal.ts?raw";
import pythonSource from "./sources/morris-inorder-traversal.py?raw";
import javaSource from "./sources/MorrisInorderTraversal.java?raw";
import rustSource from "./sources/morris-inorder-traversal.rs?raw";
import cppSource from "./sources/MorrisInorderTraversal.cpp?raw";
import goSource from "./sources/morris-inorder-traversal.go?raw";

/** Build a balanced 7-node BST: [4,2,6,1,3,5,7] */
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

/** Execute Morris in-order traversal using the ?fn source */
function executeMorrisInorderTraversal(input: MorrisInorderTraversalInput): number[] {
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
  const root = toBSTNode(input.rootId);
  return morrisInorderTraversal(root) as number[];
}

const morrisInorderTraversalDefinition: AlgorithmDefinition<MorrisInorderTraversalInput> = {
  meta: {
    id: ALGORITHM_ID.MORRIS_INORDER_TRAVERSAL!,
    name: "Morris In-Order Traversal",
    category: CATEGORY.TREES!,
    technique: "traversal",
    description:
      "In-order traversal with O(1) auxiliary space using temporary threading — no stack or recursion",
    timeComplexity: {
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
    },
    spaceComplexity: "O(1)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: {
      nodes: defaultNodes,
      rootId: "n4",
    },
  },
  execute: executeMorrisInorderTraversal,
  generateSteps: generateMorrisInorderTraversalSteps,
  educational: morrisInorderTraversalEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(morrisInorderTraversalDefinition);
