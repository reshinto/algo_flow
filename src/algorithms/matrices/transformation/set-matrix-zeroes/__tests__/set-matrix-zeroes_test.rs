include!("../sources/set-matrix-zeroes.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_zeros_row_and_column_of_single_zero_3x3() {
        let mut matrix = vec![vec![1, 1, 1], vec![1, 0, 1], vec![1, 1, 1]];
        let result = set_matrix_zeroes(&mut matrix);
        assert_eq!(*result, vec![vec![1, 0, 1], vec![0, 0, 0], vec![1, 0, 1]]);
    }

    #[test]
    fn test_handles_default_input() {
        let mut matrix = vec![vec![0, 1, 2, 0], vec![3, 4, 5, 2], vec![1, 3, 1, 5]];
        let result = set_matrix_zeroes(&mut matrix);
        assert_eq!(
            *result,
            vec![vec![0, 0, 0, 0], vec![0, 4, 5, 0], vec![0, 3, 1, 0]]
        );
    }

    #[test]
    fn test_leaves_matrix_without_zeros_unchanged() {
        let mut matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let result = set_matrix_zeroes(&mut matrix);
        assert_eq!(*result, vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]]);
    }

    #[test]
    fn test_handles_1x1_with_zero() {
        let mut matrix = vec![vec![0]];
        let result = set_matrix_zeroes(&mut matrix);
        assert_eq!(result[0][0], 0);
    }

    #[test]
    fn test_handles_1x1_with_nonzero() {
        let mut matrix = vec![vec![5]];
        let result = set_matrix_zeroes(&mut matrix);
        assert_eq!(result[0][0], 5);
    }

    #[test]
    fn test_handles_zero_in_first_row() {
        let mut matrix = vec![vec![1, 0, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let result = set_matrix_zeroes(&mut matrix);
        assert_eq!(result[0], vec![0, 0, 0]);
        assert_eq!(result[1], vec![4, 0, 6]);
        assert_eq!(result[2], vec![7, 0, 9]);
    }

    #[test]
    fn test_handles_single_row_with_zero() {
        let mut matrix = vec![vec![1, 0, 3]];
        let result = set_matrix_zeroes(&mut matrix);
        assert_eq!(result[0], vec![0, 0, 0]);
    }

    #[test]
    fn test_handles_multiple_zeros_in_same_row() {
        let mut matrix = vec![vec![0, 1, 0], vec![2, 3, 4], vec![5, 6, 7]];
        let result = set_matrix_zeroes(&mut matrix);
        assert_eq!(result[0], vec![0, 0, 0]);
        assert_eq!(result[1], vec![0, 3, 0]);
        assert_eq!(result[2], vec![0, 6, 0]);
    }
}
