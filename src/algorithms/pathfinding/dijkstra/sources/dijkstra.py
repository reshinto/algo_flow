import heapq
from typing import List, Tuple, Optional


# Dijkstra's Algorithm — find shortest path on a weighted grid
def dijkstra(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    distance = [[float("inf")] * col_count for _ in range(row_count)]  # @step:initialize
    distance[start[0]][start[1]] = 0  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    # Seed the frontier with the start cell
    open_set = [(0, start[0], start[1])]  # @step:initialize,open-node
    visited_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize,open-node

    while open_set:
        # Extract the node with the smallest tentative distance
        current_dist, current_row, current_col = heapq.heappop(open_set)  # @step:close-node
        if visited_set[current_row][current_col]:  # @step:close-node
            continue  # @step:close-node
        visited_set[current_row][current_col] = True  # @step:close-node

        # Check if we reached the end
        if current_row == end[0] and current_col == end[1]:  # @step:trace-path
            path = reconstruct_path(parent, end)  # @step:trace-path
            return {"path": path, "visited": []}

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
            if visited_set[neighbor_row][neighbor_col]:
                continue

            # Relax the edge: update distance if shorter
            new_distance = distance[current_row][current_col] + 1  # @step:update-cost
            if new_distance < distance[neighbor_row][neighbor_col]:  # @step:update-cost
                distance[neighbor_row][neighbor_col] = new_distance  # @step:update-cost
                parent[neighbor_row][neighbor_col] = (current_row, current_col)
                heapq.heappush(open_set, (new_distance, neighbor_row, neighbor_col))

    return {"path": [], "visited": []}  # @step:complete


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
