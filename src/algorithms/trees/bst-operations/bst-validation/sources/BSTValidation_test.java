// javac *.java && java -ea BSTValidation_test
public class BSTValidation_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTValidation algo = new BSTValidation();

        // test: validates a correct BST
        BSTNode tree1 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        assert algo.bstValidation(tree1) == true : "Valid BST should return true";

        // test: rejects an invalid BST
        BSTNode invalid1 = makeNode(5, leaf(6), leaf(7));
        assert algo.bstValidation(invalid1) == false : "Invalid BST should return false";

        // test: accepts null tree
        assert algo.bstValidation(null) == true : "Null should return true";

        // test: accepts single node
        assert algo.bstValidation(leaf(42)) == true : "Single node should return true";

        // test: rejects non-local violation
        BSTNode invalid2 = makeNode(5, null, makeNode(10, leaf(3), null));
        assert algo.bstValidation(invalid2) == false : "Non-local violation should return false";

        System.out.println("All tests passed!");
    }
}
