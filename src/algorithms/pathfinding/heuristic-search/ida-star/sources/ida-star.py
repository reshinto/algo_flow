from typing import List, Tuple


# IDA* — Iterative Deepening A*: DFS with f-cost threshold that increases each iteration
def ida_star(
    grid: List[List[dict]],
    start: Tuple[int, int],
    end: Tuple[int, int],
) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    visited = []  # @step:initialize
    threshold = heuristic(start[0], start[1], end[0], end[1])  # @step:initialize
    current_path = [start]  # @step:initialize
    on_path = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    on_path[start[0]][start[1]] = True  # @step:initialize
    iteration_count = 0  # @step:initialize

    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]

    while True:
        iteration_count += 1  # @step:close-node
        result = search(
            grid, current_path, on_path, 0, threshold, end,
            visited, directions, row_count, col_count,
        )  # @step:close-node

        if result == "FOUND":  # @step:trace-path
            return {"path": list(current_path), "visited": visited, "iterationCount": iteration_count}

        if result == float("inf"):
            return {"path": [], "visited": visited, "iterationCount": iteration_count}  # @step:complete

        threshold = result  # @step:initialize


def search(grid, current_path, on_path, g_cost, threshold, end,
           visited, directions, row_count, col_count):
    head = current_path[-1]
    f_cost = g_cost + heuristic(head[0], head[1], end[0], end[1])  # @step:open-node

    if f_cost > threshold:
        return f_cost  # @step:open-node

    visited.append((head[0], head[1]))  # @step:close-node

    if head[0] == end[0] and head[1] == end[1]:
        return "FOUND"  # @step:trace-path

    minimum_exceeded = float("inf")

    for delta_row, delta_col in directions:
        neighbor_row = head[0] + delta_row
        neighbor_col = head[1] + delta_col

        if neighbor_row < 0 or neighbor_row >= row_count:
            continue
        if neighbor_col < 0 or neighbor_col >= col_count:
            continue
        if grid[neighbor_row][neighbor_col]["type"] == "wall":
            continue
        if on_path[neighbor_row][neighbor_col]:
            continue  # @step:open-node

        current_path.append((neighbor_row, neighbor_col))  # @step:open-node
        on_path[neighbor_row][neighbor_col] = True  # @step:open-node

        sub_result = search(
            grid, current_path, on_path, g_cost + 1, threshold, end,
            visited, directions, row_count, col_count,
        )

        if sub_result == "FOUND":
            return "FOUND"

        if sub_result < minimum_exceeded:
            minimum_exceeded = sub_result

        current_path.pop()  # @step:close-node
        on_path[neighbor_row][neighbor_col] = False  # @step:close-node

    return minimum_exceeded


def heuristic(row_a, col_a, row_b, col_b):
    return abs(row_a - row_b) + abs(col_a - col_b)
