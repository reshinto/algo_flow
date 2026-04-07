include!("segment-tree-range-min.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_range_min_default_input() {
        let result = segment_tree_range_min(&[2, 5, 1, 4, 9, 3], &[(0, 2), (3, 5)]);
        assert_eq!(result[0], 1);
        assert_eq!(result[1], 3);
    }

    #[test]
    fn test_single_element_query() {
        let result = segment_tree_range_min(&[4, 2, 6], &[(1, 1)]);
        assert_eq!(result[0], 2);
    }

    #[test]
    fn test_full_range_query() {
        let result = segment_tree_range_min(&[3, 1, 4, 1, 5, 9], &[(0, 5)]);
        assert_eq!(result[0], 1);
    }

    #[test]
    fn test_multiple_queries() {
        let result = segment_tree_range_min(&[10, 3, 8, 1, 7], &[(0, 2), (1, 4), (3, 4)]);
        assert_eq!(result[0], 3);
        assert_eq!(result[1], 1);
        assert_eq!(result[2], 1);
    }
}
