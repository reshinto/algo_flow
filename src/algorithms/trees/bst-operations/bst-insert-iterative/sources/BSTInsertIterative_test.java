// javac *.java && java -ea BSTInsertIterative_test
public class BSTInsertIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTInsertIterative bii = new BSTInsertIterative();

        // test: inserts value greater than all
        BSTNode tree1 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        BSTNode result1 = bii.bstInsertIterative(tree1, 8);
        assert result1.right.right.right.value == 8 : "Insert greater than all failed";

        // test: creates root from null
        BSTNode result2 = bii.bstInsertIterative(null, 5);
        assert result2.value == 5 : "Root from null failed";

        // test: inserts left child
        BSTNode tree2 = leaf(10);
        BSTNode result3 = bii.bstInsertIterative(tree2, 5);
        assert result3.left.value == 5 : "Left child insert failed";

        // test: ignores duplicates
        BSTNode tree3 = makeNode(4, leaf(2), leaf(6));
        BSTNode result4 = bii.bstInsertIterative(tree3, 2);
        assert result4.left.right == null : "Duplicate should be ignored";

        System.out.println("All tests passed!");
    }
}
