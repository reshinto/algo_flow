// javac *.java && java -ea BSTInsert_test
public class BSTInsert_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTInsert bstIns = new BSTInsert();

        // test: inserts greater than all
        BSTNode tree1 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        BSTNode result1 = bstIns.bstInsert(tree1, 8);
        assert result1.right.right.right.value == 8 : "Insert greater than all failed";

        // test: inserts into left subtree
        BSTNode tree2 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        BSTNode result2 = bstIns.bstInsert(tree2, 0);
        assert result2.left.left.left.value == 0 : "Insert into left subtree failed";

        // test: creates root from null
        BSTNode result3 = bstIns.bstInsert(null, 10);
        assert result3.value == 10 : "Root from null failed";

        // test: ignores duplicates
        BSTNode tree3 = makeNode(4, leaf(2), leaf(6));
        BSTNode result4 = bstIns.bstInsert(tree3, 4);
        assert result4.value == 4 : "Duplicate should be ignored";

        System.out.println("All tests passed!");
    }
}
