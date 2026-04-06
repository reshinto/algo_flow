// BST Post-Order Traversal (Iterative) — LRN using two stacks
import java.util.ArrayList;
import java.util.Deque;
import java.util.ArrayDeque;
import java.util.List;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class BSTPostorderIterative {
    public List<Integer> bstPostorderIterative(BSTNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        if (root == null) return result; // @step:initialize

        Deque<BSTNode> stack1 = new ArrayDeque<>(); // @step:initialize
        Deque<BSTNode> stack2 = new ArrayDeque<>(); // @step:initialize
        stack1.push(root); // @step:initialize

        // Phase 1: push nodes onto stack2 in reverse post-order
        while (!stack1.isEmpty()) { // @step:push-to-stack
            BSTNode node = stack1.pop(); // @step:pop-from-stack
            stack2.push(node); // @step:push-to-stack

            if (node.left != null) { // @step:traverse-left
                stack1.push(node.left); // @step:traverse-left
            }
            if (node.right != null) { // @step:traverse-right
                stack1.push(node.right); // @step:traverse-right
            }
        }

        // Phase 2: pop stack2 in post-order and visit each node
        while (!stack2.isEmpty()) { // @step:visit
            BSTNode node = stack2.pop(); // @step:pop-from-stack
            result.add(node.value); // @step:visit
        }

        return result; // @step:complete
    }
}
