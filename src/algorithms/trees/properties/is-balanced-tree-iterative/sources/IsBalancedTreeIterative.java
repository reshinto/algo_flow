// Is Balanced Tree (Iterative) — bottom-up post-order using stack with height tracking
import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

class BalancedTreeIterativeNode {
    int value;
    BalancedTreeIterativeNode left, right;
    BalancedTreeIterativeNode(int value) { this.value = value; }
}

class IsBalancedTreeIterative {
    public boolean isBalancedTreeIterative(BalancedTreeIterativeNode root) {
        if (root == null) return true; // @step:initialize

        Deque<int[]> stack = new ArrayDeque<>(); // @step:initialize
        Map<BalancedTreeIterativeNode, Integer> heights = new HashMap<>(); // @step:initialize
        Deque<BalancedTreeIterativeNode[]> nodeStack = new ArrayDeque<>(); // @step:initialize

        nodeStack.push(new BalancedTreeIterativeNode[]{root});
        stack.push(new int[]{0}); // phase 0

        while (!nodeStack.isEmpty()) { // @step:visit
            BalancedTreeIterativeNode[] nodeWrapper = nodeStack.peek(); // @step:visit
            int[] phaseWrapper = stack.peek(); // @step:visit
            BalancedTreeIterativeNode node = nodeWrapper[0]; // @step:visit

            if (phaseWrapper[0] == 0) {
                phaseWrapper[0] = 1; // @step:visit
                if (node.left != null) { // @step:traverse-left
                    nodeStack.push(new BalancedTreeIterativeNode[]{node.left});
                    stack.push(new int[]{0});
                }
            } else if (phaseWrapper[0] == 1) {
                phaseWrapper[0] = 2; // @step:visit
                if (node.right != null) { // @step:traverse-right
                    nodeStack.push(new BalancedTreeIterativeNode[]{node.right});
                    stack.push(new int[]{0});
                }
            } else {
                nodeStack.pop(); // @step:visit
                stack.pop();
                int leftHeight = node.left != null ? heights.getOrDefault(node.left, 0) : 0; // @step:check-balance
                int rightHeight = node.right != null ? heights.getOrDefault(node.right, 0) : 0; // @step:check-balance

                if (Math.abs(leftHeight - rightHeight) > 1) return false; // @step:check-balance

                heights.put(node, Math.max(leftHeight, rightHeight) + 1); // @step:update-height
            }
        }

        return true; // @step:complete
    }
}
