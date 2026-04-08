include!("sources/jump-point-search.rs");

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
    fn finds_path_along_shared_row() {
        let grid = make_empty_grid(5, 5);
        let result = jump_point_search(&grid, (2, 0), (2, 4));
        assert!(!result.path.is_empty());
        assert_eq!(result.path[0], (2, 0));
        assert_eq!(*result.path.last().unwrap(), (2, 4));
    }

    #[test]
    fn returns_empty_path_when_no_route() {
        let mut grid = make_empty_grid(5, 5);
        set_wall(&mut grid, 0, 1);
        set_wall(&mut grid, 1, 0);
        set_wall(&mut grid, 1, 1);
        let result = jump_point_search(&grid, (0, 0), (4, 4));
        assert!(result.path.is_empty());
    }

    #[test]
    fn handles_start_equal_to_end() {
        let grid = make_empty_grid(3, 3);
        let result = jump_point_search(&grid, (1, 1), (1, 1));
        assert_eq!(result.path.len(), 1);
        assert_eq!(result.path[0], (1, 1));
    }

    #[test]
    fn returns_jump_points_array() {
        let grid = make_empty_grid(5, 5);
        let result = jump_point_search(&grid, (2, 0), (2, 4));
        let _ = result.jump_points; // just check it exists
    }

    #[test]
    fn explores_fewer_nodes_on_corridor() {
        let grid = make_empty_grid(10, 3);
        let result = jump_point_search(&grid, (0, 1), (9, 1));
        assert!(result.visited.len() < 30);
        assert!(!result.path.is_empty());
    }
}
