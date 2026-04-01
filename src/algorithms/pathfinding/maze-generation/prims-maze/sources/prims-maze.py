import random
from typing import List, Tuple, Dict, Any


# Prim's Maze — randomized Prim's algorithm for maze generation
def prims_maze(
    grid: List[List[Dict[str, Any]]],
    start: Tuple[int, int],
) -> Dict[str, Any]:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    in_maze = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    passages_carved = 0  # @step:initialize

    # Each frontier entry is (wall_row, wall_col, origin_row, origin_col)
    frontier = []  # @step:initialize
    start_row, start_col = start  # @step:initialize

    # Add start cell to maze
    in_maze[start_row][start_col] = True  # @step:open-node
    if grid[start_row][start_col]["type"] == "wall":
        grid[start_row][start_col]["type"] = "empty"  # @step:open-node
        passages_carved += 1

    # Directions move 2 cells (skipping wall cells)
    directions = [(-2, 0), (2, 0), (0, -2), (0, 2)]

    # Add initial frontier neighbors
    for delta_row, delta_col in directions:
        neighbor_row = start_row + delta_row
        neighbor_col = start_col + delta_col
        if neighbor_row < 1 or neighbor_row >= row_count - 1:
            continue
        if neighbor_col < 1 or neighbor_col >= col_count - 1:
            continue
        if not in_maze[neighbor_row][neighbor_col]:
            frontier.append((neighbor_row, neighbor_col, start_row, start_col))  # @step:open-node

    while frontier:
        # Randomly pick a frontier entry
        picked_index = random.randint(0, len(frontier) - 1)
        picked = frontier.pop(picked_index)  # @step:carve-cell
        picked_row, picked_col, origin_row, origin_col = picked

        if in_maze[picked_row][picked_col]:  # @step:carve-cell
            continue

        # Carve the passage cell
        in_maze[picked_row][picked_col] = True  # @step:carve-cell
        if grid[picked_row][picked_col]["type"] == "wall":
            grid[picked_row][picked_col]["type"] = "empty"  # @step:carve-cell
            passages_carved += 1

        # Carve the wall between origin and picked
        wall_row = origin_row + (picked_row - origin_row) // 2
        wall_col = origin_col + (picked_col - origin_col) // 2
        if grid[wall_row][wall_col]["type"] == "wall":
            grid[wall_row][wall_col]["type"] = "empty"  # @step:carve-cell
            passages_carved += 1

        # Add new frontier neighbors
        for delta_row, delta_col in directions:
            neighbor_row = picked_row + delta_row
            neighbor_col = picked_col + delta_col
            if neighbor_row < 1 or neighbor_row >= row_count - 1:
                continue
            if neighbor_col < 1 or neighbor_col >= col_count - 1:
                continue
            if not in_maze[neighbor_row][neighbor_col]:
                frontier.append((neighbor_row, neighbor_col, picked_row, picked_col))  # @step:open-node

    return {"grid": grid, "passagesCarved": passages_carved}  # @step:complete
