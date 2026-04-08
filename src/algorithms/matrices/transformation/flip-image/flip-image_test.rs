include!("sources/flip-image.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_flips_and_inverts_3x3_example() {
        let mut matrix = vec![vec![1, 1, 0], vec![1, 0, 1], vec![0, 0, 0]];
        let result = flip_image(&mut matrix);
        assert_eq!(*result, vec![vec![1, 0, 0], vec![0, 1, 0], vec![1, 1, 1]]);
    }

    #[test]
    fn test_handles_all_zeros() {
        let mut matrix = vec![vec![0, 0], vec![0, 0]];
        let result = flip_image(&mut matrix);
        assert_eq!(*result, vec![vec![1, 1], vec![1, 1]]);
    }

    #[test]
    fn test_handles_all_ones() {
        let mut matrix = vec![vec![1, 1], vec![1, 1]];
        let result = flip_image(&mut matrix);
        assert_eq!(*result, vec![vec![0, 0], vec![0, 0]]);
    }

    #[test]
    fn test_handles_single_row() {
        let mut matrix = vec![vec![1, 0, 1]];
        let result = flip_image(&mut matrix);
        assert_eq!(*result, vec![vec![0, 1, 0]]);
    }

    #[test]
    fn test_handles_single_column() {
        let mut matrix = vec![vec![1], vec![0], vec![1]];
        let result = flip_image(&mut matrix);
        assert_eq!(*result, vec![vec![0], vec![1], vec![0]]);
    }

    #[test]
    fn test_handles_1x1_with_0() {
        let mut matrix = vec![vec![0]];
        let result = flip_image(&mut matrix);
        assert_eq!(*result, vec![vec![1]]);
    }

    #[test]
    fn test_handles_1x1_with_1() {
        let mut matrix = vec![vec![1]];
        let result = flip_image(&mut matrix);
        assert_eq!(*result, vec![vec![0]]);
    }

    #[test]
    fn test_handles_identity_like_matrix() {
        let mut matrix = vec![vec![1, 0, 0], vec![0, 1, 0], vec![0, 0, 1]];
        let result = flip_image(&mut matrix);
        assert_eq!(*result, vec![vec![1, 1, 0], vec![1, 0, 1], vec![0, 1, 1]]);
    }
}
