// IDA* — Iterative Deepening A*: DFS with f-cost threshold that increases each iteration

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

struct IDAStarResult {
    path: Vec<(usize, usize)>,
    visited: Vec<(usize, usize)>,
    iteration_count: usize,
}

fn heuristic(row_a: usize, col_a: usize, row_b: usize, col_b: usize) -> i32 {
    ((row_a as i32 - row_b as i32).abs() + (col_a as i32 - col_b as i32).abs())
}

enum SearchResult {
    Found,
    Exceeded(i32),
}

fn search(
    grid: &Vec<Vec<GridCell>>,
    current_path: &mut Vec<(usize, usize)>,
    on_path: &mut Vec<Vec<bool>>,
    g_cost: i32,
    threshold: i32,
    end: (usize, usize),
    visited: &mut Vec<(usize, usize)>,
    directions: &[(i32, i32); 4],
    row_count: usize,
    col_count: usize,
) -> SearchResult {
    let head = *current_path.last().unwrap();
    let f_cost = g_cost + heuristic(head.0, head.1, end.0, end.1); // @step:open-node

    if f_cost > threshold {
        return SearchResult::Exceeded(f_cost); // @step:open-node
    }

    visited.push((head.0, head.1)); // @step:close-node

    if head.0 == end.0 && head.1 == end.1 {
        return SearchResult::Found; // @step:trace-path
    }

    let mut minimum_exceeded = i32::MAX;

    for (delta_row, delta_col) in directions {
        let neighbor_row = head.0 as i32 + delta_row;
        let neighbor_col = head.1 as i32 + delta_col;
        if neighbor_row < 0
            || neighbor_row >= row_count as i32
            || neighbor_col < 0
            || neighbor_col >= col_count as i32
        {
            continue;
        }
        let neighbor_row = neighbor_row as usize;
        let neighbor_col = neighbor_col as usize;
        if grid[neighbor_row][neighbor_col].cell_type == CellType::Wall { continue; }
        if on_path[neighbor_row][neighbor_col] { continue; } // @step:open-node

        current_path.push((neighbor_row, neighbor_col)); // @step:open-node
        on_path[neighbor_row][neighbor_col] = true; // @step:open-node

        let sub_result = search(
            grid, current_path, on_path, g_cost + 1, threshold, end,
            visited, directions, row_count, col_count,
        );

        match sub_result {
            SearchResult::Found => return SearchResult::Found,
            SearchResult::Exceeded(exceeded) => {
                if exceeded < minimum_exceeded {
                    minimum_exceeded = exceeded;
                }
            }
        }

        current_path.pop(); // @step:close-node
        on_path[neighbor_row][neighbor_col] = false; // @step:close-node
    }

    SearchResult::Exceeded(minimum_exceeded)
}

fn ida_star(
    grid: &Vec<Vec<GridCell>>,
    start: (usize, usize),
    end: (usize, usize),
) -> IDAStarResult {
    let row_count = grid.len(); // @step:initialize
    let col_count = if row_count > 0 { grid[0].len() } else { 0 }; // @step:initialize
    let mut visited: Vec<(usize, usize)> = Vec::new(); // @step:initialize
    let mut threshold = heuristic(start.0, start.1, end.0, end.1); // @step:initialize
    let mut current_path = vec![start]; // @step:initialize
    let mut on_path = vec![vec![false; col_count]; row_count]; // @step:initialize
    on_path[start.0][start.1] = true; // @step:initialize
    let mut iteration_count = 0usize; // @step:initialize

    let directions: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];

    loop {
        iteration_count += 1; // @step:close-node
        let result = search(
            grid, &mut current_path, &mut on_path, 0, threshold, end,
            &mut visited, &directions, row_count, col_count,
        ); // @step:close-node

        match result {
            SearchResult::Found => {
                // @step:trace-path
                return IDAStarResult { path: current_path.clone(), visited, iteration_count }; // @step:trace-path
            }
            SearchResult::Exceeded(next_threshold) => {
                if next_threshold == i32::MAX {
                    return IDAStarResult { path: vec![], visited, iteration_count }; // @step:complete
                }
                threshold = next_threshold; // @step:initialize
            }
        }
    }
}
