include!("sources/aldous-broder.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_all_walls_grid(rows: usize, cols: usize) -> Vec<Vec<GridCell>> {
        (0..rows)
            .map(|row| {
                (0..cols)
                    .map(|col| GridCell {
                        row,
                        col,
                        cell_type: CellType::Wall,
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
    fn carves_passages() {
        let mut grid = make_all_walls_grid(7, 7);
        grid[1][1].cell_type = CellType::Start;
        let result = aldous_broder(&mut grid, (1, 1));
        assert!(result.passages_carved > 0);
    }

    #[test]
    fn creates_connected_maze() {
        let mut grid = make_all_walls_grid(7, 7);
        grid[1][1].cell_type = CellType::Start;
        grid[5][5].cell_type = CellType::End;
        aldous_broder(&mut grid, (1, 1));
        assert!(bfs_reachable(&grid, (1, 1), (5, 5)));
    }

    #[test]
    fn does_not_carve_border_cells() {
        let mut grid = make_all_walls_grid(7, 7);
        grid[1][1].cell_type = CellType::Start;
        aldous_broder(&mut grid, (1, 1));
        for col in 0..7 {
            assert_eq!(grid[0][col].cell_type, CellType::Wall);
            assert_eq!(grid[6][col].cell_type, CellType::Wall);
        }
    }

    #[test]
    fn carves_start_cell() {
        let mut grid = make_all_walls_grid(7, 7);
        grid[1][1].cell_type = CellType::Start;
        aldous_broder(&mut grid, (1, 1));
        assert_ne!(grid[1][1].cell_type, CellType::Wall);
    }
}
