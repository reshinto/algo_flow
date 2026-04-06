// Vertical-Order Traversal — BFS grouping nodes by vertical column index
import java.util.*;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class VerticalOrderTraversal {
    public List<List<Integer>> verticalOrderTraversal(BSTNode root) {
        List<List<Integer>> result = new ArrayList<>(); // @step:initialize
        if (root == null) return result; // @step:initialize

        // Queue stores int[] {nodeRef index, column} but we track via map
        Queue<int[]> queue = new LinkedList<>(); // @step:initialize
        Map<BSTNode, int[]> nodeInfo = new IdentityHashMap<>(); // @step:initialize
        Map<Integer, List<Integer>> columnMap = new TreeMap<>(); // @step:initialize
        queue.offer(new int[]{0}); // @step:initialize
        nodeInfo.put(root, new int[]{0}); // @step:initialize

        Queue<BSTNode> nodeQueue = new LinkedList<>(); // @step:initialize
        nodeQueue.offer(root); // @step:initialize
        int[] colTracker = {0}; // @step:initialize
        Map<BSTNode, Integer> colMap = new IdentityHashMap<>(); // @step:initialize
        colMap.put(root, 0); // @step:initialize

        while (!nodeQueue.isEmpty()) { // @step:enqueue-node
            BSTNode node = nodeQueue.poll(); // @step:dequeue-node
            int column = colMap.get(node); // @step:dequeue-node

            // Record this node's value in its column
            columnMap.computeIfAbsent(column, k -> new ArrayList<>()).add(node.value); // @step:visit

            if (node.left != null) { // @step:enqueue-node
                colMap.put(node.left, column - 1); // @step:enqueue-node
                nodeQueue.offer(node.left); // @step:enqueue-node
            }
            if (node.right != null) { // @step:enqueue-node
                colMap.put(node.right, column + 1); // @step:enqueue-node
                nodeQueue.offer(node.right); // @step:enqueue-node
            }
        }

        // TreeMap already sorted by column key
        result.addAll(columnMap.values()); // @step:visit

        return result; // @step:complete
    }
}
