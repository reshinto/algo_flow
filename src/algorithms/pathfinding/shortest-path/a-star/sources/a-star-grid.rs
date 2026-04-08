// A* Search — find shortest path using Manhattan distance heuristic

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

struct AStarResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
}

fn manhattan_distance(row_a: usize, col_a: usize, row_b: usize, col_b: usize) -> usize {
    let row_diff = if row_a > row_b { row_a - row_b } else { row_b - row_a };
    let col_diff = if col_a > col_b { col_a - col_b } else { col_b - col_a };
    row_diff + col_diff
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

fn a_star_grid(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> AStarResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut g_cost = vec![vec![usize::MAX; col_count]; row_count]; // @step:initialize
    g_cost[start.0][start.1] = 0; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut closed_set = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    // Priority queue ordered by fCost = gCost + hCost
    // Open list: (fCost, hCost, row, col)
    let start_h_cost = manhattan_distance(start.0, start.1, end.0, end.1);
    let mut open_set: Vec<(usize, usize, usize, usize)> =
        vec![(start_h_cost, start_h_cost, start.0, start.1)]; // @step:initialize,open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while !open_set.is_empty() {
        // Extract node with lowest fCost
        open_set.sort_by(|entry_a, entry_b| {
            entry_a.0.cmp(&entry_b.0).then(entry_a.1.cmp(&entry_b.1))
        }); // @step:close-node
        let (_, _, current_row, current_col) = open_set.remove(0); // @step:close-node
        if closed_set[current_row][current_col] { continue; } // @step:close-node
        closed_set[current_row][current_col] = true; // @step:close-node
        visited.push((current_row, current_col)); // @step:close-node

        // Check if we reached the end
        if current_row == end.0 && current_col == end.1 {
            // @step:trace-path
            return AStarResult { path: reconstruct_path(&parent, end), visited }; // @step:trace-path
        }

        // Explore 4-directional neighbors
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
            if closed_set[neighbor_row][neighbor_col] { continue; }

            let tentative_g_cost = g_cost[current_row][current_col].saturating_add(1); // @step:update-cost
            if tentative_g_cost < g_cost[neighbor_row][neighbor_col] {
                // @step:update-cost
                g_cost[neighbor_row][neighbor_col] = tentative_g_cost; // @step:update-cost
                parent[neighbor_row][neighbor_col] = Some((current_row, current_col));
                let neighbor_h_cost = manhattan_distance(neighbor_row, neighbor_col, end.0, end.1);
                let neighbor_f_cost = tentative_g_cost + neighbor_h_cost;
                open_set.push((neighbor_f_cost, neighbor_h_cost, neighbor_row, neighbor_col));
            }
        }
    }

    AStarResult { path: vec![], visited } // @step:complete
}
