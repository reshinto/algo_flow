import heapq
from typing import List, Tuple, Optional


# A* Search — find shortest path using Manhattan distance heuristic
def a_star_grid(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    g_cost_map = [[float("inf")] * col_count for _ in range(row_count)]  # @step:initialize
    g_cost_map[start[0]][start[1]] = 0  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    closed_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    visited = []

    # Priority queue ordered by fCost = gCost + hCost
    start_h_cost = abs(start[0] - end[0]) + abs(start[1] - end[1])  # @step:initialize,open-node
    open_set = [(start_h_cost, 0, start_h_cost, start[0], start[1])]  # @step:open-node
    # (fCost, gCost, hCost, row, col)

    while open_set:
        # Extract node with lowest fCost
        f_cost, g_cost, h_cost, current_row, current_col = heapq.heappop(open_set)  # @step:close-node
        if closed_set[current_row][current_col]:  # @step:close-node
            continue  # @step:close-node
        closed_set[current_row][current_col] = True  # @step:close-node
        visited.append((current_row, current_col))  # @step:close-node

        # Check if we reached the end
        if current_row == end[0] and current_col == end[1]:  # @step:trace-path
            path = reconstruct_path(parent, end)  # @step:trace-path
            return {"path": path, "visited": visited}

        # Explore 4-directional neighbors
        for delta_row, delta_col in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            neighbor_row = current_row + delta_row
            neighbor_col = current_col + delta_col
            if neighbor_row < 0 or neighbor_row >= row_count:
                continue
            if neighbor_col < 0 or neighbor_col >= col_count:
                continue
            if grid[neighbor_row][neighbor_col]["type"] == "wall":
                continue
            if closed_set[neighbor_row][neighbor_col]:
                continue

            tentative_g_cost = g_cost_map[current_row][current_col] + 1  # @step:update-cost
            if tentative_g_cost < g_cost_map[neighbor_row][neighbor_col]:  # @step:update-cost
                g_cost_map[neighbor_row][neighbor_col] = tentative_g_cost  # @step:update-cost
                parent[neighbor_row][neighbor_col] = (current_row, current_col)
                neighbor_h_cost = abs(neighbor_row - end[0]) + abs(neighbor_col - end[1])
                neighbor_f_cost = tentative_g_cost + neighbor_h_cost
                heapq.heappush(
                    open_set,
                    (neighbor_f_cost, tentative_g_cost, neighbor_h_cost, neighbor_row, neighbor_col),
                )

    return {"path": [], "visited": visited}  # @step:complete


def reconstruct_path(
    parent: List[List[Optional[Tuple[int, int]]]],
    end: Tuple[int, int],
) -> List[Tuple[int, int]]:
    path = []
    current = end
    while current is not None:
        path.append(current)
        current = parent[current[0]][current[1]]
    path.reverse()
    return path
