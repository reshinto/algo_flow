// Reverse Level-Order Traversal — BFS bottom-up: deepest level first
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class ReverseLevelOrder {
    public List<List<Integer>> reverseLevelOrder(BSTNode root) {
        List<List<Integer>> result = new LinkedList<>(); // @step:initialize
        if (root == null) return result; // @step:initialize

        Queue<BSTNode> queue = new LinkedList<>(); // @step:initialize
        queue.offer(root); // @step:initialize

        while (!queue.isEmpty()) { // @step:enqueue-node
            int levelSize = queue.size(); // @step:enqueue-node
            List<Integer> currentLevel = new ArrayList<>(); // @step:enqueue-node

            for (int nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) { // @step:dequeue-node
                BSTNode node = queue.poll(); // @step:dequeue-node
                currentLevel.add(node.value); // @step:visit

                if (node.left != null) { // @step:enqueue-node
                    queue.offer(node.left); // @step:enqueue-node
                }
                if (node.right != null) { // @step:enqueue-node
                    queue.offer(node.right); // @step:enqueue-node
                }
            }

            // Prepend level to get bottom-up order
            ((LinkedList<List<Integer>>) result).addFirst(currentLevel); // @step:visit
        }

        return result; // @step:complete
    }
}
