import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

set_matrix_zeroes_mod = importlib.import_module("set-matrix-zeroes")
set_matrix_zeroes = set_matrix_zeroes_mod.set_matrix_zeroes


def test_zeros_row_and_column_of_single_zero_3x3():
    matrix = [[1, 1, 1], [1, 0, 1], [1, 1, 1]]
    assert set_matrix_zeroes(matrix) == [[1, 0, 1], [0, 0, 0], [1, 0, 1]]


def test_handles_default_input_with_zeros_in_first_row_and_last_column():
    matrix = [[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]
    assert set_matrix_zeroes(matrix) == [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]]


def test_leaves_matrix_without_zeros_unchanged():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert set_matrix_zeroes(matrix) == [[1, 2, 3], [4, 5, 6], [7, 8, 9]]


def test_returns_all_zeros_when_every_cell_is_zero():
    matrix = [[0, 0], [0, 0]]
    assert set_matrix_zeroes(matrix) == [[0, 0], [0, 0]]


def test_handles_1x1_with_zero():
    assert set_matrix_zeroes([[0]]) == [[0]]


def test_handles_1x1_with_nonzero():
    assert set_matrix_zeroes([[5]]) == [[5]]


def test_handles_zero_in_first_row():
    matrix = [[1, 0, 3], [4, 5, 6], [7, 8, 9]]
    assert set_matrix_zeroes(matrix) == [[0, 0, 0], [4, 0, 6], [7, 0, 9]]


def test_handles_zero_in_first_column():
    matrix = [[1, 2, 3], [0, 5, 6], [7, 8, 9]]
    assert set_matrix_zeroes(matrix) == [[0, 2, 3], [0, 0, 0], [0, 8, 9]]


def test_handles_single_row_with_zero():
    assert set_matrix_zeroes([[1, 0, 3]]) == [[0, 0, 0]]


def test_handles_single_column_with_zero():
    assert set_matrix_zeroes([[1], [0], [3]]) == [[0], [0], [0]]


def test_handles_multiple_zeros_in_same_row():
    matrix = [[0, 1, 0], [2, 3, 4], [5, 6, 7]]
    assert set_matrix_zeroes(matrix) == [[0, 0, 0], [0, 3, 0], [0, 6, 0]]


if __name__ == "__main__":
    test_zeros_row_and_column_of_single_zero_3x3()
    test_handles_default_input_with_zeros_in_first_row_and_last_column()
    test_leaves_matrix_without_zeros_unchanged()
    test_returns_all_zeros_when_every_cell_is_zero()
    test_handles_1x1_with_zero()
    test_handles_1x1_with_nonzero()
    test_handles_zero_in_first_row()
    test_handles_zero_in_first_column()
    test_handles_single_row_with_zero()
    test_handles_single_column_with_zero()
    test_handles_multiple_zeros_in_same_row()
    print("All tests passed!")
