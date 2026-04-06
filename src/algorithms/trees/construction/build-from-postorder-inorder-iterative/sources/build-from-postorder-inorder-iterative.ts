// Build Binary Tree from Postorder + Inorder (Iterative with Stack)
// Processes postorder right-to-left; uses inorder (processed right-to-left too)
// to determine when to switch from right-child insertion to left-child insertion.

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function buildFromPostorderInorderIterative(
  postorder: number[],
  inorder: number[],
): TreeNode | null {
  if (postorder.length === 0) return null; // @step:initialize

  const lastValue = postorder[postorder.length - 1]; // @step:initialize
  if (lastValue === undefined) return null;

  const root: TreeNode = { value: lastValue, left: null, right: null }; // @step:build-node
  const stack: TreeNode[] = [root]; // @step:initialize
  let inorderPointer = inorder.length - 1; // @step:initialize

  for (let postorderPointer = postorder.length - 2; postorderPointer >= 0; postorderPointer--) {
    // @step:select-element
    const currentValue = postorder[postorderPointer]; // @step:select-element
    if (currentValue === undefined) break;

    let parentNode = stack[stack.length - 1]; // @step:search-node
    if (parentNode === undefined) break;

    const newNode: TreeNode = { value: currentValue, left: null, right: null }; // @step:build-node

    // If stack top differs from current inorder pointer, insert as right child
    if (parentNode.value !== inorder[inorderPointer]) {
      parentNode.right = newNode; // @step:connect-child
    } else {
      // Pop nodes matching inorder (right-to-left) to find left-child parent
      while (stack.length > 0 && stack[stack.length - 1]?.value === inorder[inorderPointer]) {
        // @step:partition-array
        parentNode = stack.pop()!; // @step:partition-array
        inorderPointer--; // @step:partition-array
      }
      parentNode.left = newNode; // @step:connect-child
    }

    stack.push(newNode); // @step:visit
  }

  return root; // @step:visit
}
