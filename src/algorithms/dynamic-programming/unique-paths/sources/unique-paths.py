# Unique Paths (Tabulation) — count distinct paths from top-left to bottom-right in a rows×columns grid
def unique_paths(rows: int, columns: int) -> int:  # @step:initialize
    dp_table = [1] * columns  # @step:initialize,fill-table
    # First row is all 1s — only one way to reach any cell by moving right only
    for row_index in range(1, rows):  # @step:compute-cell
        for column_index in range(1, columns):  # @step:compute-cell
            dp_table[column_index] = dp_table[column_index] + dp_table[column_index - 1]  # @step:compute-cell,read-cache
    return dp_table[columns - 1]  # @step:complete
