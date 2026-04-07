include!("bfs-exploration.rs");

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
    fn visits_all_cells_in_open_grid() {
        let grid = make_empty_grid(3, 3);
        let result = bfs_exploration(&grid, (0, 0));
        assert_eq!(result.visited.len(), 9);
    }

    #[test]
    fn starts_with_start_cell() {
        let grid = make_empty_grid(3, 3);
        let result = bfs_exploration(&grid, (1, 1));
        assert_eq!(result.visited[0], (1, 1));
    }

    #[test]
    fn does_not_visit_wall_cells() {
        let mut grid = make_empty_grid(3, 3);
        set_wall(&mut grid, 0, 1);
        set_wall(&mut grid, 1, 0);
        set_wall(&mut grid, 1, 1);
        let result = bfs_exploration(&grid, (0, 0));
        assert_eq!(result.visited.len(), 1);
    }

    #[test]
    fn visits_only_reachable_cells() {
        let mut grid = make_empty_grid(4, 4);
        for wall_row in 0..4 {
            set_wall(&mut grid, wall_row, 2);
        }
        let result = bfs_exploration(&grid, (0, 0));
        assert_eq!(result.visited.len(), 8);
    }

    #[test]
    fn handles_1x1_grid() {
        let grid = make_empty_grid(1, 1);
        let result = bfs_exploration(&grid, (0, 0));
        assert_eq!(result.visited.len(), 1);
        assert_eq!(result.layers, 1);
    }

    #[test]
    fn no_cell_visited_twice() {
        let grid = make_empty_grid(4, 4);
        let result = bfs_exploration(&grid, (0, 0));
        let unique: std::collections::HashSet<_> = result.visited.iter().collect();
        assert_eq!(unique.len(), result.visited.len());
    }
}
