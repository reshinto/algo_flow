// javac *.java && java -ea InvertBinaryTreeIterative_test
import java.util.*;

public class InvertBinaryTreeIterative_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    static int[] levelOrder(BinaryNode root) {
        if (root == null) return new int[0];
        List<Integer> result = new ArrayList<>();
        Queue<BinaryNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            BinaryNode node = queue.poll();
            result.add(node.value);
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    public static void main(String[] args) {
        InvertBinaryTreeIterative algo = new InvertBinaryTreeIterative();

        // test: null returns null
        assert algo.invertBinaryTreeIterative(null) == null : "Null should return null";

        // test: single node
        BinaryNode single = leaf(1);
        BinaryNode result1 = algo.invertBinaryTreeIterative(single);
        assert result1.value == 1 && result1.left == null && result1.right == null : "Single node should be unchanged";

        // test: swaps children two-node
        BinaryNode tree1 = makeNode(1, leaf(2), null);
        BinaryNode result2 = algo.invertBinaryTreeIterative(tree1);
        assert result2.left == null && result2.right.value == 2 : "Two-node swap failed";

        // test: inverts 7-node BST
        BinaryNode tree2 = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
        BinaryNode result3 = algo.invertBinaryTreeIterative(tree2);
        assert Arrays.equals(levelOrder(result3), new int[]{4, 6, 2, 7, 5, 3, 1}) : "7-node invert failed";

        System.out.println("All tests passed!");
    }
}
