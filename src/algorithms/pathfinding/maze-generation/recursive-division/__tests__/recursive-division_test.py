import importlib
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "sources"))
from collections import deque

recursive_division_mod = importlib.import_module("recursive-division")
recursive_division = recursive_division_mod.recursive_division


def make_open_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


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


def test_builds_walls():
    grid = make_open_grid(9, 9)
    grid[1][1]["type"] = "start"
    grid[7][7]["type"] = "end"
    result = recursive_division(grid, (1, 1), (7, 7))
    assert result["wallsBuilt"] > 0


def test_start_and_end_preserved():
    grid = make_open_grid(9, 9)
    grid[1][1]["type"] = "start"
    grid[7][7]["type"] = "end"
    recursive_division(grid, (1, 1), (7, 7))
    assert grid[1][1]["type"] == "start"
    assert grid[7][7]["type"] == "end"


def test_path_still_exists():
    grid = make_open_grid(9, 9)
    grid[1][1]["type"] = "start"
    grid[7][7]["type"] = "end"
    recursive_division(grid, (1, 1), (7, 7))
    assert bfs_reachable(grid, (1, 1), (7, 7))


def test_walls_actually_added():
    grid = make_open_grid(9, 9)
    grid[1][1]["type"] = "start"
    grid[7][7]["type"] = "end"
    recursive_division(grid, (1, 1), (7, 7))
    wall_count = sum(1 for row in grid for cell in row if cell["type"] == "wall")
    assert wall_count > 0


if __name__ == "__main__":
    test_builds_walls()
    test_start_and_end_preserved()
    test_path_still_exists()
    test_walls_actually_added()
    print("All tests passed!")
