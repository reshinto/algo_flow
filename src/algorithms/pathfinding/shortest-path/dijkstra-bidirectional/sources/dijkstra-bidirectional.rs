// Dijkstra Bidirectional — two simultaneous Dijkstra searches meeting in the middle

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

struct BidirectionalResult {
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

fn reconstruct_reverse_path(
    reverse_parent: &Vec<Vec<Option<(usize, usize)>>>,
    meeting_point: (usize, usize),
) -> Vec<(usize, usize)> {
    let mut path = Vec::new();
    let mut current = Some(meeting_point);
    while let Some(node) = current {
        path.push(node);
        current = reverse_parent[node.0][node.1];
    }
    path
}

fn dijkstra_bidirectional(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> BidirectionalResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize

    // Forward search from start
    let mut forward_distance = vec![vec![usize::MAX; col_count]; row_count]; // @step:initialize
    forward_distance[start.0][start.1] = 0; // @step:initialize
    let mut forward_parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut forward_visited = vec![vec![false; col_count]; row_count]; // @step:initialize

    // Reverse search from end
    let mut reverse_distance = vec![vec![usize::MAX; col_count]; row_count]; // @step:initialize
    reverse_distance[end.0][end.1] = 0; // @step:initialize
    let mut reverse_parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    let mut reverse_visited = vec![vec![false; col_count]; row_count]; // @step:initialize

    // (dist, row, col)
    let mut forward_queue: Vec<(usize, usize, usize)> = vec![(0, start.0, start.1)]; // @step:initialize,open-node
    let mut reverse_queue: Vec<(usize, usize, usize)> = vec![(0, end.0, end.1)]; // @step:initialize,open-node

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    let mut all_visited: Vec<(usize, usize)> = Vec::new();
    let mut best_cost = usize::MAX;
    let mut meeting_point: Option<(usize, usize)> = None;

    while !forward_queue.is_empty() || !reverse_queue.is_empty() {
        // Alternate between forward and reverse searches
        if !forward_queue.is_empty() {
            forward_queue.sort_by_key(|entry| entry.0); // @step:close-node
            let (_, current_row, current_col) = forward_queue.remove(0); // @step:close-node
            if !forward_visited[current_row][current_col] {
                forward_visited[current_row][current_col] = true; // @step:close-node
                all_visited.push((current_row, current_col)); // @step:close-node

                // Check if this cell has been visited by reverse search
                if reverse_visited[current_row][current_col] {
                    let fwd = forward_distance[current_row][current_col];
                    let rev = reverse_distance[current_row][current_col];
                    let total_cost = fwd.saturating_add(rev);
                    if total_cost < best_cost {
                        best_cost = total_cost;
                        meeting_point = Some((current_row, current_col));
                    }
                }

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
                    if forward_visited[neighbor_row][neighbor_col] { continue; }
                    let new_dist = forward_distance[current_row][current_col].saturating_add(1);
                    if new_dist < forward_distance[neighbor_row][neighbor_col] {
                        forward_distance[neighbor_row][neighbor_col] = new_dist; // @step:open-node
                        forward_parent[neighbor_row][neighbor_col] = Some((current_row, current_col));
                        forward_queue.push((new_dist, neighbor_row, neighbor_col));
                    }
                }
            }
        }

        if !reverse_queue.is_empty() {
            reverse_queue.sort_by_key(|entry| entry.0); // @step:close-node
            let (_, current_row, current_col) = reverse_queue.remove(0); // @step:close-node
            if !reverse_visited[current_row][current_col] {
                reverse_visited[current_row][current_col] = true; // @step:close-node
                all_visited.push((current_row, current_col)); // @step:close-node

                // Check if this cell has been visited by forward search
                if forward_visited[current_row][current_col] {
                    let fwd = forward_distance[current_row][current_col];
                    let rev = reverse_distance[current_row][current_col];
                    let total_cost = fwd.saturating_add(rev);
                    if total_cost < best_cost {
                        best_cost = total_cost;
                        meeting_point = Some((current_row, current_col));
                    }
                }

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
                    if reverse_visited[neighbor_row][neighbor_col] { continue; }
                    let new_dist = reverse_distance[current_row][current_col].saturating_add(1);
                    if new_dist < reverse_distance[neighbor_row][neighbor_col] {
                        reverse_distance[neighbor_row][neighbor_col] = new_dist; // @step:open-node
                        reverse_parent[neighbor_row][neighbor_col] = Some((current_row, current_col));
                        reverse_queue.push((new_dist, neighbor_row, neighbor_col));
                    }
                }
            }
        }

        // Early termination when meeting point is found and queues can't improve it
        if let Some(_) = meeting_point {
            let forward_min = forward_queue.iter().map(|e| e.0).min().unwrap_or(usize::MAX);
            let reverse_min = reverse_queue.iter().map(|e| e.0).min().unwrap_or(usize::MAX);
            if forward_min.saturating_add(reverse_min) >= best_cost { break; }
        }
    }

    let Some(meet) = meeting_point else {
        return BidirectionalResult { path: vec![], visited: all_visited }; // @step:complete
    };

    // Reconstruct path: forward half + reverse half
    let forward_path = reconstruct_path(&forward_parent, meet); // @step:trace-path
    let reverse_path = reconstruct_reverse_path(&reverse_parent, meet); // @step:trace-path
    let mut path = forward_path;
    path.extend_from_slice(&reverse_path[1..]); // @step:trace-path
    BidirectionalResult { path, visited: all_visited } // @step:trace-path
}
