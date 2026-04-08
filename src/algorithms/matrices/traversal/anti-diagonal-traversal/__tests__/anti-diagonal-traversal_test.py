import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

anti_diagonal_traversal_mod = importlib.import_module("anti-diagonal-traversal")
anti_diagonal_traversal = anti_diagonal_traversal_mod.anti_diagonal_traversal


def test_traverses_3x3_in_anti_diagonal_order():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert anti_diagonal_traversal(matrix) == [1, 2, 4, 3, 5, 7, 6, 8, 9]


def test_traverses_3x4_in_anti_diagonal_order():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    assert anti_diagonal_traversal(matrix) == [1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12]


def test_traverses_4x3_in_anti_diagonal_order():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]
    assert anti_diagonal_traversal(matrix) == [1, 2, 4, 3, 5, 7, 6, 8, 10, 9, 11, 12]


def test_handles_1x1_matrix():
    assert anti_diagonal_traversal([[42]]) == [42]


def test_handles_single_row_matrix():
    assert anti_diagonal_traversal([[1, 2, 3, 4]]) == [1, 2, 3, 4]


def test_handles_single_column_matrix():
    assert anti_diagonal_traversal([[1], [2], [3], [4]]) == [1, 2, 3, 4]


def test_returns_empty_for_empty_matrix():
    assert anti_diagonal_traversal([]) == []


def test_traverses_2x2_matrix():
    assert anti_diagonal_traversal([[1, 2], [3, 4]]) == [1, 2, 3, 4]


def test_collects_all_elements_exactly_once():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    result = anti_diagonal_traversal(matrix)
    assert len(result) == 9
    assert len(set(result)) == 9


if __name__ == "__main__":
    test_traverses_3x3_in_anti_diagonal_order()
    test_traverses_3x4_in_anti_diagonal_order()
    test_traverses_4x3_in_anti_diagonal_order()
    test_handles_1x1_matrix()
    test_handles_single_row_matrix()
    test_handles_single_column_matrix()
    test_returns_empty_for_empty_matrix()
    test_traverses_2x2_matrix()
    test_collects_all_elements_exactly_once()
    print("All tests passed!")
