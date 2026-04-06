// Sum Root to Leaf Numbers (Iterative) — stack-based number formation
import java.util.ArrayDeque;
import java.util.Deque;

class SumLeafIterativeNode {
    int value;
    SumLeafIterativeNode left, right;
    SumLeafIterativeNode(int value) { this.value = value; }
}

class SumRootToLeafNumbersIterative {
    public int sumRootToLeafNumbersIterative(SumLeafIterativeNode root) {
        if (root == null) return 0; // @step:initialize

        int totalSum = 0; // @step:initialize
        Deque<Object[]> stack = new ArrayDeque<>(); // @step:initialize
        stack.push(new Object[]{root, root.value}); // @step:initialize

        while (!stack.isEmpty()) { // @step:visit
            Object[] entry = stack.pop(); // @step:visit
            SumLeafIterativeNode current = (SumLeafIterativeNode) entry[0]; // @step:visit
            int runningNumber = (int) entry[1]; // @step:visit

            // Leaf node — add completed number to total
            if (current.left == null && current.right == null) { // @step:check-balance
                totalSum += runningNumber; // @step:add-to-result
            }

            if (current.right != null) { // @step:traverse-right
                stack.push(new Object[]{current.right, runningNumber * 10 + current.right.value}); // @step:traverse-right
            }

            if (current.left != null) { // @step:traverse-left
                stack.push(new Object[]{current.left, runningNumber * 10 + current.left.value}); // @step:traverse-left
            }
        }

        return totalSum; // @step:complete
    }
}
