// BST Validation (Iterative) — stack-based in-order traversal checking ascending order
import java.util.Stack;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTValidationIterative {
    public boolean bstValidationIterative(BSTNode root) {
        Stack<BSTNode> stack = new Stack<>(); // @step:initialize
        long previousValue = Long.MIN_VALUE;
        BSTNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Push all left nodes onto the stack
            while (current != null) {
                stack.push(current); // @step:search-node
                current = current.left;
            }

            // Process the top of the stack
            current = stack.pop();

            // In-order value must be strictly greater than the previous one
            if (current.value <= previousValue) {
                return false; // @step:found — BST violation detected
            }

            previousValue = current.value; // @step:search-node
            current = current.right;
        }

        return true; // @step:complete — all values in ascending order
    }
}
