import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
from collections import deque

aldous_broder_mod = importlib.import_module("aldous-broder")
aldous_broder = aldous_broder_mod.aldous_broder


def make_all_walls_grid(rows, cols):
    return [[{"type": "wall"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def bfs_reachable(grid, start, end):
    row_count = len(grid)
    col_count = len(grid[0])
    visited = [[False] * col_count for _ in range(row_count)]
    queue = deque([start])
    visited[start[0]][start[1]] = True
    while queue:
        row, col = queue.popleft()
        if (row, col) == end:
            return True
        for delta_row, delta_col in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            next_row, next_col = row + delta_row, col + delta_col
            if 0 <= next_row < row_count and 0 <= next_col < col_count:
                if not visited[next_row][next_col] and grid[next_row][next_col]["type"] != "wall":
                    visited[next_row][next_col] = True
                    queue.append((next_row, next_col))
    return False


def test_carves_passages():
    grid = make_all_walls_grid(7, 7)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 5, 5, "end")
    result = aldous_broder(grid, (1, 1))
    assert result["passagesCarved"] > 0


def test_creates_connected_maze():
    grid = make_all_walls_grid(7, 7)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 5, 5, "end")
    aldous_broder(grid, (1, 1))
    assert bfs_reachable(grid, (1, 1), (5, 5))


def test_does_not_carve_border_cells():
    grid = make_all_walls_grid(7, 7)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 5, 5, "end")
    aldous_broder(grid, (1, 1))
    for col in range(7):
        assert grid[0][col]["type"] == "wall"
        assert grid[6][col]["type"] == "wall"
    for row in range(7):
        assert grid[row][0]["type"] == "wall"
        assert grid[row][6]["type"] == "wall"


def test_carves_the_start_cell():
    grid = make_all_walls_grid(7, 7)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 5, 5, "end")
    aldous_broder(grid, (1, 1))
    assert grid[1][1]["type"] != "wall"


if __name__ == "__main__":
    test_carves_passages()
    test_creates_connected_maze()
    test_does_not_carve_border_cells()
    test_carves_the_start_cell()
    print("All tests passed!")
