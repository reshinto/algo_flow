include!("sources/d-star-lite.rs");

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
    fn finds_path_on_empty_grid() {
        let grid = make_empty_grid(5, 5);
        let result = d_star_lite(&grid, (0, 0), (4, 4));
        assert!(!result.path.is_empty());
        assert_eq!(result.path[0], (0, 0));
        assert_eq!(*result.path.last().unwrap(), (4, 4));
    }

    #[test]
    fn returns_empty_path_when_no_route() {
        let mut grid = make_empty_grid(5, 5);
        set_wall(&mut grid, 0, 1);
        set_wall(&mut grid, 1, 0);
        set_wall(&mut grid, 1, 1);
        let result = d_star_lite(&grid, (0, 0), (4, 4));
        assert!(result.path.is_empty());
    }

    #[test]
    fn handles_adjacent_start_and_end() {
        let grid = make_empty_grid(3, 3);
        let result = d_star_lite(&grid, (0, 0), (0, 1));
        assert!(!result.path.is_empty());
        assert_eq!(*result.path.last().unwrap(), (0, 1));
    }

    #[test]
    fn handles_start_equal_to_end() {
        let grid = make_empty_grid(3, 3);
        let result = d_star_lite(&grid, (1, 1), (1, 1));
        assert_eq!(result.path.len(), 1);
        assert_eq!(result.path[0], (1, 1));
    }

    #[test]
    fn performs_at_least_one_search() {
        let grid = make_empty_grid(5, 5);
        let result = d_star_lite(&grid, (0, 0), (4, 4));
        assert!(result.replan_count > 0);
    }

    #[test]
    fn tracks_visited_cells() {
        let grid = make_empty_grid(5, 5);
        let result = d_star_lite(&grid, (0, 0), (4, 4));
        assert!(!result.visited.is_empty());
    }
}
