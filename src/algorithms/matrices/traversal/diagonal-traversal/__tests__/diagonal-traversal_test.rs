include!("../sources/diagonal-traversal.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_traverses_3x4_matrix_diagonally() {
        let matrix = vec![vec![1, 2, 3, 4], vec![5, 6, 7, 8], vec![9, 10, 11, 12]];
        assert_eq!(
            diagonal_traversal(&matrix),
            vec![1, 2, 5, 3, 6, 9, 4, 7, 10, 8, 11, 12]
        );
    }

    #[test]
    fn test_traverses_4x4_square_matrix_diagonally() {
        let matrix = vec![
            vec![1, 2, 3, 4],
            vec![5, 6, 7, 8],
            vec![9, 10, 11, 12],
            vec![13, 14, 15, 16],
        ];
        assert_eq!(
            diagonal_traversal(&matrix),
            vec![1, 2, 5, 3, 6, 9, 4, 7, 10, 13, 8, 11, 14, 12, 15, 16]
        );
    }

    #[test]
    fn test_handles_1x1_matrix() {
        let matrix = vec![vec![42]];
        assert_eq!(diagonal_traversal(&matrix), vec![42]);
    }

    #[test]
    fn test_handles_single_row_matrix() {
        let matrix = vec![vec![1, 2, 3, 4]];
        assert_eq!(diagonal_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_handles_single_column_matrix() {
        let matrix = vec![vec![1], vec![2], vec![3], vec![4]];
        assert_eq!(diagonal_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_returns_empty_for_empty_matrix() {
        let matrix: Vec<Vec<i32>> = vec![];
        assert_eq!(diagonal_traversal(&matrix), Vec::<i32>::new());
    }

    #[test]
    fn test_handles_2x2_matrix() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        assert_eq!(diagonal_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_handles_2x3_non_square_matrix() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6]];
        assert_eq!(diagonal_traversal(&matrix), vec![1, 2, 4, 3, 5, 6]);
    }

    #[test]
    fn test_handles_3x3_matrix() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        assert_eq!(diagonal_traversal(&matrix), vec![1, 2, 4, 3, 5, 7, 6, 8, 9]);
    }
}
