# Pascal's Triangle Row (Tabulation) — build one row using in-place right-to-left updates
def pascals_triangle_row(row_index: int) -> list[int]:  # @step:initialize
    dp_table = [1] * (row_index + 1)  # @step:initialize,fill-table
    # Iterate each row from 2 up to row_index, updating right-to-left
    for row_number in range(2, row_index + 1):  # @step:compute-cell
        for column_index in range(row_number - 1, 0, -1):  # @step:compute-cell
            dp_table[column_index] = dp_table[column_index] + dp_table[column_index - 1]  # @step:compute-cell,read-cache
    return dp_table  # @step:complete
