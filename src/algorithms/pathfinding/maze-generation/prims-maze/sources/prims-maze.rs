// Prim's Maze — randomized Prim's algorithm for maze generation

#[derive(Clone, PartialEq, Debug)]
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

struct MazeResult {
    passages_carved: usize,
}

fn prims_maze(grid: &mut Vec<Vec<GridCell>>, start: (usize, usize)) -> MazeResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut in_maze = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut passages_carved = 0usize; // @step:initialize

    // Each frontier entry is (wall_row, wall_col, origin_row, origin_col)
    let mut frontier: Vec<(usize, usize, usize, usize)> = Vec::new(); // @step:initialize
    let (start_row, start_col) = start; // @step:initialize

    // Add start cell to maze
    in_maze[start_row][start_col] = true; // @step:open-node
    if grid[start_row][start_col].cell_type == CellType::Wall {
        grid[start_row][start_col].cell_type = CellType::Empty; // @step:open-node
        passages_carved += 1;
    }

    let directions: [(i32, i32); 4] = [(-2, 0), (2, 0), (0, -2), (0, 2)];

    // Add initial frontier walls
    for (delta_row, delta_col) in &directions {
        let neighbor_row = start_row as i32 + delta_row;
        let neighbor_col = start_col as i32 + delta_col;
        if neighbor_row < 1 || neighbor_row >= (row_count - 1) as i32 { continue; }
        if neighbor_col < 1 || neighbor_col >= (col_count - 1) as i32 { continue; }
        let neighbor_row = neighbor_row as usize;
        let neighbor_col = neighbor_col as usize;
        if !in_maze[neighbor_row][neighbor_col] {
            frontier.push((neighbor_row, neighbor_col, start_row, start_col)); // @step:open-node
        }
    }

    let mut iteration = 0usize;
    while !frontier.is_empty() {
        // Randomly pick a frontier wall
        let picked_index = iteration.wrapping_mul(6364136223846793005usize).wrapping_add(1442695040888963407) % frontier.len();
        iteration += 1;
        let picked = frontier.remove(picked_index); // @step:carve-cell
        let (picked_row, picked_col, origin_row, origin_col) = picked;

        if in_maze[picked_row][picked_col] { continue; } // @step:carve-cell

        // Carve the passage cell
        in_maze[picked_row][picked_col] = true; // @step:carve-cell
        if grid[picked_row][picked_col].cell_type == CellType::Wall {
            grid[picked_row][picked_col].cell_type = CellType::Empty; // @step:carve-cell
            passages_carved += 1;
        }

        // Carve the wall between origin and picked
        let wall_row = (origin_row as i32 + (picked_row as i32 - origin_row as i32) / 2) as usize;
        let wall_col = (origin_col as i32 + (picked_col as i32 - origin_col as i32) / 2) as usize;
        if grid[wall_row][wall_col].cell_type == CellType::Wall {
            grid[wall_row][wall_col].cell_type = CellType::Empty; // @step:carve-cell
            passages_carved += 1;
        }

        // Add new frontier neighbors
        for (delta_row, delta_col) in &directions {
            let neighbor_row = picked_row as i32 + delta_row;
            let neighbor_col = picked_col as i32 + delta_col;
            if neighbor_row < 1 || neighbor_row >= (row_count - 1) as i32 { continue; }
            if neighbor_col < 1 || neighbor_col >= (col_count - 1) as i32 { continue; }
            let neighbor_row = neighbor_row as usize;
            let neighbor_col = neighbor_col as usize;
            if !in_maze[neighbor_row][neighbor_col] {
                frontier.push((neighbor_row, neighbor_col, picked_row, picked_col)); // @step:open-node
            }
        }
    }

    MazeResult { passages_carved } // @step:complete
}
