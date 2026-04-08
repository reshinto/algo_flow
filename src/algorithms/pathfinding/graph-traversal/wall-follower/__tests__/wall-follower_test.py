import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

wall_follower_mod = importlib.import_module("wall-follower")
wall_follower = wall_follower_mod.wall_follower


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def make_all_walls_grid(rows, cols):
    return [[{"type": "wall"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_finds_path_in_simple_corridor():
    grid = make_empty_grid(1, 5)
    set_cell(grid, 0, 0, "start")
    set_cell(grid, 0, 4, "end")
    result = wall_follower(grid, (0, 0), (0, 4))
    assert len(result["path"]) > 0
    assert result["path"][-1] == (0, 4)


def test_starts_path_at_start_position():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 0, 0, "start")
    set_cell(grid, 2, 2, "end")
    result = wall_follower(grid, (0, 0), (2, 2))
    assert result["path"][0] == (0, 0)


def test_handles_start_equal_to_end():
    grid = make_empty_grid(3, 3)
    result = wall_follower(grid, (1, 1), (1, 1))
    assert len(result["path"]) >= 1
    assert result["path"][-1] == (1, 1)


def test_path_steps_are_adjacent():
    grid = make_empty_grid(1, 5)
    set_cell(grid, 0, 0, "start")
    set_cell(grid, 0, 4, "end")
    result = wall_follower(grid, (0, 0), (0, 4))
    for path_index in range(1, len(result["path"])):
        prev = result["path"][path_index - 1]
        curr = result["path"][path_index]
        assert abs(curr[0] - prev[0]) + abs(curr[1] - prev[1]) == 1


def test_returns_visited_cells():
    grid = make_empty_grid(3, 3)
    result = wall_follower(grid, (0, 0), (2, 2))
    assert len(result["visited"]) > 0


def test_returns_empty_path_when_start_isolated():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 1, "wall")
    result = wall_follower(grid, (0, 0), (2, 2))
    assert result["path"] == []


if __name__ == "__main__":
    test_finds_path_in_simple_corridor()
    test_starts_path_at_start_position()
    test_handles_start_equal_to_end()
    test_path_steps_are_adjacent()
    test_returns_visited_cells()
    test_returns_empty_path_when_start_isolated()
    print("All tests passed!")
