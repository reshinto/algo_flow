// Subtree of Another Tree — recursive: for each node in main tree, check if subtree matches

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function isSameTree(treeA: BinaryNode | null, treeB: BinaryNode | null): boolean {
  if (treeA === null && treeB === null) return true;
  if (treeA === null || treeB === null) return false;
  if (treeA.value !== treeB.value) return false;
  return isSameTree(treeA.left, treeB.left) && isSameTree(treeA.right, treeB.right);
}

function subtreeOfAnotherTree(mainTree: BinaryNode | null, subTree: BinaryNode | null): boolean {
  if (subTree === null) return true; // @step:initialize
  if (mainTree === null) return false; // @step:initialize

  // Check if the tree rooted at mainTree matches subTree
  if (isSameTree(mainTree, subTree)) return true; // @step:compare

  // Recursively check left and right subtrees
  return (
    subtreeOfAnotherTree(mainTree.left, subTree) || // @step:traverse-left
    subtreeOfAnotherTree(mainTree.right, subTree)
  ); // @step:traverse-right
}
