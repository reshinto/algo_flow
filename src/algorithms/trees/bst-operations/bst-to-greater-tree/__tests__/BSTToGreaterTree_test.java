// javac *.java && java -ea BSTToGreaterTree_test
public class BSTToGreaterTree_test {
    static BSTNode makeNode(int value, BSTNode left, BSTNode right) {
        BSTNode node = new BSTNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static BSTNode leaf(int value) { return new BSTNode(value); }

    public static void main(String[] args) {
        BSTToGreaterTree bgt = new BSTToGreaterTree();

        // test: transforms 3-node BST: node 3->3, node 2->5, node 1->6
        BSTNode tree1 = makeNode(2, leaf(1), leaf(3));
        BSTNode result1 = bgt.bstToGreaterTree(tree1);
        assert result1.value == 5 : "Root should be 5, got " + result1.value;
        assert result1.right.value == 3 : "Right should be 3";
        assert result1.left.value == 6 : "Left should be 6";

        // test: single node
        BSTNode result2 = bgt.bstToGreaterTree(leaf(5));
        assert result2.value == 5 : "Single node should stay 5";

        // test: null tree
        assert bgt.bstToGreaterTree(null) == null : "Null tree should return null";

        System.out.println("All tests passed!");
    }
}
