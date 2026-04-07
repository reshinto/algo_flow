// javac *.java && java -ea BuildFromPostorderInorder_test
import java.util.*;

public class BuildFromPostorderInorder_test {
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

    static int[] postorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderHelper(root, result);
        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    static void postorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        postorderHelper(node.left, result);
        postorderHelper(node.right, result);
        result.add(node.value);
    }

    public static void main(String[] args) {
        BuildFromPostorderInorder algo = new BuildFromPostorderInorder();

        // test: builds balanced 7-node BST
        TreeNode root1 = algo.buildFromPostorderInorder(
            new int[]{1, 3, 2, 5, 7, 6, 4}, new int[]{1, 2, 3, 4, 5, 6, 7});
        assert root1.value == 4 : "Root should be 4";
        assert Arrays.equals(inorder(root1), new int[]{1, 2, 3, 4, 5, 6, 7}) : "Inorder should match";

        // test: preserves postorder
        TreeNode root2 = algo.buildFromPostorderInorder(
            new int[]{1, 3, 2, 5, 7, 6, 4}, new int[]{1, 2, 3, 4, 5, 6, 7});
        assert Arrays.equals(postorder(root2), new int[]{1, 3, 2, 5, 7, 6, 4}) : "Postorder should match";

        // test: returns null for empty
        assert algo.buildFromPostorderInorder(new int[]{}, new int[]{}) == null : "Empty should return null";

        // test: single node
        TreeNode root3 = algo.buildFromPostorderInorder(new int[]{42}, new int[]{42});
        assert root3.value == 42 : "Single node value should be 42";
        assert root3.left == null && root3.right == null : "Single node should have no children";

        System.out.println("All tests passed!");
    }
}
