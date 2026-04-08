include!("sources/spiral-order.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_traverses_4x4_in_spiral_order() {
        let matrix = vec![
            vec![1, 2, 3, 4],
            vec![5, 6, 7, 8],
            vec![9, 10, 11, 12],
            vec![13, 14, 15, 16],
        ];
        assert_eq!(
            spiral_order(&matrix),
            vec![1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
        );
    }

    #[test]
    fn test_traverses_3x3_in_spiral_order() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        assert_eq!(spiral_order(&matrix), vec![1, 2, 3, 6, 9, 8, 7, 4, 5]);
    }

    #[test]
    fn test_handles_single_row() {
        let matrix = vec![vec![1, 2, 3, 4]];
        assert_eq!(spiral_order(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_handles_single_column() {
        let matrix = vec![vec![1], vec![2], vec![3], vec![4]];
        assert_eq!(spiral_order(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_handles_1x1_matrix() {
        let matrix = vec![vec![42]];
        assert_eq!(spiral_order(&matrix), vec![42]);
    }

    #[test]
    fn test_handles_2x2_matrix() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        assert_eq!(spiral_order(&matrix), vec![1, 2, 4, 3]);
    }

    #[test]
    fn test_handles_2x4_non_square() {
        let matrix = vec![vec![1, 2, 3, 4], vec![5, 6, 7, 8]];
        assert_eq!(spiral_order(&matrix), vec![1, 2, 3, 4, 8, 7, 6, 5]);
    }

    #[test]
    fn test_handles_3x2_non_square() {
        let matrix = vec![vec![1, 2], vec![3, 4], vec![5, 6]];
        assert_eq!(spiral_order(&matrix), vec![1, 2, 4, 6, 5, 3]);
    }

    #[test]
    fn test_returns_empty_for_empty_matrix() {
        let matrix: Vec<Vec<i32>> = vec![];
        assert_eq!(spiral_order(&matrix), Vec::<i32>::new());
    }

    #[test]
    fn test_collects_all_elements_exactly_once() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let result = spiral_order(&matrix);
        assert_eq!(result.len(), 9);
        let unique: std::collections::HashSet<i32> = result.iter().cloned().collect();
        assert_eq!(unique.len(), 9);
    }
}
