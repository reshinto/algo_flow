// Lee Algorithm — BFS wavefront shortest path with distance numbering
use std::collections::VecDeque;

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

struct LeeResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
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

fn lee_algorithm(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> LeeResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    // Wave number map: each cell gets the wavefront distance from start
    let sentinel: i64 = -1;
    let mut wave_map = vec![vec![sentinel; col_count]; row_count]; // @step:initialize
    wave_map[start.0][start.1] = 0; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize

    // Phase 1: BFS wavefront expansion — label each reachable cell with its wave number
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new(); // @step:initialize,open-node
    queue.push_back(start);
    let mut visited: Vec<(usize, usize)> = Vec::new();

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while !queue.is_empty() {
        let (current_row, current_col) = queue.pop_front().unwrap(); // @step:close-node
        visited.push((current_row, current_col)); // @step:close-node
        let current_wave = wave_map[current_row][current_col]; // @step:close-node

        // Check if we reached the end — begin backtracking
        if current_row == end.0 && current_col == end.1 { break; } // @step:update-cost

        // Expand wavefront to 4-directional neighbors
        for (delta_row, delta_col) in &directions {
            let neighbor_row = current_row as i32 + delta_row;
            let neighbor_col = current_col as i32 + delta_col;
            if neighbor_row < 0 || neighbor_row >= row_count as i32
                || neighbor_col < 0 || neighbor_col >= col_count as i32
            {
                continue;
            }
            let neighbor_row = neighbor_row as usize;
            let neighbor_col = neighbor_col as usize;
            if grid[neighbor_row][neighbor_col].cell_type == CellType::Wall { continue; }
            if wave_map[neighbor_row][neighbor_col] != sentinel { continue; }
            // Stamp the neighbor with the next wave number
            wave_map[neighbor_row][neighbor_col] = current_wave + 1; // @step:update-cost
            parent[neighbor_row][neighbor_col] = Some((current_row, current_col));
            queue.push_back((neighbor_row, neighbor_col)); // @step:open-node
        }
    }

    if wave_map[end.0][end.1] == sentinel {
        return LeeResult { path: vec![], visited }; // @step:complete
    }

    // Phase 2: Backtrack from end using parent pointers
    let path = reconstruct_path(&parent, end); // @step:trace-path
    LeeResult { path, visited } // @step:trace-path
}
