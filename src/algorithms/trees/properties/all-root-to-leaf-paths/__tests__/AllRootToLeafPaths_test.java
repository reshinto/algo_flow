// javac *.java && java -ea AllRootToLeafPaths_test
import java.util.*;

public class AllRootToLeafPaths_test {
    static PathsNode makeNode(int value, PathsNode left, PathsNode right) {
        PathsNode node = new PathsNode(value);
        node.left = left;
        node.right = right;
        return node;
    }

    static PathsNode leaf(int value) { return new PathsNode(value); }

    public static void main(String[] args) {
        AllRootToLeafPaths algo = new AllRootToLeafPaths();

        // test: returns 4 paths for 7-node BST
        PathsNode tree1 = makeNode(4,
            makeNode(2, leaf(1), leaf(3)),
            makeNode(6, leaf(5), leaf(7)));
        List<String> paths1 = algo.allRootToLeafPaths(tree1);
        assert paths1.size() == 4 : "Should have 4 paths";
        assert paths1.contains("4->2->1") : "Should contain path 4->2->1";
        assert paths1.contains("4->2->3") : "Should contain path 4->2->3";

        // test: empty for null root
        assert algo.allRootToLeafPaths(null).isEmpty() : "Null root should return empty";

        // test: single node
        List<String> paths2 = algo.allRootToLeafPaths(leaf(5));
        assert paths2.equals(List.of("5")) : "Single node should return ['5']";

        System.out.println("All tests passed!");
    }
}
