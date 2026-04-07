// javac *.java && java -ea BuildFromLevelOrder_test
import java.util.*;

public class BuildFromLevelOrder_test {
    static TreeNode makeNode(int value, TreeNode left, TreeNode right) {
        TreeNode node = new TreeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static int[] inorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderHelper(root, result);
        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    static void inorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        inorderHelper(node.left, result);
        result.add(node.value);
        inorderHelper(node.right, result);
    }

    static int[] levelOrder(TreeNode root) {
        if (root == null) return new int[0];
        List<Integer> result = new ArrayList<>();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            result.add(node.value);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    public static void main(String[] args) {
        BuildFromLevelOrder algo = new BuildFromLevelOrder();

        // test: builds balanced 7-node BST
        TreeNode root1 = algo.buildFromLevelOrder(new int[]{4, 2, 6, 1, 3, 5, 7});
        assert root1.value == 4 : "Root should be 4";
        assert Arrays.equals(inorder(root1), new int[]{1, 2, 3, 4, 5, 6, 7}) : "Inorder should be sorted";

        // test: restores level-order
        TreeNode root2 = algo.buildFromLevelOrder(new int[]{4, 2, 6, 1, 3, 5, 7});
        assert Arrays.equals(levelOrder(root2), new int[]{4, 2, 6, 1, 3, 5, 7}) : "Level order should match";

        // test: returns null for empty
        assert algo.buildFromLevelOrder(new int[]{}) == null : "Empty input should return null";

        // test: single node
        TreeNode root3 = algo.buildFromLevelOrder(new int[]{42});
        assert root3.value == 42 : "Single node value should be 42";
        assert root3.left == null : "Single node left should be null";
        assert root3.right == null : "Single node right should be null";

        System.out.println("All tests passed!");
    }
}
