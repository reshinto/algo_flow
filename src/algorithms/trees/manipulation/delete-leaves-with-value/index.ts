import type { AlgorithmDefinition, TreeNode } from "@/types";
import { registry } from "@/registry";
import { ALGORITHM_ID, CATEGORY } from "@/utils/constants";

import { deleteLeavesWithValue } from "./sources/delete-leaves-with-value.ts?fn";
import { generateDeleteLeavesWithValueSteps } from "./step-generator";
import type { DeleteLeavesWithValueInput } from "./step-generator";
import { deleteLeavesWithValueEducational } from "./educational";

import typescriptSource from "./sources/delete-leaves-with-value.ts?raw";
import pythonSource from "./sources/delete-leaves-with-value.py?raw";
import javaSource from "./sources/DeleteLeavesWithValue.java?raw";

/** Standard 7-node balanced BST. Target=1 will delete leaf n1, then check if n2 becomes a leaf. */
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

function executeDeleteLeavesWithValue(input: DeleteLeavesWithValueInput): number[] {
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
  const resultRoot = deleteLeavesWithValue(root, input.targetValue) as BinaryNode | null;
  const result: number[] = [];
  const bfsQueue: (BinaryNode | null)[] = [resultRoot];
  while (bfsQueue.length > 0) {
    const current = bfsQueue.shift();
    if (current != null) {
      result.push(current.value);
      bfsQueue.push(current.left, current.right);
    }
  }
  return result;
}

const deleteLeavesWithValueDefinition: AlgorithmDefinition<DeleteLeavesWithValueInput> = {
  meta: {
    id: ALGORITHM_ID.DELETE_LEAVES_WITH_VALUE!,
    name: "Delete Leaves With Value",
    category: CATEGORY.TREES!,
    technique: "manipulation",
    description:
      "Post-order recursive deletion of all leaf nodes whose value equals the target, cascading upward as former internal nodes become leaves",
    timeComplexity: { best: "O(n)", average: "O(n)", worst: "O(n)" },
    spaceComplexity: "O(h)",
    supportedLanguages: ["typescript", "python", "java"],
    defaultInput: { nodes: defaultNodes, rootId: "n4", targetValue: 1 },
  },
  execute: executeDeleteLeavesWithValue,
  generateSteps: generateDeleteLeavesWithValueSteps,
  educational: deleteLeavesWithValueEducational,
  sources: { typescript: typescriptSource, python: pythonSource, java: javaSource },
};

registry.register(deleteLeavesWithValueDefinition);
