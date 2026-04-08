// Bidirectional BFS — BFS from start and end simultaneously, meeting in the middle
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

struct BidirectionalBfsResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
}

fn bidirectional_bfs_grid(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> BidirectionalBfsResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize

    if start == end {
        return BidirectionalBfsResult { path: vec![start], visited: vec![start] }; // @step:complete
    }

    // Separate parent maps for forward and backward searches
    let mut forward_parent: Vec<Vec<Option<(usize, usize)>>> =
        vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut backward_parent: Vec<Vec<Option<(usize, usize)>>> =
        vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut forward_visited = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut backward_visited = vec![vec![false; col_count]; row_count]; // @step:initialize

    let mut forward_queue: VecDeque<(usize, usize)> = VecDeque::new(); // @step:initialize,open-node
    let mut backward_queue: VecDeque<(usize, usize)> = VecDeque::new(); // @step:initialize,open-node
    forward_queue.push_back(start); // @step:initialize,open-node
    backward_queue.push_back(end); // @step:initialize,open-node
    forward_visited[start.0][start.1] = true; // @step:open-node
    backward_visited[end.0][end.1] = true; // @step:open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    let mut all_visited: Vec<(usize, usize)> = Vec::new();

    while !forward_queue.is_empty() || !backward_queue.is_empty() {
        // Expand forward frontier one step
        if let Some(current) = forward_queue.pop_front() {
            let (current_row, current_col) = current; // @step:close-node
            all_visited.push((current_row, current_col)); // @step:close-node

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
                if forward_visited[neighbor_row][neighbor_col] { continue; }
                forward_visited[neighbor_row][neighbor_col] = true; // @step:open-node
                forward_parent[neighbor_row][neighbor_col] = Some((current_row, current_col)); // @step:open-node
                forward_queue.push_back((neighbor_row, neighbor_col)); // @step:open-node

                // Meeting point detected
                if backward_visited[neighbor_row][neighbor_col] {
                    let path = build_path(
                        &forward_parent,
                        &backward_parent,
                        (neighbor_row, neighbor_col),
                    );
                    return BidirectionalBfsResult { path, visited: all_visited }; // @step:trace-path
                }
            }
        }

        // Expand backward frontier one step
        if let Some(current) = backward_queue.pop_front() {
            let (current_row, current_col) = current; // @step:close-node
            all_visited.push((current_row, current_col)); // @step:close-node

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
                if backward_visited[neighbor_row][neighbor_col] { continue; }
                backward_visited[neighbor_row][neighbor_col] = true; // @step:open-node
                backward_parent[neighbor_row][neighbor_col] = Some((current_row, current_col)); // @step:open-node
                backward_queue.push_back((neighbor_row, neighbor_col)); // @step:open-node

                // Meeting point detected
                if forward_visited[neighbor_row][neighbor_col] {
                    let path = build_path(
                        &forward_parent,
                        &backward_parent,
                        (neighbor_row, neighbor_col),
                    );
                    return BidirectionalBfsResult { path, visited: all_visited }; // @step:trace-path
                }
            }
        }
    }

    BidirectionalBfsResult { path: vec![], visited: all_visited } // @step:complete
}

fn build_path(
    forward_parent: &Vec<Vec<Option<(usize, usize)>>>,
    backward_parent: &Vec<Vec<Option<(usize, usize)>>>,
    meeting_point: (usize, usize),
) -> Vec<(usize, usize)> {
    // Build forward path: start → meeting point
    let mut forward_path: Vec<(usize, usize)> = Vec::new();
    let mut current = Some(meeting_point);
    while let Some(node) = current {
        forward_path.insert(0, node);
        current = forward_parent[node.0][node.1];
    }

    // Build backward path: meeting point → end
    let mut backward_path: Vec<(usize, usize)> = Vec::new();
    let mut current = backward_parent[meeting_point.0][meeting_point.1];
    while let Some(node) = current {
        backward_path.push(node);
        current = backward_parent[node.0][node.1];
    }

    forward_path.extend(backward_path);
    forward_path
}
