// Best-First Tie Breaking — A* with cross-product tie-breaking for aesthetically straight paths

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

struct TieBreakingResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
}

fn heuristic(row_a: i32, col_a: i32, row_b: i32, col_b: i32) -> i32 {
    (row_a - row_b).abs() + (col_a - col_b).abs()
}

fn cross_product(
    start_row: i32, start_col: i32,
    node_row: i32, node_col: i32,
    end_row: i32, end_col: i32,
) -> i32 {
    let delta_row1 = node_row - start_row;
    let delta_col1 = node_col - start_col;
    let delta_row2 = end_row - start_row;
    let delta_col2 = end_col - start_col;
    (delta_row1 * delta_col2 - delta_row2 * delta_col1).abs()
}

fn reconstruct_path(
    parent: &Vec<Vec<Option<(usize, usize)>>>,
    end: (usize, usize),
) -> Vec<(usize, usize)> {
    let mut path = Vec::new();
    let mut current = Some(end);
    while let Some(node) = current {
        path.insert(0, node);
        current = parent[node.0][node.1];
    }
    path
}

fn best_first_tie_breaking(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> TieBreakingResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut g_cost = vec![vec![i32::MAX; col_count]; row_count]; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    g_cost[start.0][start.1] = 0; // @step:initialize
    let start_h = heuristic(start.0 as i32, start.1 as i32, end.0 as i32, end.1 as i32);
    let start_tie = cross_product(
        start.0 as i32, start.1 as i32, start.0 as i32, start.1 as i32, end.0 as i32, end.1 as i32,
    );
    // Open list: (fCost, hCost, tieBreaker, gCost, row, col)
    let mut open_list: Vec<(i32, i32, i32, i32, usize, usize)> =
        vec![(start_h, start_h, start_tie, 0, start.0, start.1)]; // @step:initialize,open-node
    let mut in_open_set = vec![vec![false; col_count]; row_count]; // @step:initialize,open-node
    in_open_set[start.0][start.1] = true; // @step:open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while !open_list.is_empty() {
        // Sort by: fCost, then hCost, then cross-product tie breaker
        open_list.sort_by(|first, second| {
            first.0.cmp(&second.0).then(first.1.cmp(&second.1)).then(first.2.cmp(&second.2))
        });

        let current = open_list.remove(0); // @step:close-node
        let current_row = current.4; // @step:close-node
        let current_col = current.5; // @step:close-node
        let current_g = current.3; // @step:close-node

        visited.push((current_row, current_col)); // @step:close-node
        in_open_set[current_row][current_col] = false; // @step:close-node

        if current_row == end.0 && current_col == end.1 {
            // @step:trace-path
            return TieBreakingResult { path: reconstruct_path(&parent, end), visited }; // @step:trace-path
        }

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
            if grid[neighbor_row][neighbor_col].cell_type == CellType::Wall { continue; }

            let neighbor_g = current_g + 1;
            if neighbor_g < g_cost[neighbor_row][neighbor_col] {
                g_cost[neighbor_row][neighbor_col] = neighbor_g; // @step:open-node
                parent[neighbor_row][neighbor_col] = Some((current_row, current_col)); // @step:open-node
                let neighbor_h = heuristic(neighbor_row as i32, neighbor_col as i32, end.0 as i32, end.1 as i32);
                let neighbor_f = neighbor_g + neighbor_h;
                // Cross-product tie-breaking: prefer nodes on the straight line from start to end
                let tie_breaker = cross_product(
                    start.0 as i32, start.1 as i32,
                    neighbor_row as i32, neighbor_col as i32,
                    end.0 as i32, end.1 as i32,
                ); // @step:open-node
                in_open_set[neighbor_row][neighbor_col] = true;
                open_list.push((neighbor_f, neighbor_h, tie_breaker, neighbor_g, neighbor_row, neighbor_col)); // @step:open-node
            }
        }
    }

    TieBreakingResult { path: vec![], visited } // @step:complete
}
