include!("prefix-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_single_query() {
        let (prefix_array, query_results) = prefix_sum(&[1, 2, 3, 4, 5], &[[1, 3]]);
        assert_eq!(prefix_array, vec![1, 3, 6, 10, 15]);
        assert_eq!(query_results, vec![9]);
    }

    #[test]
    fn test_multiple_queries() {
        let (_, query_results) = prefix_sum(&[2, 4, 1, 3, 5, 2], &[[1, 3], [0, 4], [2, 5]]);
        assert_eq!(query_results, vec![8, 15, 11]);
    }

    #[test]
    fn test_full_range_query() {
        let (_, query_results) = prefix_sum(&[3, 1, 4, 1, 5, 9, 2], &[[0, 6]]);
        assert_eq!(query_results[0], 25);
    }

    #[test]
    fn test_single_element_range() {
        let (_, query_results) = prefix_sum(&[10, 20, 30, 40], &[[2, 2]]);
        assert_eq!(query_results[0], 30);
    }

    #[test]
    fn test_empty_input() {
        let (prefix_array, query_results) = prefix_sum(&[], &[]);
        assert!(prefix_array.is_empty());
        assert!(query_results.is_empty());
    }

    #[test]
    fn test_negative_numbers() {
        let (_, query_results) = prefix_sum(&[-2, 5, -1, 3], &[[0, 3]]);
        assert_eq!(query_results[0], 5);
    }

    #[test]
    fn test_default_input() {
        let (prefix_array, query_results) = prefix_sum(&[2, 4, 1, 3, 5, 2], &[[1, 3], [0, 4], [2, 5]]);
        assert_eq!(query_results, vec![8, 15, 11]);
        assert_eq!(prefix_array, vec![2, 6, 7, 10, 15, 17]);
    }

    #[test]
    fn test_query_from_index_zero() {
        let (_, query_results) = prefix_sum(&[5, 3, 2, 8], &[[0, 2]]);
        assert_eq!(query_results[0], 10);
    }
}
