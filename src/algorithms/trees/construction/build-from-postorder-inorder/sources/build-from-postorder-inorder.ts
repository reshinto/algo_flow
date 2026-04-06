// Build Binary Tree from Postorder + Inorder Traversal (Recursive)
// Last element of postorder is root; find root in inorder to split left/right subtrees

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildFromPostorderInorder(postorder: number[], inorder: number[]): TreeNode | null {
  if (postorder.length === 0 || inorder.length === 0) return null; // @step:initialize

  const rootValue = postorder[postorder.length - 1]; // @step:select-element
  if (rootValue === undefined) return null;

  const root: TreeNode = { value: rootValue, left: null, right: null }; // @step:build-node

  const inorderRootIndex = inorder.indexOf(rootValue); // @step:partition-array

  // Split inorder and postorder into left/right subtrees
  const leftInorder = inorder.slice(0, inorderRootIndex); // @step:partition-array
  const rightInorder = inorder.slice(inorderRootIndex + 1); // @step:partition-array

  const leftPostorder = postorder.slice(0, leftInorder.length); // @step:partition-array
  const rightPostorder = postorder.slice(leftInorder.length, postorder.length - 1); // @step:partition-array

  root.left = buildFromPostorderInorder(leftPostorder, leftInorder); // @step:connect-child
  root.right = buildFromPostorderInorder(rightPostorder, rightInorder); // @step:connect-child

  return root; // @step:visit
}
