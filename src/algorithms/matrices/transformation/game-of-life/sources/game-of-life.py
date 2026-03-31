# Conway's Game of Life — One Step Simulation
# Updates all cells simultaneously based on neighbor counts using in-place encoding.
# Encoding: current bit = value & 1, next bit = (value >> 1) & 1
# Time: O(m x n) — every cell visited twice
# Space: O(1) — in-place using bit encoding


def game_of_life(board: list[list[int]]) -> list[list[int]]:
    row_count = len(board)  # @step:initialize
    col_count = len(board[0]) if board else 0  # @step:initialize

    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),            (0, 1),
        (1, -1),  (1, 0),  (1, 1),
    ]

    def count_live_neighbors(row_idx: int, col_idx: int) -> int:
        live_count = 0
        for row_delta, col_delta in directions:
            neighbor_row = row_idx + row_delta
            neighbor_col = col_idx + col_delta
            if 0 <= neighbor_row < row_count and 0 <= neighbor_col < col_count:
                live_count += board[neighbor_row][neighbor_col] & 1
        return live_count

    # Phase 1: Encode next state in higher bits
    for row_idx in range(row_count):  # @step:mark-cell
        for col_idx in range(col_count):  # @step:mark-cell
            neighbor_count = count_live_neighbors(row_idx, col_idx)  # @step:mark-cell
            current_state = board[row_idx][col_idx] & 1  # @step:mark-cell

            next_state = 0  # @step:mark-cell
            if current_state == 1 and neighbor_count in (2, 3):  # @step:mark-cell
                next_state = 1  # @step:mark-cell
            elif current_state == 0 and neighbor_count == 3:  # @step:mark-cell
                next_state = 1  # @step:mark-cell

            board[row_idx][col_idx] |= next_state << 1  # @step:mark-cell

    # Phase 2: Decode final state by right-shifting
    for row_idx in range(row_count):  # @step:flip-cell
        for col_idx in range(col_count):  # @step:flip-cell
            board[row_idx][col_idx] >>= 1  # @step:flip-cell

    return board  # @step:complete
