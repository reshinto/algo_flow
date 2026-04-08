import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { bstRecoverSwapped } from "./sources/bst-recover-swapped.ts?fn";
import { generateBstRecoverSwappedSteps } from "./step-generator";
import type { BstRecoverSwappedInput } from "./step-generator";
import { bstRecoverSwappedEducational } from "./educational";

import typescriptSource from "./sources/bst-recover-swapped.ts?raw";
import pythonSource from "./sources/bst-recover-swapped.py?raw";
import javaSource from "./sources/BSTRecoverSwapped.java?raw";
import rustSource from "./sources/bst-recover-swapped.rs?raw";
import cppSource from "./sources/BSTRecoverSwapped.cpp?raw";
import goSource from "./sources/bst-recover-swapped.go?raw";

/** Build the default BST with nodes 3 and 7 swapped (violating BST property) */
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
    value: 7,
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
    value: 3,
    parentId: "n6",
    leftChildId: null,
    rightChildId: null,
    state: "default",
    position: { x: 350, y: 260 },
  },
];

interface BSTNodeShape {
  value: number;
  left: BSTNodeShape | null;
  right: BSTNodeShape | null;
}

function executeBstRecoverSwapped(input: BstRecoverSwappedInput): number | null {
  const nodeMap = new Map(input.nodes.map((node) => [node.id, node]));
  function toBST(id: string | null): BSTNodeShape | null {
    if (!id) return null;
    const node = nodeMap.get(id);
    if (!node) return null;
    return { value: node.value, left: toBST(node.leftChildId), right: toBST(node.rightChildId) };
  }
  const root = toBST(input.rootId);
  if (!root) return null;
  bstRecoverSwapped(root);
  return root.value;
}

const bstRecoverSwappedDefinition: AlgorithmDefinition<BstRecoverSwappedInput> = {
  meta: {
    id: ALGORITHM_ID.BST_RECOVER_SWAPPED!,
    name: "BST Recover Swapped Nodes",
    category: CATEGORY.TREES!,
    technique: "bst-operations",
    description:
      "In-order traversal detects two nodes that violate BST order; swapping their values restores the tree",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4" },
  },
  execute: executeBstRecoverSwapped,
  generateSteps: generateBstRecoverSwappedSteps,
  educational: bstRecoverSwappedEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(bstRecoverSwappedDefinition);
