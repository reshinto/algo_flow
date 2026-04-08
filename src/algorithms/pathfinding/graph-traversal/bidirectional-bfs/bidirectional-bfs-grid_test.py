import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
import sys

bidirectional_bfs_grid_mod = importlib.import_module("bidirectional-bfs-grid")
bidirectional_bfs = bidirectional_bfs_grid_mod.bidirectional_bfs


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_finds_path_on_empty_grid():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 0, "start")
    set_cell(grid, 4, 4, "end")
    result = bidirectional_bfs(grid, (0, 0), (4, 4))
    assert len(result["path"]) > 0
    assert result["path"][0] == (0, 0)
    assert result["path"][-1] == (4, 4)


def test_returns_empty_path_when_no_route():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 1, "wall")
    result = bidirectional_bfs(grid, (0, 0), (4, 4))
    assert result["path"] == []


def test_handles_adjacent_start_and_end():
    grid = make_empty_grid(3, 3)
    result = bidirectional_bfs(grid, (0, 0), (0, 1))
    assert len(result["path"]) > 0
    assert result["path"][0] == (0, 0)
    assert result["path"][-1] == (0, 1)


def test_handles_start_equal_to_end():
    grid = make_empty_grid(3, 3)
    result = bidirectional_bfs(grid, (1, 1), (1, 1))
    assert len(result["path"]) == 1
    assert result["path"][0] == (1, 1)


def test_navigates_around_walls():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 2, "wall")
    set_cell(grid, 1, 2, "wall")
    set_cell(grid, 2, 2, "wall")
    result = bidirectional_bfs(grid, (0, 0), (4, 4))
    assert len(result["path"]) > 0
    assert result["path"][-1] == (4, 4)


def test_path_is_valid_adjacent_steps():
    grid = make_empty_grid(5, 5)
    result = bidirectional_bfs(grid, (0, 0), (4, 4))
    for path_index in range(1, len(result["path"])):
        prev = result["path"][path_index - 1]
        curr = result["path"][path_index]
        assert abs(curr[0] - prev[0]) + abs(curr[1] - prev[1]) == 1


def test_tracks_visited_cells():
    grid = make_empty_grid(5, 5)
    result = bidirectional_bfs(grid, (0, 0), (4, 4))
    assert len(result["visited"]) > 0


if __name__ == "__main__":
    test_finds_path_on_empty_grid()
    test_returns_empty_path_when_no_route()
    test_handles_adjacent_start_and_end()
    test_handles_start_equal_to_end()
    test_navigates_around_walls()
    test_path_is_valid_adjacent_steps()
    test_tracks_visited_cells()
    print("All tests passed!")
