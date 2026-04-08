import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

valid_sudoku_mod = importlib.import_module("valid-sudoku")
valid_sudoku = valid_sudoku_mod.valid_sudoku

VALID_PARTIAL_BOARD = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
]

EMPTY_BOARD = [[0] * 9 for _ in range(9)]


def test_accepts_valid_partial_board():
    assert valid_sudoku(VALID_PARTIAL_BOARD) is True


def test_accepts_empty_board():
    assert valid_sudoku(EMPTY_BOARD) is True


def test_rejects_duplicate_in_row():
    board = [row[:] for row in EMPTY_BOARD]
    board[0][0] = 5
    board[0][4] = 5
    assert valid_sudoku(board) is False


def test_rejects_duplicate_in_column():
    board = [row[:] for row in EMPTY_BOARD]
    board[0][0] = 3
    board[5][0] = 3
    assert valid_sudoku(board) is False


def test_rejects_duplicate_in_3x3_box():
    board = [row[:] for row in EMPTY_BOARD]
    board[0][0] = 7
    board[2][2] = 7
    assert valid_sudoku(board) is False


def test_accepts_fully_valid_completed_board():
    completed_board = [
        [5, 3, 4, 6, 7, 8, 9, 1, 2],
        [6, 7, 2, 1, 9, 5, 3, 4, 8],
        [1, 9, 8, 3, 4, 2, 5, 6, 7],
        [8, 5, 9, 7, 6, 1, 4, 2, 3],
        [4, 2, 6, 8, 5, 3, 7, 9, 1],
        [7, 1, 3, 9, 2, 4, 8, 5, 6],
        [9, 6, 1, 5, 3, 7, 2, 8, 4],
        [2, 8, 7, 4, 1, 9, 6, 3, 5],
        [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ]
    assert valid_sudoku(completed_board) is True


def test_accepts_board_with_single_filled_cell():
    board = [row[:] for row in EMPTY_BOARD]
    board[4][4] = 5
    assert valid_sudoku(board) is True


def test_rejects_same_digit_twice_in_same_box():
    board = [row[:] for row in EMPTY_BOARD]
    board[0][1] = 9
    board[1][2] = 9
    assert valid_sudoku(board) is False


if __name__ == "__main__":
    test_accepts_valid_partial_board()
    test_accepts_empty_board()
    test_rejects_duplicate_in_row()
    test_rejects_duplicate_in_column()
    test_rejects_duplicate_in_3x3_box()
    test_accepts_fully_valid_completed_board()
    test_accepts_board_with_single_filled_cell()
    test_rejects_same_digit_twice_in_same_box()
    print("All tests passed!")
