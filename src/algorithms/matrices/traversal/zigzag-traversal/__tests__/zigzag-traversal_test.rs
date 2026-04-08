include!("../sources/zigzag-traversal.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_zigzag_traversal_3x3() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        assert_eq!(zigzag_traversal(&matrix), vec![1, 2, 4, 7, 5, 3, 6, 8, 9]);
    }

    #[test]
    fn test_zigzag_traversal_3x4() {
        let matrix = vec![vec![1, 2, 3, 4], vec![5, 6, 7, 8], vec![9, 10, 11, 12]];
        assert_eq!(zigzag_traversal(&matrix), vec![1, 2, 5, 9, 6, 3, 4, 7, 10, 11, 8, 12]);
    }

    #[test]
    fn test_zigzag_traversal_4x4() {
        let matrix = vec![
            vec![1, 2, 3, 4],
            vec![5, 6, 7, 8],
            vec![9, 10, 11, 12],
            vec![13, 14, 15, 16],
        ];
        assert_eq!(
            zigzag_traversal(&matrix),
            vec![1, 2, 5, 9, 6, 3, 4, 7, 10, 13, 14, 11, 8, 12, 15, 16]
        );
    }

    #[test]
    fn test_zigzag_traversal_single_element() {
        let matrix = vec![vec![42]];
        assert_eq!(zigzag_traversal(&matrix), vec![42]);
    }

    #[test]
    fn test_zigzag_traversal_single_row() {
        let matrix = vec![vec![1, 2, 3, 4]];
        assert_eq!(zigzag_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_zigzag_traversal_single_column() {
        let matrix = vec![vec![1], vec![2], vec![3], vec![4]];
        assert_eq!(zigzag_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_zigzag_traversal_empty_matrix() {
        let matrix: Vec<Vec<i32>> = vec![];
        assert_eq!(zigzag_traversal(&matrix), Vec::<i32>::new());
    }

    #[test]
    fn test_zigzag_traversal_2x2() {
        let matrix = vec![vec![1, 2], vec![3, 4]];
        assert_eq!(zigzag_traversal(&matrix), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_zigzag_traversal_collects_all_once_3x3() {
        let matrix = vec![vec![1, 2, 3], vec![4, 5, 6], vec![7, 8, 9]];
        let result = zigzag_traversal(&matrix);
        assert_eq!(result.len(), 9);
        let unique: std::collections::HashSet<i32> = result.into_iter().collect();
        assert_eq!(unique.len(), 9);
    }

    #[test]
    fn test_zigzag_traversal_collects_all_once_3x4() {
        let matrix = vec![vec![1, 2, 3, 4], vec![5, 6, 7, 8], vec![9, 10, 11, 12]];
        let result = zigzag_traversal(&matrix);
        assert_eq!(result.len(), 12);
        let unique: std::collections::HashSet<i32> = result.into_iter().collect();
        assert_eq!(unique.len(), 12);
    }
}
