include!("../sources/anti-diagonal-traversal.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_traverses_3x3_in_anti_diagonal_order() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        assert_eq!(anti_diagonal_traversal(&matrix), vec![1, 2, 4, 3, 5, 7, 6, 8, 9]);
    }

    #[test]
    fn test_traverses_3x4_in_anti_diagonal_order() {
        let matrix = vec![vec![1, 2, 3, 4], vec![5, 6, 7, 8], vec![9, 10, 11, 12]];
        assert_eq!(
            anti_diagonal_traversal(&matrix),
            vec![1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12]
        );
    }

    #[test]
    fn test_handles_1x1_matrix() {
        let matrix = vec![vec![42]];
        assert_eq!(anti_diagonal_traversal(&matrix), vec![42]);
    }

    #[test]
    fn test_handles_single_row_matrix() {
        let matrix = vec![vec![1, 2, 3, 4]];
        assert_eq!(anti_diagonal_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_handles_single_column_matrix() {
        let matrix = vec![vec![1], vec![2], vec![3], vec![4]];
        assert_eq!(anti_diagonal_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_returns_empty_for_empty_matrix() {
        let matrix: Vec<Vec<i32>> = vec![];
        assert_eq!(anti_diagonal_traversal(&matrix), Vec::<i32>::new());
    }

    #[test]
    fn test_traverses_2x2_matrix() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        assert_eq!(anti_diagonal_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_collects_all_elements_exactly_once() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let result = anti_diagonal_traversal(&matrix);
        assert_eq!(result.len(), 9);
        let unique: std::collections::HashSet<i32> = result.iter().cloned().collect();
        assert_eq!(unique.len(), 9);
    }
}
