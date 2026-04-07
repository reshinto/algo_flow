// Pascal's Triangle Row (Tabulation) — build one row using in-place right-to-left updates

fn pascals_triangle_row(row_index: usize) -> Vec<usize> {
    // @step:initialize
    let mut dp_table = vec![1usize; row_index + 1]; // @step:initialize,fill-table
    // Iterate each row from 2 up to row_index, updating right-to-left
    for row_number in 2..=row_index {
        // @step:compute-cell
        for column_index in (1..row_number).rev() {
            // @step:compute-cell,read-cache
            dp_table[column_index] += dp_table[column_index - 1]; // @step:compute-cell,read-cache
        }
    }
    dp_table // @step:complete
}

fn main() {
    let row_index = 4;
    let result = pascals_triangle_row(row_index);
    println!("Pascal's triangle row {}: {:?}", row_index, result);
}
