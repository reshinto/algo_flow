// Lowest Common Ancestor Iterative — BFS to build parent map, then trace ancestors

import java.util.*;

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class LowestCommonAncestorIterative {
    public BinaryNode lowestCommonAncestorIterative(BinaryNode root, int nodeValueA, int nodeValueB) {
        if (root == null) return null; // @step:initialize

        // Build parent map using BFS
        Map<BinaryNode, BinaryNode> parentMap = new HashMap<>(); // @step:initialize
        parentMap.put(root, null); // @step:initialize
        Queue<BinaryNode> bfsQueue = new LinkedList<>(); // @step:initialize
        bfsQueue.add(root); // @step:initialize

        BinaryNode nodeA = null, nodeB = null;

        while (!bfsQueue.isEmpty() && (nodeA == null || nodeB == null)) { // @step:visit
            BinaryNode current = bfsQueue.poll(); // @step:dequeue

            if (current.value == nodeValueA) nodeA = current; // @step:compare
            if (current.value == nodeValueB) nodeB = current; // @step:compare

            if (current.left != null) { // @step:enqueue
                parentMap.put(current.left, current); // @step:enqueue
                bfsQueue.add(current.left); // @step:enqueue
            }
            if (current.right != null) { // @step:enqueue
                parentMap.put(current.right, current); // @step:enqueue
                bfsQueue.add(current.right); // @step:enqueue
            }
        }

        if (nodeA == null || nodeB == null) return null;

        // Trace ancestors of nodeA into a set
        Set<BinaryNode> ancestorsA = new HashSet<>(); // @step:visit
        BinaryNode traceNode = nodeA;
        while (traceNode != null) { // @step:visit
            ancestorsA.add(traceNode); // @step:visit
            traceNode = parentMap.get(traceNode); // @step:visit
        }

        // Walk ancestors of nodeB until we hit the first shared ancestor
        traceNode = nodeB;
        while (traceNode != null) { // @step:visit
            if (ancestorsA.contains(traceNode)) return traceNode; // @step:compare
            traceNode = parentMap.get(traceNode); // @step:visit
        }

        return null; // @step:complete
    }
}
