// Dijkstra's Algorithm — find shortest path on a weighted grid

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

struct DijkstraResult {
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

fn dijkstra(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> DijkstraResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut distance = vec![vec![usize::MAX; col_count]; row_count]; // @step:initialize
    distance[start.0][start.1] = 0; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize
    // Seed the frontier with the start cell
    let mut open_set: Vec<(usize, usize, usize)> = vec![(0, start.0, start.1)]; // @step:initialize,open-node
    let mut visited_set = vec![vec![false; col_count]; row_count]; // @step:initialize,open-node
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    while !open_set.is_empty() {
        // Extract the node with the smallest tentative distance
        open_set.sort_by_key(|entry| entry.0); // @step:close-node
        let (_, current_row, current_col) = open_set.remove(0); // @step:close-node
        if visited_set[current_row][current_col] { continue; } // @step:close-node
        visited_set[current_row][current_col] = true; // @step:close-node
        visited.push((current_row, current_col)); // @step:close-node

        // Check if we reached the end — reconstruct path via parent pointers
        if current_row == end.0 && current_col == end.1 {
            // @step:trace-path
            return DijkstraResult { path: reconstruct_path(&parent, end), visited }; // @step:trace-path
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
            // Relax the edge: update distance if a shorter path is found
            let new_distance = distance[current_row][current_col].saturating_add(1); // @step:update-cost
            if new_distance < distance[neighbor_row][neighbor_col] {
                // @step:update-cost
                distance[neighbor_row][neighbor_col] = new_distance; // @step:update-cost
                parent[neighbor_row][neighbor_col] = Some((current_row, current_col));
                open_set.push((new_distance, neighbor_row, neighbor_col));
            }
        }
    }

    DijkstraResult { path: vec![], visited } // @step:complete
}
