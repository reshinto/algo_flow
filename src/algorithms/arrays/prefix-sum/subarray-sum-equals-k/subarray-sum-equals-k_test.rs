include!("sources/subarray-sum-equals-k.rs");

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_count_two_subarrays() {
        let (count, _) = subarray_sum_equals_k(&[1, 2, 3], 3);
        assert_eq!(count, 2);
    }

    #[test]
    fn test_no_match() {
        let (count, _) = subarray_sum_equals_k(&[1, 2, 3], 10);
        assert_eq!(count, 0);
    }

    #[test]
    fn test_single_element_equals_k() {
        let (count, _) = subarray_sum_equals_k(&[5, 1, 3], 5);
        assert_eq!(count, 1);
    }

    #[test]
    fn test_empty_array() {
        let (count, _) = subarray_sum_equals_k(&[], 3);
        assert_eq!(count, 0);
    }

    #[test]
    fn test_all_equal_to_k() {
        let (count, _) = subarray_sum_equals_k(&[3, 3, 3], 3);
        assert_eq!(count, 3);
    }

    #[test]
    fn test_all_zeros_target_zero() {
        let (count, _) = subarray_sum_equals_k(&[0, 0, 0], 0);
        assert_eq!(count, 6);
    }

    #[test]
    fn test_single_element_match() {
        let (count, _) = subarray_sum_equals_k(&[7], 7);
        assert_eq!(count, 1);
    }

    #[test]
    fn test_single_element_no_match() {
        let (count, _) = subarray_sum_equals_k(&[4], 7);
        assert_eq!(count, 0);
    }
}
