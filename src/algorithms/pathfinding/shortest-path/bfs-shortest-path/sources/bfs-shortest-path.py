from collections import deque
from typing import List, Tuple, Optional


# BFS Shortest Path — find shortest path on an unweighted grid using breadth-first search
def bfs_shortest_path(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    # Seed the queue with the start cell
    queue = deque([(start[0], start[1])])  # @step:initialize,open-node
    visited_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize,open-node
    visited_set[start[0]][start[1]] = True  # @step:open-node
    visited = []

    while queue:
        # Dequeue the front cell — BFS explores level by level
        current_row, current_col = queue.popleft()  # @step:close-node
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
            if visited_set[neighbor_row][neighbor_col]:
                continue
            # Mark visited immediately on enqueue
            visited_set[neighbor_row][neighbor_col] = True  # @step:open-node
            parent[neighbor_row][neighbor_col] = (current_row, current_col)  # @step:open-node
            queue.append((neighbor_row, neighbor_col))  # @step:open-node

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
