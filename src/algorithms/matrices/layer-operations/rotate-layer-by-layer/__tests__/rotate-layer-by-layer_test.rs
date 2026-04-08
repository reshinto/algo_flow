include!("../sources/rotate-layer-by-layer.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_rotates_3x3_90_clockwise() {
        let mut matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let result = rotate_layer_by_layer(&mut matrix);
        assert_eq!(*result, vec![vec![7, 4, 1], vec![8, 5, 2], vec![9, 6, 3]]);
    }

    #[test]
    fn test_rotates_4x4_90_clockwise() {
        let mut matrix = vec![
            vec![1, 2, 3, 4],
            vec![5, 6, 7, 8],
            vec![9, 10, 11, 12],
            vec![13, 14, 15, 16],
        ];
        let result = rotate_layer_by_layer(&mut matrix);
        assert_eq!(
            *result,
            vec![
                vec![13, 9, 5, 1],
                vec![14, 10, 6, 2],
                vec![15, 11, 7, 3],
                vec![16, 12, 8, 4],
            ]
        );
    }

    #[test]
    fn test_handles_1x1_matrix() {
        let mut matrix = vec![vec![42]];
        let result = rotate_layer_by_layer(&mut matrix);
        assert_eq!(*result, vec![vec![42]]);
    }

    #[test]
    fn test_rotates_2x2_90_clockwise() {
        let mut matrix = vec![vec![1, 2], vec![3, 4]];
        let result = rotate_layer_by_layer(&mut matrix);
        assert_eq!(*result, vec![vec![3, 1], vec![4, 2]]);
    }

    #[test]
    fn test_four_rotations_return_original() {
        let original = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let mut matrix = original.clone();
        for _ in 0..4 {
            rotate_layer_by_layer(&mut matrix);
        }
        assert_eq!(matrix, original);
    }

    #[test]
    fn test_handles_negative_and_zero_values() {
        let mut matrix = vec![vec![-1, 0, 1], vec![-2, 0, 2], vec![-3, 0, 3]];
        let result = rotate_layer_by_layer(&mut matrix);
        assert_eq!(*result, vec![vec![-3, -2, -1], vec![0, 0, 0], vec![3, 2, 1]]);
    }
}
