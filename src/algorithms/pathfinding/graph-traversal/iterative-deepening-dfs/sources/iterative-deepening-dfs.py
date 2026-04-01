from typing import List, Tuple, Optional, Set


# Iterative Deepening DFS — DFS with increasing depth limits, combining BFS optimality with DFS memory efficiency
def iterative_deepening_dfs(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    all_visited = []  # @step:initialize

    # Increase depth limit one step at a time until target is reached
    for depth_limit in range(row_count * col_count + 1):  # @step:initialize
        path_set = set()  # @step:open-node
        result = depth_limited_search(grid, start, end, depth_limit, path_set, all_visited, row_count, col_count)  # @step:close-node

        if result is not None:
            return {"path": result, "visited": all_visited, "depthReached": depth_limit}  # @step:trace-path

    return {"path": [], "visited": all_visited, "depthReached": 0}  # @step:complete


def depth_limited_search(
    grid: List[List[dict]],
    current: Tuple[int, int],
    end: Tuple[int, int],
    depth_remaining: int,
    path_set: Set[str],
    all_visited: List[Tuple[int, int]],
    row_count: int,
    col_count: int,
) -> Optional[List[Tuple[int, int]]]:
    current_row, current_col = current
    all_visited.append((current_row, current_col))

    if current_row == end[0] and current_col == end[1]:
        return [(current_row, current_col)]

    if depth_remaining == 0:
        return None

    path_set.add(f"{current_row},{current_col}")

    for delta_row, delta_col in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
        neighbor_row = current_row + delta_row
        neighbor_col = current_col + delta_col

        if neighbor_row < 0 or neighbor_row >= row_count:
            continue
        if neighbor_col < 0 or neighbor_col >= col_count:
            continue
        if grid[neighbor_row][neighbor_col]["type"] == "wall":
            continue
        if f"{neighbor_row},{neighbor_col}" in path_set:
            continue

        sub_result = depth_limited_search(
            grid,
            (neighbor_row, neighbor_col),
            end,
            depth_remaining - 1,
            path_set,
            all_visited,
            row_count,
            col_count,
        )

        if sub_result is not None:
            return [(current_row, current_col)] + sub_result

    path_set.discard(f"{current_row},{current_col}")
    return None
