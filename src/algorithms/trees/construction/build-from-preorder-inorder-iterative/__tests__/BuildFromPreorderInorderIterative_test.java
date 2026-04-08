// javac *.java && java -ea BuildFromPreorderInorderIterative_test
import java.util.*;

public class BuildFromPreorderInorderIterative_test {
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

    static int[] preorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderHelper(root, result);
        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    static void preorderHelper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.value);
        preorderHelper(node.left, result);
        preorderHelper(node.right, result);
    }

    public static void main(String[] args) {
        BuildFromPreorderInorderIterative algo = new BuildFromPreorderInorderIterative();

        // test: builds balanced 7-node BST
        TreeNode root1 = algo.buildFromPreorderInorderIterative(
            new int[]{4, 2, 1, 3, 6, 5, 7}, new int[]{1, 2, 3, 4, 5, 6, 7});
        assert root1.value == 4 : "Root should be 4";
        assert Arrays.equals(inorder(root1), new int[]{1, 2, 3, 4, 5, 6, 7}) : "Inorder should match";

        // test: preserves preorder
        TreeNode root2 = algo.buildFromPreorderInorderIterative(
            new int[]{4, 2, 1, 3, 6, 5, 7}, new int[]{1, 2, 3, 4, 5, 6, 7});
        assert Arrays.equals(preorder(root2), new int[]{4, 2, 1, 3, 6, 5, 7}) : "Preorder should match";

        // test: returns null for empty
        assert algo.buildFromPreorderInorderIterative(new int[]{}, new int[]{}) == null : "Empty should return null";

        // test: single node
        TreeNode root3 = algo.buildFromPreorderInorderIterative(new int[]{42}, new int[]{42});
        assert root3.value == 42 : "Single node value should be 42";
        assert root3.left == null && root3.right == null : "Single node should have no children";

        System.out.println("All tests passed!");
    }
}
