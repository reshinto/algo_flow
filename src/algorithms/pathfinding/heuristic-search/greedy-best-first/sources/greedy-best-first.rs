// Greedy Best-First Search — navigate a grid using only the heuristic h(n) = Manhattan distance

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

struct GreedyResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
}

fn manhattan_distance(point_a: (usize, usize), point_b: (usize, usize)) -> i32 {
    ((point_a.0 as i32 - point_b.0 as i32).abs() + (point_a.1 as i32 - point_b.1 as i32).abs())
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

fn greedy_best_first(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> GreedyResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    // Priority queue entries: (hCost, row, col)
    let mut open_list: Vec<(i32, usize, usize)> =
        vec![(manhattan_distance(start, end), start.0, start.1)]; // @step:initialize,open-node
    let mut in_open_set = vec![vec![false; col_count]; row_count]; // @step:initialize,open-node
    let mut closed_set = vec![vec![false; col_count]; row_count]; // @step:initialize
    in_open_set[start.0][start.1] = true; // @step:open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while !open_list.is_empty() {
        // Dequeue node with lowest hCost (greedy: ignore g-cost entirely)
        open_list.sort_by_key(|entry| entry.0); // @step:close-node
        let current = open_list.remove(0); // @step:close-node
        let current_row = current.1; // @step:close-node
        let current_col = current.2; // @step:close-node

        closed_set[current_row][current_col] = true; // @step:close-node
        visited.push((current_row, current_col)); // @step:close-node

        // Check if goal reached
        if current_row == end.0 && current_col == end.1 {
            // @step:trace-path
            return GreedyResult { path: reconstruct_path(&parent, end), visited }; // @step:trace-path
        }

        // Expand neighbors sorted by heuristic only
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
            if in_open_set[neighbor_row][neighbor_col] { continue; }

            // Greedy: use only heuristic, g-cost is always treated as 0
            let h_cost = manhattan_distance((neighbor_row, neighbor_col), end); // @step:open-node
            in_open_set[neighbor_row][neighbor_col] = true; // @step:open-node
            parent[neighbor_row][neighbor_col] = Some((current_row, current_col)); // @step:open-node
            open_list.push((h_cost, neighbor_row, neighbor_col)); // @step:open-node
        }
    }

    GreedyResult { path: vec![], visited } // @step:complete
}
