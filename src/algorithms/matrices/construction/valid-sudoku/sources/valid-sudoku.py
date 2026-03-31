# Valid Sudoku (LeetCode 36)
# Determine if a 9×9 Sudoku board is valid.
# Each row, column, and 3×3 sub-box must contain no duplicate digits 1-9.
# Empty cells are represented by 0.
# Time: O(1) — fixed 9×9 board
# Space: O(1) — fixed-size sets


def valid_sudoku(board: list[list[int]]) -> bool:
    rows_seen: list[set[int]] = [set() for _ in range(9)]  # @step:initialize
    cols_seen: list[set[int]] = [set() for _ in range(9)]  # @step:initialize
    boxes_seen: list[set[int]] = [set() for _ in range(9)]  # @step:initialize

    for row_idx in range(9):
        for col_idx in range(9):
            digit_value = board[row_idx][col_idx]  # @step:compare-cell

            if digit_value == 0:  # @step:compare-cell
                continue

            box_idx = (row_idx // 3) * 3 + (col_idx // 3)  # @step:compare-cell

            if (
                digit_value in rows_seen[row_idx]
                or digit_value in cols_seen[col_idx]
                or digit_value in boxes_seen[box_idx]
            ):
                return False  # @step:mark-found

            rows_seen[row_idx].add(digit_value)  # @step:compare-cell
            cols_seen[col_idx].add(digit_value)  # @step:compare-cell
            boxes_seen[box_idx].add(digit_value)  # @step:compare-cell

    return True  # @step:complete
