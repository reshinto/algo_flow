import random
from typing import List, Tuple, Dict, Any


# Recursive Division Maze — builds walls in an open grid, leaving one gap per wall
def recursive_division(
    grid: List[List[Dict[str, Any]]],
    start_pos: Tuple[int, int],
    end_pos: Tuple[int, int],
) -> Dict[str, Any]:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    walls_built = 0  # @step:initialize

    def build_walls_in_region(
        top_row: int,
        left_col: int,
        bottom_row: int,
        right_col: int,
    ) -> None:
        nonlocal walls_built
        region_height = bottom_row - top_row  # @step:carve-cell
        region_width = right_col - left_col  # @step:carve-cell

        if region_height < 2 or region_width < 2:  # @step:carve-cell
            return

        # Choose orientation: horizontal wall if taller, vertical if wider
        build_horizontal = region_height >= region_width  # @step:carve-cell

        if build_horizontal:
            # Place wall at a random even row within the region
            wall_row = top_row + 2 * random.randint(0, region_height // 2 - 1) + 1  # @step:carve-cell
            # Random passage gap at an odd column
            gap_col = left_col + 2 * random.randint(0, (region_width + 1) // 2 - 1)  # @step:carve-cell

            for col_index in range(left_col, right_col + 1):  # @step:carve-cell
                cell = grid[wall_row][col_index]
                if cell["type"] in ("start", "end"):
                    continue
                if col_index == gap_col:
                    continue  # Leave the gap open
                cell["type"] = "wall"  # @step:carve-cell
                walls_built += 1

            build_walls_in_region(top_row, left_col, wall_row - 1, right_col)  # @step:carve-cell
            build_walls_in_region(wall_row + 1, left_col, bottom_row, right_col)  # @step:carve-cell
        else:
            # Place wall at a random even column within the region
            wall_col = left_col + 2 * random.randint(0, region_width // 2 - 1) + 1  # @step:carve-cell
            # Random passage gap at an odd row
            gap_row = top_row + 2 * random.randint(0, (region_height + 1) // 2 - 1)  # @step:carve-cell

            for row_index in range(top_row, bottom_row + 1):  # @step:carve-cell
                cell = grid[row_index][wall_col]
                if cell["type"] in ("start", "end"):
                    continue
                if row_index == gap_row:
                    continue  # Leave the gap open
                cell["type"] = "wall"  # @step:carve-cell
                walls_built += 1

            build_walls_in_region(top_row, left_col, bottom_row, wall_col - 1)  # @step:carve-cell
            build_walls_in_region(top_row, wall_col + 1, bottom_row, right_col)  # @step:carve-cell

    build_walls_in_region(0, 0, row_count - 1, col_count - 1)  # @step:carve-cell

    return {"grid": grid, "wallsBuilt": walls_built}  # @step:complete
