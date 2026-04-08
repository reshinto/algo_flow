include!("../sources/min-size-subarray-sum.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_min_size_subarray_sum_basic() {
        let (min_length, start_index) = min_size_subarray_sum(&[2, 3, 1, 2, 4, 3], 7);
        assert_eq!(min_length, 2);
        assert_eq!(start_index, 4);
    }

    #[test]
    fn test_min_size_subarray_sum_single_element_meets_target() {
        let (min_length, _) = min_size_subarray_sum(&[1, 4, 4], 4);
        assert_eq!(min_length, 1);
    }

    #[test]
    fn test_min_size_subarray_sum_no_valid_subarray() {
        let (min_length, _) = min_size_subarray_sum(&[1, 1, 1, 1], 10);
        assert_eq!(min_length, 0);
    }

    #[test]
    fn test_min_size_subarray_sum_whole_array() {
        let (min_length, start_index) = min_size_subarray_sum(&[1, 2, 3], 6);
        assert_eq!(min_length, 3);
        assert_eq!(start_index, 0);
    }

    #[test]
    fn test_min_size_subarray_sum_empty_array() {
        let (min_length, _) = min_size_subarray_sum(&[], 7);
        assert_eq!(min_length, 0);
    }

    #[test]
    fn test_min_size_subarray_sum_zero_target() {
        let (min_length, _) = min_size_subarray_sum(&[1, 2, 3], 0);
        assert_eq!(min_length, 0);
    }

    #[test]
    fn test_min_size_subarray_sum_single_element_exact() {
        let (min_length, start_index) = min_size_subarray_sum(&[7], 7);
        assert_eq!(min_length, 1);
        assert_eq!(start_index, 0);
    }

    #[test]
    fn test_min_size_subarray_sum_repeated_elements() {
        let (min_length, _) = min_size_subarray_sum(&[3, 3, 3, 3], 6);
        assert_eq!(min_length, 2);
    }

    #[test]
    fn test_min_size_subarray_sum_large_first_element() {
        let (min_length, start_index) = min_size_subarray_sum(&[100, 1, 1, 1, 1], 100);
        assert_eq!(min_length, 1);
        assert_eq!(start_index, 0);
    }
}
