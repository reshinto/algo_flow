// Right Side View — BFS: collect the last node of each level

import java.util.*;

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class RightSideView {
    public List<Integer> rightSideView(BinaryNode root) {
        List<Integer> result = new ArrayList<>();
        if (root == null) return result; // @step:initialize

        Queue<BinaryNode> queue = new LinkedList<>();
        queue.add(root); // @step:initialize

        while (!queue.isEmpty()) { // @step:visit
            int levelSize = queue.size(); // @step:visit

            for (int position = 0; position < levelSize; position++) { // @step:visit
                BinaryNode node = queue.poll(); // @step:dequeue

                // The last node of this level is visible from the right side
                if (position == levelSize - 1) { // @step:collect-element
                    result.add(node.value); // @step:collect-element
                }

                if (node.left != null) queue.add(node.left); // @step:enqueue
                if (node.right != null) queue.add(node.right); // @step:enqueue
            }
        }

        return result; // @step:complete
    }
}
