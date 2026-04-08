include!("../sources/toeplitz-matrix.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_canonical_toeplitz_example() {
        let matrix = vec![vec![1, 2, 3, 4], vec![5, 1, 2, 3], vec![9, 5, 1, 2]];
        assert_eq!(toeplitz_matrix(&matrix), true);
    }

    #[test]
    fn test_non_toeplitz_2x2() {
        let matrix = vec![vec![1, 2], vec![2, 2]];
        assert_eq!(toeplitz_matrix(&matrix), false);
    }

    #[test]
    fn test_single_element_matrix() {
        let matrix = vec![vec![42]];
        assert_eq!(toeplitz_matrix(&matrix), true);
    }

    #[test]
    fn test_single_row_matrix() {
        let matrix = vec![vec![1, 2, 3, 4]];
        assert_eq!(toeplitz_matrix(&matrix), true);
    }

    #[test]
    fn test_single_column_matrix() {
        let matrix = vec![vec![1], vec![2], vec![3]];
        assert_eq!(toeplitz_matrix(&matrix), true);
    }

    #[test]
    fn test_all_same_elements() {
        let matrix = vec![vec![7, 7, 7], vec![7, 7, 7], vec![7, 7, 7]];
        assert_eq!(toeplitz_matrix(&matrix), true);
    }

    #[test]
    fn test_valid_2x2_toeplitz() {
        let matrix = vec![vec![1, 2], vec![3, 1]];
        assert_eq!(toeplitz_matrix(&matrix), true);
    }

    #[test]
    fn test_invalid_2x2_non_toeplitz() {
        let matrix = vec![vec![5, 3], vec![3, 4]];
        assert_eq!(toeplitz_matrix(&matrix), false);
    }

    #[test]
    fn test_first_row_mismatch() {
        let matrix = vec![vec![1, 2, 3], vec![4, 2, 2], vec![7, 4, 2]];
        assert_eq!(toeplitz_matrix(&matrix), false);
    }

    #[test]
    fn test_last_diagonal_broken() {
        let matrix = vec![vec![1, 2, 3], vec![4, 1, 2], vec![7, 4, 9]];
        assert_eq!(toeplitz_matrix(&matrix), false);
    }
}
