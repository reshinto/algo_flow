// Same Tree — recursive: check structural equality and value equality

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function sameTree(treeA: BinaryNode | null, treeB: BinaryNode | null): boolean {
  if (treeA === null && treeB === null) return true; // @step:initialize
  if (treeA === null || treeB === null) return false; // @step:compare
  if (treeA.value !== treeB.value) return false; // @step:compare

  // Recursively check left and right subtrees
  const leftMatch = sameTree(treeA.left, treeB.left); // @step:traverse-left
  const rightMatch = sameTree(treeA.right, treeB.right); // @step:traverse-right

  return leftMatch && rightMatch; // @step:visit
}
