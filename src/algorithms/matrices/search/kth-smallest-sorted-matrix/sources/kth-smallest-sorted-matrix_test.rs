include!("kth-smallest-sorted-matrix.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_finds_kth_smallest_3x3_k8() {
        let matrix = vec![vec![1, 5, 9], vec![10, 11, 13], vec![12, 13, 15]];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 8), 13);
    }

    #[test]
    fn test_returns_smallest_when_k1() {
        let matrix = vec![vec![1, 5, 9], vec![10, 11, 13], vec![12, 13, 15]];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 1), 1);
    }

    #[test]
    fn test_returns_largest_when_k_equals_n_squared() {
        let matrix = vec![vec![1, 5, 9], vec![10, 11, 13], vec![12, 13, 15]];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 9), 15);
    }

    #[test]
    fn test_handles_1x1_matrix() {
        let matrix = vec![vec![42]];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 1), 42);
    }

    #[test]
    fn test_handles_2x2_matrix_k2() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 2), 2);
    }

    #[test]
    fn test_handles_2x2_matrix_k3() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 3), 3);
    }

    #[test]
    fn test_handles_all_same_values() {
        let matrix = vec![vec![5, 5, 5], vec![5, 5, 5], vec![5, 5, 5]];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 5), 5);
    }

    #[test]
    fn test_4x4_matrix_k8() {
        let matrix = vec![
            vec![1, 2, 3, 4],
            vec![5, 6, 7, 8],
            vec![9, 10, 11, 12],
            vec![13, 14, 15, 16],
        ];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 8), 8);
    }

    #[test]
    fn test_handles_negative_values() {
        let matrix = vec![vec![-5, -4, -3], vec![-2, -1, 0], vec![1, 2, 3]];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 5), -1);
    }

    #[test]
    fn test_4x4_matrix_k16() {
        let matrix = vec![
            vec![1, 2, 3, 4],
            vec![5, 6, 7, 8],
            vec![9, 10, 11, 12],
            vec![13, 14, 15, 16],
        ];
        assert_eq!(kth_smallest_sorted_matrix(&matrix, 16), 16);
    }
}
