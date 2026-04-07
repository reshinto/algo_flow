public class PathSum_test {
    static PathSumNode makeNode(int value, PathSumNode left, PathSumNode right) {
        PathSumNode node = new PathSumNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        PathSum sol = new PathSum();

        // path sum exists (4+2+1=7)
        PathSumNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.pathSum(root1, 7) == true : "Test 1 failed";

        // path sum does not exist
        assert sol.pathSum(root1, 100) == false : "Test 2 failed";

        // null root
        assert sol.pathSum(null, 5) == false : "Test 3 failed";

        // single node matching
        assert sol.pathSum(makeNode(5, null, null), 5) == true : "Test 4 failed";

        // single node not matching
        assert sol.pathSum(makeNode(5, null, null), 3) == false : "Test 5 failed";

        System.out.println("All tests passed!");
    }
}
