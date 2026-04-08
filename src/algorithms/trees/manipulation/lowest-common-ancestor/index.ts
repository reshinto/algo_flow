import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { lowestCommonAncestor } from "./sources/lowest-common-ancestor.ts?fn";
import { generateLowestCommonAncestorSteps } from "./step-generator";
import type { LowestCommonAncestorInput } from "./step-generator";
import { lowestCommonAncestorEducational } from "./educational";

import typescriptSource from "./sources/lowest-common-ancestor.ts?raw";
import pythonSource from "./sources/lowest-common-ancestor.py?raw";
import javaSource from "./sources/LowestCommonAncestor.java?raw";
import rustSource from "./sources/lowest-common-ancestor.rs?raw";
import cppSource from "./sources/LowestCommonAncestor.cpp?raw";
import goSource from "./sources/lowest-common-ancestor.go?raw";

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

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function executeLowestCommonAncestor(input: LowestCommonAncestorInput): number | null {
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
  const result = lowestCommonAncestor(
    root,
    input.nodeValueA,
    input.nodeValueB,
  ) as BinaryNode | null;
  return result?.value ?? null;
}

const lowestCommonAncestorDefinition: AlgorithmDefinition<LowestCommonAncestorInput> = {
  meta: {
    id: ALGORITHM_ID.LOWEST_COMMON_ANCESTOR!,
    name: "Lowest Common Ancestor",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Recursive post-order search that finds the deepest node in a general binary tree that is an ancestor of both given target node values",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java", "rust", "cpp", "go"],
    defaultInput: { nodes: defaultNodes, rootId: "n4", nodeValueA: 1, nodeValueB: 3 },
  },
  execute: executeLowestCommonAncestor,
  generateSteps: generateLowestCommonAncestorSteps,
  educational: lowestCommonAncestorEducational,
  sources: {
    typescript: typescriptSource,
    python: pythonSource,
    java: javaSource,
    rust: rustSource,
    cpp: cppSource,
    go: goSource,
  },
};

registry.register(lowestCommonAncestorDefinition);
