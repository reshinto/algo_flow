// Binary Tree Maze — for each cell, randomly carve north or east

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

struct MazeResult {
    passages_carved: usize,
}

fn binary_tree_maze(grid: &mut Vec<Vec<GridCell>>) -> MazeResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut passages_carved = 0usize; // @step:initialize

    // Carve all passage cells first
    let mut row_index = 1usize;
    while row_index < row_count - 1 {
        let mut col_index = 1usize;
        while col_index < col_count - 1 {
            if grid[row_index][col_index].cell_type == CellType::Wall {
                grid[row_index][col_index].cell_type = CellType::Empty; // @step:carve-cell
                passages_carved += 1;
            }

            // Determine which directions are available: north (row-1) and east (col+1)
            let can_go_north = row_index >= 3; // @step:carve-cell
            let can_go_east = col_index + 2 <= col_count - 2; // @step:carve-cell

            // Simple deterministic pseudo-random based on position
            let pseudo_random = (row_index * 1664525 + col_index * 1013904223) % 2;

            if can_go_north && can_go_east {
                if pseudo_random == 0 {
                    grid[row_index - 1][col_index].cell_type = CellType::Empty; // @step:carve-cell
                    passages_carved += 1;
                } else {
                    grid[row_index][col_index + 1].cell_type = CellType::Empty; // @step:carve-cell
                    passages_carved += 1;
                }
            } else if can_go_north {
                grid[row_index - 1][col_index].cell_type = CellType::Empty; // @step:carve-cell
                passages_carved += 1;
            } else if can_go_east {
                grid[row_index][col_index + 1].cell_type = CellType::Empty; // @step:carve-cell
                passages_carved += 1;
            }
            col_index += 2;
        }
        row_index += 2;
    }

    MazeResult { passages_carved } // @step:complete
}
