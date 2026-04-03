// Tree Sort — insert all elements into a Binary Search Tree, then extract via inorder traversal

interface BstNode {
  value: number;
  left: BstNode | null;
  right: BstNode | null;
}

function createNode(value: number): BstNode {
  return { value, left: null, right: null };
}

function insertNode(root: BstNode | null, value: number): BstNode {
  // @step:insert
  if (root === null) {
    return createNode(value); // @step:insert
  }

  if (value < root.value) {
    // @step:compare
    root.left = insertNode(root.left, value); // @step:insert
  } else {
    root.right = insertNode(root.right, value); // @step:insert
  }

  return root; // @step:insert
}

function inorderTraversal(root: BstNode | null, result: number[]): void {
  // @step:extract
  if (root === null) {
    return; // @step:extract
  }

  inorderTraversal(root.left, result); // @step:extract
  result.push(root.value); // @step:mark-sorted
  inorderTraversal(root.right, result); // @step:extract
}

function treeSort(inputArray: number[]): number[] {
  // @step:initialize
  const arrayLength = inputArray.length; // @step:initialize

  if (arrayLength === 0) {
    return []; // @step:complete
  }

  let treeRoot: BstNode | null = null; // @step:initialize

  // Insert each element into the BST
  for (let insertIndex = 0; insertIndex < arrayLength; insertIndex++) {
    // @step:insert
    treeRoot = insertNode(treeRoot, inputArray[insertIndex]!); // @step:insert
  }

  // Extract sorted order via inorder traversal
  const sortedArray: number[] = []; // @step:extract
  inorderTraversal(treeRoot, sortedArray); // @step:extract

  // @step:mark-sorted
  return sortedArray; // @step:complete
}
