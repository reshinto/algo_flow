// javac TransposeMatrix.java TransposeMatrix_test.java && java -ea TransposeMatrix_test

import java.util.Arrays;

public class TransposeMatrix_test {

    public static void main(String[] args) {
        testTransposes3x3SquareMatrix();
        testTransposes2x2Matrix();
        testTransposes4x4Matrix();
        testTransposes1x1Matrix();
        testTransposes2x3MatrixTo3x2();
        testTransposes3x2MatrixTo2x3();
        testTransposesSingleRowToSingleColumn();
        testTransposesSingleColumnToSingleRow();
        testDoubleTransposeReturnsOriginal();
        System.out.println("All tests passed!");
    }

    static void testTransposes3x3SquareMatrix() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] result = TransposeMatrix.transposeMatrix(matrix);
        assert Arrays.equals(result[0], new int[]{1, 4, 7}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{2, 5, 8}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{3, 6, 9}) : "Row 2 wrong";
    }

    static void testTransposes2x2Matrix() {
        int[][] matrix = {{1, 2}, {3, 4}};
        int[][] result = TransposeMatrix.transposeMatrix(matrix);
        assert Arrays.equals(result[0], new int[]{1, 3}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{2, 4}) : "Row 1 wrong";
    }

    static void testTransposes4x4Matrix() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        int[][] result = TransposeMatrix.transposeMatrix(matrix);
        assert Arrays.equals(result[0], new int[]{1, 5, 9, 13}) : "Row 0 wrong";
        assert Arrays.equals(result[3], new int[]{4, 8, 12, 16}) : "Row 3 wrong";
    }

    static void testTransposes1x1Matrix() {
        int[][] result = TransposeMatrix.transposeMatrix(new int[][]{{42}});
        assert result[0][0] == 42;
    }

    static void testTransposes2x3MatrixTo3x2() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
        int[][] result = TransposeMatrix.transposeMatrix(matrix);
        assert result.length == 3 && result[0].length == 2 : "Dimensions wrong";
        assert Arrays.equals(result[0], new int[]{1, 4}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{2, 5}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{3, 6}) : "Row 2 wrong";
    }

    static void testTransposes3x2MatrixTo2x3() {
        int[][] matrix = {{1, 2}, {3, 4}, {5, 6}};
        int[][] result = TransposeMatrix.transposeMatrix(matrix);
        assert result.length == 2 && result[0].length == 3 : "Dimensions wrong";
        assert Arrays.equals(result[0], new int[]{1, 3, 5}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{2, 4, 6}) : "Row 1 wrong";
    }

    static void testTransposesSingleRowToSingleColumn() {
        int[][] result = TransposeMatrix.transposeMatrix(new int[][]{{1, 2, 3, 4}});
        assert result.length == 4 : "Expected 4 rows";
        for (int rowIdx = 0; rowIdx < 4; rowIdx++) {
            assert result[rowIdx][0] == rowIdx + 1 : "Row " + rowIdx + " wrong";
        }
    }

    static void testTransposesSingleColumnToSingleRow() {
        int[][] result = TransposeMatrix.transposeMatrix(new int[][]{{1}, {2}, {3}});
        assert result.length == 1 : "Expected 1 row";
        assert Arrays.equals(result[0], new int[]{1, 2, 3}) : "Row 0 wrong";
    }

    static void testDoubleTransposeReturnsOriginal() {
        int[][] original = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] transposed = TransposeMatrix.transposeMatrix(original);
        int[][] doubleTransposed = TransposeMatrix.transposeMatrix(transposed);
        for (int rowIdx = 0; rowIdx < original.length; rowIdx++) {
            assert Arrays.equals(doubleTransposed[rowIdx], original[rowIdx]) : "Row " + rowIdx + " mismatch";
        }
    }
}
