// javac *.java && java -ea BSTValidationIterative_test
public class BSTValidationIterative_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTValidationIterative algo = new BSTValidationIterative();

        // test: validates a correct BST
        BSTNode tree1 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        assert algo.bstValidationIterative(tree1) == true : "Valid BST should return true";

        // test: rejects an invalid BST
        BSTNode invalid1 = makeNode(5, leaf(6), leaf(7));
        assert algo.bstValidationIterative(invalid1) == false : "Invalid BST should return false";

        // test: accepts null
        assert algo.bstValidationIterative(null) == true : "Null should return true";

        // test: accepts single node
        assert algo.bstValidationIterative(leaf(10)) == true : "Single node should return true";

        System.out.println("All tests passed!");
    }
}
