// Jump Point Search — A* optimization that "jumps" over intermediate nodes in uniform-cost grids

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

struct JpsResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
    jump_points: Vec<(usize, usize)>,
}

fn heuristic(row_a: usize, col_a: usize, row_b: usize, col_b: usize) -> i32 {
    ((row_a as i32 - row_b as i32).abs() + (col_a as i32 - col_b as i32).abs())
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

fn has_forced(
    grid: &Vec<Vec<GridCell>>,
    row: i32, col: i32,
    delta_row: i32, delta_col: i32,
    row_count: i32, col_count: i32,
) -> bool {
    if delta_row != 0 && delta_col == 0 {
        let prev_row = row - delta_row;
        let left_blocked = col - 1 >= 0 && prev_row >= 0 && prev_row < row_count
            && grid[prev_row as usize][(col - 1) as usize].cell_type == CellType::Wall;
        let right_blocked = col + 1 < col_count && prev_row >= 0 && prev_row < row_count
            && grid[prev_row as usize][(col + 1) as usize].cell_type == CellType::Wall;
        let left_open = col - 1 >= 0 && grid[row as usize][(col - 1) as usize].cell_type != CellType::Wall;
        let right_open = col + 1 < col_count && grid[row as usize][(col + 1) as usize].cell_type != CellType::Wall;
        return (left_blocked && left_open) || (right_blocked && right_open);
    }
    if delta_col != 0 && delta_row == 0 {
        let prev_col = col - delta_col;
        let up_blocked = row - 1 >= 0 && prev_col >= 0 && prev_col < col_count
            && grid[(row - 1) as usize][prev_col as usize].cell_type == CellType::Wall;
        let down_blocked = row + 1 < row_count && prev_col >= 0 && prev_col < col_count
            && grid[(row + 1) as usize][prev_col as usize].cell_type == CellType::Wall;
        let up_open = row - 1 >= 0 && grid[(row - 1) as usize][col as usize].cell_type != CellType::Wall;
        let down_open = row + 1 < row_count && grid[(row + 1) as usize][col as usize].cell_type != CellType::Wall;
        return (up_blocked && up_open) || (down_blocked && down_open);
    }
    false
}

fn jump(
    grid: &Vec<Vec<GridCell>>,
    row: i32, col: i32,
    delta_row: i32, delta_col: i32,
    end: (usize, usize),
    row_count: i32, col_count: i32,
) -> Option<(usize, usize)> {
    let mut current_row = row + delta_row;
    let mut current_col = col + delta_col;

    loop {
        if current_row < 0 || current_row >= row_count || current_col < 0 || current_col >= col_count {
            return None;
        }
        if grid[current_row as usize][current_col as usize].cell_type == CellType::Wall {
            return None;
        }
        if current_row as usize == end.0 && current_col as usize == end.1 {
            return Some((current_row as usize, current_col as usize));
        }
        if has_forced(grid, current_row, current_col, delta_row, delta_col, row_count, col_count) {
            return Some((current_row as usize, current_col as usize));
        }
        if delta_row != 0 && current_row as usize == end.0 {
            return Some((current_row as usize, current_col as usize));
        }
        if delta_col != 0 && current_col as usize == end.1 {
            return Some((current_row as usize, current_col as usize));
        }
        current_row += delta_row;
        current_col += delta_col;
    }
}

fn jump_point_search(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> JpsResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut g_cost = vec![vec![i32::MAX; col_count]; row_count]; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize
    let mut jump_points: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    g_cost[start.0][start.1] = 0; // @step:initialize
    let start_h = heuristic(start.0, start.1, end.0, end.1);
    // Open list: (fCost, gCost, row, col)
    let mut open_list: Vec<(i32, i32, usize, usize)> = vec![(start_h, 0, start.0, start.1)]; // @step:initialize,open-node
    let mut in_open_set = vec![vec![false; col_count]; row_count]; // @step:initialize,open-node
    in_open_set[start.0][start.1] = true; // @step:open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    let row_count_i = row_count as i32;
    let col_count_i = col_count as i32;

    while !open_list.is_empty() {
        open_list.sort_by_key(|entry| entry.0);
        let current = open_list.remove(0); // @step:close-node
        let current_row = current.2; // @step:close-node
        let current_col = current.3; // @step:close-node
        let current_g = current.1; // @step:close-node

        visited.push((current_row, current_col)); // @step:close-node

        if current_row == end.0 && current_col == end.1 {
            // @step:trace-path
            return JpsResult { path: reconstruct_path(&parent, end), visited, jump_points }; // @step:trace-path
        }

        // Try jumping in each cardinal direction from the current node
        for (delta_row, delta_col) in &directions {
            if let Some(jump_target) = jump(
                grid, current_row as i32, current_col as i32, *delta_row, *delta_col,
                end, row_count_i, col_count_i,
            ) {
                let (jump_row, jump_col) = jump_target;

                // Mark intermediate nodes along the jump as jump points
                let mut scan_row = current_row as i32 + delta_row;
                let mut scan_col = current_col as i32 + delta_col;
                while scan_row as usize != jump_row || scan_col as usize != jump_col {
                    if has_forced(grid, scan_row, scan_col, *delta_row, *delta_col, row_count_i, col_count_i) {
                        jump_points.push((scan_row as usize, scan_col as usize)); // @step:visit
                    }
                    scan_row += delta_row;
                    scan_col += delta_col;
                }

                let neighbor_g = current_g + heuristic(current_row, current_col, jump_row, jump_col);
                if neighbor_g < g_cost[jump_row][jump_col] {
                    g_cost[jump_row][jump_col] = neighbor_g; // @step:open-node
                    parent[jump_row][jump_col] = Some((current_row, current_col)); // @step:open-node
                    let jump_h = heuristic(jump_row, jump_col, end.0, end.1);
                    let jump_f = neighbor_g + jump_h;
                    in_open_set[jump_row][jump_col] = true;
                    open_list.push((jump_f, neighbor_g, jump_row, jump_col)); // @step:open-node
                }
            }
        }
    }

    JpsResult { path: vec![], visited, jump_points } // @step:complete
}
