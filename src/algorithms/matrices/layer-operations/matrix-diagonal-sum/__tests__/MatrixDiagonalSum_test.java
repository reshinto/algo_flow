// javac MatrixDiagonalSum.java MatrixDiagonalSum_test.java && java -ea MatrixDiagonalSum_test

public class MatrixDiagonalSum_test {

    public static void main(String[] args) {
        testSumsBothDiagonals3x3SubtractsCenter();
        testSumsBothDiagonals4x4NoCenter();
        testSingleElementMatrix();
        test2x2Matrix();
        test5x5MatrixSubtractsCenter();
        testAllZerosMatrix();
        testIdentityMatrix();
        testNegativeValuesOnDiagonals();
        test4x4AllSameValues();
        System.out.println("All tests passed!");
    }

    static void testSumsBothDiagonals3x3SubtractsCenter() {
        int[][] matrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == 25;
    }

    static void testSumsBothDiagonals4x4NoCenter() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 6, 7, 8}, {9, 10, 11, 12}, {13, 14, 15, 16}};
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == 68;
    }

    static void testSingleElementMatrix() {
        int[][] matrix = {{42}};
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == 42;
    }

    static void test2x2Matrix() {
        int[][] matrix = {{1, 2}, {3, 4}};
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == 10;
    }

    static void test5x5MatrixSubtractsCenter() {
        int[][] matrix = {
            {1, 2, 3, 4, 5},
            {6, 7, 8, 9, 10},
            {11, 12, 13, 14, 15},
            {16, 17, 18, 19, 20},
            {21, 22, 23, 24, 25},
        };
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == 117;
    }

    static void testAllZerosMatrix() {
        int[][] matrix = {{0, 0, 0}, {0, 0, 0}, {0, 0, 0}};
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == 0;
    }

    static void testIdentityMatrix() {
        int[][] matrix = {{1, 0, 0}, {0, 1, 0}, {0, 0, 1}};
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == 3;
    }

    static void testNegativeValuesOnDiagonals() {
        int[][] matrix = {{-1, 0, -2}, {0, -3, 0}, {-4, 0, -5}};
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == -15;
    }

    static void test4x4AllSameValues() {
        int[][] matrix = {{2, 2, 2, 2}, {2, 2, 2, 2}, {2, 2, 2, 2}, {2, 2, 2, 2}};
        assert MatrixDiagonalSum.matrixDiagonalSum(matrix) == 16;
    }
}
