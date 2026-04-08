include!("../sources/recursive-division.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_open_grid(rows: usize, cols: usize) -> Vec<Vec<GridCell>> {
        (0..rows)
            .map(|row| {
                (0..cols)
                    .map(|col| GridCell {
                        row,
                        col,
                        cell_type: CellType::Empty,
                        state: String::new(),
                    })
                    .collect()
            })
            .collect()
    }

    fn bfs_reachable(grid: &Vec<Vec<GridCell>>, start: (usize, usize), end: (usize, usize)) -> bool {
        let row_count = grid.len();
        let col_count = if row_count > 0 { grid[0].len() } else { 0 };
        let mut visited = vec![vec![false; col_count]; row_count];
        let mut queue = std::collections::VecDeque::new();
        queue.push_back(start);
        visited[start.0][start.1] = true;
        let dirs: [(i32, i32); 4] = [(-1, 0), (1, 0), (0, -1), (0, 1)];
        while let Some(curr) = queue.pop_front() {
            if curr == end { return true; }
            for (dr, dc) in &dirs {
                let nr = curr.0 as i32 + dr;
                let nc = curr.1 as i32 + dc;
                if nr < 0 || nr >= row_count as i32 || nc < 0 || nc >= col_count as i32 { continue; }
                let nr = nr as usize; let nc = nc as usize;
                if !visited[nr][nc] && grid[nr][nc].cell_type != CellType::Wall {
                    visited[nr][nc] = true;
                    queue.push_back((nr, nc));
                }
            }
        }
        false
    }

    #[test]
    fn builds_walls() {
        let mut grid = make_open_grid(9, 9);
        grid[1][1].cell_type = CellType::Start;
        grid[7][7].cell_type = CellType::End;
        let result = recursive_division(&mut grid, (1, 1), (7, 7));
        assert!(result.walls_built > 0);
    }

    #[test]
    fn start_and_end_preserved() {
        let mut grid = make_open_grid(9, 9);
        grid[1][1].cell_type = CellType::Start;
        grid[7][7].cell_type = CellType::End;
        recursive_division(&mut grid, (1, 1), (7, 7));
        assert_eq!(grid[1][1].cell_type, CellType::Start);
        assert_eq!(grid[7][7].cell_type, CellType::End);
    }

    #[test]
    fn path_still_exists() {
        let mut grid = make_open_grid(9, 9);
        grid[1][1].cell_type = CellType::Start;
        grid[7][7].cell_type = CellType::End;
        recursive_division(&mut grid, (1, 1), (7, 7));
        assert!(bfs_reachable(&grid, (1, 1), (7, 7)));
    }

    #[test]
    fn walls_actually_added() {
        let mut grid = make_open_grid(9, 9);
        grid[1][1].cell_type = CellType::Start;
        grid[7][7].cell_type = CellType::End;
        recursive_division(&mut grid, (1, 1), (7, 7));
        let wall_count = grid.iter().flatten().filter(|cell| cell.cell_type == CellType::Wall).count();
        assert!(wall_count > 0);
    }
}
