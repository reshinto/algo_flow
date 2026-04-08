// javac *.java && java -ea SubtreeOfAnotherTree_test
public class SubtreeOfAnotherTree_test {
    static BinaryNode makeNode(int value, BinaryNode left, BinaryNode right) {
        BinaryNode node = new BinaryNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BinaryNode leaf(int value) { return new BinaryNode(value); }

    public static void main(String[] args) {
        SubtreeOfAnotherTree algo = new SubtreeOfAnotherTree();

        // test: null subtree returns true
        assert algo.subtreeOfAnotherTree(leaf(1), null) == true : "Null subtree should return true";

        // test: null main tree returns false
        assert algo.subtreeOfAnotherTree(null, leaf(1)) == false : "Null main tree should return false";

        // test: trees are equal
        BinaryNode main1 = makeNode(1, leaf(2), leaf(3));
        BinaryNode sub1 = makeNode(1, leaf(2), leaf(3));
        assert algo.subtreeOfAnotherTree(main1, sub1) == true : "Equal trees should return true";

        // test: subtree is left subtree
        BinaryNode main2 = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
        BinaryNode sub2 = makeNode(2, leaf(1), leaf(3));
        assert algo.subtreeOfAnotherTree(main2, sub2) == true : "Left subtree should return true";

        // test: subtree not in main tree
        assert algo.subtreeOfAnotherTree(makeNode(4, leaf(2), leaf(6)), leaf(9)) == false : "Missing subtree should return false";

        System.out.println("All tests passed!");
    }
}
