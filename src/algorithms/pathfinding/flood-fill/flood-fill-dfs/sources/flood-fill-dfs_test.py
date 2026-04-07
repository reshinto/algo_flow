import importlib
import sys

flood_fill_dfs_mod = importlib.import_module("flood-fill-dfs")
flood_fill_dfs = flood_fill_dfs_mod.flood_fill_dfs


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_fills_all_cells_on_small_empty_grid():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 0, 0, "start")
    result = flood_fill_dfs(grid, (0, 0))
    assert result["count"] == 9
    assert len(result["filled"]) == 9


def test_respects_walls():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 1, "wall")
    set_cell(grid, 2, 1, "wall")
    result = flood_fill_dfs(grid, (0, 0))
    assert result["count"] == 3


def test_fills_same_count_as_bfs():
    grid = make_empty_grid(4, 4)
    set_cell(grid, 1, 2, "wall")
    set_cell(grid, 2, 2, "wall")
    result = flood_fill_dfs(grid, (0, 0))
    assert result["count"] == 14


def test_seed_cell_is_first_filled():
    grid = make_empty_grid(3, 3)
    result = flood_fill_dfs(grid, (1, 1))
    assert result["filled"][0] == (1, 1)


def test_isolated_cell():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 2, "wall")
    set_cell(grid, 2, 1, "wall")
    result = flood_fill_dfs(grid, (1, 1))
    assert result["count"] == 1
    assert result["filled"][0] == (1, 1)


def test_count_matches_filled_length():
    grid = make_empty_grid(4, 4)
    set_cell(grid, 0, 2, "wall")
    set_cell(grid, 1, 2, "wall")
    result = flood_fill_dfs(grid, (0, 0))
    assert result["count"] == len(result["filled"])


def test_start_and_end_types_are_passable():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 0, 0, "start")
    set_cell(grid, 2, 2, "end")
    result = flood_fill_dfs(grid, (0, 0))
    assert result["count"] == 9


if __name__ == "__main__":
    test_fills_all_cells_on_small_empty_grid()
    test_respects_walls()
    test_fills_same_count_as_bfs()
    test_seed_cell_is_first_filled()
    test_isolated_cell()
    test_count_matches_filled_length()
    test_start_and_end_types_are_passable()
    print("All tests passed!")
