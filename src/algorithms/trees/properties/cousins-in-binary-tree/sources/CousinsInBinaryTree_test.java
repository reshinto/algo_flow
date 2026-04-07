// javac *.java && java -ea CousinsInBinaryTree_test
public class CousinsInBinaryTree_test {
    static TreeNode makeNode(int value, TreeNode left, TreeNode right) {
        TreeNode node = new TreeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static TreeNode leaf(int value) { return new TreeNode(value); }

    static TreeNode build7NodeTree() {
        return makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
    }

    public static void main(String[] args) {
        CousinsInBinaryTree algo = new CousinsInBinaryTree();

        // test: cousins 1 and 5
        assert algo.cousinsInBinaryTree(build7NodeTree(), 1, 5) == true : "1 and 5 should be cousins";

        // test: siblings not cousins
        assert algo.cousinsInBinaryTree(build7NodeTree(), 1, 3) == false : "Siblings should not be cousins";

        // test: different depths not cousins
        assert algo.cousinsInBinaryTree(build7NodeTree(), 2, 1) == false : "Different depths should not be cousins";

        // test: null root returns false
        assert algo.cousinsInBinaryTree(null, 1, 2) == false : "Null root should return false";

        // test: cousins 3 and 7
        assert algo.cousinsInBinaryTree(build7NodeTree(), 3, 7) == true : "3 and 7 should be cousins";

        System.out.println("All tests passed!");
    }
}
