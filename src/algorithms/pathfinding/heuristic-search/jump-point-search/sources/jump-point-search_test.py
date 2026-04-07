import importlib

jump_point_search_mod = importlib.import_module("jump-point-search")
jump_point_search = jump_point_search_mod.jump_point_search


def make_empty_grid(rows, cols):
    return [[{"type": "empty"} for _ in range(cols)] for _ in range(rows)]


def set_cell(grid, row, col, cell_type):
    grid[row][col]["type"] = cell_type


def test_finds_path_along_shared_row():
    grid = make_empty_grid(5, 5)
    result = jump_point_search(grid, (2, 0), (2, 4))
    assert len(result["path"]) > 0
    assert result["path"][0] == (2, 0)
    assert result["path"][-1] == (2, 4)


def test_finds_path_along_shared_column():
    grid = make_empty_grid(5, 5)
    result = jump_point_search(grid, (0, 2), (4, 2))
    assert len(result["path"]) > 0
    assert result["path"][0] == (0, 2)
    assert result["path"][-1] == (4, 2)


def test_returns_empty_path_when_no_route():
    grid = make_empty_grid(5, 5)
    set_cell(grid, 0, 1, "wall")
    set_cell(grid, 1, 0, "wall")
    set_cell(grid, 1, 1, "wall")
    result = jump_point_search(grid, (0, 0), (4, 4))
    assert result["path"] == []


def test_handles_adjacent_start_and_end():
    grid = make_empty_grid(3, 3)
    result = jump_point_search(grid, (1, 0), (1, 1))
    assert len(result["path"]) > 0
    assert result["path"][-1] == (1, 1)


def test_handles_start_equal_to_end():
    grid = make_empty_grid(3, 3)
    result = jump_point_search(grid, (1, 1), (1, 1))
    assert len(result["path"]) == 1
    assert result["path"][0] == (1, 1)


def test_returns_jump_points_array():
    grid = make_empty_grid(5, 5)
    result = jump_point_search(grid, (2, 0), (2, 4))
    assert isinstance(result["jumpPoints"], list)


def test_explores_fewer_nodes_on_corridor():
    grid = make_empty_grid(10, 3)
    result = jump_point_search(grid, (0, 1), (9, 1))
    assert len(result["visited"]) < 30
    assert len(result["path"]) > 0


if __name__ == "__main__":
    test_finds_path_along_shared_row()
    test_finds_path_along_shared_column()
    test_returns_empty_path_when_no_route()
    test_handles_adjacent_start_and_end()
    test_handles_start_equal_to_end()
    test_returns_jump_points_array()
    test_explores_fewer_nodes_on_corridor()
    print("All tests passed!")
