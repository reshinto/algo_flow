// Recursive Backtracker Maze — DFS-based maze carving with random neighbor selection

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

fn recursive_backtracker_maze(grid: &mut Vec<Vec<GridCell>>, start: (usize, usize)) -> MazeResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut visited = vec![vec![false; col_count]; row_count]; // @step:initialize
    let mut passages_carved = 0usize; // @step:initialize

    // DFS stack — stores passage cell coordinates (odd row and col only)
    let mut stack: Vec<(usize, usize)> = Vec::new(); // @step:initialize
    let (start_row, start_col) = start; // @step:initialize

    // Mark start cell as visited and push onto stack
    visited[start_row][start_col] = true; // @step:carve-cell
    stack.push((start_row, start_col)); // @step:carve-cell

    // Cardinal directions — each step moves 2 cells to skip over walls
    let directions: [(i32, i32); 4] = [(-2, 0), (2, 0), (0, -2), (0, 2)];
    let mut iteration = 0usize;

    while !stack.is_empty() {
        let &(current_row, current_col) = stack.last().unwrap(); // @step:visit

        // Collect unvisited passage-cell neighbors
        let mut unvisited_neighbors: Vec<(usize, usize)> = Vec::new(); // @step:visit
        for (delta_row, delta_col) in &directions {
            let neighbor_row = current_row as i32 + delta_row;
            let neighbor_col = current_col as i32 + delta_col;
            if neighbor_row < 1 || neighbor_row >= (row_count - 1) as i32 { continue; }
            if neighbor_col < 1 || neighbor_col >= (col_count - 1) as i32 { continue; }
            let neighbor_row = neighbor_row as usize;
            let neighbor_col = neighbor_col as usize;
            if !visited[neighbor_row][neighbor_col] {
                unvisited_neighbors.push((neighbor_row, neighbor_col)); // @step:visit
            }
        }

        if !unvisited_neighbors.is_empty() {
            // Randomly choose one unvisited neighbor
            let chosen_index = iteration.wrapping_mul(6364136223846793005usize).wrapping_add(1442695040888963407) % unvisited_neighbors.len();
            iteration += 1;
            let (chosen_row, chosen_col) = unvisited_neighbors[chosen_index]; // @step:carve-cell

            // Carve the wall between current and chosen
            let wall_row = (current_row as i32 + (chosen_row as i32 - current_row as i32) / 2) as usize;
            let wall_col = (current_col as i32 + (chosen_col as i32 - current_col as i32) / 2) as usize;
            grid[wall_row][wall_col].cell_type = CellType::Empty; // @step:carve-cell
            passages_carved += 1;

            // Carve the chosen cell itself
            if grid[chosen_row][chosen_col].cell_type == CellType::Wall {
                grid[chosen_row][chosen_col].cell_type = CellType::Empty; // @step:carve-cell
                passages_carved += 1;
            }

            visited[chosen_row][chosen_col] = true; // @step:carve-cell
            stack.push((chosen_row, chosen_col)); // @step:carve-cell
        } else {
            // Backtrack — no unvisited neighbors remain
            stack.pop(); // @step:visit
        }
    }

    MazeResult { passages_carved } // @step:complete
}
