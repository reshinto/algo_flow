// Diagonal Traversal — group nodes by diagonal (right = same diagonal, left = next diagonal)
import java.util.*;

class BSTNode {
    int value;
    BSTNode left, right;
    BSTNode(int value) { this.value = value; }
}

class DiagonalTraversal {
    public List<List<Integer>> diagonalTraversal(BSTNode root) {
        List<List<Integer>> result = new ArrayList<>(); // @step:initialize
        if (root == null) return result; // @step:initialize

        Queue<BSTNode> nodeQueue = new LinkedList<>(); // @step:initialize
        Map<BSTNode, Integer> diagMap = new IdentityHashMap<>(); // @step:initialize
        Map<Integer, List<Integer>> diagonalStore = new TreeMap<>(); // @step:initialize
        nodeQueue.offer(root); // @step:initialize
        diagMap.put(root, 0); // @step:initialize

        while (!nodeQueue.isEmpty()) { // @step:enqueue-node
            BSTNode node = nodeQueue.poll(); // @step:dequeue-node
            int diagonal = diagMap.get(node); // @step:dequeue-node

            diagonalStore.computeIfAbsent(diagonal, k -> new ArrayList<>()).add(node.value); // @step:visit

            // Right child stays on same diagonal
            if (node.right != null) { // @step:traverse-right
                diagMap.put(node.right, diagonal); // @step:traverse-right
                nodeQueue.offer(node.right); // @step:traverse-right
            }
            // Left child moves to next diagonal
            if (node.left != null) { // @step:traverse-left
                diagMap.put(node.left, diagonal + 1); // @step:traverse-left
                nodeQueue.offer(node.left); // @step:traverse-left
            }
        }

        result.addAll(diagonalStore.values()); // @step:visit

        return result; // @step:complete
    }
}
