include!("search-2d-matrix-ii.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn default_matrix() -> Vec<Vec<i32>> {
        vec![
            vec![1, 4, 7, 11, 15],
            vec![2, 5, 8, 12, 19],
            vec![3, 6, 9, 16, 22],
            vec![10, 13, 14, 17, 24],
            vec![18, 21, 23, 26, 30],
        ]
    }

    #[test]
    fn test_finds_target_in_center() {
        assert_eq!(search_2d_matrix_ii(&default_matrix(), 5), true);
    }

    #[test]
    fn test_returns_false_when_not_found() {
        assert_eq!(search_2d_matrix_ii(&default_matrix(), 20), false);
    }

    #[test]
    fn test_finds_top_right_corner_element() {
        assert_eq!(search_2d_matrix_ii(&default_matrix(), 15), true);
    }

    #[test]
    fn test_finds_bottom_left_corner_element() {
        assert_eq!(search_2d_matrix_ii(&default_matrix(), 18), true);
    }

    #[test]
    fn test_single_element_match() {
        assert_eq!(search_2d_matrix_ii(&vec![vec![7]], 7), true);
    }

    #[test]
    fn test_single_element_no_match() {
        assert_eq!(search_2d_matrix_ii(&vec![vec![7]], 3), false);
    }

    #[test]
    fn test_returns_false_for_empty_matrix() {
        assert_eq!(search_2d_matrix_ii(&vec![], 5), false);
    }

    #[test]
    fn test_large_matrix_target_found() {
        let matrix = vec![
            vec![1, 4, 7, 11],
            vec![2, 5, 8, 12],
            vec![3, 6, 9, 16],
            vec![10, 13, 14, 17],
        ];
        assert_eq!(search_2d_matrix_ii(&matrix, 9), true);
    }

    #[test]
    fn test_large_matrix_target_not_found() {
        let matrix = vec![
            vec![1, 4, 7, 11],
            vec![2, 5, 8, 12],
            vec![3, 6, 9, 16],
            vec![10, 13, 14, 17],
        ];
        assert_eq!(search_2d_matrix_ii(&matrix, 15), false);
    }

    #[test]
    fn test_finds_first_element() {
        assert_eq!(search_2d_matrix_ii(&default_matrix(), 1), true);
    }

    #[test]
    fn test_finds_last_element() {
        assert_eq!(search_2d_matrix_ii(&default_matrix(), 30), true);
    }
}
