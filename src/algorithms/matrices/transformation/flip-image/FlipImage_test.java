// javac FlipImage.java FlipImage_test.java && java -ea FlipImage_test

import java.util.Arrays;

public class FlipImage_test {

    static int[][] deepCopy(int[][] matrix) {
        int[][] copy = new int[matrix.length][];
        for (int rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
            copy[rowIdx] = matrix[rowIdx].clone();
        }
        return copy;
    }

    public static void main(String[] args) {
        testFlipsAndInverts3x3Example();
        testHandlesAllZeros();
        testHandlesAllOnes();
        testHandlesSingleRow();
        testHandlesSingleColumn();
        testHandles1x1With0();
        testHandles1x1With1();
        testHandles4x4BinaryMatrix();
        testHandlesIdentityLikeMatrix();
        System.out.println("All tests passed!");
    }

    static void testFlipsAndInverts3x3Example() {
        int[][] matrix = deepCopy(new int[][]{{1, 1, 0}, {1, 0, 1}, {0, 0, 0}});
        int[][] result = FlipImage.flipImage(matrix);
        assert Arrays.equals(result[0], new int[]{1, 0, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 1, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{1, 1, 1}) : "Row 2 wrong";
    }

    static void testHandlesAllZeros() {
        int[][] matrix = deepCopy(new int[][]{{0, 0}, {0, 0}});
        int[][] result = FlipImage.flipImage(matrix);
        assert Arrays.equals(result[0], new int[]{1, 1}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{1, 1}) : "Row 1 wrong";
    }

    static void testHandlesAllOnes() {
        int[][] matrix = deepCopy(new int[][]{{1, 1}, {1, 1}});
        int[][] result = FlipImage.flipImage(matrix);
        assert Arrays.equals(result[0], new int[]{0, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 0}) : "Row 1 wrong";
    }

    static void testHandlesSingleRow() {
        int[][] matrix = deepCopy(new int[][]{{1, 0, 1}});
        int[][] result = FlipImage.flipImage(matrix);
        assert Arrays.equals(result[0], new int[]{0, 1, 0}) : "Row 0 wrong";
    }

    static void testHandlesSingleColumn() {
        int[][] matrix = deepCopy(new int[][]{{1}, {0}, {1}});
        int[][] result = FlipImage.flipImage(matrix);
        assert result[0][0] == 0 && result[1][0] == 1 && result[2][0] == 0;
    }

    static void testHandles1x1With0() {
        int[][] matrix = deepCopy(new int[][]{{0}});
        int[][] result = FlipImage.flipImage(matrix);
        assert result[0][0] == 1;
    }

    static void testHandles1x1With1() {
        int[][] matrix = deepCopy(new int[][]{{1}});
        int[][] result = FlipImage.flipImage(matrix);
        assert result[0][0] == 0;
    }

    static void testHandles4x4BinaryMatrix() {
        int[][] matrix = deepCopy(new int[][]{{1, 1, 0, 0}, {1, 0, 0, 1}, {0, 1, 1, 0}, {1, 0, 1, 0}});
        int[][] result = FlipImage.flipImage(matrix);
        assert Arrays.equals(result[0], new int[]{1, 1, 0, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{0, 1, 1, 0}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{1, 0, 0, 1}) : "Row 2 wrong";
        assert Arrays.equals(result[3], new int[]{1, 0, 1, 0}) : "Row 3 wrong";
    }

    static void testHandlesIdentityLikeMatrix() {
        int[][] matrix = deepCopy(new int[][]{{1, 0, 0}, {0, 1, 0}, {0, 0, 1}});
        int[][] result = FlipImage.flipImage(matrix);
        assert Arrays.equals(result[0], new int[]{1, 1, 0}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{1, 0, 1}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{0, 1, 1}) : "Row 2 wrong";
    }
}
