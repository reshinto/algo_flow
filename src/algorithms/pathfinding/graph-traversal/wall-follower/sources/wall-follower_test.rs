include!("wall-follower.rs");

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
    fn finds_path_in_simple_corridor() {
        let grid = make_empty_grid(1, 5);
        let result = wall_follower(&grid, (0, 0), (0, 4));
        assert!(!result.path.is_empty());
        assert_eq!(*result.path.last().unwrap(), (0, 4));
    }

    #[test]
    fn starts_path_at_start_position() {
        let grid = make_empty_grid(3, 3);
        let result = wall_follower(&grid, (0, 0), (2, 2));
        assert_eq!(result.path[0], (0, 0));
    }

    #[test]
    fn returns_empty_path_when_start_isolated() {
        let mut grid = make_empty_grid(3, 3);
        set_wall(&mut grid, 0, 1);
        set_wall(&mut grid, 1, 0);
        set_wall(&mut grid, 1, 1);
        let result = wall_follower(&grid, (0, 0), (2, 2));
        assert!(result.path.is_empty());
    }

    #[test]
    fn path_steps_are_adjacent() {
        let grid = make_empty_grid(1, 5);
        let result = wall_follower(&grid, (0, 0), (0, 4));
        for path_index in 1..result.path.len() {
            let prev = result.path[path_index - 1];
            let curr = result.path[path_index];
            let row_diff = (curr.0 as i32 - prev.0 as i32).abs();
            let col_diff = (curr.1 as i32 - prev.1 as i32).abs();
            assert_eq!(row_diff + col_diff, 1);
        }
    }

    #[test]
    fn returns_visited_cells() {
        let grid = make_empty_grid(3, 3);
        let result = wall_follower(&grid, (0, 0), (2, 2));
        assert!(!result.visited.is_empty());
    }
}
