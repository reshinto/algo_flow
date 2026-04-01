from typing import List, Tuple


# Wall Follower — right-hand rule maze solving: always keep the right wall, follow it to the exit
DIRECTION_ROW = [-1, 0, 1, 0]  # up, right, down, left
DIRECTION_COL = [0, 1, 0, -1]


def wall_follower(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    path = []  # @step:initialize
    visited = []  # @step:initialize

    current_row, current_col = start[0], start[1]  # @step:initialize
    # Start facing right (direction index 1)
    facing_direction = 1  # @step:initialize
    max_steps = row_count * col_count * 4  # @step:initialize

    for _ in range(max_steps):  # @step:open-node
        path.append((current_row, current_col))  # @step:close-node
        visited.append((current_row, current_col))  # @step:close-node

        # Check if we reached the end
        if current_row == end[0] and current_col == end[1]:
            return {"path": path, "visited": visited}  # @step:trace-path

        # Right-hand rule: try to turn right first, then forward, then left, then back
        right_direction = (facing_direction + 1) % 4
        left_direction = (facing_direction + 3) % 4

        if can_move(grid, current_row, current_col, right_direction, row_count, col_count):
            facing_direction = right_direction  # @step:open-node
            current_row += DIRECTION_ROW[facing_direction]  # @step:open-node
            current_col += DIRECTION_COL[facing_direction]  # @step:open-node
        elif can_move(grid, current_row, current_col, facing_direction, row_count, col_count):
            current_row += DIRECTION_ROW[facing_direction]  # @step:open-node
            current_col += DIRECTION_COL[facing_direction]  # @step:open-node
        elif can_move(grid, current_row, current_col, left_direction, row_count, col_count):
            facing_direction = left_direction  # @step:open-node
            current_row += DIRECTION_ROW[facing_direction]  # @step:open-node
            current_col += DIRECTION_COL[facing_direction]  # @step:open-node
        else:
            facing_direction = (facing_direction + 2) % 4  # @step:open-node
            current_row += DIRECTION_ROW[facing_direction]  # @step:open-node
            current_col += DIRECTION_COL[facing_direction]  # @step:open-node

    return {"path": [], "visited": visited}  # @step:complete


def can_move(
    grid: List[List[dict]],
    row: int,
    col: int,
    direction: int,
    row_count: int,
    col_count: int,
) -> bool:
    next_row = row + DIRECTION_ROW[direction]
    next_col = col + DIRECTION_COL[direction]
    if next_row < 0 or next_row >= row_count or next_col < 0 or next_col >= col_count:
        return False
    return grid[next_row][next_col]["type"] != "wall"
