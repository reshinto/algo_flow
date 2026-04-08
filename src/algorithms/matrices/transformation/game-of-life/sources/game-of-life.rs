// Conway's Game of Life — One Step Simulation
// Updates all cells simultaneously based on neighbor counts using in-place encoding.
// Encoding: current bit = value & 1, next bit = (value >> 1) & 1
// Time: O(m × n) — every cell visited twice
// Space: O(1) — in-place using bit encoding

fn count_live_neighbors(
    board: &Vec<Vec<i32>>,
    row_idx: usize,
    col_idx: usize,
    row_count: usize,
    col_count: usize,
) -> i32 {
    let directions: [(i32, i32); 8] = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),           (0, 1),
        (1, -1),  (1, 0),  (1, 1),
    ];
    let mut live_count = 0;
    for (row_delta, col_delta) in directions.iter() {
        let neighbor_row = row_idx as i32 + row_delta;
        let neighbor_col = col_idx as i32 + col_delta;
        if neighbor_row >= 0
            && neighbor_row < row_count as i32
            && neighbor_col >= 0
            && neighbor_col < col_count as i32
        {
            // Use & 1 to read original state (lower bit) even if already encoded
            live_count += board[neighbor_row as usize][neighbor_col as usize] & 1;
        }
    }
    live_count
}

fn game_of_life(board: &mut Vec<Vec<i32>>) -> &Vec<Vec<i32>> {
    let row_count = board.len(); // @step:initialize
    let col_count = if row_count > 0 { board[0].len() } else { 0 }; // @step:initialize

    // Phase 1: Encode next state in higher bits
    for row_idx in 0..row_count {
        // @step:mark-cell
        for col_idx in 0..col_count {
            // @step:mark-cell
            let neighbor_count = count_live_neighbors(board, row_idx, col_idx, row_count, col_count); // @step:mark-cell
            let current_state = board[row_idx][col_idx] & 1; // @step:mark-cell

            let mut next_state = 0; // @step:mark-cell
            if current_state == 1 && (neighbor_count == 2 || neighbor_count == 3) {
                // @step:mark-cell
                next_state = 1; // @step:mark-cell
            } else if current_state == 0 && neighbor_count == 3 {
                // @step:mark-cell
                next_state = 1; // @step:mark-cell
            }

            // Encode next state into bit 1 (shift left by 1)
            board[row_idx][col_idx] |= next_state << 1; // @step:mark-cell
        }
    }

    // Phase 2: Decode final state by right-shifting
    for row_idx in 0..row_count {
        // @step:flip-cell
        for col_idx in 0..col_count {
            // @step:flip-cell
            board[row_idx][col_idx] >>= 1; // @step:flip-cell
        }
    }

    board // @step:complete
}
