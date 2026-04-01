import heapq
from typing import List, Tuple, Optional


# Weighted A* — A* with inflated heuristic: f(n) = g(n) + weight * h(n). Trades optimality for speed.
def weighted_a_star(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
    weight: float = 1.5,
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    g_cost = [[float("inf")] * col_count for _ in range(row_count)]  # @step:initialize
    visited = []  # @step:initialize

    g_cost[start[0]][start[1]] = 0  # @step:initialize
    start_h = heuristic(start[0], start[1], end[0], end[1])
    start_f = 0 + weight * start_h
    # Open list: (fCost, gCost, row, col)
    open_list = [(start_f, 0, start[0], start[1])]  # @step:initialize,open-node
    heapq.heapify(open_list)
    in_open_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize,open-node
    in_open_set[start[0]][start[1]] = True  # @step:open-node

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while open_list:
        f_cost, current_g, current_row, current_col = heapq.heappop(open_list)  # @step:close-node
        visited.append((current_row, current_col))  # @step:close-node
        in_open_set[current_row][current_col] = False  # @step:close-node

        if current_row == end[0] and current_col == end[1]:  # @step:trace-path
            path = reconstruct_path(parent, end)  # @step:trace-path
            return {"path": path, "visited": visited, "weight": weight}

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
                # Weighted heuristic: inflating h by weight encourages greedy behavior
                neighbor_f = neighbor_g + weight * neighbor_h  # @step:open-node
                in_open_set[neighbor_row][neighbor_col] = True
                heapq.heappush(open_list, (neighbor_f, neighbor_g, neighbor_row, neighbor_col))  # @step:open-node

    return {"path": [], "visited": visited, "weight": weight}  # @step:complete


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
