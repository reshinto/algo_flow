import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
import copy

flip_image_mod = importlib.import_module("flip-image")
flip_image = flip_image_mod.flip_image


def test_flips_and_inverts_3x3_example():
    matrix = copy.deepcopy([[1, 1, 0], [1, 0, 1], [0, 0, 0]])
    assert flip_image(matrix) == [[1, 0, 0], [0, 1, 0], [1, 1, 1]]


def test_handles_all_zeros():
    matrix = copy.deepcopy([[0, 0], [0, 0]])
    assert flip_image(matrix) == [[1, 1], [1, 1]]


def test_handles_all_ones():
    matrix = copy.deepcopy([[1, 1], [1, 1]])
    assert flip_image(matrix) == [[0, 0], [0, 0]]


def test_handles_single_row():
    matrix = copy.deepcopy([[1, 0, 1]])
    assert flip_image(matrix) == [[0, 1, 0]]


def test_handles_single_column():
    matrix = copy.deepcopy([[1], [0], [1]])
    assert flip_image(matrix) == [[0], [1], [0]]


def test_handles_1x1_with_0():
    matrix = copy.deepcopy([[0]])
    assert flip_image(matrix) == [[1]]


def test_handles_1x1_with_1():
    matrix = copy.deepcopy([[1]])
    assert flip_image(matrix) == [[0]]


def test_handles_4x4_binary_matrix():
    matrix = copy.deepcopy([[1, 1, 0, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 1, 0]])
    assert flip_image(matrix) == [[1, 1, 0, 0], [0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 1, 0]]


def test_handles_identity_like_matrix():
    matrix = copy.deepcopy([[1, 0, 0], [0, 1, 0], [0, 0, 1]])
    assert flip_image(matrix) == [[1, 1, 0], [1, 0, 1], [0, 1, 1]]


if __name__ == "__main__":
    test_flips_and_inverts_3x3_example()
    test_handles_all_zeros()
    test_handles_all_ones()
    test_handles_single_row()
    test_handles_single_column()
    test_handles_1x1_with_0()
    test_handles_1x1_with_1()
    test_handles_4x4_binary_matrix()
    test_handles_identity_like_matrix()
    print("All tests passed!")
