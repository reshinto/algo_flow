// javac Search2DMatrix.java Search2DMatrix_test.java && java -ea Search2DMatrix_test

public class Search2DMatrix_test {

    static final int[][] DEFAULT_MATRIX = {{1, 3, 5, 7}, {10, 11, 16, 20}, {23, 30, 34, 60}};

    public static void main(String[] args) {
        testFindsTargetInMatrix();
        testReturnsFalseWhenNotFound();
        testFindsFirstElement();
        testFindsLastElement();
        testSingleRowTargetFound();
        testSingleRowTargetNotFound();
        testSingleElementMatch();
        testSingleElementNoMatch();
        testReturnsFalseForEmptyMatrix();
        testLargeMatrixTargetFoundInMiddle();
        testLargeMatrixTargetAbsent();
        testFindsElementsAtRowBoundaries();
        System.out.println("All tests passed!");
    }

    static void testFindsTargetInMatrix() {
        assert Search2DMatrix.search2DMatrix(DEFAULT_MATRIX, 3) == true;
    }

    static void testReturnsFalseWhenNotFound() {
        assert Search2DMatrix.search2DMatrix(DEFAULT_MATRIX, 13) == false;
    }

    static void testFindsFirstElement() {
        assert Search2DMatrix.search2DMatrix(DEFAULT_MATRIX, 1) == true;
    }

    static void testFindsLastElement() {
        assert Search2DMatrix.search2DMatrix(DEFAULT_MATRIX, 60) == true;
    }

    static void testSingleRowTargetFound() {
        assert Search2DMatrix.search2DMatrix(new int[][]{{1, 3, 5, 7, 9}}, 5) == true;
    }

    static void testSingleRowTargetNotFound() {
        assert Search2DMatrix.search2DMatrix(new int[][]{{1, 3, 5, 7, 9}}, 4) == false;
    }

    static void testSingleElementMatch() {
        assert Search2DMatrix.search2DMatrix(new int[][]{{42}}, 42) == true;
    }

    static void testSingleElementNoMatch() {
        assert Search2DMatrix.search2DMatrix(new int[][]{{42}}, 99) == false;
    }

    static void testReturnsFalseForEmptyMatrix() {
        assert Search2DMatrix.search2DMatrix(new int[][]{}, 5) == false;
    }

    static void testLargeMatrixTargetFoundInMiddle() {
        int[][] matrix = {{1, 2, 3, 4, 5}, {6, 7, 8, 9, 10}, {11, 12, 13, 14, 15}, {16, 17, 18, 19, 20}};
        assert Search2DMatrix.search2DMatrix(matrix, 13) == true;
    }

    static void testLargeMatrixTargetAbsent() {
        int[][] matrix = {{1, 2, 3, 4, 5}, {6, 7, 8, 9, 10}, {11, 12, 13, 14, 15}, {16, 17, 18, 19, 20}};
        assert Search2DMatrix.search2DMatrix(matrix, 0) == false;
    }

    static void testFindsElementsAtRowBoundaries() {
        assert Search2DMatrix.search2DMatrix(DEFAULT_MATRIX, 10) == true;
        assert Search2DMatrix.search2DMatrix(DEFAULT_MATRIX, 7) == true;
    }
}
