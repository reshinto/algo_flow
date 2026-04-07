// javac *.java && java -ea BSTDeleteIterative_test
public class BSTDeleteIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTDeleteIterative bdi = new BSTDeleteIterative();

        // test: deletes leaf
        BSTNode tree1 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        BSTNode result1 = bdi.bstDeleteIterative(tree1, 7);
        assert result1.right.right == null : "Leaf delete failed";

        // test: deletes node with two children
        BSTNode tree2 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        BSTNode result2 = bdi.bstDeleteIterative(tree2, 6);
        assert result2.right.value == 7 : "Two-children delete failed";

        // test: returns null for only node
        assert bdi.bstDeleteIterative(leaf(5), 5) == null : "Single node delete failed";

        // test: unchanged when absent
        BSTNode tree3 = makeNode(4, leaf(2), leaf(6));
        BSTNode result3 = bdi.bstDeleteIterative(tree3, 99);
        assert result3.value == 4 : "Absent value should leave tree unchanged";

        System.out.println("All tests passed!");
    }
}
