// Level-Order Traversal — BFS visiting nodes level by level using a queue
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class LevelOrderTraversal {
    public List<List<Integer>> levelOrderTraversal(BSTNode root) {
        List<List<Integer>> result = new ArrayList<>(); // @step:initialize
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

            result.add(currentLevel); // @step:visit
        }

        return result; // @step:complete
    }
}
