import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

matrix_diagonal_sum_mod = importlib.import_module("matrix-diagonal-sum")
matrix_diagonal_sum = matrix_diagonal_sum_mod.matrix_diagonal_sum


def test_sums_both_diagonals_3x3_subtracts_center():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert matrix_diagonal_sum(matrix) == 25


def test_sums_both_diagonals_4x4_no_center():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    assert matrix_diagonal_sum(matrix) == 68


def test_single_element_matrix():
    assert matrix_diagonal_sum([[42]]) == 42


def test_2x2_matrix():
    matrix = [[1, 2], [3, 4]]
    assert matrix_diagonal_sum(matrix) == 10


def test_5x5_matrix_subtracts_center():
    matrix = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
    ]
    assert matrix_diagonal_sum(matrix) == 117


def test_all_zeros_matrix():
    matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    assert matrix_diagonal_sum(matrix) == 0


def test_identity_matrix():
    matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    assert matrix_diagonal_sum(matrix) == 3


def test_negative_values_on_diagonals():
    matrix = [[-1, 0, -2], [0, -3, 0], [-4, 0, -5]]
    assert matrix_diagonal_sum(matrix) == -15


def test_4x4_all_same_values():
    matrix = [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]]
    assert matrix_diagonal_sum(matrix) == 16


if __name__ == "__main__":
    test_sums_both_diagonals_3x3_subtracts_center()
    test_sums_both_diagonals_4x4_no_center()
    test_single_element_matrix()
    test_2x2_matrix()
    test_5x5_matrix_subtracts_center()
    test_all_zeros_matrix()
    test_identity_matrix()
    test_negative_values_on_diagonals()
    test_4x4_all_same_values()
    print("All tests passed!")
