include!("island-count.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_counts_2_islands_in_standard_grid() {
        let mut grid = vec![
            vec![1, 1, 0, 0],
            vec![1, 0, 0, 1],
            vec![0, 0, 1, 1],
            vec![0, 0, 0, 0],
        ];
        assert_eq!(island_count(&mut grid), 2);
    }

    #[test]
    fn test_returns_0_when_no_islands() {
        let mut grid = vec![vec![0, 0, 0], vec![0, 0, 0], vec![0, 0, 0]];
        assert_eq!(island_count(&mut grid), 0);
    }

    #[test]
    fn test_counts_1_island_when_entire_grid_is_land() {
        let mut grid = vec![vec![1, 1, 1], vec![1, 1, 1], vec![1, 1, 1]];
        assert_eq!(island_count(&mut grid), 1);
    }

    #[test]
    fn test_handles_1x1_grid_with_island() {
        let mut grid = vec![vec![1]];
        assert_eq!(island_count(&mut grid), 1);
    }

    #[test]
    fn test_handles_1x1_grid_with_no_island() {
        let mut grid = vec![vec![0]];
        assert_eq!(island_count(&mut grid), 0);
    }

    #[test]
    fn test_diagonally_adjacent_cells_not_connected() {
        let mut grid = vec![vec![1, 0, 1], vec![0, 1, 0], vec![1, 0, 1]];
        assert_eq!(island_count(&mut grid), 5);
    }

    #[test]
    fn test_l_shaped_island_counts_as_one() {
        let mut grid = vec![vec![1, 0], vec![1, 0], vec![1, 1]];
        assert_eq!(island_count(&mut grid), 1);
    }

    #[test]
    fn test_handles_single_row_grid() {
        let mut grid = vec![vec![1, 0, 1, 1, 0, 1]];
        assert_eq!(island_count(&mut grid), 3);
    }

    #[test]
    fn test_handles_single_column_grid() {
        let mut grid = vec![vec![1], vec![0], vec![1], vec![1], vec![0]];
        assert_eq!(island_count(&mut grid), 2);
    }

    #[test]
    fn test_counts_3_islands_in_default_input() {
        let mut grid = vec![
            vec![1, 1, 0, 0, 0],
            vec![1, 1, 0, 0, 0],
            vec![0, 0, 1, 0, 0],
            vec![0, 0, 0, 1, 1],
        ];
        assert_eq!(island_count(&mut grid), 3);
    }
}
