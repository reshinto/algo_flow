import importlib
from collections import deque

prims_maze_mod = importlib.import_module("prims-maze")
prims_maze = prims_maze_mod.prims_maze


def make_all_walls_grid(rows, cols):
    return [[{"type": "wall"} for _ in range(cols)] for _ in range(rows)]


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
    grid[1][1]["type"] = "start"
    result = prims_maze(grid, (1, 1))
    assert result["passagesCarved"] > 0


def test_creates_connected_maze():
    grid = make_all_walls_grid(9, 9)
    grid[1][1]["type"] = "start"
    grid[7][7]["type"] = "end"
    prims_maze(grid, (1, 1))
    assert bfs_reachable(grid, (1, 1), (7, 7))


def test_does_not_carve_border_cells():
    grid = make_all_walls_grid(9, 9)
    grid[1][1]["type"] = "start"
    prims_maze(grid, (1, 1))
    for col in range(9):
        assert grid[0][col]["type"] == "wall"
        assert grid[8][col]["type"] == "wall"
    for row in range(9):
        assert grid[row][0]["type"] == "wall"
        assert grid[row][8]["type"] == "wall"


def test_start_cell_is_carved():
    grid = make_all_walls_grid(9, 9)
    grid[1][1]["type"] = "start"
    prims_maze(grid, (1, 1))
    assert grid[1][1]["type"] != "wall"


if __name__ == "__main__":
    test_carves_passages()
    test_creates_connected_maze()
    test_does_not_carve_border_cells()
    test_start_cell_is_carved()
    print("All tests passed!")
