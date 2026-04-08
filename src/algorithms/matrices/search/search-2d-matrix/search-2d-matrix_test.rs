include!("sources/search-2d-matrix.rs");

#[cfg(test)]
mod tests {
    use super::*;

    fn default_matrix() -> Vec<Vec<i32>> {
        vec![vec![1, 3, 5, 7], vec![10, 11, 16, 20], vec![23, 30, 34, 60]]
    }

    #[test]
    fn test_finds_target_in_matrix() {
        assert_eq!(search_2d_matrix(&default_matrix(), 3), true);
    }

    #[test]
    fn test_returns_false_when_not_found() {
        assert_eq!(search_2d_matrix(&default_matrix(), 13), false);
    }

    #[test]
    fn test_finds_first_element() {
        assert_eq!(search_2d_matrix(&default_matrix(), 1), true);
    }

    #[test]
    fn test_finds_last_element() {
        assert_eq!(search_2d_matrix(&default_matrix(), 60), true);
    }

    #[test]
    fn test_single_row_target_found() {
        assert_eq!(search_2d_matrix(&vec![vec![1, 3, 5, 7, 9]], 5), true);
    }

    #[test]
    fn test_single_row_target_not_found() {
        assert_eq!(search_2d_matrix(&vec![vec![1, 3, 5, 7, 9]], 4), false);
    }

    #[test]
    fn test_single_element_match() {
        assert_eq!(search_2d_matrix(&vec![vec![42]], 42), true);
    }

    #[test]
    fn test_single_element_no_match() {
        assert_eq!(search_2d_matrix(&vec![vec![42]], 99), false);
    }

    #[test]
    fn test_returns_false_for_empty_matrix() {
        assert_eq!(search_2d_matrix(&vec![], 5), false);
    }

    #[test]
    fn test_large_matrix_target_found_in_middle() {
        let matrix = vec![
            vec![1, 2, 3, 4, 5],
            vec![6, 7, 8, 9, 10],
            vec![11, 12, 13, 14, 15],
            vec![16, 17, 18, 19, 20],
        ];
        assert_eq!(search_2d_matrix(&matrix, 13), true);
    }

    #[test]
    fn test_finds_elements_at_row_boundaries() {
        assert_eq!(search_2d_matrix(&default_matrix(), 10), true);
        assert_eq!(search_2d_matrix(&default_matrix(), 7), true);
    }
}
