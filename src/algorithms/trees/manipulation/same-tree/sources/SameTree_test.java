// javac *.java && java -ea SameTree_test
public class SameTree_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    public static void main(String[] args) {
        SameTree algo = new SameTree();

        // test: two null trees
        assert algo.sameTree(null, null) == true : "Two nulls should be true";

        // test: one null tree
        assert algo.sameTree(leaf(1), null) == false : "One null should be false";

        // test: identical single nodes
        assert algo.sameTree(leaf(1), leaf(1)) == true : "Identical single nodes should be true";

        // test: different single nodes
        assert algo.sameTree(leaf(1), leaf(2)) == false : "Different single nodes should be false";

        // test: identical 7-node BSTs
        BinaryNode treeA = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        BinaryNode treeB = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        assert algo.sameTree(treeA, treeB) == true : "Identical 7-node BSTs should be true";

        // test: different leaf values
        assert algo.sameTree(
            makeNode(1, leaf(2), leaf(3)),
            makeNode(1, leaf(2), leaf(4))) == false : "Different leaf values should be false";

        // test: different structures
        assert algo.sameTree(
            makeNode(1, leaf(2), null),
            makeNode(1, null, leaf(2))) == false : "Different structures should be false";

        System.out.println("All tests passed!");
    }
}
