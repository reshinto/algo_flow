// Bellman-Ford Grid — shortest path via V-1 edge relaxation iterations

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

struct BellmanFordResult {
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

fn bellman_ford_grid(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> BellmanFordResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let vertex_count = row_count * col_count; // @step:initialize
    let mut distance = vec![vec![usize::MAX; col_count]; row_count]; // @step:initialize
    distance[start.0][start.1] = 0; // @step:initialize
    let mut parent: Vec<Vec<Option<(usize, usize)>>> = vec![vec![None; col_count]; row_count]; // @step:initialize

    // Collect all passable edges: (fromRow, fromCol, toRow, toCol)
    let mut edges: Vec<(usize, usize, usize, usize)> = Vec::new(); // @step:initialize
    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
    for row_index in 0..row_count {
        for col_index in 0..col_count {
            if grid[row_index][col_index].cell_type == CellType::Wall { continue; }
            for (delta_row, delta_col) in &directions {
                let neighbor_row = row_index as i32 + delta_row;
                let neighbor_col = col_index as i32 + delta_col;
                if neighbor_row < 0 || neighbor_row >= row_count as i32
                    || neighbor_col < 0 || neighbor_col >= col_count as i32
                {
                    continue;
                }
                let neighbor_row = neighbor_row as usize;
                let neighbor_col = neighbor_col as usize;
                if grid[neighbor_row][neighbor_col].cell_type == CellType::Wall { continue; }
                edges.push((row_index, col_index, neighbor_row, neighbor_col));
            }
        }
    }

    // Relax all edges V-1 times
    for _ in 0..vertex_count.saturating_sub(1) {
        let mut updated = false;
        for &(from_row, from_col, to_row, to_col) in &edges {
            if distance[from_row][from_col] == usize::MAX { continue; }
            let new_distance = distance[from_row][from_col] + 1; // @step:update-cost
            if new_distance < distance[to_row][to_col] {
                // @step:update-cost
                distance[to_row][to_col] = new_distance; // @step:update-cost
                parent[to_row][to_col] = Some((from_row, from_col));
                updated = true;
            }
        }
        if !updated { break; } // Early termination if no updates
    }

    // Collect visited cells (all cells that were reached with finite distance)
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:close-node
    for row_index in 0..row_count {
        for col_index in 0..col_count {
            if distance[row_index][col_index] < usize::MAX {
                visited.push((row_index, col_index)); // @step:close-node
            }
        }
    }

    if distance[end.0][end.1] == usize::MAX {
        return BellmanFordResult { path: vec![], visited }; // @step:complete
    }

    let path = reconstruct_path(&parent, end); // @step:trace-path
    BellmanFordResult { path, visited } // @step:trace-path
}
