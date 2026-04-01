from collections import deque
from typing import List, Dict


# Multi-Source BFS — computes distance from nearest wall for every empty cell simultaneously
def multi_source_bfs(grid: List[List[dict]]) -> Dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    distances = [[-1] * col_count for _ in range(row_count)]  # @step:initialize

    # Seed queue with ALL empty cells adjacent to a wall (distance = 1)
    queue = deque()  # @step:initialize,open-node
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    for row_index in range(row_count):
        for col_index in range(col_count):
            cell = grid[row_index][col_index]
            if cell["type"] == "wall":
                continue
            adjacent_to_wall = False
            for delta_row, delta_col in directions:
                neighbor_row = row_index + delta_row
                neighbor_col = col_index + delta_col
                if neighbor_row < 0 or neighbor_row >= row_count:
                    adjacent_to_wall = True  # grid boundary counts as wall
                    break
                if neighbor_col < 0 or neighbor_col >= col_count:
                    adjacent_to_wall = True
                    break
                if grid[neighbor_row][neighbor_col]["type"] == "wall":  # @step:open-node
                    adjacent_to_wall = True
                    break
            if adjacent_to_wall:
                distances[row_index][col_index] = 1  # @step:open-node
                queue.append((row_index, col_index))  # @step:open-node

    max_distance = 1

    while queue:
        current_row, current_col = queue.popleft()  # @step:close-node
        current_distance = distances[current_row][current_col]  # @step:update-cost

        for delta_row, delta_col in directions:
            neighbor_row = current_row + delta_row
            neighbor_col = current_col + delta_col
            if neighbor_row < 0 or neighbor_row >= row_count:
                continue
            if neighbor_col < 0 or neighbor_col >= col_count:
                continue
            if grid[neighbor_row][neighbor_col]["type"] == "wall":
                continue
            if distances[neighbor_row][neighbor_col] != -1:
                continue
            neighbor_distance = current_distance + 1
            distances[neighbor_row][neighbor_col] = neighbor_distance  # @step:update-cost
            if neighbor_distance > max_distance:
                max_distance = neighbor_distance
            queue.append((neighbor_row, neighbor_col))  # @step:open-node

    return {"distances": distances, "maxDistance": max_distance}  # @step:complete
