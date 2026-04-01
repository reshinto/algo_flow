from collections import deque
from typing import List, Tuple, Dict


# Flood Fill BFS — classic paint bucket fill using breadth-first search
def flood_fill_bfs(
    grid: List[List[dict]],
    start: Tuple[int, int],
) -> Dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    filled_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    filled = []  # @step:initialize
    # Seed the queue with the start cell
    queue = deque([(start[0], start[1])])  # @step:initialize,open-node
    filled_set[start[0]][start[1]] = True  # @step:open-node

    while queue:
        # Dequeue the front cell — BFS processes cells level by level
        current_row, current_col = queue.popleft()  # @step:close-node
        filled.append((current_row, current_col))  # @step:close-node

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
            if filled_set[neighbor_row][neighbor_col]:
                continue
            # Mark on enqueue to avoid duplicates
            filled_set[neighbor_row][neighbor_col] = True  # @step:open-node
            queue.append((neighbor_row, neighbor_col))  # @step:open-node

    return {"filled": filled, "count": len(filled)}  # @step:complete
