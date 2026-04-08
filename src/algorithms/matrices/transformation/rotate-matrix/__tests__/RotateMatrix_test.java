// javac RotateMatrix.java RotateMatrix_test.java && java -ea RotateMatrix_test

import java.util.Arrays;

public class RotateMatrix_test {

    static int[][] deepCopy(int[][] matrix) {
        int[][] copy = new int[matrix.length][];
        for (int rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
            copy[rowIdx] = matrix[rowIdx].clone();
        }
        return copy;
    }

    public static void main(String[] args) {
        testRotates3x3_90Clockwise();
        testRotates4x4_90Clockwise();
        testRotates1x1NoOp();
        testRotates2x2_90Clockwise();
        testHandlesIdentityLikeMatrix();
        testHandlesNegativeValues();
        testFourRotationsReturnOriginal();
        System.out.println("All tests passed!");
    }

    static void testRotates3x3_90Clockwise() {
        int[][] matrix = deepCopy(new int[][]{{1, 2, 3}, {4, 5, 6}, {7, 8, 9}});
        int[][] result = RotateMatrix.rotateMatrix(matrix);
        assert Arrays.equals(result[0], new int[]{7, 4, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{8, 5, 2}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{9, 6, 3}) : "Row 2 wrong";
    }

    static void testRotates4x4_90Clockwise() {
        int[][] matrix = deepCopy(new int[][]{{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}});
        int[][] result = RotateMatrix.rotateMatrix(matrix);
        assert Arrays.equals(result[0], new int[]{13, 9, 5, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[3], new int[]{16, 12, 8, 4}) : "Row 3 wrong";
    }

    static void testRotates1x1NoOp() {
        int[][] matrix = deepCopy(new int[][]{{42}});
        int[][] result = RotateMatrix.rotateMatrix(matrix);
        assert result[0][0] == 42;
    }

    static void testRotates2x2_90Clockwise() {
        int[][] matrix = deepCopy(new int[][]{{1, 2}, {3, 4}});
        int[][] result = RotateMatrix.rotateMatrix(matrix);
        assert Arrays.equals(result[0], new int[]{3, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{4, 2}) : "Row 1 wrong";
    }

    static void testHandlesIdentityLikeMatrix() {
        int[][] matrix = deepCopy(new int[][]{{1, 0, 0}, {0, 1, 0}, {0, 0, 1}});
        int[][] result = RotateMatrix.rotateMatrix(matrix);
        assert Arrays.equals(result[0], new int[]{0, 0, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 1, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{1, 0, 0}) : "Row 2 wrong";
    }

    static void testHandlesNegativeValues() {
        int[][] matrix = deepCopy(new int[][]{{-1, -2}, {-3, -4}});
        int[][] result = RotateMatrix.rotateMatrix(matrix);
        assert Arrays.equals(result[0], new int[]{-3, -1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{-4, -2}) : "Row 1 wrong";
    }

    static void testFourRotationsReturnOriginal() {
        int[][] original = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] matrix = deepCopy(original);
        for (int rotationCount = 0; rotationCount < 4; rotationCount++) {
            matrix = RotateMatrix.rotateMatrix(matrix);
        }
        for (int rowIdx = 0; rowIdx < original.length; rowIdx++) {
            assert Arrays.equals(matrix[rowIdx], original[rowIdx]) : "Row " + rowIdx + " mismatch after 4 rotations";
        }
    }
}
