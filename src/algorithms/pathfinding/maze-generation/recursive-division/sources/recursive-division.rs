// Recursive Division Maze — builds walls in an open grid, leaving one gap per wall

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
    walls_built: usize,
}

fn recursive_division(
    grid: &mut Vec<Vec<GridCell>>,
    start_pos: (usize, usize),
    end_pos: (usize, usize),
) -> MazeResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut walls_built = 0usize; // @step:initialize

    let mut counter = 0usize;
    build_walls_in_region(
        grid, 0, 0, row_count - 1, col_count - 1,
        start_pos, end_pos, &mut walls_built, &mut counter,
    ); // @step:carve-cell

    MazeResult { walls_built } // @step:complete
}

fn build_walls_in_region(
    grid: &mut Vec<Vec<GridCell>>,
    top_row: usize, left_col: usize, bottom_row: usize, right_col: usize,
    start_pos: (usize, usize), end_pos: (usize, usize),
    walls_built: &mut usize, counter: &mut usize,
) {
    if bottom_row <= top_row || right_col <= left_col { return; }
    let region_height = bottom_row - top_row; // @step:carve-cell
    let region_width = right_col - left_col; // @step:carve-cell

    if region_height < 2 || region_width < 2 { return; } // @step:carve-cell

    // Choose orientation: horizontal wall if taller, vertical if wider
    let build_horizontal = region_height >= region_width; // @step:carve-cell

    *counter += 1;
    let pseudo_rand = counter.wrapping_mul(6364136223846793005usize).wrapping_add(1442695040888963407);

    if build_horizontal {
        let steps = (region_height / 2).max(1);
        let wall_row = top_row + 2 * (pseudo_rand % steps) + 1; // @step:carve-cell
        let gap_steps = ((region_width + 1) / 2).max(1);
        let gap_col = left_col + 2 * ((pseudo_rand.wrapping_mul(6364136223846793005)) % gap_steps); // @step:carve-cell

        for col_index in left_col..=right_col {
            // @step:carve-cell
            if let Some(cell) = grid.get_mut(wall_row).and_then(|row| row.get_mut(col_index)) {
                if cell.cell_type == CellType::Start || cell.cell_type == CellType::End { continue; }
                if col_index == gap_col { continue; }
                cell.cell_type = CellType::Wall; // @step:carve-cell
                *walls_built += 1;
            }
        }

        if wall_row > 0 {
            build_walls_in_region(grid, top_row, left_col, wall_row - 1, right_col, start_pos, end_pos, walls_built, counter); // @step:carve-cell
        }
        build_walls_in_region(grid, wall_row + 1, left_col, bottom_row, right_col, start_pos, end_pos, walls_built, counter); // @step:carve-cell
    } else {
        let steps = (region_width / 2).max(1);
        let wall_col = left_col + 2 * (pseudo_rand % steps) + 1; // @step:carve-cell
        let gap_steps = ((region_height + 1) / 2).max(1);
        let gap_row = top_row + 2 * ((pseudo_rand.wrapping_mul(6364136223846793005)) % gap_steps); // @step:carve-cell

        for row_index in top_row..=bottom_row {
            // @step:carve-cell
            if let Some(cell) = grid.get_mut(row_index).and_then(|row| row.get_mut(wall_col)) {
                if cell.cell_type == CellType::Start || cell.cell_type == CellType::End { continue; }
                if row_index == gap_row { continue; }
                cell.cell_type = CellType::Wall; // @step:carve-cell
                *walls_built += 1;
            }
        }

        if wall_col > 0 {
            build_walls_in_region(grid, top_row, left_col, bottom_row, wall_col - 1, start_pos, end_pos, walls_built, counter); // @step:carve-cell
        }
        build_walls_in_region(grid, top_row, wall_col + 1, bottom_row, right_col, start_pos, end_pos, walls_built, counter); // @step:carve-cell
    }
}
