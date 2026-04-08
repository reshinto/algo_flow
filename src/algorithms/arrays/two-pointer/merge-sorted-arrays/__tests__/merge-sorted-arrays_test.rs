include!("../sources/merge-sorted-arrays.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basic_merge() {
        let result = merge_sorted_arrays(&[1, 3, 5], &[2, 4, 6]);
        assert_eq!(result, vec![1, 2, 3, 4, 5, 6]);
    }

    #[test]
    fn test_empty_first_array() {
        let result = merge_sorted_arrays(&[], &[1, 2, 3]);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn test_empty_second_array() {
        let result = merge_sorted_arrays(&[1, 2, 3], &[]);
        assert_eq!(result, vec![1, 2, 3]);
    }

    #[test]
    fn test_both_empty() {
        let result = merge_sorted_arrays(&[], &[]);
        assert_eq!(result, vec![]);
    }

    #[test]
    fn test_overlapping_values() {
        let result = merge_sorted_arrays(&[1, 2, 4], &[2, 3, 5]);
        assert_eq!(result, vec![1, 2, 2, 3, 4, 5]);
    }

    #[test]
    fn test_single_element_arrays() {
        let result = merge_sorted_arrays(&[5], &[3]);
        assert_eq!(result, vec![3, 5]);
    }

    #[test]
    fn test_different_lengths() {
        let result = merge_sorted_arrays(&[1, 10], &[2, 3, 4, 5, 6]);
        assert_eq!(result, vec![1, 2, 3, 4, 5, 6, 10]);
    }

    #[test]
    fn test_default_input() {
        let result = merge_sorted_arrays(&[1, 3, 5, 7, 9], &[2, 4, 6, 8, 10]);
        assert_eq!(result, vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }
}
