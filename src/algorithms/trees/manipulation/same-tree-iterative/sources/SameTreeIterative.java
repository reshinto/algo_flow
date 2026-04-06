// Same Tree Iterative — queue-based: compare pairs of nodes from both trees simultaneously

import java.util.*;

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class SameTreeIterative {
    public boolean sameTreeIterative(BinaryNode treeA, BinaryNode treeB) {
        Queue<BinaryNode[]> queue = new LinkedList<>();
        queue.add(new BinaryNode[]{treeA, treeB}); // @step:initialize

        while (!queue.isEmpty()) { // @step:visit
            BinaryNode[] pair = queue.poll(); // @step:dequeue
            BinaryNode nodeA = pair[0];
            BinaryNode nodeB = pair[1];

            if (nodeA == null && nodeB == null) continue; // @step:compare
            if (nodeA == null || nodeB == null) return false; // @step:compare
            if (nodeA.value != nodeB.value) return false; // @step:compare

            queue.add(new BinaryNode[]{nodeA.left, nodeB.left}); // @step:enqueue
            queue.add(new BinaryNode[]{nodeA.right, nodeB.right}); // @step:enqueue
        }

        return true; // @step:complete
    }
}
