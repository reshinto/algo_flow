import importlib
import copy

rotate_layer_by_layer_mod = importlib.import_module("rotate-layer-by-layer")
rotate_layer_by_layer = rotate_layer_by_layer_mod.rotate_layer_by_layer


def test_rotates_3x3_90_clockwise():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert rotate_layer_by_layer(copy.deepcopy(matrix)) == [[7, 4, 1], [8, 5, 2], [9, 6, 3]]


def test_rotates_4x4_90_clockwise():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    assert rotate_layer_by_layer(copy.deepcopy(matrix)) == [
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [15, 11, 7, 3],
        [16, 12, 8, 4],
    ]


def test_handles_1x1_matrix():
    assert rotate_layer_by_layer([[42]]) == [[42]]


def test_rotates_2x2_90_clockwise():
    matrix = [[1, 2], [3, 4]]
    assert rotate_layer_by_layer(copy.deepcopy(matrix)) == [[3, 1], [4, 2]]


def test_rotates_5x5_90_clockwise():
    matrix = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15],
        [16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25],
    ]
    assert rotate_layer_by_layer(copy.deepcopy(matrix)) == [
        [21, 16, 11, 6, 1],
        [22, 17, 12, 7, 2],
        [23, 18, 13, 8, 3],
        [24, 19, 14, 9, 4],
        [25, 20, 15, 10, 5],
    ]


def test_four_rotations_return_original():
    original = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    matrix = copy.deepcopy(original)
    for _ in range(4):
        matrix = rotate_layer_by_layer(matrix)
    assert matrix == original


def test_handles_negative_and_zero_values():
    matrix = [[-1, 0, 1], [-2, 0, 2], [-3, 0, 3]]
    assert rotate_layer_by_layer(copy.deepcopy(matrix)) == [
        [-3, -2, -1],
        [0, 0, 0],
        [3, 2, 1],
    ]


if __name__ == "__main__":
    test_rotates_3x3_90_clockwise()
    test_rotates_4x4_90_clockwise()
    test_handles_1x1_matrix()
    test_rotates_2x2_90_clockwise()
    test_rotates_5x5_90_clockwise()
    test_four_rotations_return_original()
    test_handles_negative_and_zero_values()
    print("All tests passed!")
