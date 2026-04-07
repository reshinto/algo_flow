public class SumRootToLeafNumbers_test {
    static SumLeafNode makeNode(int value, SumLeafNode left, SumLeafNode right) {
        SumLeafNode node = new SumLeafNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        SumRootToLeafNumbers sol = new SumRootToLeafNumbers();

        // 7-node BST: 421+423+465+467=1776
        SumLeafNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.sumRootToLeafNumbers(root1) == 1776 : "Test 1 failed";

        // null root
        assert sol.sumRootToLeafNumbers(null) == 0 : "Test 2 failed";

        // single node
        assert sol.sumRootToLeafNumbers(makeNode(5, null, null)) == 5 : "Test 3 failed";

        // simple 3-node tree: 12+13=25
        assert sol.sumRootToLeafNumbers(makeNode(1, makeNode(2, null, null), makeNode(3, null, null))) == 25 : "Test 4 failed";

        System.out.println("All tests passed!");
    }
}
