// Kruskal's Maze — Union-Find based maze generation by randomly removing walls

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

fn kruskal_find_set(set_id: &Vec<Vec<usize>>, row: usize, col: usize) -> usize {
    // @step:initialize
    set_id[row][col]
}

fn kruskal_merge_sets(set_id: &mut Vec<Vec<usize>>, row_a: usize, col_a: usize, row_b: usize, col_b: usize, row_count: usize, col_count: usize) {
    // @step:initialize
    let id_a = kruskal_find_set(set_id, row_a, col_a);
    let id_b = kruskal_find_set(set_id, row_b, col_b);
    if id_a == id_b { return; }
    for row_index in 0..row_count {
        for col_index in 0..col_count {
            if set_id[row_index][col_index] == id_b {
                set_id[row_index][col_index] = id_a;
            }
        }
    }
}

fn kruskal_maze(grid: &mut Vec<Vec<GridCell>>) -> MazeResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut passages_carved = 0usize; // @step:initialize

    // Union-Find: each cell has a set ID
    let mut set_id: Vec<Vec<usize>> = (0..row_count).map(|row_index|
        (0..col_count).map(|col_index| row_index * col_count + col_index).collect()
    ).collect(); // @step:initialize

    // Collect all internal walls between passage cells
    let mut walls: Vec<(usize, usize, usize, usize, usize, usize)> = Vec::new(); // @step:initialize

    let mut row_index = 1usize;
    while row_index < row_count - 1 {
        let mut col_index = 1usize;
        while col_index < col_count - 1 {
            if grid[row_index][col_index].cell_type == CellType::Wall {
                grid[row_index][col_index].cell_type = CellType::Empty; // @step:merge-cells
                passages_carved += 1;
            }
            if col_index + 2 < col_count - 1 {
                walls.push((row_index, col_index + 1, row_index, col_index, row_index, col_index + 2));
            }
            if row_index + 2 < row_count - 1 {
                walls.push((row_index + 1, col_index, row_index, col_index, row_index + 2, col_index));
            }
            col_index += 2;
        }
        row_index += 2;
    }

    // Shuffle walls (Fisher-Yates with deterministic pseudo-random)
    let wall_count = walls.len();
    for wall_index in (1..wall_count).rev() {
        let swap_index = (wall_index * 6364136223846793005 + 1442695040888963407) % (wall_index + 1);
        walls.swap(wall_index, swap_index);
    } // @step:merge-cells

    // Process each wall
    for wall_tuple in &walls {
        let (wall_row, wall_col, cell_a_row, cell_a_col, cell_b_row, cell_b_col) = *wall_tuple;
        if kruskal_find_set(&set_id, cell_a_row, cell_a_col) != kruskal_find_set(&set_id, cell_b_row, cell_b_col) {
            // @step:merge-cells
            grid[wall_row][wall_col].cell_type = CellType::Empty; // @step:merge-cells
            passages_carved += 1;
            kruskal_merge_sets(&mut set_id, cell_a_row, cell_a_col, cell_b_row, cell_b_col, row_count, col_count); // @step:merge-cells
        }
    }

    MazeResult { passages_carved } // @step:complete
}
