import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

toeplitz_matrix_mod = importlib.import_module("toeplitz-matrix")
toeplitz_matrix = toeplitz_matrix_mod.toeplitz_matrix


def test_canonical_toeplitz_example():
    assert toeplitz_matrix([[1, 2, 3, 4], [5, 1, 2, 3], [9, 5, 1, 2]]) is True


def test_non_toeplitz_2x2():
    assert toeplitz_matrix([[1, 2], [2, 2]]) is False


def test_single_element_matrix():
    assert toeplitz_matrix([[42]]) is True


def test_single_row_matrix():
    assert toeplitz_matrix([[1, 2, 3, 4]]) is True


def test_single_column_matrix():
    assert toeplitz_matrix([[1], [2], [3]]) is True


def test_all_same_elements():
    assert toeplitz_matrix([[7, 7, 7], [7, 7, 7], [7, 7, 7]]) is True


def test_valid_2x2_toeplitz():
    assert toeplitz_matrix([[1, 2], [3, 1]]) is True


def test_invalid_2x2_non_toeplitz():
    assert toeplitz_matrix([[5, 3], [3, 4]]) is False


def test_first_row_mismatch():
    assert toeplitz_matrix([[1, 2, 3], [4, 2, 2], [7, 4, 2]]) is False


def test_last_diagonal_broken():
    assert toeplitz_matrix([[1, 2, 3], [4, 1, 2], [7, 4, 9]]) is False


if __name__ == "__main__":
    test_canonical_toeplitz_example()
    test_non_toeplitz_2x2()
    test_single_element_matrix()
    test_single_row_matrix()
    test_single_column_matrix()
    test_all_same_elements()
    test_valid_2x2_toeplitz()
    test_invalid_2x2_non_toeplitz()
    test_first_row_mismatch()
    test_last_diagonal_broken()
    print("All tests passed!")
