// All Root-to-Leaf Paths (Iterative) — stack-based with path tracking
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class PathsIterativeNode {
    int value;
    PathsIterativeNode left, right;
    PathsIterativeNode(int value) { this.value = value; }
}

class AllRootToLeafPathsIterative {
    public List<String> allRootToLeafPathsIterative(PathsIterativeNode root) {
        List<String> paths = new ArrayList<>(); // @step:initialize
        if (root == null) return paths; // @step:initialize

        Deque<Object[]> stack = new ArrayDeque<>(); // @step:initialize
        stack.push(new Object[]{root, String.valueOf(root.value)}); // @step:initialize

        while (!stack.isEmpty()) { // @step:visit
            Object[] entry = stack.pop(); // @step:visit
            PathsIterativeNode current = (PathsIterativeNode) entry[0]; // @step:visit
            String pathSoFar = (String) entry[1]; // @step:visit

            // Leaf node — record complete path
            if (current.left == null && current.right == null) { // @step:check-balance
                paths.add(pathSoFar); // @step:add-to-result
            }

            if (current.right != null) { // @step:traverse-right
                stack.push(new Object[]{current.right, pathSoFar + "->" + current.right.value}); // @step:traverse-right
            }

            if (current.left != null) { // @step:traverse-left
                stack.push(new Object[]{current.left, pathSoFar + "->" + current.left.value}); // @step:traverse-left
            }
        }

        return paths; // @step:complete
    }
}
