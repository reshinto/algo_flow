// All Root-to-Leaf Paths (Iterative) — stack-based with path tracking

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function allRootToLeafPathsIterative(root: TreeNode | null): string[] {
  if (root === null) return []; // @step:initialize

  const paths: string[] = []; // @step:initialize
  const stack: Array<[TreeNode, string]> = [[root, String(root.value)]]; // @step:initialize

  while (stack.length > 0) {
    // @step:visit
    const entry = stack.pop()!; // @step:visit
    const [current, pathSoFar] = entry; // @step:visit

    // Leaf node — record complete path
    if (current.left === null && current.right === null) {
      // @step:check-balance
      paths.push(pathSoFar); // @step:add-to-result
    }

    if (current.right !== null) {
      // @step:traverse-right
      stack.push([current.right, `${pathSoFar}->${current.right.value}`]); // @step:traverse-right
    }

    if (current.left !== null) {
      // @step:traverse-left
      stack.push([current.left, `${pathSoFar}->${current.left.value}`]); // @step:traverse-left
    }
  }

  return paths; // @step:complete
}
