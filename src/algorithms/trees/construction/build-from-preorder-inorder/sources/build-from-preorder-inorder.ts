// Build Binary Tree from Preorder + Inorder Traversal (Recursive)
// First element of preorder is root; find root in inorder to split left/right subtrees

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildFromPreorderInorder(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0 || inorder.length === 0) return null; // @step:initialize

  const rootValue = preorder[0]; // @step:select-element
  if (rootValue === undefined) return null;

  const root: TreeNode = { value: rootValue, left: null, right: null }; // @step:build-node

  const inorderRootIndex = inorder.indexOf(rootValue); // @step:partition-array

  // Left subtree uses inorder[0..inorderRootIndex-1] and corresponding preorder slice
  const leftInorder = inorder.slice(0, inorderRootIndex); // @step:partition-array
  const leftPreorder = preorder.slice(1, 1 + leftInorder.length); // @step:partition-array

  // Right subtree uses inorder[inorderRootIndex+1..] and the remaining preorder elements
  const rightInorder = inorder.slice(inorderRootIndex + 1); // @step:partition-array
  const rightPreorder = preorder.slice(1 + leftInorder.length); // @step:partition-array

  root.left = buildFromPreorderInorder(leftPreorder, leftInorder); // @step:connect-child
  root.right = buildFromPreorderInorder(rightPreorder, rightInorder); // @step:connect-child

  return root; // @step:visit
}
