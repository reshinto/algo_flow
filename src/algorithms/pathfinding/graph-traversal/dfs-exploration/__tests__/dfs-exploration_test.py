import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

dfs_exploration_mod = importlib.import_module("dfs-exploration")
dfs_exploration = dfs_exploration_mod.dfs_exploration


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_visits_all_cells_in_open_grid():
    grid = make_empty_grid(3, 3)
    result = dfs_exploration(grid, (0, 0))
    assert len(result["visited"]) == 9


def test_starts_with_start_cell():
    grid = make_empty_grid(3, 3)
    result = dfs_exploration(grid, (1, 1))
    assert result["visited"][0] == (1, 1)


def test_does_not_visit_wall_cells():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 1, "wall")
    result = dfs_exploration(grid, (0, 0))
    assert len(result["visited"]) == 1


def test_visits_only_reachable_cells():
    grid = make_empty_grid(4, 4)
    for wall_row in range(4):
        set_cell(grid, wall_row, 2, "wall")
    result = dfs_exploration(grid, (0, 0))
    assert len(result["visited"]) == 8


def test_no_cell_visited_twice():
    grid = make_empty_grid(4, 4)
    result = dfs_exploration(grid, (0, 0))
    visited_set = set(result["visited"])
    assert len(visited_set) == len(result["visited"])


def test_max_depth_in_linear_corridor():
    grid = make_empty_grid(1, 5)
    result = dfs_exploration(grid, (0, 0))
    assert result["maxDepth"] == 4


def test_max_depth_zero_for_isolated_cell():
    grid = make_empty_grid(3, 3)
    for row, col in [(0, 1), (2, 1), (1, 0), (1, 2), (0, 0), (0, 2), (2, 0), (2, 2)]:
        set_cell(grid, row, col, "wall")
    result = dfs_exploration(grid, (1, 1))
    assert result["maxDepth"] == 0
    assert len(result["visited"]) == 1


def test_handles_1x1_grid():
    grid = make_empty_grid(1, 1)
    result = dfs_exploration(grid, (0, 0))
    assert len(result["visited"]) == 1
    assert result["maxDepth"] == 0


if __name__ == "__main__":
    test_visits_all_cells_in_open_grid()
    test_starts_with_start_cell()
    test_does_not_visit_wall_cells()
    test_visits_only_reachable_cells()
    test_no_cell_visited_twice()
    test_max_depth_in_linear_corridor()
    test_max_depth_zero_for_isolated_cell()
    test_handles_1x1_grid()
    print("All tests passed!")
