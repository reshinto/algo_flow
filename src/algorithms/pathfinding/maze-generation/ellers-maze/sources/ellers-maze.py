import random
from typing import List, Dict, Any


# Eller's Maze — row-by-row maze generation with set merging and vertical extensions
def ellers_maze(grid: List[List[Dict[str, Any]]]) -> Dict[str, Any]:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    passages_carved = 0  # @step:initialize

    # Passage column indices (odd columns)
    passage_cols = list(range(1, col_count - 1, 2))  # @step:initialize
    passage_col_count = len(passage_cols)  # @step:initialize

    # Assign each cell in the first passage row its own set
    next_set_id = [1]  # @step:initialize

    def new_set_id() -> int:
        result = next_set_id[0]
        next_set_id[0] += 1
        return result

    current_sets = [new_set_id() for _ in range(passage_col_count)]  # @step:initialize

    # Collect passage row indices
    passage_rows = list(range(1, row_count - 1, 2))

    for passage_row_pos, passage_row in enumerate(passage_rows):
        is_last_row = passage_row_pos == len(passage_rows) - 1  # @step:carve-cell

        # Step 1: Carve all passage cells in this row
        for passage_col in passage_cols:
            if grid[passage_row][passage_col]["type"] == "wall":
                grid[passage_row][passage_col]["type"] = "empty"  # @step:carve-cell
                passages_carved += 1

        # Step 2: Randomly merge adjacent cells in different sets
        for cell_pos in range(passage_col_count - 1):
            left_set_id = current_sets[cell_pos]
            right_set_id = current_sets[cell_pos + 1]
            wall_col = passage_cols[cell_pos] + 1  # @step:merge-cells

            should_merge = (
                left_set_id != right_set_id and (is_last_row or random.random() < 0.5)
            )  # @step:merge-cells

            if should_merge:
                grid[passage_row][wall_col]["type"] = "empty"  # @step:merge-cells
                passages_carved += 1
                # Update all cells with right_set_id to use left_set_id
                for update_pos in range(passage_col_count):
                    if current_sets[update_pos] == right_set_id:
                        current_sets[update_pos] = left_set_id

        if is_last_row:
            break

        # Step 3: For each set, carve at least one downward connection
        next_row = passage_rows[passage_row_pos + 1]

        # Group cells by set
        set_groups: Dict[int, List[int]] = {}  # @step:carve-cell
        for cell_pos, set_id in enumerate(current_sets):
            set_groups.setdefault(set_id, []).append(cell_pos)

        next_sets = [0] * passage_col_count

        for set_id, positions in set_groups.items():
            shuffled = positions[:]
            random.shuffle(shuffled)
            extension_count = max(1, random.randint(1, len(positions)))

            for ext_index, cell_pos in enumerate(shuffled):
                passage_col = passage_cols[cell_pos]
                between_row = passage_row + 1

                if ext_index < extension_count:
                    grid[between_row][passage_col]["type"] = "empty"  # @step:carve-cell
                    passages_carved += 1
                    next_sets[cell_pos] = set_id
                else:
                    next_sets[cell_pos] = new_set_id()

        # Carve the next row passage cells
        for passage_col in passage_cols:
            if grid[next_row][passage_col]["type"] == "wall":
                grid[next_row][passage_col]["type"] = "empty"  # @step:carve-cell
                passages_carved += 1

        current_sets = next_sets

    return {"grid": grid, "passagesCarved": passages_carved}  # @step:complete
