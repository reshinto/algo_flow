import heapq
from typing import List, Tuple


# Jump Point Search — A* optimization that "jumps" over intermediate nodes in uniform-cost grids
def jump_point_search(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    parent = [[None] * col_count for _ in range(row_count)]  # @step:initialize
    g_cost = [[float("inf")] * col_count for _ in range(row_count)]  # @step:initialize
    visited = []  # @step:initialize
    jump_points_found = []  # @step:initialize

    g_cost[start[0]][start[1]] = 0  # @step:initialize
    start_h = heuristic(start[0], start[1], end[0], end[1])
    # Open list: (fCost, gCost, row, col)
    open_list = [(start_h, 0, start[0], start[1])]  # @step:initialize,open-node
    heapq.heapify(open_list)
    in_open_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize,open-node
    in_open_set[start[0]][start[1]] = True  # @step:open-node

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while open_list:
        f_cost, current_g, current_row, current_col = heapq.heappop(open_list)  # @step:close-node
        visited.append((current_row, current_col))  # @step:close-node

        if current_row == end[0] and current_col == end[1]:  # @step:trace-path
            path = reconstruct_path(parent, end)  # @step:trace-path
            return {"path": path, "visited": visited, "jumpPoints": jump_points_found}

        for delta_row, delta_col in directions:
            jump_result = jump(grid, current_row, current_col, delta_row, delta_col, end,
                               row_count, col_count)
            if jump_result is None:
                continue

            jump_row, jump_col = jump_result

            # Mark intermediate forced-neighbor nodes along the jump path
            scan_row = current_row + delta_row
            scan_col = current_col + delta_col
            while scan_row != jump_row or scan_col != jump_col:
                if has_forced(grid, scan_row, scan_col, delta_row, delta_col, row_count, col_count):
                    jump_points_found.append((scan_row, scan_col))  # @step:visit
                scan_row += delta_row
                scan_col += delta_col

            neighbor_g = current_g + heuristic(current_row, current_col, jump_row, jump_col)
            if neighbor_g < g_cost[jump_row][jump_col]:
                g_cost[jump_row][jump_col] = neighbor_g  # @step:open-node
                parent[jump_row][jump_col] = (current_row, current_col)  # @step:open-node
                jump_h = heuristic(jump_row, jump_col, end[0], end[1])
                jump_f = neighbor_g + jump_h
                in_open_set[jump_row][jump_col] = True
                heapq.heappush(open_list, (jump_f, neighbor_g, jump_row, jump_col))  # @step:open-node

    return {"path": [], "visited": visited, "jumpPoints": jump_points_found}  # @step:complete


def jump(grid, row, col, delta_row, delta_col, end, row_count, col_count):
    current_row = row + delta_row
    current_col = col + delta_col

    while True:
        if current_row < 0 or current_row >= row_count:
            return None
        if current_col < 0 or current_col >= col_count:
            return None
        if grid[current_row][current_col]["type"] == "wall":
            return None
        if current_row == end[0] and current_col == end[1]:
            return (current_row, current_col)
        if has_forced(grid, current_row, current_col, delta_row, delta_col, row_count, col_count):
            return (current_row, current_col)

        current_row += delta_row
        current_col += delta_col


def has_forced(grid, row, col, delta_row, delta_col, row_count, col_count):
    if delta_row != 0 and delta_col == 0:
        prev_row = row - delta_row
        left_blocked = (col - 1 >= 0 and 0 <= prev_row < row_count
                        and grid[prev_row][col - 1]["type"] == "wall")
        right_blocked = (col + 1 < col_count and 0 <= prev_row < row_count
                         and grid[prev_row][col + 1]["type"] == "wall")
        left_open = col - 1 >= 0 and grid[row][col - 1]["type"] != "wall"
        right_open = col + 1 < col_count and grid[row][col + 1]["type"] != "wall"
        return (left_blocked and left_open) or (right_blocked and right_open)
    if delta_col != 0 and delta_row == 0:
        prev_col = col - delta_col
        up_blocked = (row - 1 >= 0 and 0 <= prev_col < col_count
                      and grid[row - 1][prev_col]["type"] == "wall")
        down_blocked = (row + 1 < row_count and 0 <= prev_col < col_count
                        and grid[row + 1][prev_col]["type"] == "wall")
        up_open = row - 1 >= 0 and grid[row - 1][col]["type"] != "wall"
        down_open = row + 1 < row_count and grid[row + 1][col]["type"] != "wall"
        return (up_blocked and up_open) or (down_blocked and down_open)
    return False


def heuristic(row_a, col_a, row_b, col_b):
    return abs(row_a - row_b) + abs(col_a - col_b)


def reconstruct_path(parent, end):
    path = []
    current = end
    while current is not None:
        path.append(current)
        current = parent[current[0]][current[1]]
    path.reverse()
    return path
