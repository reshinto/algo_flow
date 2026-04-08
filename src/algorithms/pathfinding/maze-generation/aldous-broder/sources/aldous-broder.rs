// Aldous-Broder Maze — uniform random spanning tree via random walk

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

fn aldous_broder(grid: &mut Vec<Vec<GridCell>>, start: (usize, usize)) -> MazeResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut visited = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut passages_carved = 0usize; // @step:initialize

    // Count total passage cells (odd row and odd col)
    let mut total_passage_cells = 0usize; // @step:initialize
    let mut row_index = 1;
    while row_index < row_count - 1 {
        let mut col_index = 1;
        while col_index < col_count - 1 {
            total_passage_cells += 1;
            col_index += 2;
        }
        row_index += 2;
    }

    let mut visited_count = 0usize; // @step:initialize
    let (mut current_row, mut current_col) = start; // @step:initialize

    // Mark start as visited and carve it
    visited[current_row][current_col] = true; // @step:visit
    if grid[current_row][current_col].cell_type == CellType::Wall {
        grid[current_row][current_col].cell_type = CellType::Empty; // @step:carve-cell
        passages_carved += 1;
    }
    visited_count += 1;

    // Directions move 2 cells to passage-cell neighbors
    let directions: [(i32, i32); 4] = [(-2, 0), (2, 0), (0, -2), (0, 2)];
    let max_iterations = row_count * col_count * 10;
    let mut iterations = 0usize;

    while visited_count < total_passage_cells && iterations < max_iterations {
        iterations += 1;

        // Collect valid passage-cell neighbors
        let mut valid_neighbors: Vec<(usize, usize)> = Vec::new(); // @step:visit
        for (delta_row, delta_col) in &directions {
            let neighbor_row = current_row as i32 + delta_row;
            let neighbor_col = current_col as i32 + delta_col;
            if neighbor_row < 1 || neighbor_row >= (row_count - 1) as i32 { continue; }
            if neighbor_col < 1 || neighbor_col >= (col_count - 1) as i32 { continue; }
            valid_neighbors.push((neighbor_row as usize, neighbor_col as usize));
        }

        if valid_neighbors.is_empty() { break; }

        // Pick a random neighbor (random walk) — using simple deterministic pseudo-random
        let chosen_index = iterations.wrapping_mul(6364136223846793005usize).wrapping_add(1442695040888963407) % valid_neighbors.len();
        let (next_row, next_col) = valid_neighbors[chosen_index]; // @step:visit

        if !visited[next_row][next_col] {
            // Carve the wall between current and next
            let wall_row = (current_row as i32 + (next_row as i32 - current_row as i32) / 2) as usize;
            let wall_col = (current_col as i32 + (next_col as i32 - current_col as i32) / 2) as usize;
            grid[wall_row][wall_col].cell_type = CellType::Empty; // @step:carve-cell
            passages_carved += 1;

            if grid[next_row][next_col].cell_type == CellType::Wall {
                grid[next_row][next_col].cell_type = CellType::Empty; // @step:carve-cell
                passages_carved += 1;
            }

            visited[next_row][next_col] = true; // @step:carve-cell
            visited_count += 1;
        }

        current_row = next_row; // @step:visit
        current_col = next_col; // @step:visit
    }

    MazeResult { passages_carved } // @step:complete
}
