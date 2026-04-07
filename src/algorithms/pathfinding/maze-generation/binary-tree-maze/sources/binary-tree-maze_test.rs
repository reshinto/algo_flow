include!("binary-tree-maze.rs");

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

    #[test]
    fn carves_passages() {
        let mut grid = make_all_walls_grid(9, 9);
        grid[1][1].cell_type = CellType::Start;
        let result = binary_tree_maze(&mut grid);
        assert!(result.passages_carved > 0);
    }

    #[test]
    fn carves_all_odd_indexed_passage_cells() {
        let mut grid = make_all_walls_grid(9, 9);
        grid[1][1].cell_type = CellType::Start;
        binary_tree_maze(&mut grid);
        for row in (1..8).step_by(2) {
            for col in (1..8).step_by(2) {
                assert_ne!(grid[row][col].cell_type, CellType::Wall);
            }
        }
    }

    #[test]
    fn does_not_carve_border_cells() {
        let mut grid = make_all_walls_grid(9, 9);
        grid[1][1].cell_type = CellType::Start;
        binary_tree_maze(&mut grid);
        for col in 0..9 {
            assert_eq!(grid[0][col].cell_type, CellType::Wall);
            assert_eq!(grid[8][col].cell_type, CellType::Wall);
        }
    }

    #[test]
    fn passages_carved_greater_than_16() {
        let mut grid = make_all_walls_grid(9, 9);
        grid[1][1].cell_type = CellType::Start;
        let result = binary_tree_maze(&mut grid);
        assert!(result.passages_carved > 16);
    }
}
