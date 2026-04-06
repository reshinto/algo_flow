// Sum of Left Leaves (Iterative) — stack-based DFS checking left leaf condition
import java.util.ArrayDeque;
import java.util.Deque;

class LeftLeavesIterativeNode {
    int value;
    LeftLeavesIterativeNode left, right;
    LeftLeavesIterativeNode(int value) { this.value = value; }
}

class SumOfLeftLeavesIterative {
    public int sumOfLeftLeavesIterative(LeftLeavesIterativeNode root) {
        if (root == null) return 0; // @step:initialize

        Deque<Object[]> stack = new ArrayDeque<>(); // @step:initialize
        stack.push(new Object[]{root, false}); // @step:initialize
        int totalSum = 0; // @step:initialize

        while (!stack.isEmpty()) { // @step:visit
            Object[] entry = stack.pop(); // @step:visit
            LeftLeavesIterativeNode current = (LeftLeavesIterativeNode) entry[0]; // @step:visit
            boolean isLeft = (boolean) entry[1]; // @step:visit

            // Accumulate value when we find a left leaf
            if (current.left == null && current.right == null && isLeft) { // @step:check-balance
                totalSum += current.value; // @step:add-to-result
            }

            if (current.right != null) { // @step:traverse-right
                stack.push(new Object[]{current.right, false}); // @step:traverse-right
            }

            if (current.left != null) { // @step:traverse-left
                stack.push(new Object[]{current.left, true}); // @step:traverse-left
            }
        }

        return totalSum; // @step:complete
    }
}
