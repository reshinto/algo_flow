import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

greedy_best_first_mod = importlib.import_module("greedy-best-first")
greedy_best_first = greedy_best_first_mod.greedy_best_first


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_finds_path_on_empty_grid():
    grid = make_empty_grid(5, 5)
    result = greedy_best_first(grid, (0, 0), (4, 4))
    assert len(result["path"]) > 0
    assert result["path"][0] == (0, 0)
    assert result["path"][-1] == (4, 4)


def test_returns_empty_path_when_no_route():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 1, "wall")
    result = greedy_best_first(grid, (0, 0), (4, 4))
    assert result["path"] == []


def test_navigates_around_wall_barrier():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 2, "wall")
    set_cell(grid, 1, 2, "wall")
    set_cell(grid, 2, 2, "wall")
    result = greedy_best_first(grid, (0, 0), (0, 4))
    assert len(result["path"]) > 0
    assert result["path"][-1] == (0, 4)


def test_handles_adjacent_start_and_end():
    grid = make_empty_grid(3, 3)
    result = greedy_best_first(grid, (0, 0), (0, 1))
    assert result["path"] == [(0, 0), (0, 1)]


def test_handles_start_equal_to_end():
    grid = make_empty_grid(3, 3)
    result = greedy_best_first(grid, (1, 1), (1, 1))
    assert len(result["path"]) == 1
    assert result["path"][0] == (1, 1)


def test_tracks_visited_cells():
    grid = make_empty_grid(3, 3)
    result = greedy_best_first(grid, (0, 0), (2, 2))
    assert len(result["visited"]) > 0


def test_explores_fewer_nodes_than_bfs():
    grid = make_empty_grid(10, 10)
    result = greedy_best_first(grid, (0, 0), (9, 9))
    assert len(result["visited"]) < 100
    assert len(result["path"]) > 0


if __name__ == "__main__":
    test_finds_path_on_empty_grid()
    test_returns_empty_path_when_no_route()
    test_navigates_around_wall_barrier()
    test_handles_adjacent_start_and_end()
    test_handles_start_equal_to_end()
    test_tracks_visited_cells()
    test_explores_fewer_nodes_than_bfs()
    print("All tests passed!")
