// javac *.java && java -ea FlattenToLinkedList_test
import java.util.*;

public class FlattenToLinkedList_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    static int[] rightChain(BinaryNode root) {
        List<Integer> result = new ArrayList<>();
        BinaryNode current = root;
        while (current != null) {
            result.add(current.value);
            current = current.right;
        }
        return result.stream().mapToInt(Integer::intValue).toArray();
    }

    public static void main(String[] args) {
        FlattenToLinkedList algo = new FlattenToLinkedList();

        // test: single node unchanged
        BinaryNode single = leaf(1);
        algo.flattenToLinkedList(single);
        assert single.left == null && single.right == null : "Single node should be unchanged";

        // test: two-node with left child
        BinaryNode tree1 = makeNode(1, leaf(2), null);
        algo.flattenToLinkedList(tree1);
        assert Arrays.equals(rightChain(tree1), new int[]{1, 2}) : "Two-node flatten failed";

        // test: flattens 7-node BST
        BinaryNode tree2 = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
        algo.flattenToLinkedList(tree2);
        assert Arrays.equals(rightChain(tree2), new int[]{4, 2, 1, 3, 6, 5, 7}) : "7-node preorder flatten failed";

        // test: all left pointers null
        BinaryNode node = tree2;
        while (node != null) {
            assert node.left == null : "Left pointer should be null after flatten";
            node = node.right;
        }

        System.out.println("All tests passed!");
    }
}
