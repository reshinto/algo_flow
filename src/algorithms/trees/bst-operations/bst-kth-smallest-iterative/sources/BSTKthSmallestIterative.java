// BST Kth Smallest (Iterative) — stack-based in-order with counter
import java.util.Stack;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTKthSmallestIterative {
    public int bstKthSmallestIterative(BSTNode root, int kthPosition) {
        Stack<BSTNode> stack = new Stack<>(); // @step:initialize
        int counter = 0;
        BSTNode current = root;

        while (current != null || !stack.isEmpty()) {
            // Push all left nodes — they have smaller values
            while (current != null) {
                stack.push(current); // @step:search-node
                current = current.left;
            }

            // Process next in-order node
            current = stack.pop();
            counter++;

            if (counter == kthPosition) {
                return current.value; // @step:found
            }

            // Move to right subtree
            current = current.right; // @step:search-node
        }

        return -1; // @step:complete — k exceeds number of nodes
    }
}
