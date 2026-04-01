import random
from typing import List, Tuple, Dict, Any


# Aldous-Broder Maze — uniform random spanning tree via random walk
def aldous_broder(
    grid: List[List[Dict[str, Any]]],
    start: Tuple[int, int],
) -> Dict[str, Any]:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    visited = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    passages_carved = 0  # @step:initialize

    # Count total passage cells (odd row and odd col)
    total_passage_cells = sum(
        1
        for row_index in range(1, row_count - 1, 2)
        for col_index in range(1, col_count - 1, 2)
    )  # @step:initialize

    visited_count = 0  # @step:initialize
    current_row, current_col = start  # @step:initialize

    # Mark start as visited and carve it
    visited[current_row][current_col] = True  # @step:visit
    if grid[current_row][current_col]["type"] == "wall":
        grid[current_row][current_col]["type"] = "empty"  # @step:carve-cell
        passages_carved += 1
    visited_count += 1

    # Directions move 2 cells to passage-cell neighbors
    directions = [(-2, 0), (2, 0), (0, -2), (0, 2)]

    # Iteration cap to prevent infinite loops on sparse grids
    max_iterations = row_count * col_count * 10
    iterations = 0

    while visited_count < total_passage_cells and iterations < max_iterations:
        iterations += 1

        # Collect valid passage-cell neighbors
        valid_neighbors = []  # @step:visit
        for delta_row, delta_col in directions:
            neighbor_row = current_row + delta_row
            neighbor_col = current_col + delta_col
            if neighbor_row < 1 or neighbor_row >= row_count - 1:
                continue
            if neighbor_col < 1 or neighbor_col >= col_count - 1:
                continue
            valid_neighbors.append((neighbor_row, neighbor_col))

        if not valid_neighbors:
            break

        # Pick a random neighbor (random walk)
        next_row, next_col = random.choice(valid_neighbors)  # @step:visit

        if not visited[next_row][next_col]:
            # Carve the wall between current and next
            wall_row = current_row + (next_row - current_row) // 2
            wall_col = current_col + (next_col - current_col) // 2
            grid[wall_row][wall_col]["type"] = "empty"  # @step:carve-cell
            passages_carved += 1

            # Carve the next passage cell
            if grid[next_row][next_col]["type"] == "wall":
                grid[next_row][next_col]["type"] = "empty"  # @step:carve-cell
                passages_carved += 1

            visited[next_row][next_col] = True  # @step:carve-cell
            visited_count += 1

        current_row = next_row  # @step:visit
        current_col = next_col  # @step:visit

    return {"grid": grid, "passagesCarved": passages_carved}  # @step:complete
