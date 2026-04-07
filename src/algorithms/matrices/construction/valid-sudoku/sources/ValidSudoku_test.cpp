// g++ -std=c++17 -o valid_sudoku_test ValidSudoku_test.cpp && ./valid_sudoku_test
#include "ValidSudoku.cpp"
#include <cassert>
#include <iostream>

static std::vector<std::vector<int>> emptyBoard() {
    return std::vector<std::vector<int>>(9, std::vector<int>(9, 0));
}

int main() {
    // test: accepts valid partial board
    {
        std::vector<std::vector<int>> board = {
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
        assert(validSudoku(board) == true);
    }

    // test: accepts empty board
    {
        auto board = emptyBoard();
        assert(validSudoku(board) == true);
    }

    // test: rejects duplicate in row
    {
        auto board = emptyBoard();
        board[0][0] = 5;
        board[0][4] = 5;
        assert(validSudoku(board) == false);
    }

    // test: rejects duplicate in column
    {
        auto board = emptyBoard();
        board[0][0] = 3;
        board[5][0] = 3;
        assert(validSudoku(board) == false);
    }

    // test: rejects duplicate in 3x3 box
    {
        auto board = emptyBoard();
        board[0][0] = 7;
        board[2][2] = 7;
        assert(validSudoku(board) == false);
    }

    // test: accepts fully valid completed board
    {
        std::vector<std::vector<int>> completedBoard = {
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
        assert(validSudoku(completedBoard) == true);
    }

    // test: accepts board with single filled cell
    {
        auto board = emptyBoard();
        board[4][4] = 5;
        assert(validSudoku(board) == true);
    }

    // test: rejects same digit twice in same box
    {
        auto board = emptyBoard();
        board[0][1] = 9;
        board[1][2] = 9;
        assert(validSudoku(board) == false);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
