// javac *.java && java -ea CountCompleteTreeNodes_test
public class CountCompleteTreeNodes_test {
    static TreeNode makeNode(int value, TreeNode left, TreeNode right) {
        TreeNode node = new TreeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static TreeNode leaf(int value) { return new TreeNode(value); }

    public static void main(String[] args) {
        CountCompleteTreeNodes algo = new CountCompleteTreeNodes();

        // test: 7-node perfect tree
        TreeNode tree1 = makeNode(4, makeNode(2, leaf(1), leaf(3)), makeNode(6, leaf(5), leaf(7)));
        assert algo.countCompleteTreeNodes(tree1) == 7 : "7-node tree should have 7 nodes";

        // test: null root returns 0
        assert algo.countCompleteTreeNodes(null) == 0 : "Null root should return 0";

        // test: single node
        assert algo.countCompleteTreeNodes(leaf(1)) == 1 : "Single node should return 1";

        // test: 3-node perfect tree
        assert algo.countCompleteTreeNodes(makeNode(1, leaf(2), leaf(3))) == 3 : "3-node tree should have 3 nodes";

        System.out.println("All tests passed!");
    }
}
