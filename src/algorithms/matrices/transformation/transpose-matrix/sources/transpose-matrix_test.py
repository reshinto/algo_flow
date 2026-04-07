import importlib

transpose_matrix_mod = importlib.import_module("transpose-matrix")
transpose_matrix = transpose_matrix_mod.transpose_matrix


def test_transposes_3x3_square_matrix():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert transpose_matrix(matrix) == [[1, 4, 7], [2, 5, 8], [3, 6, 9]]


def test_transposes_2x2_matrix():
    matrix = [[1, 2], [3, 4]]
    assert transpose_matrix(matrix) == [[1, 3], [2, 4]]


def test_transposes_4x4_matrix():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]
    assert transpose_matrix(matrix) == [
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [4, 8, 12, 16],
    ]


def test_transposes_1x1_matrix():
    assert transpose_matrix([[42]]) == [[42]]


def test_transposes_2x3_matrix_to_3x2():
    matrix = [[1, 2, 3], [4, 5, 6]]
    assert transpose_matrix(matrix) == [[1, 4], [2, 5], [3, 6]]


def test_transposes_3x2_matrix_to_2x3():
    matrix = [[1, 2], [3, 4], [5, 6]]
    assert transpose_matrix(matrix) == [[1, 3, 5], [2, 4, 6]]


def test_transposes_single_row_to_single_column():
    assert transpose_matrix([[1, 2, 3, 4]]) == [[1], [2], [3], [4]]


def test_transposes_single_column_to_single_row():
    assert transpose_matrix([[1], [2], [3]]) == [[1, 2, 3]]


def test_double_transpose_returns_original():
    original = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    import copy
    transposed = transpose_matrix(copy.deepcopy(original))
    double_transposed = transpose_matrix(transposed)
    assert double_transposed == original


if __name__ == "__main__":
    test_transposes_3x3_square_matrix()
    test_transposes_2x2_matrix()
    test_transposes_4x4_matrix()
    test_transposes_1x1_matrix()
    test_transposes_2x3_matrix_to_3x2()
    test_transposes_3x2_matrix_to_2x3()
    test_transposes_single_row_to_single_column()
    test_transposes_single_column_to_single_row()
    test_double_transpose_returns_original()
    print("All tests passed!")
