// javac ReshapeMatrix.java ReshapeMatrix_test.java && java -ea ReshapeMatrix_test

import java.util.Arrays;

public class ReshapeMatrix_test {

    public static void main(String[] args) {
        testReshapes2x4To4x2();
        testReshapes2x2To1x4();
        testReshapes2x2To4x1();
        testReturnsOriginalForImpossibleReshape();
        testHandles1x1IdentityReshape();
        testReshapes3x3To1x9();
        testReturnsOriginalForSameDimensions();
        testReshapes1x6To2x3();
        testReturnsOriginalForImpossibleReshapeLargerTarget();
        System.out.println("All tests passed!");
    }

    static void testReshapes2x4To4x2() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 4, 2);
        assert Arrays.equals(result[0], new int[]{1, 2}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{3, 4}) : "Row 1 wrong";
        assert Arrays.equals(result[2], new int[]{5, 6}) : "Row 2 wrong";
        assert Arrays.equals(result[3], new int[]{7, 8}) : "Row 3 wrong";
    }

    static void testReshapes2x2To1x4() {
        int[][] matrix = {{1, 2}, {3, 4}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 1, 4);
        assert Arrays.equals(result[0], new int[]{1, 2, 3, 4}) : "Row 0 wrong";
    }

    static void testReshapes2x2To4x1() {
        int[][] matrix = {{1, 2}, {3, 4}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 4, 1);
        assert result.length == 4 : "Expected 4 rows";
        assert result[0][0] == 1 && result[1][0] == 2 && result[2][0] == 3 && result[3][0] == 4;
    }

    static void testReturnsOriginalForImpossibleReshape() {
        int[][] matrix = {{1, 2}, {3, 4}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 3, 2);
        assert result == matrix : "Expected same reference";
    }

    static void testHandles1x1IdentityReshape() {
        int[][] matrix = {{42}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 1, 1);
        assert result[0][0] == 42;
    }

    static void testReshapes3x3To1x9() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 1, 9);
        assert Arrays.equals(result[0], new int[]{1, 2, 3, 4, 5, 6, 7, 8, 9}) : "Row 0 wrong";
    }

    static void testReturnsOriginalForSameDimensions() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 2, 3);
        for (int rowIdx = 0; rowIdx < matrix.length; rowIdx++) {
            assert Arrays.equals(result[rowIdx], matrix[rowIdx]) : "Row " + rowIdx + " wrong";
        }
    }

    static void testReshapes1x6To2x3() {
        int[][] matrix = {{1, 2, 3, 4, 5, 6}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 2, 3);
        assert Arrays.equals(result[0], new int[]{1, 2, 3}) : "Row 0 wrong";
        assert Arrays.equals(result[1], new int[]{4, 5, 6}) : "Row 1 wrong";
    }

    static void testReturnsOriginalForImpossibleReshapeLargerTarget() {
        int[][] matrix = {{1, 2, 3}};
        int[][] result = ReshapeMatrix.reshapeMatrix(matrix, 2, 5);
        assert result == matrix : "Expected same reference";
    }
}
