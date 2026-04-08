include!("../sources/flood-fill-dfs.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_empty_grid(rows: usize, cols: usize) -> Vec<Vec<GridCell>> {
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

    fn set_wall(grid: &mut Vec<Vec<GridCell>>, row: usize, col: usize) {
        grid[row][col].cell_type = CellType::Wall;
    }

    #[test]
    fn fills_all_cells_on_small_empty_grid() {
        let grid = make_empty_grid(3, 3);
        let result = flood_fill_dfs(&grid, (0, 0));
        assert_eq!(result.count, 9);
        assert_eq!(result.filled.len(), 9);
    }

    #[test]
    fn respects_walls() {
        let mut grid = make_empty_grid(3, 3);
        set_wall(&mut grid, 0, 1);
        set_wall(&mut grid, 1, 1);
        set_wall(&mut grid, 2, 1);
        let result = flood_fill_dfs(&grid, (0, 0));
        assert_eq!(result.count, 3);
    }

    #[test]
    fn fills_same_count_as_bfs() {
        let mut grid = make_empty_grid(4, 4);
        set_wall(&mut grid, 1, 2);
        set_wall(&mut grid, 2, 2);
        let result = flood_fill_dfs(&grid, (0, 0));
        assert_eq!(result.count, 14);
    }

    #[test]
    fn seed_cell_is_first_filled() {
        let grid = make_empty_grid(3, 3);
        let result = flood_fill_dfs(&grid, (1, 1));
        assert_eq!(result.filled[0], (1, 1));
    }

    #[test]
    fn isolated_cell() {
        let mut grid = make_empty_grid(3, 3);
        set_wall(&mut grid, 0, 1);
        set_wall(&mut grid, 1, 0);
        set_wall(&mut grid, 1, 2);
        set_wall(&mut grid, 2, 1);
        let result = flood_fill_dfs(&grid, (1, 1));
        assert_eq!(result.count, 1);
        assert_eq!(result.filled[0], (1, 1));
    }

    #[test]
    fn count_matches_filled_length() {
        let mut grid = make_empty_grid(4, 4);
        set_wall(&mut grid, 0, 2);
        set_wall(&mut grid, 1, 2);
        let result = flood_fill_dfs(&grid, (0, 0));
        assert_eq!(result.count, result.filled.len());
    }
}
