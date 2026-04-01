import heapq
from typing import List, Tuple, Optional


# Best-First Tie Breaking — A* with cross-product tie-breaking for aesthetically straight paths
def best_first_tie_breaking(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    g_cost = [[float("inf")] * col_count for _ in range(row_count)]  # @step:initialize
    visited = []  # @step:initialize

    g_cost[start[0]][start[1]] = 0  # @step:initialize
    start_h = heuristic(start[0], start[1], end[0], end[1])
    start_tie = cross_product(start[0], start[1], start[0], start[1], end[0], end[1])
    # Open list: (fCost, hCost, tieBreaker, gCost, row, col)
    open_list = [(start_h, start_h, start_tie, 0, start[0], start[1])]  # @step:initialize,open-node
    heapq.heapify(open_list)
    in_open_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize,open-node
    in_open_set[start[0]][start[1]] = True  # @step:open-node

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while open_list:
        f_cost, h_cost, tie_val, current_g, current_row, current_col = heapq.heappop(open_list)  # @step:close-node
        visited.append((current_row, current_col))  # @step:close-node
        in_open_set[current_row][current_col] = False  # @step:close-node

        if current_row == end[0] and current_col == end[1]:  # @step:trace-path
            path = reconstruct_path(parent, end)  # @step:trace-path
            return {"path": path, "visited": visited}

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
                neighbor_f = neighbor_g + neighbor_h
                # Cross-product tie-breaking: prefer nodes on the straight line from start to end
                tie_breaker = cross_product(
                    start[0], start[1], neighbor_row, neighbor_col, end[0], end[1],
                )  # @step:open-node
                in_open_set[neighbor_row][neighbor_col] = True
                heapq.heappush(
                    open_list,
                    (neighbor_f, neighbor_h, tie_breaker, neighbor_g, neighbor_row, neighbor_col),
                )  # @step:open-node

    return {"path": [], "visited": visited}  # @step:complete


def cross_product(start_row, start_col, node_row, node_col, end_row, end_col):
    """Cross-product tie breaker: measures deviation from the ideal straight line."""
    delta_row1 = node_row - start_row
    delta_col1 = node_col - start_col
    delta_row2 = end_row - start_row
    delta_col2 = end_col - start_col
    return abs(delta_row1 * delta_col2 - delta_row2 * delta_col1)


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
