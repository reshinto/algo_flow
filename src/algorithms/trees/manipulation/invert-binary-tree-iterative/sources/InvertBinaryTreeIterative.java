// Invert Binary Tree Iterative — BFS with queue: swap children level by level
import java.util.LinkedList;
import java.util.Queue;

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class InvertBinaryTreeIterative {
    public BinaryNode invertBinaryTreeIterative(BinaryNode root) {
        if (root == null) return null; // @step:initialize

        Queue<BinaryNode> queue = new LinkedList<>(); // @step:initialize
        queue.offer(root); // @step:initialize

        while (!queue.isEmpty()) { // @step:initialize
            BinaryNode current = queue.poll(); // @step:dequeue

            // Swap left and right children
            BinaryNode temp = current.left; // @step:swap-children
            current.left = current.right; // @step:swap-children
            current.right = temp; // @step:swap-children

            // Enqueue non-null children for processing
            if (current.left != null) queue.offer(current.left); // @step:enqueue
            if (current.right != null) queue.offer(current.right); // @step:enqueue
        }

        return root; // @step:complete
    }
}
