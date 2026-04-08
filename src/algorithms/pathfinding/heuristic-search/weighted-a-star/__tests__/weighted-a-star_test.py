import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

weighted_a_star_mod = importlib.import_module("weighted-a-star")
weighted_a_star = weighted_a_star_mod.weighted_a_star


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_finds_path_on_empty_grid():
    grid = make_empty_grid(5, 5)
    result = weighted_a_star(grid, (0, 0), (4, 4), 1.5)
    assert len(result["path"]) > 0
    assert result["path"][0] == (0, 0)
    assert result["path"][-1] == (4, 4)


def test_with_weight_1_finds_optimal_path():
    grid = make_empty_grid(5, 5)
    result = weighted_a_star(grid, (0, 0), (4, 4), 1.0)
    assert len(result["path"]) == 9


def test_returns_empty_path_when_no_route():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 1, "wall")
    result = weighted_a_star(grid, (0, 0), (4, 4), 1.5)
    assert result["path"] == []


def test_handles_adjacent_start_and_end():
    grid = make_empty_grid(3, 3)
    result = weighted_a_star(grid, (0, 0), (0, 1), 1.5)
    assert result["path"] == [(0, 0), (0, 1)]


def test_handles_start_equal_to_end():
    grid = make_empty_grid(3, 3)
    result = weighted_a_star(grid, (1, 1), (1, 1), 1.5)
    assert len(result["path"]) == 1
    assert result["path"][0] == (1, 1)


def test_records_weight_used():
    grid = make_empty_grid(3, 3)
    result = weighted_a_star(grid, (0, 0), (2, 2), 2.0)
    assert result["weight"] == 2.0


def test_higher_weight_explores_fewer_nodes():
    grid = make_empty_grid(10, 10)
    low_result = weighted_a_star(grid, (0, 0), (9, 9), 1.0)
    high_result = weighted_a_star(grid, (0, 0), (9, 9), 3.0)
    assert len(high_result["visited"]) <= len(low_result["visited"])


if __name__ == "__main__":
    test_finds_path_on_empty_grid()
    test_with_weight_1_finds_optimal_path()
    test_returns_empty_path_when_no_route()
    test_handles_adjacent_start_and_end()
    test_handles_start_equal_to_end()
    test_records_weight_used()
    test_higher_weight_explores_fewer_nodes()
    print("All tests passed!")
