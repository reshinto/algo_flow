// Zigzag Level-Order Traversal — BFS with alternating left-right direction per level
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class ZigzagLevelOrder {
    public List<List<Integer>> zigzagLevelOrder(BSTNode root) {
        List<List<Integer>> result = new ArrayList<>(); // @step:initialize
        if (root == null) return result; // @step:initialize

        Queue<BSTNode> queue = new LinkedList<>(); // @step:initialize
        queue.offer(root); // @step:initialize
        boolean leftToRight = true; // @step:initialize

        while (!queue.isEmpty()) { // @step:enqueue-node
            int levelSize = queue.size(); // @step:enqueue-node
            Integer[] currentLevel = new Integer[levelSize]; // @step:enqueue-node

            for (int nodeIndex = 0; nodeIndex < levelSize; nodeIndex++) { // @step:dequeue-node
                BSTNode node = queue.poll(); // @step:dequeue-node

                // Insert at front or back based on current direction
                int insertIndex = leftToRight ? nodeIndex : levelSize - 1 - nodeIndex; // @step:visit
                currentLevel[insertIndex] = node.value; // @step:visit

                if (node.left != null) { // @step:enqueue-node
                    queue.offer(node.left); // @step:enqueue-node
                }
                if (node.right != null) { // @step:enqueue-node
                    queue.offer(node.right); // @step:enqueue-node
                }
            }

            List<Integer> levelList = new ArrayList<>(); // @step:visit
            for (int value : currentLevel) levelList.add(value); // @step:visit
            result.add(levelList); // @step:visit
            leftToRight = !leftToRight; // @step:visit
        }

        return result; // @step:complete
    }
}
