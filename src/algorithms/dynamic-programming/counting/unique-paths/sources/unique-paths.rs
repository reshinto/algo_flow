// Unique Paths (Tabulation) — count distinct paths from top-left to bottom-right in a rows×columns grid

fn unique_paths(rows: usize, columns: usize) -> usize {
    // @step:initialize
    let mut dp_table = vec![1usize; columns]; // @step:initialize,fill-table
    // First row is all 1s — only one way to reach any cell by moving right only
    for _row_index in 1..rows {
        // @step:compute-cell
        for column_index in 1..columns {
            // @step:compute-cell
            dp_table[column_index] += dp_table[column_index - 1]; // @step:compute-cell,read-cache
        }
    }
    dp_table[columns - 1] // @step:complete
}

fn main() {
    let rows = 3;
    let columns = 7;
    let result = unique_paths(rows, columns);
    println!("Unique paths in {}x{} grid: {}", rows, columns, result);
}
