// javac RotateLayerByLayer.java RotateLayerByLayer_test.java && java -ea RotateLayerByLayer_test

import java.util.Arrays;

public class RotateLayerByLayer_test {

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
        testHandles1x1Matrix();
        testRotates2x2_90Clockwise();
        testRotates5x5_90Clockwise();
        testFourRotationsReturnOriginal();
        testHandlesNegativeAndZeroValues();
        System.out.println("All tests passed!");
    }

    static void testRotates3x3_90Clockwise() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] result = RotateLayerByLayer.rotateLayerByLayer(deepCopy(matrix));
        assert Arrays.equals(result[0], new int[]{7, 4, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{8, 5, 2}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{9, 6, 3}) : "Row 2 wrong";
    }

    static void testRotates4x4_90Clockwise() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        int[][] result = RotateLayerByLayer.rotateLayerByLayer(deepCopy(matrix));
        assert Arrays.equals(result[0], new int[]{13, 9, 5, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[3], new int[]{16, 12, 8, 4}) : "Row 3 wrong";
    }

    static void testHandles1x1Matrix() {
        int[][] matrix = {{42}};
        int[][] result = RotateLayerByLayer.rotateLayerByLayer(matrix);
        assert result[0][0] == 42;
    }

    static void testRotates2x2_90Clockwise() {
        int[][] matrix = {{1, 2}, {3, 4}};
        int[][] result = RotateLayerByLayer.rotateLayerByLayer(deepCopy(matrix));
        assert Arrays.equals(result[0], new int[]{3, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{4, 2}) : "Row 1 wrong";
    }

    static void testRotates5x5_90Clockwise() {
        int[][] matrix = {
            {1, 2, 3, 4, 5},
            {6, 7, 8, 9, 10},
            {11, 12, 13, 14, 15},
            {16, 17, 18, 19, 20},
            {21, 22, 23, 24, 25},
        };
        int[][] result = RotateLayerByLayer.rotateLayerByLayer(deepCopy(matrix));
        assert Arrays.equals(result[0], new int[]{21, 16, 11, 6, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[4], new int[]{25, 20, 15, 10, 5}) : "Row 4 wrong";
    }

    static void testFourRotationsReturnOriginal() {
        int[][] original = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] matrix = deepCopy(original);
        for (int rotationCount = 0; rotationCount < 4; rotationCount++) {
            matrix = RotateLayerByLayer.rotateLayerByLayer(matrix);
        }
        for (int rowIdx = 0; rowIdx < original.length; rowIdx++) {
            assert Arrays.equals(matrix[rowIdx], original[rowIdx]) : "Row " + rowIdx + " mismatch after 4 rotations";
        }
    }

    static void testHandlesNegativeAndZeroValues() {
        int[][] matrix = {{-1, 0, 1}, {-2, 0, 2}, {-3, 0, 3}};
        int[][] result = RotateLayerByLayer.rotateLayerByLayer(deepCopy(matrix));
        assert Arrays.equals(result[0], new int[]{-3, -2, -1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 0, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{3, 2, 1}) : "Row 2 wrong";
    }
}
