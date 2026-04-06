// Flip Equivalent Trees — recursive: trees are flip-equivalent if children match or are swapped

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function flipEquivalentTrees(treeA: BinaryNode | null, treeB: BinaryNode | null): boolean {
  if (treeA === null && treeB === null) return true; // @step:initialize
  if (treeA === null || treeB === null) return false; // @step:compare
  if (treeA.value !== treeB.value) return false; // @step:compare

  // Check if children match without flipping
  const noFlip = // @step:traverse-left
    flipEquivalentTrees(treeA.left, treeB.left) && // @step:traverse-left
    flipEquivalentTrees(treeA.right, treeB.right); // @step:traverse-right

  // Check if children match with flipping
  const withFlip = // @step:traverse-left
    flipEquivalentTrees(treeA.left, treeB.right) && // @step:traverse-left
    flipEquivalentTrees(treeA.right, treeB.left); // @step:traverse-right

  return noFlip || withFlip; // @step:visit
}
