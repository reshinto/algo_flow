include!("../sources/multi-source-bfs.rs");

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
    fn single_cell_distance_is_1() {
        let grid = make_empty_grid(1, 1);
        let result = multi_source_bfs(&grid);
        assert_eq!(result.distances[0][0], 1);
        assert_eq!(result.max_distance, 1);
    }

    #[test]
    fn single_row_all_distance_1() {
        let grid = make_empty_grid(1, 5);
        let result = multi_source_bfs(&grid);
        for dist in &result.distances[0] {
            assert_eq!(*dist, 1);
        }
    }

    #[test]
    fn center_of_3x3_has_distance_2() {
        let grid = make_empty_grid(3, 3);
        let result = multi_source_bfs(&grid);
        assert_eq!(result.distances[1][1], 2);
        assert_eq!(result.max_distance, 2);
    }

    #[test]
    fn walls_have_distance_minus_1() {
        let mut grid = make_empty_grid(3, 3);
        set_wall(&mut grid, 1, 1);
        let result = multi_source_bfs(&grid);
        assert_eq!(result.distances[1][1], -1);
    }

    #[test]
    fn center_of_5x5_has_max_distance_3() {
        let grid = make_empty_grid(5, 5);
        let result = multi_source_bfs(&grid);
        assert_eq!(result.max_distance, 3);
        assert_eq!(result.distances[2][2], 3);
    }
}
