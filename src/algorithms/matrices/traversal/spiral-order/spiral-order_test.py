import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

spiral_order_mod = importlib.import_module("spiral-order")
spiral_order = spiral_order_mod.spiral_order


def test_traverses_4x4_matrix_in_spiral_order():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    assert spiral_order(matrix) == [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]


def test_traverses_3x3_matrix_in_spiral_order():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert spiral_order(matrix) == [1, 2, 3, 6, 9, 8, 7, 4, 5]


def test_handles_single_row():
    assert spiral_order([[1, 2, 3, 4]]) == [1, 2, 3, 4]


def test_handles_single_column():
    assert spiral_order([[1], [2], [3], [4]]) == [1, 2, 3, 4]


def test_handles_1x1_matrix():
    assert spiral_order([[42]]) == [42]


def test_handles_2x2_matrix():
    assert spiral_order([[1, 2], [3, 4]]) == [1, 2, 4, 3]


def test_handles_2x4_non_square():
    assert spiral_order([[1, 2, 3, 4], [5, 6, 7, 8]]) == [1, 2, 3, 4, 8, 7, 6, 5]


def test_handles_3x2_non_square():
    assert spiral_order([[1, 2], [3, 4], [5, 6]]) == [1, 2, 4, 6, 5, 3]


def test_returns_empty_for_empty_matrix():
    assert spiral_order([]) == []


def test_collects_all_elements_exactly_once():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    result = spiral_order(matrix)
    assert len(result) == 9
    assert len(set(result)) == 9


if __name__ == "__main__":
    test_traverses_4x4_matrix_in_spiral_order()
    test_traverses_3x3_matrix_in_spiral_order()
    test_handles_single_row()
    test_handles_single_column()
    test_handles_1x1_matrix()
    test_handles_2x2_matrix()
    test_handles_2x4_non_square()
    test_handles_3x2_non_square()
    test_returns_empty_for_empty_matrix()
    test_collects_all_elements_exactly_once()
    print("All tests passed!")
