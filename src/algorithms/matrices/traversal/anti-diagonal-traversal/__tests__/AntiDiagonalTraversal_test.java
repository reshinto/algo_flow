// javac AntiDiagonalTraversal.java AntiDiagonalTraversal_test.java && java -ea AntiDiagonalTraversal_test

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class AntiDiagonalTraversal_test {

    public static void main(String[] args) {
        testTraverses3x3InAntiDiagonalOrder();
        testTraverses3x4InAntiDiagonalOrder();
        testHandles1x1Matrix();
        testHandlesSingleRowMatrix();
        testHandlesSingleColumnMatrix();
        testReturnsEmptyForEmptyMatrix();
        testTraverses2x2Matrix();
        testCollectsAllElementsExactlyOnce();
        System.out.println("All tests passed!");
    }

    static void testTraverses3x3InAntiDiagonalOrder() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        List<Integer> result = AntiDiagonalTraversal.antiDiagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 4, 3, 5, 7, 6, 8, 9)) : "Wrong traversal: " + result;
    }

    static void testTraverses3x4InAntiDiagonalOrder() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        List<Integer> result = AntiDiagonalTraversal.antiDiagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12)) : "Wrong traversal: " + result;
    }

    static void testHandles1x1Matrix() {
        int[][] matrix = {{42}};
        List<Integer> result = AntiDiagonalTraversal.antiDiagonalTraversal(matrix);
        assert result.equals(Arrays.asList(42)) : "Wrong traversal: " + result;
    }

    static void testHandlesSingleRowMatrix() {
        int[][] matrix = {{1, 2, 3, 4}};
        List<Integer> result = AntiDiagonalTraversal.antiDiagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4)) : "Wrong traversal: " + result;
    }

    static void testHandlesSingleColumnMatrix() {
        int[][] matrix = {{1}, {2}, {3}, {4}};
        List<Integer> result = AntiDiagonalTraversal.antiDiagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4)) : "Wrong traversal: " + result;
    }

    static void testReturnsEmptyForEmptyMatrix() {
        int[][] matrix = {};
        List<Integer> result = AntiDiagonalTraversal.antiDiagonalTraversal(matrix);
        assert result.isEmpty() : "Expected empty list";
    }

    static void testTraverses2x2Matrix() {
        int[][] matrix = {{1, 2}, {3, 4}};
        List<Integer> result = AntiDiagonalTraversal.antiDiagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4)) : "Wrong traversal: " + result;
    }

    static void testCollectsAllElementsExactlyOnce() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        List<Integer> result = AntiDiagonalTraversal.antiDiagonalTraversal(matrix);
        assert result.size() == 9 : "Expected 9 elements";
        assert new HashSet<>(result).size() == 9 : "Expected 9 unique elements";
    }
}
