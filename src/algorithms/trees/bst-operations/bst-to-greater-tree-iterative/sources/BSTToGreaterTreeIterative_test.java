// javac *.java && java -ea BSTToGreaterTreeIterative_test
public class BSTToGreaterTreeIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTToGreaterTreeIterative bgti = new BSTToGreaterTreeIterative();

        // test: transforms 3-node BST
        BSTNode tree1 = makeNode(2, leaf(1), leaf(3));
        BSTNode result1 = bgti.bstToGreaterTreeIterative(tree1);
        assert result1.value == 5 : "Root should be 5, got " + result1.value;
        assert result1.right.value == 3 : "Right should be 3";
        assert result1.left.value == 6 : "Left should be 6";

        // test: single node
        BSTNode result2 = bgti.bstToGreaterTreeIterative(leaf(7));
        assert result2.value == 7 : "Single node should stay 7";

        // test: null tree
        assert bgti.bstToGreaterTreeIterative(null) == null : "Null tree should return null";

        System.out.println("All tests passed!");
    }
}
