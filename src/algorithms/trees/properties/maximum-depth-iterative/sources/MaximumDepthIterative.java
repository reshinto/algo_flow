// Maximum Depth of Binary Tree — BFS level counting with a queue
import java.util.LinkedList;
import java.util.Queue;

class MaximumDepthIterativeNode {
    int value;
    MaximumDepthIterativeNode left, right;
    MaximumDepthIterativeNode(int value) { this.value = value; }
}

class MaximumDepthIterative {
    public int maximumDepthIterative(MaximumDepthIterativeNode root) {
        if (root == null) return 0; // @step:initialize

        Queue<MaximumDepthIterativeNode> queue = new LinkedList<>(); // @step:initialize
        queue.offer(root); // @step:initialize
        int depth = 0; // @step:initialize

        while (!queue.isEmpty()) { // @step:visit
            int levelSize = queue.size(); // @step:visit
            depth++; // @step:update-height

            // Process all nodes at the current level
            for (int nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) { // @step:visit
                MaximumDepthIterativeNode current = queue.poll(); // @step:visit
                if (current.left != null) queue.offer(current.left); // @step:traverse-left
                if (current.right != null) queue.offer(current.right); // @step:traverse-right
            }
        }

        return depth; // @step:complete
    }
}
