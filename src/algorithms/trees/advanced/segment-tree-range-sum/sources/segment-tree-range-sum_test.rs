include!("segment-tree-range-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_range_sum_default_input() {
        let result = segment_tree_range_sum(&[1, 3, 5, 7, 9, 11], &[(1, 3), (0, 5)]);
        assert_eq!(result[0], 15);
        assert_eq!(result[1], 36);
    }

    #[test]
    fn test_single_element_query() {
        let result = segment_tree_range_sum(&[4, 2, 6], &[(1, 1)]);
        assert_eq!(result[0], 2);
    }

    #[test]
    fn test_full_range_query() {
        let result = segment_tree_range_sum(&[1, 2, 3, 4, 5], &[(0, 4)]);
        assert_eq!(result[0], 15);
    }

    #[test]
    fn test_multiple_queries() {
        let result = segment_tree_range_sum(&[10, 20, 30, 40, 50], &[(0, 1), (2, 4), (1, 3)]);
        assert_eq!(result[0], 30);
        assert_eq!(result[1], 120);
        assert_eq!(result[2], 90);
    }
}
