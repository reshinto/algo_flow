import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "sources"))
from collections import deque

ellers_maze_mod = importlib.import_module("ellers-maze")
ellers_maze = ellers_maze_mod.ellers_maze


def make_all_walls_grid(rows, cols):
    return [[{"type": "wall"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def bfs_reachable(grid, start, end):
    row_count, col_count = len(grid), len(grid[0])
    visited = [[False] * col_count for _ in range(row_count)]
    queue = deque([start])
    visited[start[0]][start[1]] = True
    while queue:
        row, col = queue.popleft()
        if (row, col) == end:
            return True
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = row + dr, col + dc
            if 0 <= nr < row_count and 0 <= nc < col_count and not visited[nr][nc] and grid[nr][nc]["type"] != "wall":
                visited[nr][nc] = True
                queue.append((nr, nc))
    return False


def test_carves_passages():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    result = ellers_maze(grid)
    assert result["passagesCarved"] > 0


def test_creates_connected_maze():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    ellers_maze(grid)
    assert bfs_reachable(grid, (1, 1), (7, 7))


def test_carves_all_odd_indexed_cells():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    ellers_maze(grid)
    for row in range(1, 8, 2):
        for col in range(1, 8, 2):
            assert grid[row][col]["type"] != "wall"


def test_does_not_carve_border_cells():
    grid = make_all_walls_grid(9, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 7, 7, "end")
    ellers_maze(grid)
    for col in range(9):
        assert grid[0][col]["type"] == "wall"
        assert grid[8][col]["type"] == "wall"
    for row in range(9):
        assert grid[row][0]["type"] == "wall"
        assert grid[row][8]["type"] == "wall"


def test_passages_carved_greater_than_zero():
    grid = make_all_walls_grid(7, 9)
    set_cell(grid, 1, 1, "start")
    set_cell(grid, 5, 7, "end")
    result = ellers_maze(grid)
    assert result["passagesCarved"] > 0


if __name__ == "__main__":
    test_carves_passages()
    test_creates_connected_maze()
    test_carves_all_odd_indexed_cells()
    test_does_not_carve_border_cells()
    test_passages_carved_greater_than_zero()
    print("All tests passed!")
