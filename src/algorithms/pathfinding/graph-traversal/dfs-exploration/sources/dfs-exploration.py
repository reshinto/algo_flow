from typing import List, Tuple


# DFS Exploration — explore all reachable cells using iterative depth-first search with a stack
def dfs_exploration(grid: List[List[dict]], start: Tuple[int, int]) -> dict:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0])  # @step:initialize
    visited_set = [[False] * col_count for _ in range(row_count)]  # @step:initialize
    visited = []  # @step:initialize

    # Stack stores (row, col, depth) tuples for iterative DFS
    stack = [(start[0], start[1], 0)]  # @step:initialize,open-node
    visited_set[start[0]][start[1]] = True  # @step:open-node
    max_depth = 0  # @step:initialize

    while stack:
        # Pop from top of stack — DFS always expands the deepest unvisited cell
        current_row, current_col, current_depth = stack.pop()  # @step:close-node
        visited.append((current_row, current_col))  # @step:close-node
        if current_depth > max_depth:  # @step:close-node
            max_depth = current_depth  # @step:close-node

        # Explore 4-directional neighbors in reverse order for natural DFS snaking
        for delta_row, delta_col in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            neighbor_row = current_row + delta_row
            neighbor_col = current_col + delta_col
            if neighbor_row < 0 or neighbor_row >= row_count:
                continue
            if neighbor_col < 0 or neighbor_col >= col_count:
                continue
            if grid[neighbor_row][neighbor_col]["type"] == "wall":
                continue
            if visited_set[neighbor_row][neighbor_col]:
                continue
            visited_set[neighbor_row][neighbor_col] = True  # @step:open-node
            stack.append((neighbor_row, neighbor_col, current_depth + 1))  # @step:open-node

    return {"visited": visited, "maxDepth": max_depth}  # @step:complete
