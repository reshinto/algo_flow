include!("sources/transpose-matrix.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_transposes_3x3_square_matrix() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        assert_eq!(
            transpose_matrix(matrix),
            vec![vec![1, 4, 7], vec![2, 5, 8], vec![3, 6, 9]]
        );
    }

    #[test]
    fn test_transposes_2x2_matrix() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        assert_eq!(transpose_matrix(matrix), vec![vec![1, 3], vec![2, 4]]);
    }

    #[test]
    fn test_transposes_4x4_matrix() {
        let matrix = vec![
            vec![1, 2, 3, 4],
            vec![5, 6, 7, 8],
            vec![9, 10, 11, 12],
            vec![13, 14, 15, 16],
        ];
        let result = transpose_matrix(matrix);
        assert_eq!(result[0], vec![1, 5, 9, 13]);
        assert_eq!(result[3], vec![4, 8, 12, 16]);
    }

    #[test]
    fn test_transposes_1x1_matrix() {
        assert_eq!(transpose_matrix(vec![vec![42]]), vec![vec![42]]);
    }

    #[test]
    fn test_transposes_2x3_to_3x2() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6]];
        assert_eq!(
            transpose_matrix(matrix),
            vec![vec![1, 4], vec![2, 5], vec![3, 6]]
        );
    }

    #[test]
    fn test_transposes_3x2_to_2x3() {
        let matrix = vec![vec![1, 2], vec![3, 4], vec![5, 6]];
        assert_eq!(
            transpose_matrix(matrix),
            vec![vec![1, 3, 5], vec![2, 4, 6]]
        );
    }

    #[test]
    fn test_transposes_single_row_to_single_column() {
        assert_eq!(
            transpose_matrix(vec![vec![1, 2, 3, 4]]),
            vec![vec![1], vec![2], vec![3], vec![4]]
        );
    }

    #[test]
    fn test_transposes_single_column_to_single_row() {
        assert_eq!(
            transpose_matrix(vec![vec![1], vec![2], vec![3]]),
            vec![vec![1, 2, 3]]
        );
    }

    #[test]
    fn test_double_transpose_returns_original() {
        let original = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let transposed = transpose_matrix(original.clone());
        let double_transposed = transpose_matrix(transposed);
        assert_eq!(double_transposed, original);
    }
}
