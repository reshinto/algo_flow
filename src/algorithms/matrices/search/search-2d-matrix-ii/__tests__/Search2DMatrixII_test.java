// javac Search2DMatrixII.java Search2DMatrixII_test.java && java -ea Search2DMatrixII_test

public class Search2DMatrixII_test {

    static final int[][] DEFAULT_MATRIX = {
        {1, 4, 7, 11, 15},
        {2, 5, 8, 12, 19},
        {3, 6, 9, 16, 22},
        {10, 13, 14, 17, 24},
        {18, 21, 23, 26, 30},
    };

    public static void main(String[] args) {
        testFindsTargetInCenter();
        testReturnsFalseWhenNotFound();
        testFindsTopRightCornerElement();
        testFindsBottomLeftCornerElement();
        testSingleElementMatch();
        testSingleElementNoMatch();
        testReturnsFalseForEmptyMatrix();
        testLargeMatrixTargetFound();
        testLargeMatrixTargetNotFound();
        testFindsFirstElement();
        testFindsLastElement();
        testSingleRowMatrix();
        System.out.println("All tests passed!");
    }

    static void testFindsTargetInCenter() {
        assert Search2DMatrixII.search2DMatrixII(DEFAULT_MATRIX, 5) == true;
    }

    static void testReturnsFalseWhenNotFound() {
        assert Search2DMatrixII.search2DMatrixII(DEFAULT_MATRIX, 20) == false;
    }

    static void testFindsTopRightCornerElement() {
        assert Search2DMatrixII.search2DMatrixII(DEFAULT_MATRIX, 15) == true;
    }

    static void testFindsBottomLeftCornerElement() {
        assert Search2DMatrixII.search2DMatrixII(DEFAULT_MATRIX, 18) == true;
    }

    static void testSingleElementMatch() {
        assert Search2DMatrixII.search2DMatrixII(new int[][]{{7}}, 7) == true;
    }

    static void testSingleElementNoMatch() {
        assert Search2DMatrixII.search2DMatrixII(new int[][]{{7}}, 3) == false;
    }

    static void testReturnsFalseForEmptyMatrix() {
        assert Search2DMatrixII.search2DMatrixII(new int[][]{}, 5) == false;
    }

    static void testLargeMatrixTargetFound() {
        int[][] matrix = {{1, 4, 7, 11}, {2, 5, 8, 12}, {3, 6, 9, 16}, {10, 13, 14, 17}};
        assert Search2DMatrixII.search2DMatrixII(matrix, 9) == true;
    }

    static void testLargeMatrixTargetNotFound() {
        int[][] matrix = {{1, 4, 7, 11}, {2, 5, 8, 12}, {3, 6, 9, 16}, {10, 13, 14, 17}};
        assert Search2DMatrixII.search2DMatrixII(matrix, 15) == false;
    }

    static void testFindsFirstElement() {
        assert Search2DMatrixII.search2DMatrixII(DEFAULT_MATRIX, 1) == true;
    }

    static void testFindsLastElement() {
        assert Search2DMatrixII.search2DMatrixII(DEFAULT_MATRIX, 30) == true;
    }

    static void testSingleRowMatrix() {
        assert Search2DMatrixII.search2DMatrixII(new int[][]{{1, 2, 3, 4, 5}}, 3) == true;
        assert Search2DMatrixII.search2DMatrixII(new int[][]{{1, 2, 3, 4, 5}}, 6) == false;
    }
}
