// javac *.java && java -ea MergeBinaryTreesIterative_test
public class MergeBinaryTreesIterative_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    public static void main(String[] args) {
        MergeBinaryTreesIterative algo = new MergeBinaryTreesIterative();

        // test: tree A null returns tree B
        BinaryNode treeB = leaf(1);
        assert algo.mergeBinaryTreesIterative(null, treeB) == treeB : "Null A should return B";

        // test: tree B null returns tree A
        BinaryNode treeA = leaf(1);
        assert algo.mergeBinaryTreesIterative(treeA, null) == treeA : "Null B should return A";

        // test: sums two single nodes
        BinaryNode result1 = algo.mergeBinaryTreesIterative(leaf(3), leaf(5));
        assert result1.value == 8 : "Sum of 3 and 5 should be 8";

        // test: merges 7-node trees
        BinaryNode a7 = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
        BinaryNode b7 = makeNode(40,
            makeNode(20, leaf(10), leaf(30)),
            makeNode(60, leaf(50), leaf(70)));
        BinaryNode result2 = algo.mergeBinaryTreesIterative(a7, b7);
        assert result2.value == 44 : "Merged root should be 44";

        System.out.println("All tests passed!");
    }
}
