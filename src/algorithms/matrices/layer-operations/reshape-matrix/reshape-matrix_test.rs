include!("sources/reshape-matrix.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_reshapes_2x4_to_4x2() {
        let matrix = vec![vec![1, 2, 3, 4], vec![5, 6, 7, 8]];
        let result = reshape_matrix(matrix, 4, 2);
        assert_eq!(result, vec![vec![1, 2], vec![3, 4], vec![5, 6], vec![7, 8]]);
    }

    #[test]
    fn test_reshapes_2x2_to_1x4() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        let result = reshape_matrix(matrix, 1, 4);
        assert_eq!(result, vec![vec![1, 2, 3, 4]]);
    }

    #[test]
    fn test_reshapes_2x2_to_4x1() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        let result = reshape_matrix(matrix, 4, 1);
        assert_eq!(result, vec![vec![1], vec![2], vec![3], vec![4]]);
    }

    #[test]
    fn test_returns_original_for_impossible_reshape() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        let original = matrix.clone();
        let result = reshape_matrix(matrix, 3, 2);
        assert_eq!(result, original);
    }

    #[test]
    fn test_handles_1x1_identity_reshape() {
        let matrix = vec![vec![42]];
        let result = reshape_matrix(matrix, 1, 1);
        assert_eq!(result, vec![vec![42]]);
    }

    #[test]
    fn test_reshapes_3x3_to_1x9() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let result = reshape_matrix(matrix, 1, 9);
        assert_eq!(result, vec![vec![1, 2, 3, 4, 5, 6, 7, 8, 9]]);
    }

    #[test]
    fn test_reshapes_1x6_to_2x3() {
        let matrix = vec![vec![1, 2, 3, 4, 5, 6]];
        let result = reshape_matrix(matrix, 2, 3);
        assert_eq!(result, vec![vec![1, 2, 3], vec![4, 5, 6]]);
    }

    #[test]
    fn test_returns_original_for_impossible_reshape_larger_target() {
        let matrix = vec![vec![1, 2, 3]];
        let original = matrix.clone();
        let result = reshape_matrix(matrix, 2, 5);
        assert_eq!(result, original);
    }
}
