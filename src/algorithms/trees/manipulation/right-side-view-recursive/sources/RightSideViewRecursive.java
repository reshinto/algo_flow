// Right Side View Recursive — DFS: visit right child first, record first node seen at each depth

import java.util.*;

class BinaryNode {
    int value;
    BinaryNode left, right;
    BinaryNode(int value) { this.value = value; }
}

class RightSideViewRecursive {
    public List<Integer> rightSideViewRecursive(BinaryNode root) {
        List<Integer> result = new ArrayList<>(); // @step:initialize
        dfs(root, 0, result);
        return result; // @step:complete
    }

    private void dfs(BinaryNode node, int depth, List<Integer> result) {
        if (node == null) return; // @step:initialize

        // First node encountered at this depth is visible from the right
        if (depth == result.size()) { // @step:visit
            result.add(node.value); // @step:collect-element
        }

        // Visit right child first to ensure rightmost value is recorded first
        dfs(node.right, depth + 1, result); // @step:traverse-right
        dfs(node.left, depth + 1, result); // @step:traverse-left
    }
}
