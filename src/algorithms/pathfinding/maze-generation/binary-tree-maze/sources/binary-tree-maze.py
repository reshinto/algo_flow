import random
from typing import List, Dict, Any


# Binary Tree Maze — for each cell, randomly carve north or east
def binary_tree_maze(grid: List[List[Dict[str, Any]]]) -> Dict[str, Any]:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    passages_carved = 0  # @step:initialize

    # Carve all passage cells first
    for row_index in range(1, row_count - 1, 2):
        for col_index in range(1, col_count - 1, 2):
            if grid[row_index][col_index]["type"] == "wall":
                grid[row_index][col_index]["type"] = "empty"  # @step:carve-cell
                passages_carved += 1

            # Determine which directions are available: north (row-1) and east (col+1)
            can_go_north = row_index - 2 >= 1  # @step:carve-cell
            can_go_east = col_index + 2 <= col_count - 2  # @step:carve-cell

            if can_go_north and can_go_east:
                # Randomly choose north or east
                if random.random() < 0.5:
                    grid[row_index - 1][col_index]["type"] = "empty"  # @step:carve-cell
                    passages_carved += 1
                else:
                    grid[row_index][col_index + 1]["type"] = "empty"  # @step:carve-cell
                    passages_carved += 1
            elif can_go_north:
                grid[row_index - 1][col_index]["type"] = "empty"  # @step:carve-cell
                passages_carved += 1
            elif can_go_east:
                grid[row_index][col_index + 1]["type"] = "empty"  # @step:carve-cell
                passages_carved += 1

    return {"grid": grid, "passagesCarved": passages_carved}  # @step:complete
