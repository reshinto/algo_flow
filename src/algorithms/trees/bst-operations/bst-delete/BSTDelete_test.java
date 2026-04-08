// javac *.java && java -ea BSTDelete_test
public class BSTDelete_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTDelete bstDel = new BSTDelete();

        // test: deletes leaf node
        BSTNode tree1 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        BSTNode result1 = bstDel.bstDelete(tree1, 1);
        assert result1.left.left == null : "Left leaf not deleted";

        // test: deletes node with one child
        BSTNode tree2 = makeNode(4, makeNode(2, leaf(1), null), leaf(6));
        BSTNode result2 = bstDel.bstDelete(tree2, 2);
        assert result2.left.value == 1 : "One child delete failed";

        // test: deletes node with two children
        BSTNode tree3 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        BSTNode result3 = bstDel.bstDelete(tree3, 4);
        assert result3 != null : "Two children delete failed";

        // test: returns null for only node
        assert bstDel.bstDelete(leaf(5), 5) == null : "Single node delete failed";

        // test: unchanged when not found
        BSTNode tree4 = makeNode(4, leaf(2), leaf(6));
        BSTNode result4 = bstDel.bstDelete(tree4, 99);
        assert result4.value == 4 : "Unchanged tree failed";

        System.out.println("All tests passed!");
    }
}
