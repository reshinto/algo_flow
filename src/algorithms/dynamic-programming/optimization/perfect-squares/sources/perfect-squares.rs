// Perfect Squares tabulation — find minimum number of perfect squares summing to n

fn perfect_squares(target_number: usize) -> usize {
    // @step:initialize
    let mut dp_table = vec![usize::MAX; target_number + 1]; // @step:initialize,fill-table
    dp_table[0] = 0; // @step:fill-table
    // Fill each cell with the minimum number of perfect squares needed
    for cell_index in 1..=target_number {
        // @step:compute-cell
        let mut square_root = 1;
        while square_root * square_root <= cell_index {
            // @step:read-cache
            let prev_index = cell_index - square_root * square_root; // @step:read-cache
            if dp_table[prev_index] != usize::MAX && dp_table[prev_index] + 1 < dp_table[cell_index] {
                // @step:compute-cell
                dp_table[cell_index] = dp_table[prev_index] + 1; // @step:compute-cell
            }
            square_root += 1;
        }
    }
    dp_table[target_number] // @step:complete
}

fn main() {
    let target_number = 12;
    let result = perfect_squares(target_number);
    println!("Perfect squares for {}: {}", target_number, result);
}
