// Is Symmetric Tree (Iterative) — queue-based: enqueue pairs and compare
import java.util.LinkedList;
import java.util.Queue;

class SymmetricTreeIterativeNode {
    int value;
    SymmetricTreeIterativeNode left, right;
    SymmetricTreeIterativeNode(int value) { this.value = value; }
}

class IsSymmetricTreeIterative {
    public boolean isSymmetricTreeIterative(SymmetricTreeIterativeNode root) {
        if (root == null) return true; // @step:initialize

        Queue<SymmetricTreeIterativeNode> queue = new LinkedList<>(); // @step:initialize
        queue.offer(root.left); // @step:initialize
        queue.offer(root.right); // @step:initialize

        while (!queue.isEmpty()) { // @step:visit
            SymmetricTreeIterativeNode leftNode = queue.poll(); // @step:visit
            SymmetricTreeIterativeNode rightNode = queue.poll(); // @step:visit

            if (leftNode == null && rightNode == null) continue; // @step:check-balance
            if (leftNode == null || rightNode == null) return false; // @step:check-balance
            if (leftNode.value != rightNode.value) return false; // @step:check-balance

            // Enqueue outer pair and inner pair
            queue.offer(leftNode.left); // @step:traverse-left
            queue.offer(rightNode.right); // @step:traverse-left
            queue.offer(leftNode.right); // @step:traverse-right
            queue.offer(rightNode.left); // @step:traverse-right
        }

        return true; // @step:complete
    }
}
