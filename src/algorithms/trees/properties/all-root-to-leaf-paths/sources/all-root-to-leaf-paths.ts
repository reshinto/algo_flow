// All Root-to-Leaf Paths — recursive DFS collecting all paths as strings

interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function allRootToLeafPaths(root: TreeNode | null): string[] {
  const paths: string[] = []; // @step:initialize

  function dfs(node: TreeNode | null, currentPath: string): void {
    if (node === null) return; // @step:initialize

    const pathSoFar = currentPath.length > 0 ? `${currentPath}->${node.value}` : String(node.value); // @step:visit

    // Leaf node — record this complete path
    if (node.left === null && node.right === null) {
      // @step:visit
      paths.push(pathSoFar); // @step:add-to-result
      return;
    }

    dfs(node.left, pathSoFar); // @step:traverse-left
    dfs(node.right, pathSoFar); // @step:traverse-right
  }

  dfs(root, ""); // @step:initialize
  return paths; // @step:complete
}
