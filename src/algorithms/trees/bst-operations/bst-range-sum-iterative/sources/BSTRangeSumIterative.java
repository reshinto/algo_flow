// BST Range Sum (Iterative) — stack-based DFS summing nodes in [lowValue, highValue]
import java.util.Stack;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTRangeSumIterative {
    public int bstRangeSumIterative(BSTNode root, int lowValue, int highValue) {
        if (root == null) return 0; // @step:initialize

        Stack<BSTNode> stack = new Stack<>();
        stack.push(root);
        int totalSum = 0;

        while (!stack.isEmpty()) {
            BSTNode node = stack.pop();

            if (node.value >= lowValue && node.value <= highValue) {
                // Node is in range — add to sum
                totalSum += node.value; // @step:found
            }

            if (node.left != null && node.value > lowValue) {
                // Left child exists and may have values in range
                stack.push(node.left); // @step:search-node
            }

            if (node.right != null && node.value < highValue) {
                // Right child exists and may have values in range
                stack.push(node.right); // @step:search-node
            }
        }

        return totalSum; // @step:complete
    }
}
