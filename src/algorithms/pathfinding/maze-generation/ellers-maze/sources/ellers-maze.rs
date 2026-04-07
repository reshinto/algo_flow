// Eller's Maze — row-by-row maze generation with set merging and vertical extensions

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

fn ellers_maze(grid: &mut Vec<Vec<GridCell>>) -> MazeResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut passages_carved = 0usize; // @step:initialize

    // Passage column indices (odd columns)
    let mut passage_cols: Vec<usize> = Vec::new(); // @step:initialize
    let mut col_index = 1usize;
    while col_index < col_count - 1 {
        passage_cols.push(col_index);
        col_index += 2;
    }
    let passage_col_count = passage_cols.len(); // @step:initialize

    // Assign each cell in the first passage row its own set
    let mut next_set_id = 1usize; // @step:initialize
    let mut current_sets: Vec<usize> = (0..passage_col_count).map(|_| { let id = next_set_id; next_set_id += 1; id }).collect(); // @step:initialize

    // Collect passage rows
    let mut passage_rows: Vec<usize> = Vec::new();
    let mut row_index = 1usize;
    while row_index < row_count - 1 {
        passage_rows.push(row_index);
        row_index += 2;
    }

    for pass_row_pos in 0..passage_rows.len() {
        let passage_row = passage_rows[pass_row_pos];
        let is_last_row = pass_row_pos == passage_rows.len() - 1; // @step:carve-cell

        // Step 1: Carve all passage cells in this row
        for &passage_col in &passage_cols {
            if grid[passage_row][passage_col].cell_type == CellType::Wall {
                grid[passage_row][passage_col].cell_type = CellType::Empty; // @step:carve-cell
                passages_carved += 1;
            }
        }

        // Step 2: Randomly merge adjacent cells in different sets
        for cell_pos in 0..passage_col_count.saturating_sub(1) {
            let left_set_id = current_sets[cell_pos];
            let right_set_id = current_sets[cell_pos + 1];
            let wall_col = passage_cols[cell_pos] + 1; // @step:merge-cells

            let pseudo_rand = (pass_row_pos * 1664525 + cell_pos * 1013904223 + 1) % 2;
            let should_merge = if is_last_row {
                left_set_id != right_set_id
            } else {
                pseudo_rand == 0 && left_set_id != right_set_id
            }; // @step:merge-cells

            if should_merge {
                grid[passage_row][wall_col].cell_type = CellType::Empty; // @step:merge-cells
                passages_carved += 1;
                for update_pos in 0..passage_col_count {
                    if current_sets[update_pos] == right_set_id {
                        current_sets[update_pos] = left_set_id;
                    }
                }
            }
        }

        if is_last_row { break; }

        // Step 3: For each set, carve at least one downward connection
        let next_row = passage_rows[pass_row_pos + 1];

        // Group cells by set
        use std::collections::HashMap;
        let mut set_groups: HashMap<usize, Vec<usize>> = HashMap::new(); // @step:carve-cell
        for cell_pos in 0..passage_col_count {
            set_groups.entry(current_sets[cell_pos]).or_default().push(cell_pos);
        }

        let mut next_sets = vec![0usize; passage_col_count];

        for (set_id, positions) in &set_groups {
            let extension_count = std::cmp::max(1, positions.len() / 2 + 1);
            for (ext_index, &cell_pos) in positions.iter().enumerate() {
                let passage_col = passage_cols[cell_pos];
                let between_row = passage_row + 1;
                if ext_index < extension_count {
                    grid[between_row][passage_col].cell_type = CellType::Empty; // @step:carve-cell
                    passages_carved += 1;
                    next_sets[cell_pos] = *set_id;
                } else {
                    next_sets[cell_pos] = next_set_id;
                    next_set_id += 1;
                }
            }
        }

        for &passage_col in &passage_cols {
            if grid[next_row][passage_col].cell_type == CellType::Wall {
                grid[next_row][passage_col].cell_type = CellType::Empty; // @step:carve-cell
                passages_carved += 1;
            }
        }

        current_sets = next_sets;
    }

    MazeResult { passages_carved } // @step:complete
}
