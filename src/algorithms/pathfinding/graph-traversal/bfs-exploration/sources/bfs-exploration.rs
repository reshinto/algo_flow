// BFS Exploration — explore all reachable cells layer-by-layer using breadth-first search
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

struct BfsExplorationResult {
    visited: Vec<(usize, usize)>,
    layers: usize,
}

fn bfs_exploration(grid: &Vec<Vec<GridCell>>, start: (usize, usize)) -> BfsExplorationResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut visited_set = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    // Seed the queue with the start cell and mark layer boundaries
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new(); // @step:initialize,open-node
    queue.push_back(start); // @step:initialize,open-node
    visited_set[start.0][start.1] = true; // @step:open-node
    let mut layer_count = 0usize; // @step:initialize

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while !queue.is_empty() {
        // Process the entire current layer before advancing depth
        let layer_size = queue.len(); // @step:close-node
        layer_count += 1; // @step:close-node

        for _ in 0..layer_size {
            let current = queue.pop_front().unwrap(); // @step:close-node
            let (current_row, current_col) = current; // @step:close-node
            visited.push((current_row, current_col)); // @step:close-node

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
                if grid[neighbor_row][neighbor_col].cell_type == CellType::Wall {
                    continue;
                }
                if visited_set[neighbor_row][neighbor_col] {
                    continue;
                }
                visited_set[neighbor_row][neighbor_col] = true; // @step:open-node
                queue.push_back((neighbor_row, neighbor_col)); // @step:open-node
            }
        }
    }

    BfsExplorationResult { visited, layers: layer_count } // @step:complete
}
