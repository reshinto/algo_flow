include!("../sources/matrix-diagonal-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sums_both_diagonals_3x3_subtracts_center() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        assert_eq!(matrix_diagonal_sum(&matrix), 25);
    }

    #[test]
    fn test_sums_both_diagonals_4x4_no_center() {
        let matrix = vec![
            vec![1, 2, 3, 4],
            vec![5, 6, 7, 8],
            vec![9, 10, 11, 12],
            vec![13, 14, 15, 16],
        ];
        assert_eq!(matrix_diagonal_sum(&matrix), 68);
    }

    #[test]
    fn test_single_element_matrix() {
        let matrix = vec![vec![42]];
        assert_eq!(matrix_diagonal_sum(&matrix), 42);
    }

    #[test]
    fn test_2x2_matrix() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        assert_eq!(matrix_diagonal_sum(&matrix), 10);
    }

    #[test]
    fn test_5x5_matrix_subtracts_center() {
        let matrix = vec![
            vec![1, 2, 3, 4, 5],
            vec![6, 7, 8, 9, 10],
            vec![11, 12, 13, 14, 15],
            vec![16, 17, 18, 19, 20],
            vec![21, 22, 23, 24, 25],
        ];
        assert_eq!(matrix_diagonal_sum(&matrix), 117);
    }

    #[test]
    fn test_all_zeros_matrix() {
        let matrix = vec![vec![0, 0, 0], vec![0, 0, 0], vec![0, 0, 0]];
        assert_eq!(matrix_diagonal_sum(&matrix), 0);
    }

    #[test]
    fn test_identity_matrix() {
        let matrix = vec![vec![1, 0, 0], vec![0, 1, 0], vec![0, 0, 1]];
        assert_eq!(matrix_diagonal_sum(&matrix), 3);
    }

    #[test]
    fn test_negative_values_on_diagonals() {
        let matrix = vec![vec![-1, 0, -2], vec![0, -3, 0], vec![-4, 0, -5]];
        assert_eq!(matrix_diagonal_sum(&matrix), -15);
    }

    #[test]
    fn test_4x4_all_same_values() {
        let matrix = vec![
            vec![2, 2, 2, 2],
            vec![2, 2, 2, 2],
            vec![2, 2, 2, 2],
            vec![2, 2, 2, 2],
        ];
        assert_eq!(matrix_diagonal_sum(&matrix), 16);
    }
}
