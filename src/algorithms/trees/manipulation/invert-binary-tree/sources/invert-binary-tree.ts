// Invert Binary Tree — recursive: swap left and right children at every node

interface BinaryNode {
  value: number;
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function invertBinaryTree(root: BinaryNode | null): BinaryNode | null {
  if (root === null) return null; // @step:initialize

  // Recursively invert the left subtree
  const invertedLeft = invertBinaryTree(root.left); // @step:traverse-left
  // Recursively invert the right subtree
  const invertedRight = invertBinaryTree(root.right); // @step:traverse-right

  // Swap left and right children
  root.left = invertedRight; // @step:swap-children
  root.right = invertedLeft; // @step:swap-children

  return root; // @step:visit
}
