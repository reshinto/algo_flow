include!("../sources/iterative-deepening-dfs.rs");

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
        let grid = make_empty_grid(4, 4);
        let result = iterative_deepening_dfs(&grid, (0, 0), (3, 3));
        assert!(!result.path.is_empty());
        assert_eq!(result.path[0], (0, 0));
        assert_eq!(*result.path.last().unwrap(), (3, 3));
    }

    #[test]
    fn finds_shortest_path() {
        let grid = make_empty_grid(1, 5);
        let result = iterative_deepening_dfs(&grid, (0, 0), (0, 4));
        assert_eq!(result.path.len(), 5);
    }

    #[test]
    fn returns_empty_path_when_no_route() {
        let mut grid = make_empty_grid(3, 3);
        set_wall(&mut grid, 0, 1);
        set_wall(&mut grid, 1, 0);
        set_wall(&mut grid, 1, 1);
        let result = iterative_deepening_dfs(&grid, (0, 0), (2, 2));
        assert!(result.path.is_empty());
    }

    #[test]
    fn handles_adjacent_start_and_end() {
        let grid = make_empty_grid(3, 3);
        let result = iterative_deepening_dfs(&grid, (0, 0), (0, 1));
        assert_eq!(result.path.len(), 2);
        assert_eq!(result.path[0], (0, 0));
        assert_eq!(result.path[1], (0, 1));
    }

    #[test]
    fn depth_reached() {
        let grid = make_empty_grid(1, 4);
        let result = iterative_deepening_dfs(&grid, (0, 0), (0, 3));
        assert_eq!(result.depth_reached, 3);
    }

    #[test]
    fn tracks_visited_cells() {
        let grid = make_empty_grid(3, 3);
        let result = iterative_deepening_dfs(&grid, (0, 0), (2, 2));
        assert!(!result.visited.is_empty());
    }
}
