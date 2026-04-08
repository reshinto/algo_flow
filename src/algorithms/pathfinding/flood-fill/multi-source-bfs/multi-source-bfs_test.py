import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
import sys

multi_source_bfs_mod = importlib.import_module("multi-source-bfs")
multi_source_bfs = multi_source_bfs_mod.multi_source_bfs


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_single_cell_distance_is_1():
    grid = make_empty_grid(1, 1)
    result = multi_source_bfs(grid)
    assert result["distances"][0][0] == 1
    assert result["maxDistance"] == 1


def test_single_row_all_distance_1():
    grid = make_empty_grid(1, 5)
    result = multi_source_bfs(grid)
    for dist in result["distances"][0]:
        assert dist == 1


def test_center_of_3x3_has_distance_2():
    grid = make_empty_grid(3, 3)
    result = multi_source_bfs(grid)
    assert result["distances"][1][1] == 2
    assert result["maxDistance"] == 2


def test_walls_have_distance_minus_1():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 1, 1, "wall")
    result = multi_source_bfs(grid)
    assert result["distances"][1][1] == -1


def test_center_of_5x5_has_max_distance_3():
    grid = make_empty_grid(5, 5)
    result = multi_source_bfs(grid)
    assert result["maxDistance"] == 3
    assert result["distances"][2][2] == 3


def test_all_non_wall_cells_have_positive_distance():
    grid = make_empty_grid(4, 4)
    set_cell(grid, 1, 1, "wall")
    result = multi_source_bfs(grid)
    for row_index in range(4):
        for col_index in range(4):
            if grid[row_index][col_index]["type"] != "wall":
                assert result["distances"][row_index][col_index] > 0


if __name__ == "__main__":
    test_single_cell_distance_is_1()
    test_single_row_all_distance_1()
    test_center_of_3x3_has_distance_2()
    test_walls_have_distance_minus_1()
    test_center_of_5x5_has_max_distance_3()
    test_all_non_wall_cells_have_positive_distance()
    print("All tests passed!")
