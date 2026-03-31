# Island Count
# Count the number of islands (connected groups of 1s) in a binary matrix using DFS flood fill.
# An island is a group of adjacent 1s connected horizontally or vertically.
# Time: O(m x n) — every cell is visited at most once
# Space: O(m x n) — DFS call stack depth in the worst case


def island_count(grid: list[list[int]]) -> int:
    row_count = len(grid)  # @step:initialize
    col_count = len(grid[0]) if grid else 0  # @step:initialize
    island_total = 0  # @step:initialize

    def dfs_flood_fill(row_idx: int, col_idx: int) -> None:
        if row_idx < 0 or row_idx >= row_count:  # @step:compare-cell
            return
        if col_idx < 0 or col_idx >= col_count:  # @step:compare-cell
            return
        if grid[row_idx][col_idx] != 1:  # @step:compare-cell
            return

        grid[row_idx][col_idx] = 0  # @step:mark-found
        dfs_flood_fill(row_idx - 1, col_idx)  # @step:mark-found
        dfs_flood_fill(row_idx + 1, col_idx)  # @step:mark-found
        dfs_flood_fill(row_idx, col_idx - 1)  # @step:mark-found
        dfs_flood_fill(row_idx, col_idx + 1)  # @step:mark-found

    for row_idx in range(row_count):
        for col_idx in range(col_count):
            if grid[row_idx][col_idx] == 1:  # @step:compare-cell
                island_total += 1  # @step:mark-found
                dfs_flood_fill(row_idx, col_idx)  # @step:mark-found

    return island_total  # @step:complete
