import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

kth_smallest_sorted_matrix_mod = importlib.import_module("kth-smallest-sorted-matrix")
kth_smallest_sorted_matrix = kth_smallest_sorted_matrix_mod.kth_smallest_sorted_matrix


def test_finds_kth_smallest_3x3_k8():
    matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
    assert kth_smallest_sorted_matrix(matrix, 8) == 13


def test_returns_smallest_when_k1():
    matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
    assert kth_smallest_sorted_matrix(matrix, 1) == 1


def test_returns_largest_when_k_equals_n_squared():
    matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]]
    assert kth_smallest_sorted_matrix(matrix, 9) == 15


def test_handles_1x1_matrix():
    assert kth_smallest_sorted_matrix([[42]], 1) == 42


def test_handles_2x2_matrix_k2():
    matrix = [[1, 2], [3, 4]]
    assert kth_smallest_sorted_matrix(matrix, 2) == 2


def test_handles_2x2_matrix_k3():
    matrix = [[1, 2], [3, 4]]
    assert kth_smallest_sorted_matrix(matrix, 3) == 3


def test_handles_all_same_values():
    matrix = [[5, 5, 5], [5, 5, 5], [5, 5, 5]]
    assert kth_smallest_sorted_matrix(matrix, 5) == 5


def test_4x4_matrix_k8():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    assert kth_smallest_sorted_matrix(matrix, 8) == 8


def test_handles_negative_values():
    matrix = [[-5, -4, -3], [-2, -1, 0], [1, 2, 3]]
    assert kth_smallest_sorted_matrix(matrix, 5) == -1


def test_4x4_matrix_k16():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    assert kth_smallest_sorted_matrix(matrix, 16) == 16


if __name__ == "__main__":
    test_finds_kth_smallest_3x3_k8()
    test_returns_smallest_when_k1()
    test_returns_largest_when_k_equals_n_squared()
    test_handles_1x1_matrix()
    test_handles_2x2_matrix_k2()
    test_handles_2x2_matrix_k3()
    test_handles_all_same_values()
    test_4x4_matrix_k8()
    test_handles_negative_values()
    test_4x4_matrix_k16()
    print("All tests passed!")
