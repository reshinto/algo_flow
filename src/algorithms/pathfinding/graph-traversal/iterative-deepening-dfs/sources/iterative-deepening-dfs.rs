// Iterative Deepening DFS — DFS with increasing depth limits, combining BFS optimality with DFS memory efficiency

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

struct IddfsResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
    depth_reached: usize,
}

fn iterative_deepening_dfs(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> IddfsResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut all_visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    // Increase depth limit one step at a time until target is reached
    for depth_limit in 0..=(row_count * col_count) {
        // @step:initialize
        let mut path_set: std::collections::HashSet<(usize, usize)> = std::collections::HashSet::new(); // @step:open-node
        let result = depth_limited_search(
            grid,
            start,
            end,
            depth_limit,
            &mut path_set,
            &mut all_visited,
            row_count,
            col_count,
        ); // @step:close-node

        if let Some(path) = result {
            return IddfsResult { path, visited: all_visited, depth_reached: depth_limit }; // @step:trace-path
        }
    }

    IddfsResult { path: vec![], visited: all_visited, depth_reached: 0 } // @step:complete
}

fn depth_limited_search(
    grid: &Vec<Vec<GridCell>>,
    current: (usize, usize),
    end: (usize, usize),
    depth_remaining: usize,
    path_set: &mut std::collections::HashSet<(usize, usize)>,
    all_visited: &mut Vec<(usize, usize)>,
    row_count: usize,
    col_count: usize,
) -> Option<Vec<(usize, usize)>> {
    let (current_row, current_col) = current;
    all_visited.push((current_row, current_col));

    if current_row == end.0 && current_col == end.1 {
        return Some(vec![(current_row, current_col)]);
    }

    if depth_remaining == 0 {
        return None;
    }

    path_set.insert((current_row, current_col));

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
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
        if path_set.contains(&(neighbor_row, neighbor_col)) {
            continue;
        }

        if let Some(mut sub_result) = depth_limited_search(
            grid,
            (neighbor_row, neighbor_col),
            end,
            depth_remaining - 1,
            path_set,
            all_visited,
            row_count,
            col_count,
        ) {
            sub_result.insert(0, (current_row, current_col));
            path_set.remove(&(current_row, current_col));
            return Some(sub_result);
        }
    }

    path_set.remove(&(current_row, current_col));
    None
}
