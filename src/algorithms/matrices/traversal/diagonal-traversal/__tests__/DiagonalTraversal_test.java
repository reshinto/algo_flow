// javac DiagonalTraversal.java DiagonalTraversal_test.java && java -ea DiagonalTraversal_test

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

public class DiagonalTraversal_test {

    public static void main(String[] args) {
        testTraverses3x4MatrixDiagonally();
        testTraverses4x4SquareMatrixDiagonally();
        testHandles1x1Matrix();
        testHandlesSingleRowMatrix();
        testHandlesSingleColumnMatrix();
        testReturnsEmptyForEmptyMatrix();
        testHandles2x2Matrix();
        testHandles2x3NonSquareMatrix();
        testCollectsAllElementsExactlyOnce();
        testHandles3x3Matrix();
        System.out.println("All tests passed!");
    }

    static void testTraverses3x4MatrixDiagonally() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12)) : "Wrong: " + result;
    }

    static void testTraverses4x4SquareMatrixDiagonally() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 5, 3, 6, 9, 4, 7, 10, 13, 8, 11, 14, 12, 15, 16)) : "Wrong: " + result;
    }

    static void testHandles1x1Matrix() {
        int[][] matrix = {{42}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.equals(Arrays.asList(42)) : "Wrong: " + result;
    }

    static void testHandlesSingleRowMatrix() {
        int[][] matrix = {{1, 2, 3, 4}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4)) : "Wrong: " + result;
    }

    static void testHandlesSingleColumnMatrix() {
        int[][] matrix = {{1}, {2}, {3}, {4}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4)) : "Wrong: " + result;
    }

    static void testReturnsEmptyForEmptyMatrix() {
        int[][] matrix = {};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.isEmpty() : "Expected empty list";
    }

    static void testHandles2x2Matrix() {
        int[][] matrix = {{1, 2}, {3, 4}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 3, 4)) : "Wrong: " + result;
    }

    static void testHandles2x3NonSquareMatrix() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 4, 3, 5, 6)) : "Wrong: " + result;
    }

    static void testCollectsAllElementsExactlyOnce() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.size() == 9 : "Expected 9 elements";
        assert new HashSet<>(result).size() == 9 : "Expected 9 unique elements";
    }

    static void testHandles3x3Matrix() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        List<Integer> result = DiagonalTraversal.diagonalTraversal(matrix);
        assert result.equals(Arrays.asList(1, 2, 4, 3, 5, 7, 6, 8, 9)) : "Wrong: " + result;
    }
}
