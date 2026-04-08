// javac *.java && java -ea DeleteLeavesWithValue_test
import java.util.*;

public class DeleteLeavesWithValue_test {
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
        DeleteLeavesWithValue algo = new DeleteLeavesWithValue();

        // test: single node target returns null
        assert algo.deleteLeavesWithValue(leaf(1), 1) == null : "Single target node should return null";

        // test: no matching leaf
        BinaryNode tree1 = makeNode(1, leaf(2), leaf(3));
        assert Arrays.equals(levelOrder(algo.deleteLeavesWithValue(tree1, 9)), new int[]{1, 2, 3}) : "No match should be unchanged";

        // test: deletes leaf with target
        BinaryNode tree2 = makeNode(1, leaf(2), leaf(3));
        BinaryNode result2 = algo.deleteLeavesWithValue(tree2, 2);
        assert result2.left == null : "Left child should be deleted";
        assert result2.right.value == 3 : "Right child should remain";

        // test: cascades deletion
        BinaryNode tree3 = makeNode(1, leaf(2), null);
        BinaryNode result3 = algo.deleteLeavesWithValue(tree3, 2);
        assert result3.value == 1 && result3.left == null : "Cascade: parent keeps, child removed";

        System.out.println("All tests passed!");
    }
}
