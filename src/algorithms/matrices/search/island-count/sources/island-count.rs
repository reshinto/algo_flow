// Island Count
// Count the number of islands (connected groups of 1s) in a binary matrix using DFS flood fill.
// An island is a group of adjacent 1s connected horizontally or vertically.
// Time: O(m × n) — every cell is visited at most once
// Space: O(m × n) — DFS call stack depth in the worst case

fn island_count(grid: &mut Vec<Vec<i32>>) -> i32 {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut island_total: i32 = 0; // @step:initialize

    for row_idx in 0..row_count {
        for col_idx in 0..col_count {
            if grid[row_idx][col_idx] == 1 {
                // @step:compare-cell
                island_total += 1; // @step:mark-found
                dfs_flood_fill(grid, row_idx, col_idx, row_count, col_count); // @step:mark-found
            }
        }
    }

    island_total // @step:complete
}

fn dfs_flood_fill(
    grid: &mut Vec<Vec<i32>>,
    row_idx: usize,
    col_idx: usize,
    row_count: usize,
    col_count: usize,
) {
    if row_idx >= row_count { return; } // @step:compare-cell
    if col_idx >= col_count { return; } // @step:compare-cell
    if grid[row_idx][col_idx] != 1 { return; } // @step:compare-cell

    grid[row_idx][col_idx] = 0; // @step:mark-found
    if row_idx > 0 { dfs_flood_fill(grid, row_idx - 1, col_idx, row_count, col_count); } // @step:mark-found
    dfs_flood_fill(grid, row_idx + 1, col_idx, row_count, col_count); // @step:mark-found
    if col_idx > 0 { dfs_flood_fill(grid, row_idx, col_idx - 1, row_count, col_count); } // @step:mark-found
    dfs_flood_fill(grid, row_idx, col_idx + 1, row_count, col_count); // @step:mark-found
}
