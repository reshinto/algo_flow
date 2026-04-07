// Weighted A* — A* with inflated heuristic: f(n) = g(n) + weight * h(n). Trades optimality for speed.

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

struct WeightedAStarResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
    weight: f64,
}

fn heuristic(row_a: usize, col_a: usize, row_b: usize, col_b: usize) -> f64 {
    ((row_a as i32 - row_b as i32).abs() + (col_a as i32 - col_b as i32).abs()) as f64
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

fn weighted_a_star(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
    weight: f64,
) -> WeightedAStarResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut g_cost = vec![vec![f64::INFINITY; col_count]; row_count]; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    g_cost[start.0][start.1] = 0.0; // @step:initialize
    let start_h = heuristic(start.0, start.1, end.0, end.1);
    let start_f = 0.0 + weight * start_h;
    // Open list: (fCost, gCost, row, col) as ordered floats * 1000 for sorting
    let mut open_list: Vec<(i64, i64, usize, usize)> =
        vec![((start_f * 1000.0) as i64, 0, start.0, start.1)]; // @step:initialize,open-node
    let mut in_open_set = vec![vec![false; col_count]; row_count]; // @step:initialize,open-node
    in_open_set[start.0][start.1] = true; // @step:open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while !open_list.is_empty() {
        open_list.sort_by_key(|entry| entry.0);
        let current = open_list.remove(0); // @step:close-node
        let current_row = current.2; // @step:close-node
        let current_col = current.3; // @step:close-node
        let current_g = current.1 as f64 / 1000.0; // @step:close-node

        visited.push((current_row, current_col)); // @step:close-node
        in_open_set[current_row][current_col] = false; // @step:close-node

        if current_row == end.0 && current_col == end.1 {
            // @step:trace-path
            return WeightedAStarResult { path: reconstruct_path(&parent, end), visited, weight }; // @step:trace-path
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

            let neighbor_g = current_g + 1.0;
            if neighbor_g < g_cost[neighbor_row][neighbor_col] {
                g_cost[neighbor_row][neighbor_col] = neighbor_g; // @step:open-node
                parent[neighbor_row][neighbor_col] = Some((current_row, current_col)); // @step:open-node
                let neighbor_h = heuristic(neighbor_row, neighbor_col, end.0, end.1);
                // Weighted heuristic: inflating h by weight encourages greedy behavior
                let neighbor_f = neighbor_g + weight * neighbor_h; // @step:open-node
                in_open_set[neighbor_row][neighbor_col] = true;
                open_list.push(((neighbor_f * 1000.0) as i64, (neighbor_g * 1000.0) as i64, neighbor_row, neighbor_col)); // @step:open-node
            }
        }
    }

    WeightedAStarResult { path: vec![], visited, weight } // @step:complete
}
