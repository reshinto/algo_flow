import random
from typing import List, Tuple, Dict, Any


# Recursive Backtracker Maze — DFS-based maze carving with random neighbor selection
def recursive_backtracker_maze(
    grid: List[List[Dict[str, Any]]],
    start: Tuple[int, int],
) -> Dict[str, Any]:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    visited = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    passages_carved = 0  # @step:initialize

    # DFS stack — stores passage cell coordinates (odd row and col only)
    stack = []  # @step:initialize
    start_row, start_col = start  # @step:initialize

    # Mark start cell as visited and push onto stack
    visited[start_row][start_col] = True  # @step:carve-cell
    stack.append((start_row, start_col))  # @step:carve-cell

    # Cardinal directions — each step moves 2 cells to skip over walls
    directions = [(-2, 0), (2, 0), (0, -2), (0, 2)]

    while stack:
        current_row, current_col = stack[-1]  # @step:visit

        # Collect unvisited passage-cell neighbors
        unvisited_neighbors = []  # @step:visit
        for delta_row, delta_col in directions:
            neighbor_row = current_row + delta_row
            neighbor_col = current_col + delta_col
            if neighbor_row < 1 or neighbor_row >= row_count - 1:
                continue
            if neighbor_col < 1 or neighbor_col >= col_count - 1:
                continue
            if not visited[neighbor_row][neighbor_col]:
                unvisited_neighbors.append((neighbor_row, neighbor_col))  # @step:visit

        if unvisited_neighbors:
            # Randomly choose one unvisited neighbor
            chosen_row, chosen_col = random.choice(unvisited_neighbors)  # @step:carve-cell

            # Carve the wall between current and chosen
            wall_row = current_row + (chosen_row - current_row) // 2
            wall_col = current_col + (chosen_col - current_col) // 2
            grid[wall_row][wall_col]["type"] = "empty"  # @step:carve-cell
            passages_carved += 1

            # Carve the chosen cell itself
            if grid[chosen_row][chosen_col]["type"] == "wall":
                grid[chosen_row][chosen_col]["type"] = "empty"  # @step:carve-cell
                passages_carved += 1

            visited[chosen_row][chosen_col] = True  # @step:carve-cell
            stack.append((chosen_row, chosen_col))  # @step:carve-cell
        else:
            # Backtrack — no unvisited neighbors remain
            stack.pop()  # @step:visit

    return {"grid": grid, "passagesCarved": passages_carved}  # @step:complete
