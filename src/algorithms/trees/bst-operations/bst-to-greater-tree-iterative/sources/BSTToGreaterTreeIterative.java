// BST to Greater Tree (Iterative) — stack-based reverse in-order accumulation
import java.util.Stack;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTToGreaterTreeIterative {
    public BSTNode bstToGreaterTreeIterative(BSTNode root) {
        Stack<BSTNode> stack = new Stack<>(); // @step:initialize
        int runningSum = 0;
        BSTNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Push all right nodes first (reverse in-order visits right subtree first)
            while (current != null) {
                stack.push(current); // @step:search-node
                current = current.right;
            }

            // Process the top node
            current = stack.pop();

            // Accumulate sum and update node value
            runningSum += current.value; // @step:found
            current.value = runningSum;

            // Move to left subtree
            current = current.left; // @step:search-node
        }

        return root; // @step:complete
    }
}
