import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
import copy

rotate_matrix_mod = importlib.import_module("rotate-matrix")
rotate_matrix = rotate_matrix_mod.rotate_matrix


def test_rotates_3x3_90_clockwise():
    matrix = copy.deepcopy([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    assert rotate_matrix(matrix) == [[7, 4, 1], [8, 5, 2], [9, 6, 3]]


def test_rotates_4x4_90_clockwise():
    matrix = copy.deepcopy([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]])
    assert rotate_matrix(matrix) == [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]]


def test_rotates_1x1_matrix_no_op():
    matrix = copy.deepcopy([[42]])
    assert rotate_matrix(matrix) == [[42]]


def test_rotates_2x2_90_clockwise():
    matrix = copy.deepcopy([[1, 2], [3, 4]])
    assert rotate_matrix(matrix) == [[3, 1], [4, 2]]


def test_handles_identity_like_matrix():
    matrix = copy.deepcopy([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    assert rotate_matrix(matrix) == [[0, 0, 1], [0, 1, 0], [1, 0, 0]]


def test_handles_negative_values():
    matrix = copy.deepcopy([[-1, -2], [-3, -4]])
    assert rotate_matrix(matrix) == [[-3, -1], [-4, -2]]


def test_four_rotations_return_original():
    original = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    matrix = copy.deepcopy(original)
    for _ in range(4):
        matrix = rotate_matrix(matrix)
    assert matrix == original


if __name__ == "__main__":
    test_rotates_3x3_90_clockwise()
    test_rotates_4x4_90_clockwise()
    test_rotates_1x1_matrix_no_op()
    test_rotates_2x2_90_clockwise()
    test_handles_identity_like_matrix()
    test_handles_negative_values()
    test_four_rotations_return_original()
    print("All tests passed!")
