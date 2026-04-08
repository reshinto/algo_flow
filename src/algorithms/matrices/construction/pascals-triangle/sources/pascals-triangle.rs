// Pascal's Triangle Construction
// Builds Pascal's triangle as a 2D matrix with num_rows rows.
// Each inner element is the sum of the two elements above it; edges are always 1.
// Time: O(n²) — filling each cell in every row
// Space: O(1) extra (output matrix aside)

fn pascals_triangle(num_rows: usize) -> Vec<Vec<i32>> {
    let mut triangle: Vec<Vec<i32>> = vec![]; // @step:initialize

    for row_idx in 0..num_rows {
        // @step:initialize
        let mut row: Vec<i32> = vec![0; row_idx + 1]; // @step:initialize

        row[0] = 1; // @step:compute-value
        row[row_idx] = 1; // @step:compute-value

        for col_idx in 1..row_idx {
            let above = &triangle[row_idx - 1];
            row[col_idx] = above[col_idx - 1] + above[col_idx]; // @step:compute-value
        }

        triangle.push(row); // @step:complete
    }

    triangle // @step:complete
}
