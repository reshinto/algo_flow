// Multi-Source BFS — computes distance from nearest wall for every empty cell simultaneously
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

struct MultiSourceResult {
    distances: Vec<Vec<i32>>,
    max_distance: i32,
}

fn multi_source_bfs(grid: &Vec<Vec<GridCell>>) -> MultiSourceResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut distances = vec![vec![-1i32; col_count]; row_count]; // @step:initialize

    // Seed queue with ALL empty cells adjacent to a wall (distance = 1)
    let mut queue: VecDeque<(usize, usize)> = VecDeque::new(); // @step:initialize,open-node
    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    for row_index in 0..row_count {
        for col_index in 0..col_count {
            if grid[row_index][col_index].cell_type == CellType::Wall {
                continue;
            }
            // Check if any neighbor is a wall
            let mut adjacent_to_wall = false;
            for (delta_row, delta_col) in &directions {
                let neighbor_row = row_index as i32 + delta_row;
                let neighbor_col = col_index as i32 + delta_col;
                if neighbor_row < 0
                    || neighbor_row >= row_count as i32
                    || neighbor_col < 0
                    || neighbor_col >= col_count as i32
                {
                    adjacent_to_wall = true; // grid boundary counts as wall
                    break;
                }
                if grid[neighbor_row as usize][neighbor_col as usize].cell_type == CellType::Wall {
                    // @step:open-node
                    adjacent_to_wall = true;
                    break;
                }
            }
            if adjacent_to_wall {
                distances[row_index][col_index] = 1; // @step:open-node
                queue.push_back((row_index, col_index)); // @step:open-node
            }
        }
    }

    let mut max_distance = 1i32;

    while let Some(current) = queue.pop_front() {
        let (current_row, current_col) = current; // @step:close-node
        let current_distance = distances[current_row][current_col]; // @step:update-cost

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
            if distances[neighbor_row][neighbor_col] != -1 {
                continue;
            }
            let neighbor_distance = current_distance + 1;
            distances[neighbor_row][neighbor_col] = neighbor_distance; // @step:update-cost
            if neighbor_distance > max_distance {
                max_distance = neighbor_distance;
            }
            queue.push_back((neighbor_row, neighbor_col)); // @step:open-node
        }
    }

    MultiSourceResult { distances, max_distance } // @step:complete
}
