import importlib

search_2d_matrix_ii_mod = importlib.import_module("search-2d-matrix-ii")
search_2d_matrix_ii = search_2d_matrix_ii_mod.search_2d_matrix_ii

DEFAULT_MATRIX = [
    [1, 4, 7, 11, 15],
    [2, 5, 8, 12, 19],
    [3, 6, 9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30],
]


def test_finds_target_in_center():
    assert search_2d_matrix_ii(DEFAULT_MATRIX, 5) is True


def test_returns_false_when_not_found():
    assert search_2d_matrix_ii(DEFAULT_MATRIX, 20) is False


def test_finds_top_right_corner_element():
    assert search_2d_matrix_ii(DEFAULT_MATRIX, 15) is True


def test_finds_bottom_left_corner_element():
    assert search_2d_matrix_ii(DEFAULT_MATRIX, 18) is True


def test_single_element_match():
    assert search_2d_matrix_ii([[7]], 7) is True


def test_single_element_no_match():
    assert search_2d_matrix_ii([[7]], 3) is False


def test_returns_false_for_empty_matrix():
    assert search_2d_matrix_ii([], 5) is False


def test_large_matrix_target_found():
    matrix = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]]
    assert search_2d_matrix_ii(matrix, 9) is True


def test_large_matrix_target_not_found():
    matrix = [[1, 4, 7, 11], [2, 5, 8, 12], [3, 6, 9, 16], [10, 13, 14, 17]]
    assert search_2d_matrix_ii(matrix, 15) is False


def test_finds_first_element():
    assert search_2d_matrix_ii(DEFAULT_MATRIX, 1) is True


def test_finds_last_element():
    assert search_2d_matrix_ii(DEFAULT_MATRIX, 30) is True


def test_single_row_matrix():
    assert search_2d_matrix_ii([[1, 2, 3, 4, 5]], 3) is True
    assert search_2d_matrix_ii([[1, 2, 3, 4, 5]], 6) is False


if __name__ == "__main__":
    test_finds_target_in_center()
    test_returns_false_when_not_found()
    test_finds_top_right_corner_element()
    test_finds_bottom_left_corner_element()
    test_single_element_match()
    test_single_element_no_match()
    test_returns_false_for_empty_matrix()
    test_large_matrix_target_found()
    test_large_matrix_target_not_found()
    test_finds_first_element()
    test_finds_last_element()
    test_single_row_matrix()
    print("All tests passed!")
