// DFS Exploration — explore all reachable cells using iterative depth-first search with a stack

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

struct DfsExplorationResult {
    visited: Vec<(usize, usize)>,
    max_depth: usize,
}

fn dfs_exploration(grid: &Vec<Vec<GridCell>>, start: (usize, usize)) -> DfsExplorationResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut visited_set = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    // Stack stores (row, col, depth) tuples for iterative DFS
    let mut stack: Vec<(usize, usize, usize)> = Vec::new(); // @step:initialize,open-node
    stack.push((start.0, start.1, 0)); // @step:initialize,open-node
    visited_set[start.0][start.1] = true; // @step:open-node
    let mut max_depth = 0usize; // @step:initialize

    // Directions in reverse order for natural DFS snaking
    let directions: [(i32, i32); 4] = [(0, 1), (0, -1), (1, 0), (-1, 0)];

    while let Some(current) = stack.pop() {
        // Pop from top of stack — DFS always expands the deepest unvisited cell
        let (current_row, current_col, current_depth) = current; // @step:close-node
        visited.push((current_row, current_col)); // @step:close-node
        if current_depth > max_depth {
            max_depth = current_depth; // @step:close-node
        }

        // Explore 4-directional neighbors in reverse order for natural DFS snaking
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
            if visited_set[neighbor_row][neighbor_col] {
                continue;
            }
            visited_set[neighbor_row][neighbor_col] = true; // @step:open-node
            stack.push((neighbor_row, neighbor_col, current_depth + 1)); // @step:open-node
        }
    }

    DfsExplorationResult { visited, max_depth } // @step:complete
}
