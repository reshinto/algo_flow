include!("../sources/binary-indexed-tree.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_range_sums_default_input() {
        let result = binary_indexed_tree(&[3, 2, 4, 5, 1, 1, 5, 3], &[(0, 4), (2, 6)]);
        assert_eq!(result[0], 15);
        assert_eq!(result[1], 16);
    }

    #[test]
    fn test_single_element_query() {
        let result = binary_indexed_tree(&[10, 20, 30], &[(1, 1)]);
        assert_eq!(result[0], 20);
    }

    #[test]
    fn test_full_range_query() {
        let result = binary_indexed_tree(&[1, 2, 3, 4, 5], &[(0, 4)]);
        assert_eq!(result[0], 15);
    }

    #[test]
    fn test_multiple_queries() {
        let result = binary_indexed_tree(&[5, 3, 2, 8, 1], &[(0, 2), (1, 4), (2, 3)]);
        assert_eq!(result[0], 10);
        assert_eq!(result[1], 14);
        assert_eq!(result[2], 10);
    }
}
