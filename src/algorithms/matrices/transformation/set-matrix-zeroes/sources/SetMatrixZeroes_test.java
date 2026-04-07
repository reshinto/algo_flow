// javac SetMatrixZeroes.java SetMatrixZeroes_test.java && java -ea SetMatrixZeroes_test

import java.util.Arrays;

public class SetMatrixZeroes_test {

    public static void main(String[] args) {
        testZerosRowAndColumnOfSingleZero3x3();
        testHandlesDefaultInputWithZerosInFirstRowAndLastColumn();
        testLeavesMatrixWithoutZerosUnchanged();
        testReturnsAllZerosWhenEveryCellIsZero();
        testHandles1x1WithZero();
        testHandles1x1WithNonzero();
        testHandlesZeroInFirstRow();
        testHandlesZeroInFirstColumn();
        testHandlesSingleRowWithZero();
        testHandlesSingleColumnWithZero();
        testHandlesMultipleZerosInSameRow();
        System.out.println("All tests passed!");
    }

    static void testZerosRowAndColumnOfSingleZero3x3() {
        int[][] matrix = {{1, 1, 1}, {1, 0, 1}, {1, 1, 1}};
        int[][] result = SetMatrixZeroes.setMatrixZeroes(matrix);
        assert Arrays.equals(result[0], new int[]{1, 0, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 0, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{1, 0, 1}) : "Row 2 wrong";
    }

    static void testHandlesDefaultInputWithZerosInFirstRowAndLastColumn() {
        int[][] matrix = {{0, 1, 2, 0}, {3, 4, 5, 2}, {1, 3, 1, 5}};
        int[][] result = SetMatrixZeroes.setMatrixZeroes(matrix);
        assert Arrays.equals(result[0], new int[]{0, 0, 0, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 4, 5, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{0, 3, 1, 0}) : "Row 2 wrong";
    }

    static void testLeavesMatrixWithoutZerosUnchanged() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] result = SetMatrixZeroes.setMatrixZeroes(matrix);
        assert Arrays.equals(result[0], new int[]{1, 2, 3});
        assert Arrays.equals(result[1], new int[]{4, 5, 6});
        assert Arrays.equals(result[2], new int[]{7, 8, 9});
    }

    static void testReturnsAllZerosWhenEveryCellIsZero() {
        int[][] matrix = {{0, 0}, {0, 0}};
        int[][] result = SetMatrixZeroes.setMatrixZeroes(matrix);
        for (int[] row : result) {
            for (int cell : row) {
                assert cell == 0;
            }
        }
    }

    static void testHandles1x1WithZero() {
        int[][] result = SetMatrixZeroes.setMatrixZeroes(new int[][]{{0}});
        assert result[0][0] == 0;
    }

    static void testHandles1x1WithNonzero() {
        int[][] result = SetMatrixZeroes.setMatrixZeroes(new int[][]{{5}});
        assert result[0][0] == 5;
    }

    static void testHandlesZeroInFirstRow() {
        int[][] matrix = {{1, 0, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] result = SetMatrixZeroes.setMatrixZeroes(matrix);
        assert Arrays.equals(result[0], new int[]{0, 0, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{4, 0, 6}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{7, 0, 9}) : "Row 2 wrong";
    }

    static void testHandlesZeroInFirstColumn() {
        int[][] matrix = {{1, 2, 3}, {0, 5, 6}, {7, 8, 9}};
        int[][] result = SetMatrixZeroes.setMatrixZeroes(matrix);
        assert Arrays.equals(result[0], new int[]{0, 2, 3}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 0, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{0, 8, 9}) : "Row 2 wrong";
    }

    static void testHandlesSingleRowWithZero() {
        int[][] result = SetMatrixZeroes.setMatrixZeroes(new int[][]{{1, 0, 3}});
        assert Arrays.equals(result[0], new int[]{0, 0, 0});
    }

    static void testHandlesSingleColumnWithZero() {
        int[][] result = SetMatrixZeroes.setMatrixZeroes(new int[][]{{1}, {0}, {3}});
        assert result[0][0] == 0 && result[1][0] == 0 && result[2][0] == 0;
    }

    static void testHandlesMultipleZerosInSameRow() {
        int[][] matrix = {{0, 1, 0}, {2, 3, 4}, {5, 6, 7}};
        int[][] result = SetMatrixZeroes.setMatrixZeroes(matrix);
        assert Arrays.equals(result[0], new int[]{0, 0, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 3, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{0, 6, 0}) : "Row 2 wrong";
    }
}
