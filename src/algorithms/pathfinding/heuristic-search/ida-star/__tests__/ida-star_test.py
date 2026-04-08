import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

ida_star_mod = importlib.import_module("ida-star")
ida_star = ida_star_mod.ida_star


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_finds_path_on_empty_grid():
    grid = make_empty_grid(5, 5)
    result = ida_star(grid, (0, 0), (4, 4))
    assert len(result["path"]) > 0
    assert result["path"][0] == (0, 0)
    assert result["path"][-1] == (4, 4)


def test_finds_optimal_path_length():
    grid = make_empty_grid(5, 5)
    result = ida_star(grid, (0, 0), (4, 4))
    assert len(result["path"]) == 9


def test_returns_empty_path_when_no_route():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 1, "wall")
    result = ida_star(grid, (0, 0), (4, 4))
    assert result["path"] == []


def test_navigates_around_wall_barrier():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 2, "wall")
    set_cell(grid, 1, 2, "wall")
    set_cell(grid, 2, 2, "wall")
    result = ida_star(grid, (0, 0), (0, 4))
    assert len(result["path"]) > 0
    assert result["path"][-1] == (0, 4)


def test_handles_adjacent_start_and_end():
    grid = make_empty_grid(3, 3)
    result = ida_star(grid, (0, 0), (0, 1))
    assert result["path"] == [(0, 0), (0, 1)]


def test_handles_start_equal_to_end():
    grid = make_empty_grid(3, 3)
    result = ida_star(grid, (1, 1), (1, 1))
    assert len(result["path"]) == 1
    assert result["path"][0] == (1, 1)


def test_records_iteration_count():
    grid = make_empty_grid(4, 4)
    result = ida_star(grid, (0, 0), (3, 3))
    assert result["iterationCount"] > 0


def test_tracks_visited_cells():
    grid = make_empty_grid(3, 3)
    result = ida_star(grid, (0, 0), (2, 2))
    assert len(result["visited"]) > 0


if __name__ == "__main__":
    test_finds_path_on_empty_grid()
    test_finds_optimal_path_length()
    test_returns_empty_path_when_no_route()
    test_navigates_around_wall_barrier()
    test_handles_adjacent_start_and_end()
    test_handles_start_equal_to_end()
    test_records_iteration_count()
    test_tracks_visited_cells()
    print("All tests passed!")
