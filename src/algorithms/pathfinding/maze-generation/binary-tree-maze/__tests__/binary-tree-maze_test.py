import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))

binary_tree_maze_mod = importlib.import_module("binary-tree-maze")
binary_tree_maze = binary_tree_maze_mod.binary_tree_maze


def make_all_walls_grid(rows, cols):
    return [[{"type": "wall"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_carves_passages():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    result = binary_tree_maze(grid)
    assert result["passagesCarved"] > 0


def test_carves_all_odd_indexed_passage_cells():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    binary_tree_maze(grid)
    for row_index in range(1, 8, 2):
        for col_index in range(1, 8, 2):
            assert grid[row_index][col_index]["type"] != "wall"


def test_does_not_carve_border_cells():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    binary_tree_maze(grid)
    for col in range(9):
        assert grid[0][col]["type"] == "wall"
        assert grid[8][col]["type"] == "wall"
    for row in range(9):
        assert grid[row][0]["type"] == "wall"
        assert grid[row][8]["type"] == "wall"


def test_top_row_corridor_exists():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    binary_tree_maze(grid)
    for col_index in [1, 3, 5, 7]:
        assert grid[1][col_index]["type"] != "wall"


def test_passages_carved_greater_than_16():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    result = binary_tree_maze(grid)
    assert result["passagesCarved"] > 16


if __name__ == "__main__":
    test_carves_passages()
    test_carves_all_odd_indexed_passage_cells()
    test_does_not_carve_border_cells()
    test_top_row_corridor_exists()
    test_passages_carved_greater_than_16()
    print("All tests passed!")
