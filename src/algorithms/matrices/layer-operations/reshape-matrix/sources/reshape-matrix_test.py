import importlib

reshape_matrix_mod = importlib.import_module("reshape-matrix")
reshape_matrix = reshape_matrix_mod.reshape_matrix


def test_reshapes_2x4_to_4x2():
    matrix = [[1, 2, 3, 4], [5, 6, 7, 8]]
    assert reshape_matrix(matrix, 4, 2) == [[1, 2], [3, 4], [5, 6], [7, 8]]


def test_reshapes_2x2_to_1x4():
    matrix = [[1, 2], [3, 4]]
    assert reshape_matrix(matrix, 1, 4) == [[1, 2, 3, 4]]


def test_reshapes_2x2_to_4x1():
    matrix = [[1, 2], [3, 4]]
    assert reshape_matrix(matrix, 4, 1) == [[1], [2], [3], [4]]


def test_returns_original_for_impossible_reshape():
    matrix = [[1, 2], [3, 4]]
    result = reshape_matrix(matrix, 3, 2)
    assert result == matrix


def test_handles_1x1_identity_reshape():
    assert reshape_matrix([[42]], 1, 1) == [[42]]


def test_reshapes_3x3_to_1x9():
    matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    assert reshape_matrix(matrix, 1, 9) == [[1, 2, 3, 4, 5, 6, 7, 8, 9]]


def test_returns_original_for_same_dimensions():
    matrix = [[1, 2, 3], [4, 5, 6]]
    assert reshape_matrix(matrix, 2, 3) == matrix


def test_reshapes_1x6_to_2x3():
    assert reshape_matrix([[1, 2, 3, 4, 5, 6]], 2, 3) == [[1, 2, 3], [4, 5, 6]]


def test_returns_original_for_impossible_reshape_larger_target():
    matrix = [[1, 2, 3]]
    result = reshape_matrix(matrix, 2, 5)
    assert result == matrix


if __name__ == "__main__":
    test_reshapes_2x4_to_4x2()
    test_reshapes_2x2_to_1x4()
    test_reshapes_2x2_to_4x1()
    test_returns_original_for_impossible_reshape()
    test_handles_1x1_identity_reshape()
    test_reshapes_3x3_to_1x9()
    test_returns_original_for_same_dimensions()
    test_reshapes_1x6_to_2x3()
    test_returns_original_for_impossible_reshape_larger_target()
    print("All tests passed!")
