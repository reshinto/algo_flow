// Build Binary Tree from Preorder + Inorder (Iterative with Stack)
// Uses a stack to simulate recursion — push nodes as we consume preorder values,
// pop when we detect a boundary via the inorder pointer.

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildFromPreorderInorderIterative(preorder: number[], inorder: number[]): TreeNode | null {
  if (preorder.length === 0) return null; // @step:initialize

  const firstValue = preorder[0]; // @step:initialize
  if (firstValue === undefined) return null;

  const root: TreeNode = { value: firstValue, left: null, right: null }; // @step:build-node
  const stack: TreeNode[] = [root]; // @step:initialize
  let inorderPointer = 0; // @step:initialize

  for (let preorderPointer = 1; preorderPointer < preorder.length; preorderPointer++) {
    // @step:select-element
    const currentValue = preorder[preorderPointer]; // @step:select-element
    if (currentValue === undefined) break;

    let parentNode = stack[stack.length - 1]; // @step:search-node
    if (parentNode === undefined) break;

    const newNode: TreeNode = { value: currentValue, left: null, right: null }; // @step:build-node

    // If stack top differs from current inorder value, go left
    if (parentNode.value !== inorder[inorderPointer]) {
      parentNode.left = newNode; // @step:connect-child
    } else {
      // Pop nodes that match inorder to find the parent for right insertion
      while (stack.length > 0 && stack[stack.length - 1]?.value === inorder[inorderPointer]) {
        // @step:partition-array
        parentNode = stack.pop()!; // @step:partition-array
        inorderPointer++; // @step:partition-array
      }
      parentNode.right = newNode; // @step:connect-child
    }

    stack.push(newNode); // @step:visit
  }

  return root; // @step:visit
}
