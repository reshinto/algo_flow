// javac ToeplitzMatrix.java ToeplitzMatrix_test.java && java -ea ToeplitzMatrix_test

public class ToeplitzMatrix_test {

    public static void main(String[] args) {
        testCanonicalToeplitzExample();
        testNonToeplitz2x2();
        testSingleElementMatrix();
        testSingleRowMatrix();
        testSingleColumnMatrix();
        testAllSameElements();
        testValid2x2Toeplitz();
        testInvalid2x2NonToeplitz();
        testFirstRowMismatch();
        testLastDiagonalBroken();
        System.out.println("All tests passed!");
    }

    static void testCanonicalToeplitzExample() {
        int[][] matrix = {{1, 2, 3, 4}, {5, 1, 2, 3}, {9, 5, 1, 2}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == true;
    }

    static void testNonToeplitz2x2() {
        int[][] matrix = {{1, 2}, {2, 2}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == false;
    }

    static void testSingleElementMatrix() {
        int[][] matrix = {{42}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == true;
    }

    static void testSingleRowMatrix() {
        int[][] matrix = {{1, 2, 3, 4}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == true;
    }

    static void testSingleColumnMatrix() {
        int[][] matrix = {{1}, {2}, {3}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == true;
    }

    static void testAllSameElements() {
        int[][] matrix = {{7, 7, 7}, {7, 7, 7}, {7, 7, 7}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == true;
    }

    static void testValid2x2Toeplitz() {
        int[][] matrix = {{1, 2}, {3, 1}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == true;
    }

    static void testInvalid2x2NonToeplitz() {
        int[][] matrix = {{5, 3}, {3, 4}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == false;
    }

    static void testFirstRowMismatch() {
        int[][] matrix = {{1, 2, 3}, {4, 2, 2}, {7, 4, 2}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == false;
    }

    static void testLastDiagonalBroken() {
        int[][] matrix = {{1, 2, 3}, {4, 1, 2}, {7, 4, 9}};
        assert ToeplitzMatrix.toeplitzMatrix(matrix) == false;
    }
}
