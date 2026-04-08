include!("sources/lee-algorithm.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn make_grid(rows: usize, cols: usize) -> Vec<Vec<GridCell>> {
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

    #[test]
    fn finds_path() {
        let mut grid = make_grid(5, 5);
        grid[0][0].cell_type = CellType::Start;
        grid[4][4].cell_type = CellType::End;
        let result = lee_algorithm(&grid, (0, 0), (4, 4));
        assert!(!result.path.is_empty());
    }

    #[test]
    fn shortest_path_length() {
        let mut grid = make_grid(5, 5);
        grid[0][0].cell_type = CellType::Start;
        grid[4][4].cell_type = CellType::End;
        let result = lee_algorithm(&grid, (0, 0), (4, 4));
        assert_eq!(result.path.len(), 9);
    }

    #[test]
    fn path_empty_when_blocked() {
        let mut grid = make_grid(3, 3);
        grid[0][0].cell_type = CellType::Start;
        grid[2][2].cell_type = CellType::End;
        for row in 0..3 {
            grid[row][1].cell_type = CellType::Wall;
        }
        let result = lee_algorithm(&grid, (0, 0), (2, 2));
        assert!(result.path.is_empty());
    }

    #[test]
    fn navigates_around_wall() {
        let mut grid = make_grid(5, 5);
        grid[0][0].cell_type = CellType::Start;
        grid[4][4].cell_type = CellType::End;
        for row in 0..4 {
            grid[row][2].cell_type = CellType::Wall;
        }
        let result = lee_algorithm(&grid, (0, 0), (4, 4));
        assert!(!result.path.is_empty());
    }

    #[test]
    fn adjacent_cells() {
        let mut grid = make_grid(3, 3);
        grid[0][0].cell_type = CellType::Start;
        grid[0][1].cell_type = CellType::End;
        let result = lee_algorithm(&grid, (0, 0), (0, 1));
        assert_eq!(result.path.len(), 2);
    }

    #[test]
    fn tracks_visited() {
        let mut grid = make_grid(5, 5);
        grid[0][0].cell_type = CellType::Start;
        grid[4][4].cell_type = CellType::End;
        let result = lee_algorithm(&grid, (0, 0), (4, 4));
        assert!(!result.visited.is_empty());
    }
}
