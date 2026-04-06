// Minimum Depth of Binary Tree — BFS returns depth at first leaf encountered
import java.util.LinkedList;
import java.util.Queue;

class MinimumDepthIterativeNode {
    int value;
    MinimumDepthIterativeNode left, right;
    MinimumDepthIterativeNode(int value) { this.value = value; }
}

class MinimumDepthIterative {
    public int minimumDepthIterative(MinimumDepthIterativeNode root) {
        if (root == null) return 0; // @step:initialize

        Queue<MinimumDepthIterativeNode> queue = new LinkedList<>(); // @step:initialize
        queue.offer(root); // @step:initialize
        int depth = 0; // @step:initialize

        while (!queue.isEmpty()) { // @step:visit
            int levelSize = queue.size(); // @step:visit
            depth++; // @step:update-height

            for (int nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) { // @step:visit
                MinimumDepthIterativeNode current = queue.poll(); // @step:visit

                // First leaf node encountered is the minimum depth
                if (current.left == null && current.right == null) { // @step:visit
                    return depth; // @step:complete
                }

                if (current.left != null) queue.offer(current.left); // @step:traverse-left
                if (current.right != null) queue.offer(current.right); // @step:traverse-right
            }
        }

        return depth; // @step:complete
    }
}
