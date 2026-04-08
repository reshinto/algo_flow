import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))

lee_algorithm_mod = importlib.import_module("lee-algorithm")
lee_algorithm = lee_algorithm_mod.lee_algorithm


def make_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def test_finds_path():
    grid = make_grid(5, 5)
    grid[0][0]["type"] = "start"
    grid[4][4]["type"] = "end"
    result = lee_algorithm(grid, (0, 0), (4, 4))
    assert len(result["path"]) > 0


def test_shortest_path_length():
    grid = make_grid(5, 5)
    grid[0][0]["type"] = "start"
    grid[4][4]["type"] = "end"
    result = lee_algorithm(grid, (0, 0), (4, 4))
    assert len(result["path"]) == 9


def test_path_empty_when_blocked():
    grid = make_grid(3, 3)
    grid[0][0]["type"] = "start"
    grid[2][2]["type"] = "end"
    for row in range(3):
        grid[row][1]["type"] = "wall"
    result = lee_algorithm(grid, (0, 0), (2, 2))
    assert len(result["path"]) == 0


def test_navigates_around_wall():
    grid = make_grid(5, 5)
    grid[0][0]["type"] = "start"
    grid[4][4]["type"] = "end"
    for row in range(4):
        grid[row][2]["type"] = "wall"
    result = lee_algorithm(grid, (0, 0), (4, 4))
    assert len(result["path"]) > 0


def test_adjacent_cells():
    grid = make_grid(3, 3)
    grid[0][0]["type"] = "start"
    grid[0][1]["type"] = "end"
    result = lee_algorithm(grid, (0, 0), (0, 1))
    assert len(result["path"]) == 2


def test_tracks_visited():
    grid = make_grid(5, 5)
    grid[0][0]["type"] = "start"
    grid[4][4]["type"] = "end"
    result = lee_algorithm(grid, (0, 0), (4, 4))
    assert len(result["visited"]) > 0


if __name__ == "__main__":
    test_finds_path()
    test_shortest_path_length()
    test_path_empty_when_blocked()
    test_navigates_around_wall()
    test_adjacent_cells()
    test_tracks_visited()
    print("All tests passed!")
