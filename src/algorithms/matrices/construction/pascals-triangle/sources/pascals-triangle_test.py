import importlib

pascals_triangle_mod = importlib.import_module("pascals-triangle")
pascals_triangle = pascals_triangle_mod.pascals_triangle


def test_returns_single_row_for_num_rows_1():
    assert pascals_triangle(1) == [[1]]


def test_returns_correct_triangle_for_num_rows_2():
    assert pascals_triangle(2) == [[1], [1, 1]]


def test_returns_correct_triangle_for_num_rows_3():
    assert pascals_triangle(3) == [[1], [1, 1], [1, 2, 1]]


def test_returns_correct_triangle_for_num_rows_5():
    assert pascals_triangle(5) == [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]


def test_returns_correct_triangle_for_num_rows_6():
    assert pascals_triangle(6) == [
        [1],
        [1, 1],
        [1, 2, 1],
        [1, 3, 3, 1],
        [1, 4, 6, 4, 1],
        [1, 5, 10, 10, 5, 1],
    ]


def test_inner_cell_is_sum_of_two_above():
    result = pascals_triangle(5)
    for row_idx in range(2, len(result)):
        current_row = result[row_idx]
        above_row = result[row_idx - 1]
        for col_idx in range(1, len(current_row) - 1):
            assert current_row[col_idx] == above_row[col_idx - 1] + above_row[col_idx]


def test_all_edge_cells_are_1():
    result = pascals_triangle(6)
    for row in result:
        assert row[0] == 1
        assert row[-1] == 1


def test_row_length_equals_row_index_plus_one():
    result = pascals_triangle(5)
    for row_idx, row in enumerate(result):
        assert len(row) == row_idx + 1


def test_returns_empty_array_for_num_rows_0():
    assert pascals_triangle(0) == []


if __name__ == "__main__":
    test_returns_single_row_for_num_rows_1()
    test_returns_correct_triangle_for_num_rows_2()
    test_returns_correct_triangle_for_num_rows_3()
    test_returns_correct_triangle_for_num_rows_5()
    test_returns_correct_triangle_for_num_rows_6()
    test_inner_cell_is_sum_of_two_above()
    test_all_edge_cells_are_1()
    test_row_length_equals_row_index_plus_one()
    test_returns_empty_array_for_num_rows_0()
    print("All tests passed!")
