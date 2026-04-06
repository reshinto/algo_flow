// Distribute Coins — DFS: each node sends or receives excess coins from children

class BinaryNode {
    int value;  // number of coins at this node
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class DistributeCoins {
    private int totalMoves = 0; // @step:initialize

    public int distributeCoins(BinaryNode root) {
        totalMoves = 0;
        dfs(root); // @step:initialize
        return totalMoves; // @step:complete
    }

    private int dfs(BinaryNode node) {
        if (node == null) return 0; // @step:initialize

        // Get excess from left and right children
        int leftExcess = dfs(node.left); // @step:traverse-left
        int rightExcess = dfs(node.right); // @step:traverse-right

        // Each move on the edge to a child counts
        totalMoves += Math.abs(leftExcess) + Math.abs(rightExcess); // @step:accumulate

        // Excess this node sends upward: (coins here) + (excess from children) - 1 (keep 1)
        return node.value + leftExcess + rightExcess - 1; // @step:visit
    }
}
