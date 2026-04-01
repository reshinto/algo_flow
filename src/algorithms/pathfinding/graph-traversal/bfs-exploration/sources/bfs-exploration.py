from collections import deque
from typing import List, Tuple


# BFS Exploration — explore all reachable cells layer-by-layer using breadth-first search
def bfs_exploration(grid: List[List[dict]], start: Tuple[int, int]) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    visited_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    visited = []  # @step:initialize

    # Seed the queue with the start cell
    queue = deque([(start[0], start[1])])  # @step:initialize,open-node
    visited_set[start[0]][start[1]] = True  # @step:open-node
    layer_count = 0  # @step:initialize

    while queue:
        # Process the entire current layer before advancing depth
        layer_size = len(queue)  # @step:close-node
        layer_count += 1  # @step:close-node

        for _ in range(layer_size):
            current_row, current_col = queue.popleft()  # @step:close-node
            visited.append((current_row, current_col))  # @step:close-node

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
                visited_set[neighbor_row][neighbor_col] = True  # @step:open-node
                queue.append((neighbor_row, neighbor_col))  # @step:open-node

    return {"visited": visited, "layers": layer_count}  # @step:complete
