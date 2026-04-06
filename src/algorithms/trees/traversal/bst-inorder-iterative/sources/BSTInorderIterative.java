// BST In-Order Traversal (Iterative) — LNR using an explicit stack
import java.util.ArrayList;
import java.util.Deque;
import java.util.ArrayDeque;
import java.util.List;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTInorderIterative {
    public List<Integer> bstInorderIterative(BSTNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        Deque<BSTNode> stack = new ArrayDeque<>(); // @step:initialize
        BSTNode current = root; // @step:initialize

        while (current != null || !stack.isEmpty()) { // @step:initialize
            // Push all left children onto the stack
            while (current != null) { // @step:push-to-stack
                stack.push(current); // @step:push-to-stack
                current = current.left; // @step:traverse-left
            }

            // Pop the top node and visit it
            current = stack.pop(); // @step:pop-from-stack
            result.add(current.value); // @step:visit

            // Move to right subtree
            current = current.right; // @step:traverse-right
        }

        return result; // @step:complete
    }
}
