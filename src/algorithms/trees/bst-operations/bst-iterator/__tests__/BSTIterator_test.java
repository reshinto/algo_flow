// javac *.java && java -ea BSTIterator_test
import java.util.Arrays;

public class BSTIterator_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTIterator bstIter = new BSTIterator();
        BSTNode tree = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));

        // test: sorted ascending order
        assert bstIter.bstIterator(tree).equals(Arrays.asList(1, 2, 3, 4, 5, 6, 7)) : "Sorted order failed";

        // test: null tree returns empty
        assert bstIter.bstIterator(null).isEmpty() : "Null tree should return empty";

        // test: single element
        assert bstIter.bstIterator(leaf(42)).equals(Arrays.asList(42)) : "Single element failed";

        // test: right-skewed tree
        BSTNode skewed = makeNode(1, null, makeNode(2, null, leaf(3)));
        assert bstIter.bstIterator(skewed).equals(Arrays.asList(1, 2, 3)) : "Right-skewed failed";

        System.out.println("All tests passed!");
    }
}
