// javac *.java && java -ea RightSideViewRecursive_test
import java.util.*;

public class RightSideViewRecursive_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    public static void main(String[] args) {
        RightSideViewRecursive algo = new RightSideViewRecursive();

        // test: null returns empty
        assert algo.rightSideViewRecursive(null).isEmpty() : "Null should return empty";

        // test: single node
        assert algo.rightSideViewRecursive(leaf(1)).equals(List.of(1)) : "Single node should return [1]";

        // test: 7-node BST
        BinaryNode tree1 = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
        assert algo.rightSideViewRecursive(tree1).equals(List.of(4, 6, 7)) : "7-node BST right side failed";

        // test: left-skewed tree
        BinaryNode tree2 = makeNode(1, makeNode(2, leaf(3), null), null);
        assert algo.rightSideViewRecursive(tree2).equals(List.of(1, 2, 3)) : "Left-skewed failed";

        // test: right-skewed tree
        BinaryNode tree3 = makeNode(1, null, makeNode(2, null, leaf(3)));
        assert algo.rightSideViewRecursive(tree3).equals(List.of(1, 2, 3)) : "Right-skewed failed";

        System.out.println("All tests passed!");
    }
}
