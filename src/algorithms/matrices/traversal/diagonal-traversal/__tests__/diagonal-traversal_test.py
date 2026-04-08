import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

diagonal_traversal_mod = importlib.import_module("diagonal-traversal")
diagonal_traversal = diagonal_traversal_mod.diagonal_traversal


def test_traverses_3x4_matrix_diagonally():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    assert diagonal_traversal(matrix) == [1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12]


def test_traverses_4x4_square_matrix_diagonally():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    assert diagonal_traversal(matrix) == [1, 2, 5, 3, 6, 9, 4, 7, 10, 13, 8, 11, 14, 12, 15, 16]


def test_handles_1x1_matrix():
    assert diagonal_traversal([[42]]) == [42]


def test_handles_single_row_matrix():
    assert diagonal_traversal([[1, 2, 3, 4]]) == [1, 2, 3, 4]


def test_handles_single_column_matrix():
    assert diagonal_traversal([[1], [2], [3], [4]]) == [1, 2, 3, 4]


def test_returns_empty_for_empty_matrix():
    assert diagonal_traversal([]) == []


def test_handles_2x2_matrix():
    assert diagonal_traversal([[1, 2], [3, 4]]) == [1, 2, 3, 4]


def test_handles_2x3_non_square_matrix():
    assert diagonal_traversal([[1, 2, 3], [4, 5, 6]]) == [1, 2, 4, 3, 5, 6]


def test_collects_all_elements_exactly_once():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    result = diagonal_traversal(matrix)
    assert len(result) == 9
    assert len(set(result)) == 9


def test_handles_3x3_matrix():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert diagonal_traversal(matrix) == [1, 2, 4, 3, 5, 7, 6, 8, 9]


if __name__ == "__main__":
    test_traverses_3x4_matrix_diagonally()
    test_traverses_4x4_square_matrix_diagonally()
    test_handles_1x1_matrix()
    test_handles_single_row_matrix()
    test_handles_single_column_matrix()
    test_returns_empty_for_empty_matrix()
    test_handles_2x2_matrix()
    test_handles_2x3_non_square_matrix()
    test_collects_all_elements_exactly_once()
    test_handles_3x3_matrix()
    print("All tests passed!")
