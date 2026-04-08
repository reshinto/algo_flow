import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

search_2d_matrix_mod = importlib.import_module("search-2d-matrix")
search_2d_matrix = search_2d_matrix_mod.search_2d_matrix

DEFAULT_MATRIX = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]]


def test_finds_target_in_matrix():
    assert search_2d_matrix(DEFAULT_MATRIX, 3) is True


def test_returns_false_when_not_found():
    assert search_2d_matrix(DEFAULT_MATRIX, 13) is False


def test_finds_first_element():
    assert search_2d_matrix(DEFAULT_MATRIX, 1) is True


def test_finds_last_element():
    assert search_2d_matrix(DEFAULT_MATRIX, 60) is True


def test_single_row_target_found():
    assert search_2d_matrix([[1, 3, 5, 7, 9]], 5) is True


def test_single_row_target_not_found():
    assert search_2d_matrix([[1, 3, 5, 7, 9]], 4) is False


def test_single_element_match():
    assert search_2d_matrix([[42]], 42) is True


def test_single_element_no_match():
    assert search_2d_matrix([[42]], 99) is False


def test_returns_false_for_empty_matrix():
    assert search_2d_matrix([], 5) is False


def test_large_matrix_target_found_in_middle():
    matrix = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]
    assert search_2d_matrix(matrix, 13) is True


def test_large_matrix_target_absent():
    matrix = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20]]
    assert search_2d_matrix(matrix, 0) is False


def test_finds_elements_at_row_boundaries():
    assert search_2d_matrix(DEFAULT_MATRIX, 10) is True
    assert search_2d_matrix(DEFAULT_MATRIX, 7) is True


if __name__ == "__main__":
    test_finds_target_in_matrix()
    test_returns_false_when_not_found()
    test_finds_first_element()
    test_finds_last_element()
    test_single_row_target_found()
    test_single_row_target_not_found()
    test_single_element_match()
    test_single_element_no_match()
    test_returns_false_for_empty_matrix()
    test_large_matrix_target_found_in_middle()
    test_large_matrix_target_absent()
    test_finds_elements_at_row_boundaries()
    print("All tests passed!")
