include!("../sources/xor-range-query.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_single_query() {
        let (_, query_results) = xor_range_query(&[3, 5, 2, 7, 1, 4], &[[0, 2]]);
        assert_eq!(query_results[0], 4);
    }

    #[test]
    fn test_multiple_queries() {
        let (_, query_results) = xor_range_query(&[3, 5, 2, 7, 1, 4], &[[0, 2], [1, 4], [2, 5]]);
        assert_eq!(query_results, vec![4, 1, 0]);
    }

    #[test]
    fn test_prefix_xor_array() {
        let (prefix_xor, _) = xor_range_query(&[3, 5, 2, 7, 1, 4], &[[0, 5]]);
        assert_eq!(prefix_xor, vec![3, 6, 4, 3, 2, 6]);
    }

    #[test]
    fn test_full_range() {
        let (_, query_results) = xor_range_query(&[1, 2, 3, 4], &[[0, 3]]);
        assert_eq!(query_results[0], 4);
    }

    #[test]
    fn test_single_element_query() {
        let (_, query_results) = xor_range_query(&[10, 20, 30, 40], &[[2, 2]]);
        assert_eq!(query_results[0], 30);
    }

    #[test]
    fn test_empty_input() {
        let (prefix_xor, query_results) = xor_range_query(&[], &[]);
        assert!(prefix_xor.is_empty());
        assert!(query_results.is_empty());
    }

    #[test]
    fn test_query_from_index_zero() {
        let (_, query_results) = xor_range_query(&[5, 3, 2, 8], &[[0, 2]]);
        assert_eq!(query_results[0], 4);
    }

    #[test]
    fn test_all_zeros() {
        let (prefix_xor, query_results) = xor_range_query(&[0, 0, 0, 0], &[[0, 3]]);
        assert_eq!(query_results[0], 0);
        assert_eq!(prefix_xor, vec![0, 0, 0, 0]);
    }
}
