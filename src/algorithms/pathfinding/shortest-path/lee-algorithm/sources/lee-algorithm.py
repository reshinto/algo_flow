from collections import deque
from typing import List, Tuple, Optional


# Lee Algorithm — BFS wavefront shortest path with distance numbering
def lee_algorithm(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    # Wave number map: each cell gets the wavefront distance from start
    wave_map = [[-1] * col_count for _ in range(row_count)]  # @step:initialize
    wave_map[start[0]][start[1]] = 0  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize

    # Phase 1: BFS wavefront expansion
    queue = deque([(start[0], start[1])])  # @step:initialize,open-node
    visited = []
    found = False

    while queue:
        current_row, current_col = queue.popleft()  # @step:close-node
        visited.append((current_row, current_col))  # @step:close-node
        current_wave = wave_map[current_row][current_col]  # @step:close-node

        # Check if we reached the end
        if current_row == end[0] and current_col == end[1]:  # @step:update-cost
            found = True
            break

        # Expand wavefront to 4-directional neighbors
        for delta_row, delta_col in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            neighbor_row = current_row + delta_row
            neighbor_col = current_col + delta_col
            if neighbor_row < 0 or neighbor_row >= row_count:
                continue
            if neighbor_col < 0 or neighbor_col >= col_count:
                continue
            if grid[neighbor_row][neighbor_col]["type"] == "wall":
                continue
            if wave_map[neighbor_row][neighbor_col] != -1:
                continue
            # Stamp the neighbor with the next wave number
            wave_map[neighbor_row][neighbor_col] = current_wave + 1  # @step:update-cost
            parent[neighbor_row][neighbor_col] = (current_row, current_col)
            queue.append((neighbor_row, neighbor_col))  # @step:open-node

    if not found or wave_map[end[0]][end[1]] == -1:
        return {"path": [], "visited": visited}  # @step:complete

    # Phase 2: Backtrack from end using parent pointers
    path = reconstruct_path(parent, end)  # @step:trace-path
    return {"path": path, "visited": visited}  # @step:trace-path


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
