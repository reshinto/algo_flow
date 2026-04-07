public class PathSumIterative_test {
    static PathSumIterativeNode makeNode(int value, PathSumIterativeNode left, PathSumIterativeNode right) {
        PathSumIterativeNode node = new PathSumIterativeNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    public static void main(String[] args) {
        PathSumIterative sol = new PathSumIterative();

        // path sum exists (4+2+1=7)
        PathSumIterativeNode root1 = makeNode(4,
            makeNode(2, makeNode(1, null, null), makeNode(3, null, null)),
            makeNode(6, makeNode(5, null, null), makeNode(7, null, null)));
        assert sol.pathSumIterative(root1, 7) == true : "Test 1 failed";

        // path sum does not exist
        assert sol.pathSumIterative(root1, 100) == false : "Test 2 failed";

        // null root
        assert sol.pathSumIterative(null, 5) == false : "Test 3 failed";

        // single node matching
        assert sol.pathSumIterative(makeNode(5, null, null), 5) == true : "Test 4 failed";

        System.out.println("All tests passed!");
    }
}
