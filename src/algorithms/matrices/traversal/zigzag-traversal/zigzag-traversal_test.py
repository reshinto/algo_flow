import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

zigzag_traversal_mod = importlib.import_module("zigzag-traversal")
zigzag_traversal = zigzag_traversal_mod.zigzag_traversal


def test_zigzag_traversal_3x3():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert zigzag_traversal(matrix) == [1, 2, 4, 7, 5, 3, 6, 8, 9]


def test_zigzag_traversal_3x4():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    assert zigzag_traversal(matrix) == [1, 2, 5, 9, 6, 3, 4, 7, 10, 11, 8, 12]


def test_zigzag_traversal_4x4():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    assert zigzag_traversal(matrix) == [1, 2, 5, 9, 6, 3, 4, 7, 10, 13, 14, 11, 8, 12, 15, 16]


def test_zigzag_traversal_single_element():
    assert zigzag_traversal([[42]]) == [42]


def test_zigzag_traversal_single_row():
    assert zigzag_traversal([[1, 2, 3, 4]]) == [1, 2, 3, 4]


def test_zigzag_traversal_single_column():
    assert zigzag_traversal([[1], [2], [3], [4]]) == [1, 2, 3, 4]


def test_zigzag_traversal_empty_matrix():
    result = zigzag_traversal([])
    assert len(result) == 0


def test_zigzag_traversal_2x2():
    matrix = [[1, 2], [3, 4]]
    assert zigzag_traversal(matrix) == [1, 2, 3, 4]


def test_zigzag_traversal_collects_all_once_3x3():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    result = zigzag_traversal(matrix)
    assert len(result) == 9
    assert len(set(result)) == 9


def test_zigzag_traversal_collects_all_once_3x4():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]
    result = zigzag_traversal(matrix)
    assert len(result) == 12
    assert len(set(result)) == 12


if __name__ == "__main__":
    test_zigzag_traversal_3x3()
    test_zigzag_traversal_3x4()
    test_zigzag_traversal_4x4()
    test_zigzag_traversal_single_element()
    test_zigzag_traversal_single_row()
    test_zigzag_traversal_single_column()
    test_zigzag_traversal_empty_matrix()
    test_zigzag_traversal_2x2()
    test_zigzag_traversal_collects_all_once_3x3()
    test_zigzag_traversal_collects_all_once_3x4()
    print("All tests passed!")
