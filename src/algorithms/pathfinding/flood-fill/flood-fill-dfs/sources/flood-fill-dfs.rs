// Flood Fill DFS — classic paint bucket fill using depth-first search (stack-based)

#[derive(Clone, PartialEq)]
enum CellType {
    Empty,
    Wall,
    Start,
    End,
}

struct GridCell {
    row: usize,
    col: usize,
    cell_type: CellType,
    state: String,
}

struct FloodFillResult {
    filled: Vec<(usize, usize)>,
    count: usize,
}

fn flood_fill_dfs(grid: &Vec<Vec<GridCell>>, start: (usize, usize)) -> FloodFillResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut filled_set = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut filled: Vec<(usize, usize)> = Vec::new(); // @step:initialize
    // Seed the stack with the start cell
    let mut stack: Vec<(usize, usize)> = Vec::new(); // @step:initialize,open-node
    stack.push(start); // @step:initialize,open-node
    filled_set[start.0][start.1] = true; // @step:open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while let Some(current) = stack.pop() {
        // Pop the top cell — DFS dives deep before backtracking
        let (current_row, current_col) = current; // @step:close-node
        filled.push((current_row, current_col)); // @step:close-node

        // Explore 4-directional neighbors (up, down, left, right)
        for (delta_row, delta_col) in &directions {
            let neighbor_row = current_row as i32 + delta_row;
            let neighbor_col = current_col as i32 + delta_col;
            if neighbor_row < 0
                || neighbor_row >= row_count as i32
                || neighbor_col < 0
                || neighbor_col >= col_count as i32
            {
                continue;
            }
            let neighbor_row = neighbor_row as usize;
            let neighbor_col = neighbor_col as usize;
            if grid[neighbor_row][neighbor_col].cell_type == CellType::Wall {
                continue;
            }
            if filled_set[neighbor_row][neighbor_col] {
                continue;
            }
            // Mark on push to avoid duplicates
            filled_set[neighbor_row][neighbor_col] = true; // @step:open-node
            stack.push((neighbor_row, neighbor_col)); // @step:open-node
        }
    }
    let count = filled.len();
    FloodFillResult { filled, count } // @step:complete
}
