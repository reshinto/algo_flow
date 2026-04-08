// javac ValidSudoku.java ValidSudoku_test.java && java -ea ValidSudoku_test

public class ValidSudoku_test {

    static final int[][] VALID_PARTIAL_BOARD = {
        {5, 3, 0, 0, 7, 0, 0, 0, 0},
        {6, 0, 0, 1, 9, 5, 0, 0, 0},
        {0, 9, 8, 0, 0, 0, 0, 6, 0},
        {8, 0, 0, 0, 6, 0, 0, 0, 3},
        {4, 0, 0, 8, 0, 3, 0, 0, 1},
        {7, 0, 0, 0, 2, 0, 0, 0, 6},
        {0, 6, 0, 0, 0, 0, 2, 8, 0},
        {0, 0, 0, 4, 1, 9, 0, 0, 5},
        {0, 0, 0, 0, 8, 0, 0, 7, 9},
    };

    static int[][] emptyBoard() {
        int[][] board = new int[9][9];
        return board;
    }

    static int[][] copyBoard(int[][] source) {
        int[][] copy = new int[9][9];
        for (int rowIdx = 0; rowIdx < 9; rowIdx++) {
            copy[rowIdx] = source[rowIdx].clone();
        }
        return copy;
    }

    public static void main(String[] args) {
        testAcceptsValidPartialBoard();
        testAcceptsEmptyBoard();
        testRejectsDuplicateInRow();
        testRejectsDuplicateInColumn();
        testRejectsDuplicateIn3x3Box();
        testAcceptsFullyValidCompletedBoard();
        testAcceptsBoardWithSingleFilledCell();
        testRejectsSameDigitTwiceInSameBox();
        System.out.println("All tests passed!");
    }

    static void testAcceptsValidPartialBoard() {
        assert ValidSudoku.validSudoku(copyBoard(VALID_PARTIAL_BOARD)) == true;
    }

    static void testAcceptsEmptyBoard() {
        assert ValidSudoku.validSudoku(emptyBoard()) == true;
    }

    static void testRejectsDuplicateInRow() {
        int[][] board = emptyBoard();
        board[0][0] = 5;
        board[0][4] = 5;
        assert ValidSudoku.validSudoku(board) == false;
    }

    static void testRejectsDuplicateInColumn() {
        int[][] board = emptyBoard();
        board[0][0] = 3;
        board[5][0] = 3;
        assert ValidSudoku.validSudoku(board) == false;
    }

    static void testRejectsDuplicateIn3x3Box() {
        int[][] board = emptyBoard();
        board[0][0] = 7;
        board[2][2] = 7;
        assert ValidSudoku.validSudoku(board) == false;
    }

    static void testAcceptsFullyValidCompletedBoard() {
        int[][] completedBoard = {
            {5, 3, 4, 6, 7, 8, 9, 1, 2},
            {6, 7, 2, 1, 9, 5, 3, 4, 8},
            {1, 9, 8, 3, 4, 2, 5, 6, 7},
            {8, 5, 9, 7, 6, 1, 4, 2, 3},
            {4, 2, 6, 8, 5, 3, 7, 9, 1},
            {7, 1, 3, 9, 2, 4, 8, 5, 6},
            {9, 6, 1, 5, 3, 7, 2, 8, 4},
            {2, 8, 7, 4, 1, 9, 6, 3, 5},
            {3, 4, 5, 2, 8, 6, 1, 7, 9},
        };
        assert ValidSudoku.validSudoku(completedBoard) == true;
    }

    static void testAcceptsBoardWithSingleFilledCell() {
        int[][] board = emptyBoard();
        board[4][4] = 5;
        assert ValidSudoku.validSudoku(board) == true;
    }

    static void testRejectsSameDigitTwiceInSameBox() {
        int[][] board = emptyBoard();
        board[0][1] = 9;
        board[1][2] = 9;
        assert ValidSudoku.validSudoku(board) == false;
    }
}
