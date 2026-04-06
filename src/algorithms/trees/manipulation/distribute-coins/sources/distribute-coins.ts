// Distribute Coins — DFS: each node sends or receives excess coins from children

interface BinaryNode {
  value: number; // number of coins at this node
  left: BinaryNode | null;
  right: BinaryNode | null;
}

function distributeCoins(root: BinaryNode | null): number {
  let totalMoves = 0; // @step:initialize

  function dfs(node: BinaryNode | null): number {
    if (node === null) return 0; // @step:initialize

    // Get excess from left and right children
    const leftExcess = dfs(node.left); // @step:traverse-left
    const rightExcess = dfs(node.right); // @step:traverse-right

    // Each move on the edge to a child counts
    totalMoves += Math.abs(leftExcess) + Math.abs(rightExcess); // @step:accumulate

    // Excess this node sends upward: (coins here) + (excess from children) - 1 (keep 1)
    return node.value + leftExcess + rightExcess - 1; // @step:visit
  }

  dfs(root); // @step:initialize
  return totalMoves; // @step:complete
}
