// Wall Follower — right-hand rule maze solving: always keep the right wall, follow it to the exit

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

struct WallFollowerResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
}

// Direction indices: 0=up, 1=right, 2=down, 3=left
const DIRECTION_ROW: [i32; 4] = [-1, 0, 1, 0];
const DIRECTION_COL: [i32; 4] = [0, 1, 0, -1];

fn can_move(
    grid: &Vec<Vec<GridCell>>,
    row: i32,
    col: i32,
    direction: usize,
    row_count: i32,
    col_count: i32,
) -> bool {
    let next_row = row + DIRECTION_ROW[direction];
    let next_col = col + DIRECTION_COL[direction];
    if next_row < 0 || next_row >= row_count || next_col < 0 || next_col >= col_count {
        return false;
    }
    grid[next_row as usize][next_col as usize].cell_type != CellType::Wall
}

fn wall_follower(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> WallFollowerResult {
    let row_count = grid.len() as i32; // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() as i32 } else { 0 }; // @step:initialize
    let mut path: Vec<(usize, usize)> = Vec::new(); // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize

    let mut current_row = start.0 as i32; // @step:initialize
    let mut current_col = start.1 as i32; // @step:initialize
    // Start facing right (direction index 1)
    let mut facing_direction = 1usize; // @step:initialize
    let max_steps = (row_count * col_count * 4) as usize; // @step:initialize

    for _ in 0..max_steps {
        // @step:open-node
        path.push((current_row as usize, current_col as usize)); // @step:close-node
        visited.push((current_row as usize, current_col as usize)); // @step:close-node

        // Check if we reached the end
        if current_row == end.0 as i32 && current_col == end.1 as i32 {
            return WallFollowerResult { path, visited }; // @step:trace-path
        }

        // Right-hand rule: try to turn right first, then forward, then left, then back
        let right_direction = (facing_direction + 1) % 4;
        let left_direction = (facing_direction + 3) % 4;

        if can_move(grid, current_row, current_col, right_direction, row_count, col_count) {
            // Turn right and move
            facing_direction = right_direction; // @step:open-node
            current_row += DIRECTION_ROW[facing_direction]; // @step:open-node
            current_col += DIRECTION_COL[facing_direction]; // @step:open-node
        } else if can_move(grid, current_row, current_col, facing_direction, row_count, col_count) {
            // Move forward
            current_row += DIRECTION_ROW[facing_direction]; // @step:open-node
            current_col += DIRECTION_COL[facing_direction]; // @step:open-node
        } else if can_move(grid, current_row, current_col, left_direction, row_count, col_count) {
            // Turn left and move
            facing_direction = left_direction; // @step:open-node
            current_row += DIRECTION_ROW[facing_direction]; // @step:open-node
            current_col += DIRECTION_COL[facing_direction]; // @step:open-node
        } else {
            // Turn back (180 degrees)
            facing_direction = (facing_direction + 2) % 4; // @step:open-node
            current_row += DIRECTION_ROW[facing_direction]; // @step:open-node
            current_col += DIRECTION_COL[facing_direction]; // @step:open-node
        }
    }

    WallFollowerResult { path: vec![], visited } // @step:complete
}
