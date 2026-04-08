// javac ZigzagTraversal.java ZigzagTraversal_test.java && java -ea ZigzagTraversal_test

import java.util.Arrays;
import java.util.List;

public class ZigzagTraversal_test {

    public static void main(String[] args) {
        testZigzagTraversal3x3();
        testZigzagTraversal3x4();
        testZigzagTraversal4x4();
        testZigzagTraversalSingleElement();
        testZigzagTraversalSingleRow();
        testZigzagTraversalSingleColumn();
        testZigzagTraversalEmptyMatrix();
        testZigzagTraversal2x2();
        testZigzagTraversalCollectsAllOnce3x3();
        testZigzagTraversalCollectsAllOnce3x4();
        System.out.println("All tests passed!");
    }

    static void testZigzagTraversal3x3() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        assert ZigzagTraversal.zigzagTraversal(matrix).equals(
            Arrays.asList(1, 2, 4, 7, 5, 3, 6, 8, 9)
        );
    }

    static void testZigzagTraversal3x4() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        assert ZigzagTraversal.zigzagTraversal(matrix).equals(
            Arrays.asList(1, 2, 5, 9, 6, 3, 4, 7, 10, 11, 8, 12)
        );
    }

    static void testZigzagTraversal4x4() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        assert ZigzagTraversal.zigzagTraversal(matrix).equals(
            Arrays.asList(1, 2, 5, 9, 6, 3, 4, 7, 10, 13, 14, 11, 8, 12, 15, 16)
        );
    }

    static void testZigzagTraversalSingleElement() {
        assert ZigzagTraversal.zigzagTraversal(new int[][]{{42}}).equals(Arrays.asList(42));
    }

    static void testZigzagTraversalSingleRow() {
        assert ZigzagTraversal.zigzagTraversal(new int[][]{{1, 2, 3, 4}}).equals(
            Arrays.asList(1, 2, 3, 4)
        );
    }

    static void testZigzagTraversalSingleColumn() {
        assert ZigzagTraversal.zigzagTraversal(new int[][]{{1}, {2}, {3}, {4}}).equals(
            Arrays.asList(1, 2, 3, 4)
        );
    }

    static void testZigzagTraversalEmptyMatrix() {
        List<Integer> result = ZigzagTraversal.zigzagTraversal(new int[][]{});
        assert result.isEmpty();
    }

    static void testZigzagTraversal2x2() {
        int[][] matrix = {{1, 2}, {3, 4}};
        assert ZigzagTraversal.zigzagTraversal(matrix).equals(Arrays.asList(1, 2, 3, 4));
    }

    static void testZigzagTraversalCollectsAllOnce3x3() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        List<Integer> result = ZigzagTraversal.zigzagTraversal(matrix);
        assert result.size() == 9;
        assert result.stream().distinct().count() == 9;
    }

    static void testZigzagTraversalCollectsAllOnce3x4() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        List<Integer> result = ZigzagTraversal.zigzagTraversal(matrix);
        assert result.size() == 12;
        assert result.stream().distinct().count() == 12;
    }
}
