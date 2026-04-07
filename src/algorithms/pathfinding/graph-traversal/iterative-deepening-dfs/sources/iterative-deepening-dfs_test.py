import importlib

iterative_deepening_dfs_mod = importlib.import_module("iterative-deepening-dfs")
iterative_deepening_dfs = iterative_deepening_dfs_mod.iterative_deepening_dfs


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_finds_path_on_empty_grid():
    grid = make_empty_grid(4, 4)
    result = iterative_deepening_dfs(grid, (0, 0), (3, 3))
    assert len(result["path"]) > 0
    assert result["path"][0] == (0, 0)
    assert result["path"][-1] == (3, 3)


def test_finds_shortest_path():
    grid = make_empty_grid(1, 5)
    result = iterative_deepening_dfs(grid, (0, 0), (0, 4))
    assert len(result["path"]) == 5


def test_returns_empty_path_when_no_route():
    grid = make_empty_grid(3, 3)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 1, "wall")
    result = iterative_deepening_dfs(grid, (0, 0), (2, 2))
    assert result["path"] == []


def test_handles_adjacent_start_and_end():
    grid = make_empty_grid(3, 3)
    result = iterative_deepening_dfs(grid, (0, 0), (0, 1))
    assert len(result["path"]) == 2
    assert result["path"][0] == (0, 0)
    assert result["path"][1] == (0, 1)


def test_depth_reached():
    grid = make_empty_grid(1, 4)
    result = iterative_deepening_dfs(grid, (0, 0), (0, 3))
    assert result["depthReached"] == 3


def test_path_is_valid_adjacent_steps():
    grid = make_empty_grid(4, 4)
    result = iterative_deepening_dfs(grid, (0, 0), (3, 3))
    for path_index in range(1, len(result["path"])):
        prev = result["path"][path_index - 1]
        curr = result["path"][path_index]
        assert abs(curr[0] - prev[0]) + abs(curr[1] - prev[1]) == 1


def test_tracks_visited_cells():
    grid = make_empty_grid(3, 3)
    result = iterative_deepening_dfs(grid, (0, 0), (2, 2))
    assert len(result["visited"]) > 0


if __name__ == "__main__":
    test_finds_path_on_empty_grid()
    test_finds_shortest_path()
    test_returns_empty_path_when_no_route()
    test_handles_adjacent_start_and_end()
    test_depth_reached()
    test_path_is_valid_adjacent_steps()
    test_tracks_visited_cells()
    print("All tests passed!")
