import random
from typing import List, Dict, Any


# Kruskal's Maze — Union-Find based maze generation by randomly removing walls
def kruskals_maze(grid: List[List[Dict[str, Any]]]) -> Dict[str, Any]:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    passages_carved = 0  # @step:initialize

    # Union-Find: each cell has a set ID
    set_id = [
        [row_index * col_count + col_index for col_index in range(col_count)]
        for row_index in range(row_count)
    ]  # @step:initialize

    def find_set(row: int, col: int) -> int:  # @step:initialize
        return set_id[row][col]

    def merge_sets(row_a: int, col_a: int, row_b: int, col_b: int) -> None:  # @step:initialize
        id_a = find_set(row_a, col_a)
        id_b = find_set(row_b, col_b)
        if id_a == id_b:
            return
        for row_index in range(row_count):
            for col_index in range(col_count):
                if set_id[row_index][col_index] == id_b:
                    set_id[row_index][col_index] = id_a

    # Collect all internal walls between passage cells
    walls = []  # @step:initialize

    for row_index in range(1, row_count - 1, 2):
        for col_index in range(1, col_count - 1, 2):
            # Carve the passage cell itself
            if grid[row_index][col_index]["type"] == "wall":
                grid[row_index][col_index]["type"] = "empty"  # @step:merge-cells
                passages_carved += 1
            # Horizontal wall to the right
            if col_index + 2 < col_count - 1:
                walls.append((row_index, col_index + 1, row_index, col_index, row_index, col_index + 2))
            # Vertical wall below
            if row_index + 2 < row_count - 1:
                walls.append((row_index + 1, col_index, row_index, col_index, row_index + 2, col_index))

    # Shuffle walls randomly
    random.shuffle(walls)  # @step:merge-cells

    # Process each wall
    for wall in walls:
        wall_row, wall_col, cell_a_row, cell_a_col, cell_b_row, cell_b_col = wall
        if find_set(cell_a_row, cell_a_col) != find_set(cell_b_row, cell_b_col):  # @step:merge-cells
            # Remove the wall and merge the two sets
            grid[wall_row][wall_col]["type"] = "empty"  # @step:merge-cells
            passages_carved += 1
            merge_sets(cell_a_row, cell_a_col, cell_b_row, cell_b_col)  # @step:merge-cells

    return {"grid": grid, "passagesCarved": passages_carved}  # @step:complete
