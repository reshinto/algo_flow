import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

spiral_matrix_ii_mod = importlib.import_module("spiral-matrix-ii")
spiral_matrix_ii = spiral_matrix_ii_mod.spiral_matrix_ii


def test_generates_1x1_matrix():
    assert spiral_matrix_ii(1) == [[1]]


def test_generates_2x2_matrix():
    assert spiral_matrix_ii(2) == [[1, 2], [4, 3]]


def test_generates_3x3_matrix():
    assert spiral_matrix_ii(3) == [[1, 2, 3], [8, 9, 4], [7, 6, 5]]


def test_generates_4x4_matrix():
    assert spiral_matrix_ii(4) == [
        [1, 2, 3, 4],
        [12, 13, 14, 5],
        [11, 16, 15, 6],
        [10, 9, 8, 7],
    ]


def test_generates_5x5_matrix():
    result = spiral_matrix_ii(5)
    assert result[0] == [1, 2, 3, 4, 5]
    assert result[1] == [16, 17, 18, 19, 6]
    assert result[2] == [15, 24, 25, 20, 7]
    assert result[3] == [14, 23, 22, 21, 8]
    assert result[4] == [13, 12, 11, 10, 9]


def test_places_1_in_top_left_corner():
    for size in [2, 3, 4, 5]:
        result = spiral_matrix_ii(size)
        assert result[0][0] == 1


def test_places_n_squared_in_center_for_odd_n():
    result = spiral_matrix_ii(3)
    center = 3 // 2
    assert result[center][center] == 9


def test_contains_all_values_1_to_n_squared_for_n4():
    result = spiral_matrix_ii(4)
    flat = [cell for row in result for cell in row]
    assert len(flat) == 16
    assert len(set(flat)) == 16
    assert min(flat) == 1
    assert max(flat) == 16


def test_contains_all_values_1_to_n_squared_for_n5():
    result = spiral_matrix_ii(5)
    flat = [cell for row in result for cell in row]
    assert len(flat) == 25
    assert len(set(flat)) == 25
    assert min(flat) == 1
    assert max(flat) == 25


def test_produces_square_matrix_with_correct_dimensions():
    result = spiral_matrix_ii(4)
    assert len(result) == 4
    for row in result:
        assert len(row) == 4


if __name__ == "__main__":
    test_generates_1x1_matrix()
    test_generates_2x2_matrix()
    test_generates_3x3_matrix()
    test_generates_4x4_matrix()
    test_generates_5x5_matrix()
    test_places_1_in_top_left_corner()
    test_places_n_squared_in_center_for_odd_n()
    test_contains_all_values_1_to_n_squared_for_n4()
    test_contains_all_values_1_to_n_squared_for_n5()
    test_produces_square_matrix_with_correct_dimensions()
    print("All tests passed!")
