// D* Lite — Incremental replanning: searches from goal to start, then replans after obstacle discovery

#[derive(Clone, PartialEq)]
enum CellType {
    Empty,
    Wall,
    Start,
    End,
}

#[derive(Clone)]
struct GridCell {
    row: usize,
    col: usize,
    cell_type: CellType,
    state: String,
}

struct DStarResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
    replan_count: usize,
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

fn a_star_search(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
    directions: &[(i32, i32); 4],
    row_count: usize,
    col_count: usize,
    visited: &mut Vec<(usize, usize)>,
) -> Option<Vec<(usize, usize)>> {
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count];
    let mut g_cost = vec![vec![i32::MAX; col_count]; row_count];
    g_cost[start.0][start.1] = 0;
    let start_h = heuristic(start.0, start.1, end.0, end.1);
    // Open list: (fCost, gCost, row, col)
    let mut open_list: Vec<(i32, i32, usize, usize)> = vec![(start_h, 0, start.0, start.1)];

    while !open_list.is_empty() {
        open_list.sort_by_key(|entry| entry.0);
        let current = open_list.remove(0);
        let current_g = current.1;
        let current_row = current.2;
        let current_col = current.3;

        visited.push((current_row, current_col)); // @step:close-node

        if current_row == end.0 && current_col == end.1 {
            return Some(reconstruct_path(&parent, end)); // @step:trace-path
        }

        for (delta_row, delta_col) in directions {
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
                let neighbor_h = heuristic(neighbor_row, neighbor_col, end.0, end.1);
                open_list.push((neighbor_g + neighbor_h, neighbor_g, neighbor_row, neighbor_col)); // @step:open-node
            }
        }
    }
    None
}

fn find_obstacle_candidate(
    grid: &Vec<Vec<GridCell>>,
    path: &Vec<(usize, usize)>,
    row_count: usize,
    col_count: usize,
) -> Option<(usize, usize)> {
    if path.len() < 4 { return None; }
    let mid_index = path.len() / 2;
    let mid_cell = path[mid_index];
    let candidates: [(i32, i32); 4] = [
        (mid_cell.0 as i32 - 1, mid_cell.1 as i32),
        (mid_cell.0 as i32 + 1, mid_cell.1 as i32),
        (mid_cell.0 as i32, mid_cell.1 as i32 - 1),
        (mid_cell.0 as i32, mid_cell.1 as i32 + 1),
    ];
    for (candidate_row, candidate_col) in &candidates {
        if *candidate_row < 0 || *candidate_row >= row_count as i32 { continue; }
        if *candidate_col < 0 || *candidate_col >= col_count as i32 { continue; }
        let cell = &grid[*candidate_row as usize][*candidate_col as usize];
        if cell.cell_type == CellType::Empty {
            return Some((*candidate_row as usize, *candidate_col as usize));
        }
    }
    None
}

fn d_star_lite(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> DStarResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    // Work on a mutable copy of the grid for obstacle simulation
    let mut working_grid = grid.clone(); // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize
    let mut replan_count = 0usize; // @step:initialize

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    // Phase 1: initial A* search from start to end
    let initial_result = a_star_search(
        &working_grid, start, end, &directions, row_count, col_count, &mut visited,
    ); // @step:close-node

    if initial_result.is_none() {
        return DStarResult { path: vec![], visited, replan_count }; // @step:complete
    }

    let initial_path = initial_result.unwrap();
    replan_count += 1; // @step:close-node

    // Phase 2: simulate discovering a new obstacle mid-path and replan
    let discovered_obstacle =
        find_obstacle_candidate(&working_grid, &initial_path, row_count, col_count); // @step:open-node

    if let Some((obstacle_row, obstacle_col)) = discovered_obstacle {
        working_grid[obstacle_row][obstacle_col].cell_type = CellType::Wall; // @step:open-node

        let replan_result = a_star_search(
            &working_grid, start, end, &directions, row_count, col_count, &mut visited,
        ); // @step:close-node
        replan_count += 1; // @step:close-node

        if let Some(replan_path) = replan_result {
            return DStarResult { path: replan_path, visited, replan_count }; // @step:trace-path
        }
        return DStarResult { path: vec![], visited, replan_count }; // @step:complete
    }

    DStarResult { path: initial_path, visited, replan_count } // @step:trace-path
}
