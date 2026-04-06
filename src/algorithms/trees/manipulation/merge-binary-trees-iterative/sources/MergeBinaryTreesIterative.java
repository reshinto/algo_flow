// Merge Binary Trees Iterative — stack-based pair comparison and merge

import java.util.*;

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class MergeBinaryTreesIterative {
    public BinaryNode mergeBinaryTreesIterative(BinaryNode treeA, BinaryNode treeB) {
        if (treeA == null) return treeB; // @step:initialize

        Deque<BinaryNode[]> stack = new ArrayDeque<>(); // @step:initialize

        if (treeB != null) { // @step:initialize
            stack.push(new BinaryNode[]{treeA, treeB}); // @step:initialize
        }

        while (!stack.isEmpty()) { // @step:visit
            BinaryNode[] pair = stack.pop(); // @step:visit
            BinaryNode nodeA = pair[0];
            BinaryNode nodeB = pair[1];

            // Merge values
            nodeA.value = nodeA.value + nodeB.value; // @step:merge-node

            // Handle right children
            if (nodeA.right == null) { // @step:connect-child
                nodeA.right = nodeB.right; // @step:connect-child
            } else if (nodeB.right != null) { // @step:connect-child
                stack.push(new BinaryNode[]{nodeA.right, nodeB.right}); // @step:enqueue
            }

            // Handle left children
            if (nodeA.left == null) { // @step:connect-child
                nodeA.left = nodeB.left; // @step:connect-child
            } else if (nodeB.left != null) { // @step:connect-child
                stack.push(new BinaryNode[]{nodeA.left, nodeB.left}); // @step:enqueue
            }
        }

        return treeA; // @step:complete
    }
}
