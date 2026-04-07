// javac *.java && java -ea SerializeDeserializeTree_test
import java.util.*;

public class SerializeDeserializeTree_test {
    static TreeNode makeNode(int value, TreeNode left, TreeNode right) {
        TreeNode node = new TreeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static TreeNode leaf(int value) { return new TreeNode(value); }

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

    public static void main(String[] args) {
        SerializeDeserializeTree algo = new SerializeDeserializeTree();

        // test: serializes null as "null"
        assert algo.serializeTree(null).equals("null") : "Null should serialize to 'null'";

        // test: deserializes null string to null
        assert algo.deserializeTree("null") == null : "Null string should deserialize to null";

        // test: round-trips a balanced 7-node BST
        TreeNode original = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
        String serialized = algo.serializeTree(original);
        TreeNode reconstructed = algo.deserializeTree(serialized);
        assert reconstructed.value == 4 : "Reconstructed root should be 4";
        assert Arrays.equals(inorder(reconstructed), new int[]{1, 2, 3, 4, 5, 6, 7}) : "Inorder should match";

        // test: round-trips a single node
        String single = algo.serializeTree(leaf(99));
        TreeNode singleBack = algo.deserializeTree(single);
        assert singleBack.value == 99 : "Single node value should be 99";
        assert singleBack.left == null && singleBack.right == null : "Single node should have no children";

        System.out.println("All tests passed!");
    }
}
