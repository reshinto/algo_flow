// BST Pre-Order Traversal (Iterative) — NLR using an explicit stack
import java.util.ArrayList;
import java.util.Deque;
import java.util.ArrayDeque;
import java.util.List;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTPreorderIterative {
    public List<Integer> bstPreorderIterative(BSTNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        if (root == null) return result; // @step:initialize

        Deque<BSTNode> stack = new ArrayDeque<>(); // @step:initialize
        stack.push(root); // @step:initialize

        while (!stack.isEmpty()) { // @step:initialize
            BSTNode node = stack.pop(); // @step:pop-from-stack
            result.add(node.value); // @step:visit

            // Push right first so left is processed first (LIFO)
            if (node.right != null) { // @step:push-to-stack
                stack.push(node.right); // @step:push-to-stack
            }
            if (node.left != null) { // @step:traverse-left
                stack.push(node.left); // @step:traverse-left
            }
        }

        return result; // @step:complete
    }
}
