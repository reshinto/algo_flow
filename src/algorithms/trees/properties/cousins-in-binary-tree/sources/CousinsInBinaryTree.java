// Cousins in Binary Tree — BFS: check if two nodes are at same depth with different parents
import java.util.LinkedList;
import java.util.Queue;

class CousinsNode {
    int value;
    CousinsNode left, right;
    CousinsNode(int value) { this.value = value; }
}

class CousinsInBinaryTree {
    public boolean cousinsInBinaryTree(CousinsNode root, int nodeValueA, int nodeValueB) {
        if (root == null) return false; // @step:initialize

        Queue<Object[]> queue = new LinkedList<>(); // @step:initialize
        queue.offer(new Object[]{root, null, 0}); // @step:initialize

        CousinsNode parentA = null; // @step:initialize
        CousinsNode parentB = null; // @step:initialize
        int depthA = -1; // @step:initialize
        int depthB = -1; // @step:initialize

        while (!queue.isEmpty()) { // @step:visit
            Object[] entry = queue.poll(); // @step:visit
            CousinsNode current = (CousinsNode) entry[0]; // @step:visit
            CousinsNode parent = (CousinsNode) entry[1]; // @step:visit
            int currentDepth = (int) entry[2]; // @step:visit

            if (current.value == nodeValueA) { // @step:check-balance
                parentA = parent; // @step:check-balance
                depthA = currentDepth; // @step:update-height
            }

            if (current.value == nodeValueB) { // @step:check-balance
                parentB = parent; // @step:check-balance
                depthB = currentDepth; // @step:update-height
            }

            if (current.left != null) queue.offer(new Object[]{current.left, current, currentDepth + 1}); // @step:traverse-left
            if (current.right != null) queue.offer(new Object[]{current.right, current, currentDepth + 1}); // @step:traverse-right
        }

        // Cousins: same depth, different parents
        return depthA == depthB && parentA != parentB; // @step:complete
    }
}
