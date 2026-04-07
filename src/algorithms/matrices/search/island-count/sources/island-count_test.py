import importlib
import copy

island_count_mod = importlib.import_module("island-count")
island_count = island_count_mod.island_count


def test_counts_2_islands_in_standard_grid():
    grid = [[1, 1, 0, 0], [1, 0, 0, 1], [0, 0, 1, 1], [0, 0, 0, 0]]
    assert island_count(copy.deepcopy(grid)) == 2


def test_returns_0_when_no_islands():
    grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    assert island_count(copy.deepcopy(grid)) == 0


def test_counts_1_island_when_entire_grid_is_land():
    grid = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
    assert island_count(copy.deepcopy(grid)) == 1


def test_handles_1x1_grid_with_island():
    assert island_count([[1]]) == 1


def test_handles_1x1_grid_with_no_island():
    assert island_count([[0]]) == 0


def test_diagonally_adjacent_cells_not_connected():
    grid = [[1, 0, 1], [0, 1, 0], [1, 0, 1]]
    assert island_count(copy.deepcopy(grid)) == 5


def test_l_shaped_island_counts_as_one():
    grid = [[1, 0], [1, 0], [1, 1]]
    assert island_count(copy.deepcopy(grid)) == 1


def test_handles_single_row_grid():
    assert island_count([[1, 0, 1, 1, 0, 1]]) == 3


def test_handles_single_column_grid():
    assert island_count([[1], [0], [1], [1], [0]]) == 2


def test_counts_3_islands_in_default_input():
    grid = [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1],
    ]
    assert island_count(copy.deepcopy(grid)) == 3


if __name__ == "__main__":
    test_counts_2_islands_in_standard_grid()
    test_returns_0_when_no_islands()
    test_counts_1_island_when_entire_grid_is_land()
    test_handles_1x1_grid_with_island()
    test_handles_1x1_grid_with_no_island()
    test_diagonally_adjacent_cells_not_connected()
    test_l_shaped_island_counts_as_one()
    test_handles_single_row_grid()
    test_handles_single_column_grid()
    test_counts_3_islands_in_default_input()
    print("All tests passed!")
