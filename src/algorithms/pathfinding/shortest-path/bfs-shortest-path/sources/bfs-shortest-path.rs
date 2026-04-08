// BFS Shortest Path — find shortest path on an unweighted grid using breadth-first search
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

struct BfsResult {
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

fn bfs_shortest_path(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> BfsResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize
    // Seed the queue with the start cell
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new(); // @step:initialize,open-node
    queue.push_back(start);
    let mut visited_set = vec![vec![false; col_count]; row_count]; // @step:initialize,open-node
    visited_set[start.0][start.1] = true; // @step:open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while !queue.is_empty() {
        // Dequeue the front cell — BFS explores level by level
        let (current_row, current_col) = queue.pop_front().unwrap(); // @step:close-node
        visited.push((current_row, current_col)); // @step:close-node

        // Check if we reached the end
        if current_row == end.0 && current_col == end.1 {
            // @step:trace-path
            return BfsResult { path: reconstruct_path(&parent, end), visited }; // @step:trace-path
        }

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
            if grid[neighbor_row][neighbor_col].cell_type == CellType::Wall { continue; }
            if visited_set[neighbor_row][neighbor_col] { continue; }
            // Mark visited immediately on enqueue to avoid duplicates
            visited_set[neighbor_row][neighbor_col] = true; // @step:open-node
            parent[neighbor_row][neighbor_col] = Some((current_row, current_col)); // @step:open-node
            queue.push_back((neighbor_row, neighbor_col)); // @step:open-node
        }
    }

    BfsResult { path: vec![], visited } // @step:complete
}
