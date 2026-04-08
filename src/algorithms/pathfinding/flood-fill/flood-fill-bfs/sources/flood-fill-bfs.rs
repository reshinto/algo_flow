// Flood Fill BFS — classic paint bucket fill using breadth-first search
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

struct FloodFillResult {
    filled: Vec<(usize, usize)>,
    count: usize,
}

fn flood_fill_bfs(grid: &Vec<Vec<GridCell>>, start: (usize, usize)) -> FloodFillResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut filled_set = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut filled: Vec<(usize, usize)> = Vec::new(); // @step:initialize
    // Seed the queue with the start cell
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new(); // @step:initialize,open-node
    queue.push_back(start); // @step:initialize,open-node
    filled_set[start.0][start.1] = true; // @step:open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while let Some(current) = queue.pop_front() {
        // Dequeue the front cell — BFS processes cells level by level
        let (current_row, current_col) = current; // @step:close-node
        filled.push((current_row, current_col)); // @step:close-node

        // Explore 4-directional neighbors (up, down, left, right)
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
            if filled_set[neighbor_row][neighbor_col] {
                continue;
            }
            // Mark on enqueue to avoid duplicates
            filled_set[neighbor_row][neighbor_col] = true; // @step:open-node
            queue.push_back((neighbor_row, neighbor_col)); // @step:open-node
        }
    }
    let count = filled.len();
    FloodFillResult { filled, count } // @step:complete
}
