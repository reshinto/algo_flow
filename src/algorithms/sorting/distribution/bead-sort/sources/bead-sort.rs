// Bead Sort (Gravity Sort) — represent numbers as rows of beads, let gravity pull beads down column by column
fn bead_sort(input_array: &[i64]) -> Vec<i64> {
    // @step:initialize
    let mut source_array = input_array.to_vec(); // @step:initialize
    let array_length = source_array.len(); // @step:initialize

    if array_length <= 1 {
        return source_array; // @step:complete
    }

    // Offset negative values so all are non-negative integers
    let min_value = *source_array.iter().min().unwrap(); // @step:initialize
    let offset = if min_value < 0 { -min_value } else { 0 }; // @step:initialize
    let shifted_array: Vec<i64> = source_array.iter().map(|&v| v + offset).collect(); // @step:initialize
    let max_value = *shifted_array.iter().max().unwrap() as usize; // @step:initialize

    if max_value == 0 {
        return source_array; // @step:complete
    }

    // Represent each number as a row of beads on an abacus
    // grid[row][col] = 1 means a bead is present, 0 means empty
    let mut grid: Vec<Vec<u8>> = (0..array_length)
        .map(|row_index| {
            (0..max_value)
                .map(|col_index| if col_index < shifted_array[row_index] as usize { 1 } else { 0 })
                .collect()
        })
        .collect(); // @step:initialize

    // Gravity drop — for each column, count beads and stack them at the bottom
    for col_index in 0..max_value {
        // @step:drop-beads,compare
        let mut bead_count = 0usize; // @step:drop-beads,compare
        for row_index in 0..array_length {
            // @step:drop-beads,compare
            bead_count += grid[row_index][col_index] as usize; // @step:drop-beads,compare
            grid[row_index][col_index] = 0; // @step:drop-beads,compare
        }
        // Stack beads at the bottom of this column (gravity effect)
        for row_index in (array_length - bead_count)..array_length {
            // @step:drop-beads
            grid[row_index][col_index] = 1; // @step:drop-beads
        }
    }

    // Read bead counts from each row — each row's bead count is the sorted value
    for row_index in 0..array_length {
        // @step:mark-sorted
        let mut row_bead_count = 0i64; // @step:mark-sorted
        for col_index in 0..max_value {
            // @step:mark-sorted
            row_bead_count += grid[row_index][col_index] as i64; // @step:mark-sorted
        }
        source_array[row_index] = row_bead_count - offset; // @step:mark-sorted
    }

    source_array // @step:complete
}
