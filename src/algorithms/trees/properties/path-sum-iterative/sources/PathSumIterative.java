// Path Sum (Iterative) — stack-based DFS with running sum tracking
import java.util.ArrayDeque;
import java.util.Deque;

class PathSumIterativeNode {
    int value;
    PathSumIterativeNode left, right;
    PathSumIterativeNode(int value) { this.value = value; }
}

class PathSumIterative {
    public boolean pathSumIterative(PathSumIterativeNode root, int targetSum) {
        if (root == null) return false; // @step:initialize

        Deque<Object[]> stack = new ArrayDeque<>(); // @step:initialize
        stack.push(new Object[]{root, root.value}); // @step:initialize

        while (!stack.isEmpty()) { // @step:visit
            Object[] entry = stack.pop(); // @step:visit
            PathSumIterativeNode current = (PathSumIterativeNode) entry[0]; // @step:visit
            int runningSum = (int) entry[1]; // @step:visit

            // Leaf node — check if path sum matches target
            if (current.left == null && current.right == null) { // @step:check-balance
                if (runningSum == targetSum) return true; // @step:complete
            }

            if (current.right != null) { // @step:traverse-right
                stack.push(new Object[]{current.right, runningSum + current.right.value}); // @step:traverse-right
            }

            if (current.left != null) { // @step:traverse-left
                stack.push(new Object[]{current.left, runningSum + current.left.value}); // @step:traverse-left
            }
        }

        return false; // @step:complete
    }
}
