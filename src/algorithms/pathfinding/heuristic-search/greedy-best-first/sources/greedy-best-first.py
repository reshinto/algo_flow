import heapq
from typing import List, Tuple, Optional


# Greedy Best-First Search — navigate a grid using only the heuristic h(n) = Manhattan distance
def greedy_best_first(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    visited = []  # @step:initialize

    # Priority queue: (hCost, row, col)
    open_list = [(manhattan_distance(start, end), start[0], start[1])]  # @step:initialize,open-node
    heapq.heapify(open_list)
    in_open_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize,open-node
    closed_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    in_open_set[start[0]][start[1]] = True  # @step:open-node

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while open_list:
        # Dequeue node with lowest hCost (greedy: ignore g-cost entirely)
        h_cost, current_row, current_col = heapq.heappop(open_list)  # @step:close-node
        closed_set[current_row][current_col] = True  # @step:close-node
        visited.append((current_row, current_col))  # @step:close-node

        # Check if goal reached
        if current_row == end[0] and current_col == end[1]:  # @step:trace-path
            path = reconstruct_path(parent, end)  # @step:trace-path
            return {"path": path, "visited": visited}

        # Expand neighbors sorted by heuristic only
        for delta_row, delta_col in directions:
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
            if in_open_set[neighbor_row][neighbor_col]:
                continue

            # Greedy: use only heuristic, g-cost is always treated as 0
            h = manhattan_distance((neighbor_row, neighbor_col), end)  # @step:open-node
            in_open_set[neighbor_row][neighbor_col] = True  # @step:open-node
            parent[neighbor_row][neighbor_col] = (current_row, current_col)  # @step:open-node
            heapq.heappush(open_list, (h, neighbor_row, neighbor_col))  # @step:open-node

    return {"path": [], "visited": visited}  # @step:complete


def manhattan_distance(point_a: Tuple[int, int], point_b: Tuple[int, int]) -> int:
    return abs(point_a[0] - point_b[0]) + abs(point_a[1] - point_b[1])


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
