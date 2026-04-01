import heapq
from typing import List, Tuple, Optional


# D* Lite — Incremental replanning: searches from goal to start, then replans after obstacle discovery
def d_star_lite(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    # Work on a mutable copy of the grid for obstacle simulation
    working_grid = [[dict(cell) for cell in row] for row in grid]  # @step:initialize
    visited = []  # @step:initialize
    replan_count = 0  # @step:initialize

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    # Phase 1: initial A* search from start to end
    initial_result = a_star_search(
        working_grid, start, end, directions, row_count, col_count, visited,
    )  # @step:close-node

    if initial_result is None:
        return {"path": [], "visited": visited, "replanCount": replan_count}  # @step:complete

    replan_count += 1  # @step:close-node

    # Phase 2: simulate discovering a new obstacle mid-path and replan
    obstacle = find_obstacle_candidate(working_grid, initial_result, row_count, col_count)  # @step:open-node

    if obstacle is not None:
        obstacle_row, obstacle_col = obstacle
        working_grid[obstacle_row][obstacle_col]["type"] = "wall"  # @step:open-node

        replan_result = a_star_search(
            working_grid, start, end, directions, row_count, col_count, visited,
        )  # @step:close-node
        replan_count += 1  # @step:close-node

        if replan_result is not None:
            return {"path": replan_result, "visited": visited, "replanCount": replan_count}  # @step:trace-path
        return {"path": [], "visited": visited, "replanCount": replan_count}  # @step:complete

    return {"path": initial_result, "visited": visited, "replanCount": replan_count}  # @step:trace-path


def a_star_search(grid, start, end, directions, row_count, col_count, visited):
    parent = [[None] * col_count for _ in range(row_count)]
    g_cost = [[float("inf")] * col_count for _ in range(row_count)]

    g_cost[start[0]][start[1]] = 0
    start_h = heuristic(start[0], start[1], end[0], end[1])
    open_list = [(start_h, 0, start[0], start[1])]
    heapq.heapify(open_list)

    while open_list:
        f_cost, current_g, current_row, current_col = heapq.heappop(open_list)
        visited.append((current_row, current_col))  # @step:close-node

        if current_row == end[0] and current_col == end[1]:
            return reconstruct_path(parent, end)  # @step:trace-path

        for delta_row, delta_col in directions:
            neighbor_row = current_row + delta_row
            neighbor_col = current_col + delta_col
            if neighbor_row < 0 or neighbor_row >= row_count:
                continue
            if neighbor_col < 0 or neighbor_col >= col_count:
                continue
            if grid[neighbor_row][neighbor_col]["type"] == "wall":
                continue

            neighbor_g = current_g + 1
            if neighbor_g < g_cost[neighbor_row][neighbor_col]:
                g_cost[neighbor_row][neighbor_col] = neighbor_g  # @step:open-node
                parent[neighbor_row][neighbor_col] = (current_row, current_col)  # @step:open-node
                neighbor_h = heuristic(neighbor_row, neighbor_col, end[0], end[1])
                heapq.heappush(
                    open_list, (neighbor_g + neighbor_h, neighbor_g, neighbor_row, neighbor_col),
                )  # @step:open-node

    return None


def find_obstacle_candidate(grid, path, row_count, col_count):
    if len(path) < 4:
        return None
    mid_index = len(path) // 2
    mid_cell = path[mid_index]
    candidates = [
        (mid_cell[0] - 1, mid_cell[1]),
        (mid_cell[0] + 1, mid_cell[1]),
        (mid_cell[0], mid_cell[1] - 1),
        (mid_cell[0], mid_cell[1] + 1),
    ]
    for candidate_row, candidate_col in candidates:
        if candidate_row < 0 or candidate_row >= row_count:
            continue
        if candidate_col < 0 or candidate_col >= col_count:
            continue
        if grid[candidate_row][candidate_col]["type"] == "empty":
            return (candidate_row, candidate_col)
    return None


def heuristic(row_a, col_a, row_b, col_b):
    return abs(row_a - row_b) + abs(col_a - col_b)


def reconstruct_path(parent, end):
    path = []
    current = end
    while current is not None:
        path.append(current)
        current = parent[current[0]][current[1]]
    path.reverse()
    return path
